// @vitest-environment node

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const themeDirectory = fileURLToPath(
  new URL("../../src/theme/", import.meta.url),
);
const componentDirectory = fileURLToPath(
  new URL("../../src/components/", import.meta.url),
);

async function readSources(directory: string, extension: string) {
  const files = (await readdir(directory, { recursive: true })).filter(
    (file) => file.endsWith(extension),
  );

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(join(directory, file), "utf8");

      return [file, source] as const;
    }),
  );
}

describe("source architecture", () => {
  it("keeps theme recipes in tailwind-variants", async () => {
    const sources = await readSources(themeDirectory, ".ts");

    expect(sources.length).toBeGreaterThan(0);

    for (const [file, source] of sources) {
      expect(source, file).toContain('from "tailwind-variants"');
      expect(source, file).not.toContain(".css");
      expect(source, file).not.toContain("LIQUID_GLASS_MAP");
    }
  });

  it("keeps components free of legacy CSS and layer maps", async () => {
    const sources = await readSources(componentDirectory, ".tsx");

    expect(sources.length).toBeGreaterThan(0);

    for (const [file, source] of sources) {
      expect(source, file).not.toContain(".css");
      expect(source, file).not.toContain("LIQUID_GLASS_MAP");
    }
  });
});
