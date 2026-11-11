import fs from "node:fs";
import ts from "typescript";
import { registrySchema } from "shadcn/schema";
import { describe, expect, it } from "vitest";

import {
  buildRegistry,
  serializeRegistry,
} from "../../scripts/registry/build.ts";
import { readComponents } from "../../scripts/registry/meta.ts";

const registry = buildRegistry();
const itemsByName = new Map(
  registry.items.map((item) => [item.name, item]),
);

function readLocalImports(contents: string): string[] {
  return ts
    .preProcessFile(contents, true, true)
    .importedFiles.map((reference) => reference.fileName)
    .filter((specifier) => specifier.startsWith("."));
}

describe("registry items", () => {
  it("covers every documented component plus the style items", () => {
    expect(registry.items.map((item) => item.name)).toEqual([
      ...readComponents().map((component) => component.name),
      "glass",
      "glass-preset",
    ]);
  });

  it("validates against the shadcn registry schema", () => {
    const result = registrySchema.safeParse(registry);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    expect(result.success).toBe(true);
  });

  it("is in sync with the committed registry.json", () => {
    const committed: unknown = JSON.parse(
      fs.readFileSync("registry.json", "utf8"),
    );

    expect(committed).toEqual(serializeRegistry(registry));
  });

  it("ships one self-contained file per item", () => {
    for (const item of registry.items) {
      if (item.type === "registry:style") {
        expect(item.files).toEqual([]);
        continue;
      }

      expect(item.files).toHaveLength(1);
      const [file] = item.files;
      const alias = item.type === "registry:lib" ? "lib" : "ui";

      expect(file.target).toBe(
        `@${alias}/xingxingmofashu/${item.name}.tsx`,
      );

      expect(file.content, `${item.name} has no content`).toBeDefined();
      expect(readLocalImports(file.content!)).toEqual([]);
    }
  });

  it("inlines the theme and shared helpers", () => {
    const button = itemsByName.get("button")!.files[0].content!;

    expect(button).toContain("const buttonTheme = tv({");
    expect(button).toContain("function useFieldset()");
    expect(button).toContain("type ComponentConfig");
    expect(button).toContain("export { Button };");
    expect(button).toContain("export type { ButtonProps };");
  });

  it("keeps server-safe components free of client directives", () => {
    const card = itemsByName.get("card")!.files[0].content!;

    expect(card.startsWith('"use client";')).toBe(false);
  });

  it("installs every file under the xingxingmofashu folder", () => {
    for (const item of registry.items) {
      for (const file of item.files) {
        expect(file.target).toMatch(/^@(ui|lib)\/xingxingmofashu\//);
      }
    }
  });

  it("ships the shared Glass material with every item", () => {
    const glass = itemsByName.get("glass")!;

    for (const item of registry.items) {
      expect(item.cssVars).toEqual(glass.cssVars);
      expect(item.css["@layer theme"]).toMatchObject(
        glass.css["@layer theme"] as Record<string, unknown>,
      );
      expect(item.css["@layer components"]).toEqual(
        glass.css["@layer components"],
      );
    }
  });

  it("provides the component theme aliases", () => {
    for (const item of registry.items) {
      expect(item.cssVars.theme).toMatchObject({
        "color-ui-ink": "var(--ui-ink)",
        "color-ui-surface": "var(--ui-surface)",
        "color-ui-glass-overlay-surface":
          "var(--ui-glass-overlay-surface)",
      });
    }
  });

  it("provides the shared keyframes", () => {
    for (const item of registry.items) {
      expect(item.css).toHaveProperty("@keyframes ui-toggle-group-select");
      expect(item.css).toHaveProperty("@keyframes ui-progress-indeterminate");
    }
  });
});

describe("glass-preset item", () => {
  const glass = itemsByName.get("glass")!;
  const preset = itemsByName.get("glass-preset")!;

  it("ships a single bundled library file", () => {
    expect(preset.type).toBe("registry:lib");
    expect(preset.files).toHaveLength(1);
    expect(preset.files[0].type).toBe("registry:lib");
    expect(preset.files[0].target).toBe(
      "@lib/xingxingmofashu/glass-preset.tsx",
    );

    const contents = preset.files[0].content!;

    expect(contents).toContain("function GlassPresetProvider");
    expect(contents).toContain("function GlassPresetScope");
    expect(contents).toContain("function GlassPresetScript");
    expect(readLocalImports(contents)).toEqual([]);
  });

  it("merges the preset variables into the base material", () => {
    const theme = preset.css["@layer theme"] as Record<string, unknown>;
    const selectors = Object.keys(theme);

    expect(selectors).toEqual(
      expect.arrayContaining([
        ":root, :host",
        '.dark, [data-theme="dark"]',
        '.light, [data-theme="light"]',
      ]),
    );
    expect(selectors.some((selector) => selector.includes("data-glass"))).toBe(
      true,
    );
    expect(preset.css["@layer components"]).toEqual(
      glass.css["@layer components"],
    );
  });
});
