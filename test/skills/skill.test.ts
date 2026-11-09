// @vitest-environment node

import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const docsDirectory = join(
  root,
  "docs",
  "content",
  "docs",
  "en",
  "components",
);
const skillDirectory = join(root, "skills", "xingxingmofashu-ui");
const referenceDirectory = join(skillDirectory, "references", "components");
const coreReferenceNames = [
  "installation",
  "theming",
  "patterns",
  "troubleshooting",
] as const;

async function listNames(directory: string, extension: string) {
  return (await readdir(directory))
    .filter((name) => name.endsWith(extension) && name !== `index${extension}`)
    .map((name) => name.slice(0, -extension.length))
    .sort();
}

async function readSkillSources() {
  const names = await listNames(referenceDirectory, ".md");

  return Promise.all(
    names.map(async (name) => ({
      name,
      source: await readFile(join(referenceDirectory, `${name}.md`), "utf8"),
    })),
  );
}

function expectNoInternalPaths(source: string, name: string) {
  expect(source, name).not.toContain("](/docs/");
  expect(source, name).not.toContain("src/theme/");
}

describe("UI skill", () => {
  it("has a reference for every documented component", async () => {
    const documented = await listNames(docsDirectory, ".mdx");
    const referenced = await listNames(referenceDirectory, ".md");

    expect(referenced).toEqual(documented);
  });

  it("links every component reference from SKILL.md", async () => {
    const skill = await readFile(join(skillDirectory, "SKILL.md"), "utf8");
    const referenced = await listNames(referenceDirectory, ".md");

    for (const name of referenced) {
      expect(skill, name).toContain(`references/components/${name}.md`);
    }
  });

  it("keeps references canonical and free of internal repo paths", async () => {
    const sources = await readSkillSources();

    expect(sources.length).toBeGreaterThan(0);

    for (const { name, source } of sources) {
      expect(source, name).toContain(
        `https://xingxingmofashu.github.io/ui/docs/en/components/${name}`,
      );
      expectNoInternalPaths(source, name);
    }

    for (const name of coreReferenceNames) {
      const source = await readFile(
        join(skillDirectory, "references", `${name}.md`),
        "utf8",
      );

      expect(source, name).toContain("https://xingxingmofashu.github.io/ui/");
      expectNoInternalPaths(source, name);
    }
  });

  it("keeps the skill name aligned with its directory", async () => {
    const skill = await readFile(join(skillDirectory, "SKILL.md"), "utf8");
    const name = /^name:\s*(.+)$/m.exec(skill)?.[1]?.trim();
    const directoryName = basename(skillDirectory);

    expect(name).toBe(directoryName);
    expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("includes the core references linked from SKILL.md", async () => {
    const skill = await readFile(join(skillDirectory, "SKILL.md"), "utf8");

    for (const name of coreReferenceNames) {
      const source = await readFile(
        join(skillDirectory, "references", `${name}.md`),
        "utf8",
      );

      expect(source.length, name).toBeGreaterThan(0);
      expect(skill, name).toContain(`references/${name}.md`);
    }
  });
});
