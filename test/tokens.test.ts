// @vitest-environment node

import { compile } from "@tailwindcss/node";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import button from "../src/theme/button";

const packageRoot = fileURLToPath(new URL("../", import.meta.url)).replaceAll(
  "\\",
  "/",
);

const input = `@import "tailwindcss";
@import "./src/index.css";
`;

async function buildStyles(candidates: string[]) {
  const compiler = await compile(input, {
    base: packageRoot,
    onDependency() {},
  });

  return compiler.build(candidates);
}

function themeCandidates() {
  const styles = button({ size: "md" });

  return [
    styles.base(),
    styles.surface(),
    styles.label(),
    styles.leadingIcon(),
    styles.trailingIcon(),
    styles.overlay(),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
}

describe("design tokens", () => {
  it("compiles component utilities against the live --ui variables", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain("color: var(--ui-ink);");
    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("outline-color: var(--ui-glass-focus);");
    expect(css).toContain("--tw-shadow: var(--ui-shadow-glass);");
    expect(css).toContain("var(--ui-glass-highlight)");
    expect(css).toContain("var(--ui-glass-glare-stop)");
    expect(css).not.toContain("var(--ui-drop-shadow");
    expect(css).toContain("filter: contrast(3);");
    expect(css).toContain("filter: brightness(0.9);");
    expect(css).toContain(
      "transition-property: background-color,translate,scale;",
    );
    expect(css).not.toContain("var(--color-glass-highlight)");
  });

  it("ships light and dark runtime values", async () => {
    const css = await buildStyles([]);

    expect(css).toContain("--ui-ink: #3e3e3e;");
    expect(css).toContain("--ui-ink: #f5f5f5;");
    expect(css).toContain("--ui-glass-surface: rgb(255 255 255 / 0.06);");
    expect(css).toContain("--ui-glass-glare-stop: 15%;");
    expect(css).not.toContain("--ui-drop-shadow");
    expect(css).toContain(".dark {");
  });

  it("does not override the host app's global light/dark variants", async () => {
    const source = await readFile(
      new URL("../src/index.css", import.meta.url),
      "utf8",
    );

    expect(source).toContain("@custom-variant ui-light");
    expect(source).toContain("@custom-variant ui-dark");
    expect(source).not.toContain("@custom-variant light");
    expect(source).not.toContain("@custom-variant dark");
  });
});
