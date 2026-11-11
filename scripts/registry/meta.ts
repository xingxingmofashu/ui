import fs from "node:fs";
import path from "node:path";

const COMPONENTS_DIR = "docs/content/docs/en/components";

export interface ComponentMetadata {
  name: string;
  category: string;
  title: string;
  description: string;
}

function readFrontmatter(filePath: string): Record<string, string> {
  const match = fs
    .readFileSync(filePath, "utf8")
    .match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .flatMap((line): Array<[string, string]> => {
        const entry = line.match(/^([\w-]+):\s*(.*)$/);

        return entry
          ? [[entry[1], entry[2].trim().replace(/^(["'])(.*)\1$/, "$2")]]
          : [];
      }),
  );
}

/**
 * Read the component order and category groups from the docs sidebar. Group
 * headings look like `---Element---` and apply to every page after them.
 */
export function readComponents(): ComponentMetadata[] {
  const { pages = [] } = JSON.parse(
    fs.readFileSync(path.join(COMPONENTS_DIR, "meta.json"), "utf8"),
  ) as { pages?: string[] };
  const components: ComponentMetadata[] = [];
  let category = "";

  for (const page of pages) {
    const heading = page.match(/^---(.+)---$/)?.[1];

    if (heading) {
      category = heading.trim();
      continue;
    }

    if (page === "index") {
      continue;
    }

    const filePath = path.join(COMPONENTS_DIR, `${page}.mdx`);
    const { title, description } = readFrontmatter(filePath);

    if (!title || !description) {
      throw new Error(`Missing title or description in ${filePath}.`);
    }

    components.push({ name: page, category, title, description });
  }

  return components;
}
