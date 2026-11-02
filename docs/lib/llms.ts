import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  githubUrl,
  npmUrl,
  siteDescription,
  siteName,
} from "@/lib/site";

type DocPage = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  body: string;
  url: string;
};

const contentRoot = path.join(process.cwd(), "content", "docs");
// llms.txt and llms-full.txt are machine-readable artifacts for agents, so
// they intentionally expose the English docs only.
const llmsLocales: Locale[] = ["en"];

async function listMdxFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listMdxFiles(fullPath);
      }

      return entry.isFile() && entry.name.endsWith(".mdx") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function readFrontmatterValue(frontmatter: string, key: string) {
  const match = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(frontmatter);
  if (!match) return "";

  let value = match[1].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return value.replace(/\\"/g, '"');
}

function parseDocument(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) {
    return { title: "", description: "", body: source };
  }

  return {
    title: readFrontmatterValue(match[1], "title"),
    description: readFrontmatterValue(match[1], "description"),
    body: source.slice(match[0].length),
  };
}

function readAttribute(attributes: string, name: string) {
  const match = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
  ).exec(attributes);

  return match?.[1] ?? match?.[2] ?? "";
}

function stripMarkdownTags(chunk: string) {
  let text = chunk.replace(/^import\s.+$/gm, "").replace(/^export\s.+$/gm, "");

  // Remove MDX expressions before tags: attributes such as type={{ ... }}
  // can contain angle brackets that would otherwise hide the closing `/>`.
  let previous = "";
  while (text !== previous) {
    previous = text;
    text = text.replace(/\{[^{}]*\}/g, "");
  }

  return text
    .replace(/<[A-Z][\w.]*\b[^<>]*?\/>/g, "")
    .replace(/<\/?[A-Z][\w.]*\b[^<>]*>/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function isComponentStart(text: string, start: number, name: string) {
  const next = text.charAt(start + name.length + 1);

  return !/[A-Za-z0-9]/.test(next);
}

function findTagEnd(text: string, start: number) {
  let quote: string | null = null;
  let depth = 0;

  for (let index = start; index < text.length; index += 1) {
    const char = text.charAt(index);

    if (quote) {
      if (char === "\\") index += 1;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth = Math.max(0, depth - 1);
      continue;
    }

    if (depth === 0 && char === "/" && text.charAt(index + 1) === ">") {
      return { end: index + 2, selfClosing: true };
    }

    if (depth === 0 && char === ">") {
      return { end: index + 1, selfClosing: false };
    }
  }

  return null;
}

function replaceSelfClosingComponent(
  text: string,
  name: string,
  replacer: (attributes: string) => string,
) {
  let output = "";
  let cursor = 0;

  while (true) {
    const start = text.indexOf(`<${name}`, cursor);
    if (start === -1) {
      output += text.slice(cursor);
      break;
    }

    if (!isComponentStart(text, start, name)) {
      output += text.slice(cursor, start + name.length + 1);
      cursor = start + name.length + 1;
      continue;
    }

    const tag = findTagEnd(text, start + name.length + 1);
    if (!tag || !tag.selfClosing) {
      output += text.slice(cursor, start + name.length + 1);
      cursor = start + name.length + 1;
      continue;
    }

    output += text.slice(cursor, start);
    output += replacer(text.slice(start + name.length + 1, tag.end - 2));
    cursor = tag.end;
  }

  return output;
}

function replaceComponentWithChildren(
  text: string,
  name: string,
  replacer: (attributes: string, children: string) => string,
) {
  let output = "";
  let cursor = 0;
  const closeTag = `</${name}>`;

  while (true) {
    const start = text.indexOf(`<${name}`, cursor);
    if (start === -1) {
      output += text.slice(cursor);
      break;
    }

    if (!isComponentStart(text, start, name)) {
      output += text.slice(cursor, start + name.length + 1);
      cursor = start + name.length + 1;
      continue;
    }

    const tag = findTagEnd(text, start + name.length + 1);
    if (!tag || tag.selfClosing) {
      output += text.slice(cursor, start + name.length + 1);
      cursor = start + name.length + 1;
      continue;
    }

    const close = text.indexOf(closeTag, tag.end);
    if (close === -1) {
      output += text.slice(cursor, start + name.length + 1);
      cursor = start + name.length + 1;
      continue;
    }

    output += text.slice(cursor, start);
    output += replacer(
      text.slice(start + name.length + 1, tag.end - 1),
      text.slice(tag.end, close),
    );
    cursor = close + closeTag.length;
  }

  return output;
}

function transformMdxComponents(chunk: string) {
  const codeBlocks: string[] = [];
  const stash = (code: string) => {
    const token = `\u0000LLMS_CODE_${codeBlocks.length}\u0000`;
    codeBlocks.push(code);
    return token;
  };

  let text = chunk;

  // Type tables hold API contracts that plain tag stripping would erase.
  // Preserve the authored JSX as a code block so agents can still read it.
  text = replaceSelfClosingComponent(text, "TypeTable", (attributes) =>
    stash(`\`\`\`tsx\n<TypeTable${attributes}/>\n\`\`\``),
  );

  text = replaceComponentWithChildren(text, "Card", (attributes, children) => {
    const title = readAttribute(attributes, "title");
    const href = readAttribute(attributes, "href");
    const description = readAttribute(attributes, "description");
    const heading = title
      ? href
        ? `### [${title}](${href})`
        : `### ${title}`
      : "";

    return [heading, description, children].filter(Boolean).join("\n\n");
  });

  text = replaceSelfClosingComponent(text, "Card", (attributes) => {
    const title = readAttribute(attributes, "title");
    const href = readAttribute(attributes, "href");
    const description = readAttribute(attributes, "description");
    const label = title ? (href ? `[${title}](${href})` : title) : "Card";

    return `- ${label}${description ? `: ${description}` : ""}`;
  });

  text = replaceComponentWithChildren(
    text,
    "Accordion",
    (attributes, children) => {
      const title = readAttribute(attributes, "title");

      return [title ? `### ${title}` : "", children]
        .filter(Boolean)
        .join("\n\n");
    },
  );

  text = replaceComponentWithChildren(
    text,
    "Callout",
    (attributes, children) => {
      const title = readAttribute(attributes, "title");
      if (!title) return children;

      const quoted = children
        .trim()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");

      return `> **${title}**\n>\n${quoted}`;
    },
  );

  return stripMarkdownTags(text).replace(
    /\u0000LLMS_CODE_(\d+)\u0000/g,
    (_, index: string) => codeBlocks[Number(index)] ?? "",
  );
}

function stripMdx(body: string) {
  // Keep fenced code intact while converting known MDX components outside it.
  const parts = body.split(/(```[\s\S]*?```)/g);

  return parts
    .map((part, index) =>
      index % 2 === 1 ? part : transformMdxComponents(part),
    )
    .join("")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const pagePriority: Record<string, number> = {
  "get-started/introduction": 0,
  "get-started/installation": 1,
  "guides/index": 0,
  "guides/theming": 1,
  "guides/forms": 2,
  "guides/accessibility": 3,
  "guides/ssr": 4,
  "guides/templates": 5,
  "components/index": 0,
};

function pageRank(page: DocPage) {
  const [group] = page.slug.split("/");
  const groupOrder = group === "get-started" ? 0 : group === "guides" ? 1 : 2;
  const priority = pagePriority[page.slug];

  if (priority !== undefined) {
    return `${groupOrder}-0-${String(priority).padStart(2, "0")}`;
  }

  const isIndex = page.slug.endsWith("/index") || page.slug === "index";

  return `${groupOrder}-${isIndex ? 0 : 1}-${page.slug}`;
}

let pagesPromise: Promise<DocPage[]> | undefined;

export function getDocPages() {
  if (!pagesPromise) {
    pagesPromise = Promise.all(
      llmsLocales.map(async (locale) => {
        const localeRoot = path.join(contentRoot, locale);
        const files = await listMdxFiles(localeRoot);

        const pages = await Promise.all(
          files.map(async (file) => {
            const source = await readFile(file, "utf8");
            const { title, description, body } = parseDocument(source);
            const slug = path
              .relative(localeRoot, file)
              .replace(/\\/g, "/")
              .replace(/\.mdx$/, "");
            const urlSlug = slug.replace(/\/index$/, "");

            return {
              locale,
              slug,
              title: title || slug,
              description,
              body: stripMdx(body),
              url: `/docs/${locale}/${urlSlug}`,
            } satisfies DocPage;
          }),
        );

        return pages.sort((a, b) => pageRank(a).localeCompare(pageRank(b)));
      }),
    ).then((groups) => groups.flat());
  }

  return pagesPromise;
}

export async function getLlmsIndex() {
  const pages = await getDocPages();
  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "Open-source React 19 components with a CSS-only Liquid Glass visual style,",
    "built with Tailwind CSS 4 and Tailwind Variants.",
    "",
    `- Documentation: ${absoluteUrl("/docs/en")}`,
    `- GitHub: ${githubUrl}`,
    `- npm: ${npmUrl}`,
    "",
  ];

  lines.push("## Documentation", "");

  for (const page of pages) {
    const description = page.description ? `: ${page.description}` : "";
    lines.push(`- [${page.title}](${absoluteUrl(page.url)})${description}`);
  }

  lines.push("");

  lines.push(
    "## Full documentation",
    "",
    `- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): every page in one file.`,
    "",
  );

  return lines.join("\n");
}

export async function getLlmsFull() {
  const pages = await getDocPages();
  const content = pages
    .map(
      (page) =>
        `## ${page.title}\n\nURL: ${absoluteUrl(page.url)}\n\n${
          page.description ? `${page.description}\n\n` : ""
        }${page.body}`,
    )
    .join("\n\n---\n\n");

  return [
    `# ${siteName} — Full documentation`,
    "",
    `> ${siteDescription}`,
    "",
    "This file contains every English documentation page.",
    "Use the URL line above each section to cite the canonical page.",
    "",
    content,
    "",
  ].join("\n");
}
