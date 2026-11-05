// @vitest-environment node

import { readFile } from "node:fs/promises";
import { beforeAll, describe, expect, it } from "vitest";

import { buildStyles } from "./helpers";

let css: string;

beforeAll(async () => {
  css = await buildStyles([]);
});

describe("runtime tokens", () => {
  it("ships light and dark values", () => {
    expect(css).toContain("--ui-ink: #1f1f1f;");
    expect(css).toContain("--ui-ink: #f5f5f5;");
    expect(css).toContain("color-scheme: light;");
    expect(css).toContain("color-scheme: dark;");
    expect(css).toContain("--ui-surface: #fff;");
    expect(css).toContain("--ui-surface: #141414;");
    expect(css).toContain("--ui-glass-surface: rgb(255 255 255 / 0.2);");
    expect(css).toContain("--ui-glass-surface: rgb(20 20 20 / 0.62);");
    expect(css).toContain(
      "--ui-glass-overlay-surface: rgb(255 255 255 / 0.64);",
    );
    expect(css).toContain(
      "--ui-glass-overlay-surface: rgb(20 20 20 / 0.76);",
    );
    expect(css).toContain("--ui-glass-blur: 4px;");
    expect(css).toContain("--ui-glass-saturate: 150%;");
    expect(css).toContain("--ui-glass-inner-border: rgb(0 0 0 / 0.9);");
    expect(css).toContain("--ui-glass-inner-border: rgb(255 255 255 / 0.4);");
    expect(css).toContain("--ui-glass-tone: brightness(0.98);");
    expect(css).toContain("--ui-glass-tone: brightness(0.95);");
    expect(css).toContain("--ui-glass-contrast: 1.05;");
    expect(css).toContain("--ui-glass-contrast: 1;");
    expect(css).toContain("--ui-glass-glare-stop: 15%;");
    expect(css).toContain("--ui-glass-inner-inset: 8px;");
    expect(css).toContain("--ui-glass-inner-offset: 1px;");
    expect(css).toContain(
      "--ui-drop-shadow-label: drop-shadow(0 25px 3px rgb(102 102 102 / 0.15));",
    );
    expect(css).toContain(
      "--ui-drop-shadow-label: drop-shadow(0 25px 3px rgb(0 0 0 / 0.45));",
    );
    expect(css).toContain("--ui-glass-chip-blur: 8px;");
    expect(css).toContain(".dark");
    expect(css).toContain(".light");
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('[data-theme="light"]');
    expect(css).not.toContain("--ui-checkbox-mark");
    expect(css).not.toContain("--ui-checkbox-rim");
    expect(css).not.toContain("--ui-checkbox-shadow");
    expect(css).not.toContain("--ui-drop-shadow-icon");
    expect(css).not.toContain("--ui-shadow-glass-icon");
  });

  it("ships the shared glass material presets", async () => {
    const [source, index] = await Promise.all([
      readFile(
        new URL("../../src/plugins/glass-preset/index.css", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../../src/index.css", import.meta.url), "utf8"),
    ]);

    expect(index).not.toContain("@xingxingmofashu/ui/plugins/glass-preset");
    expect(source).toContain('[data-glass="thin"]');
    expect(source).toContain('[data-glass="soft"]');
    expect(source).toContain('[data-glass="regular"]');
    expect(source).toContain('[data-glass="thick"]');
    expect(source).toContain("light-dark(");
    expect(source).toContain("rgb(255 255 255 / 0.2)");
    expect(source).toContain("rgb(20 20 20 / 0.62)");
    expect(source).toContain("rgb(255 255 255 / 0.283)");
    expect(source).toContain("rgb(20 20 20 / 0.653)");
    expect(source).toContain("rgb(255 255 255 / 0.367)");
    expect(source).toContain("rgb(20 20 20 / 0.687)");
    expect(source).toContain("rgb(255 255 255 / 0.45)");
    expect(source).toContain("rgb(20 20 20 / 0.72)");
    expect(source).toContain("--ui-glass-overlay-surface");
    expect(source).toContain("rgb(255 255 255 / 0.64)");
    expect(source).toContain("rgb(20 20 20 / 0.76)");
    expect(source).toContain("rgb(255 255 255 / 0.8)");
    expect(source).toContain("rgb(20 20 20 / 0.86)");
  });

  it("ships its Tailwind source scan", async () => {
    const source = await readFile(
      new URL("../../src/index.css", import.meta.url),
      "utf8",
    );

    expect(source).toContain('@source "./**/*.mjs";');
    expect(source).toContain('@source "./**/*.{ts,tsx}";');
  });

  it("does not override the host app's global light/dark variants", async () => {
    const source = await readFile(
      new URL("../../src/index.css", import.meta.url),
      "utf8",
    );

    expect(source).toContain("@custom-variant ui-light");
    expect(source).toContain("@custom-variant ui-dark");
    expect(source).not.toContain("@custom-variant light");
    expect(source).not.toContain("@custom-variant dark");
    expect(source).not.toContain('@import "./switch.css"');
    expect(source).not.toContain(".ui-switch-");
    expect(source).not.toContain("--ui-switch");
    expect(source).not.toContain("--ui-toggle-group");
  });

  it("keeps the shared stylesheet free of component styles", async () => {
    const source = await readFile(
      new URL("../../src/index.css", import.meta.url),
      "utf8",
    );

    expect(source).toContain("backdrop-filter");
    expect(source).toContain(".ui-glass");
    expect(source).not.toContain(".ui-card-");
  });
});
