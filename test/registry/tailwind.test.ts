import { compile } from "@tailwindcss/node";
import { describe, expect, it } from "vitest";

import {
  mergeCss,
  readCssFile,
  readRegistryStyles,
} from "../../scripts/registry/stylesheet.ts";
import type {
  CssObject,
  RegistryStylePayload,
} from "../../scripts/registry/stylesheet.ts";

function serializeCssObject(value: CssObject, depth = 0): string {
  const indent = "  ".repeat(depth);
  const lines: string[] = [];

  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === "string") {
      lines.push(`${indent}${key}: ${entry};`);
      continue;
    }

    if (typeof entry !== "object" || entry === null) {
      continue;
    }

    const block = entry as CssObject;

    if (key.startsWith("@") && Object.keys(block).length === 0) {
      lines.push(`${indent}${key};`);
      continue;
    }

    lines.push(`${indent}${key} {`);
    lines.push(serializeCssObject(block, depth + 1));
    lines.push(`${indent}}`);
  }

  return lines.join("\n");
}

function serializeStylePayload(payload: RegistryStylePayload): string {
  const theme = Object.entries(payload.theme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");

  return [
    '@import "tailwindcss";',
    "@theme inline {",
    theme,
    "}",
    serializeCssObject(payload.css),
  ].join("\n");
}

async function compileStylePayload(
  payload: RegistryStylePayload,
  candidates: string[],
): Promise<string> {
  const compiler = await compile(serializeStylePayload(payload), {
    base: process.cwd(),
    onDependency() {},
  });

  return compiler.build(candidates);
}

describe("registry Tailwind payload", () => {
  it("emits the shared material, aliases, and keyframes", async () => {
    const styles = readRegistryStyles();
    const output = await compileStylePayload(styles, [
      "text-ui-ink",
      "bg-ui-glass-overlay-surface",
      "outline-ui-glass-focus",
      "[animation:ui-progress-indeterminate_1.4s_ease-in-out_infinite]",
    ]);

    expect(output).toContain(".ui-glass {");
    expect(output).toContain("--ui-glass-surface:");
    expect(output).toContain("color: var(--ui-ink)");
    expect(output).toContain(".text-ui-ink {");
    expect(output).toContain(".bg-ui-glass-overlay-surface {");
    expect(output).toContain(".outline-ui-glass-focus {");
    expect(output).toContain("@keyframes ui-progress-indeterminate");
    expect(output).toContain("@keyframes ui-toggle-group-select");
  });

  it("emits the nested light and dark token rules", async () => {
    const styles = readRegistryStyles();
    const output = await compileStylePayload(styles, []);

    expect(output).toContain(":root, :host");
    expect(output).toContain('.dark, [data-theme="dark"]');
    expect(output).toContain('.light, [data-theme="light"]');
    expect(output).toContain("--ui-ink: #1f1f1f");
    expect(output).toContain("--ui-ink: #f5f5f5");
  });

  it("keeps the preset overrides mergeable with the base styles", async () => {
    const styles = readRegistryStyles();
    const presetCss = readCssFile("src/plugins/glass-preset/index.css");
    const presetStyles: RegistryStylePayload = {
      theme: styles.theme,
      css: mergeCss(styles.css, presetCss),
    };
    const output = await compileStylePayload(presetStyles, []);

    expect(output).toContain(".ui-glass {");
    expect(output).toContain('[data-glass="thin"]');
    expect(output).toContain('[data-glass="thick"]');
    expect(output).toContain("--ui-glass-blur: 16px");
  });
});
