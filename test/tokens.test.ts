// @vitest-environment node

import { compile } from "@tailwindcss/node";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import buttonTheme from "../src/theme/button";
import cardTheme from "../src/theme/card";
import theme from "../src/theme/switch";

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
  const buttonStyles = buttonTheme({ size: "md" });
  const cardSlots = [
    "root",
    "glass",
    "surface",
    "overlay",
    "layout",
    "header",
    "title",
    "description",
    "body",
    "footer",
  ] as const;
  const cardStyles = cardTheme();
  const switchSlots = [
    "root",
    "container",
    "base",
    "thumb",
    "wrapper",
    "label",
    "description",
  ] as const;
  const switchSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const switchCandidates = switchSizes.flatMap((size) => {
    const switchStyles = theme({ size });

    return switchSlots.map((slot) => switchStyles[slot]());
  });

  return [
    buttonStyles.base(),
    buttonStyles.surface(),
    buttonStyles.label(),
    buttonStyles.leadingIcon(),
    buttonStyles.trailingIcon(),
    buttonStyles.overlay(),
    ...cardSlots.map((slot) => cardStyles[slot]()),
    ...switchCandidates,
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
}

describe("design tokens", () => {
  it("compiles the button utilities against the live --ui variables", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain("color: var(--ui-ink);");
    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("outline-color: var(--ui-glass-focus);");
    expect(css).toContain("--tw-shadow: var(--ui-shadow-glass);");
    expect(css).toContain("var(--ui-glass-highlight)");
    expect(css).toContain("var(--ui-glass-glare-stop)");
    expect(css).toContain("filter: var(--ui-drop-shadow-label);");
    expect(css).toContain("filter: var(--ui-drop-shadow-icon);");
    expect(css).toContain("filter: contrast(3);");
    expect(css).toContain("filter: brightness(0.9);");
    expect(css).toContain(
      "transition-property: background-color,translate,scale;",
    );
    expect(css).not.toContain("var(--color-glass-highlight)");
  });

  it("compiles every card layer from the theme recipe", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("--tw-shadow: var(--ui-shadow-glass);");
    expect(css).toContain("--tw-backdrop-blur: blur(2px);");
    expect(css).toContain("border-color: var(--ui-glass-border);");
    expect(css).toContain("border-color: var(--ui-glass-inner-border);");
    expect(css).toContain("border-color: var(--ui-glass-rim);");
    expect(css).toContain("filter: contrast(3);");
    expect(css).toContain("filter: brightness(0.9);");
    expect(css).toContain("filter: var(--ui-drop-shadow-label);");
    expect(css).toContain("font-family: system-ui");
    expect(css).toContain("border-radius: 2rem;");
    expect(css).toContain("padding: calc(var(--spacing) * 4);");
  });

  it("compiles the switch controls from the theme recipe", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain("width: var(--ui-switch-width);");
    expect(css).toContain("height: var(--ui-switch-height);");
    expect(css).toContain("background-color: var(--ui-switch-off);");
    expect(css).toContain("background-color: var(--ui-switch-on);");
    expect(css).toContain("background-color: var(--ui-switch-thumb);");
    expect(css).toContain("box-shadow: var(--ui-switch-track-shadow);");
    expect(css).toContain("box-shadow: var(--ui-switch-thumb-shadow);");
    expect(css).toContain("box-shadow: var(--ui-switch-glass-shadow);");
    expect(css).toContain("filter: var(--ui-switch-filter-goo);");
    expect(css).toContain("filter: var(--ui-switch-filter-remove-black);");
    expect(css).toContain("filter: blur(calc(var(--ui-switch-height) * 0.1));");
    expect(css).toContain("filter: blur(0);");
    expect(css).toContain(
      "translate: calc(100cqi - 100% - 2 * var(--ui-switch-border)) -50%;",
    );
    expect(css).toContain("translate: calc(100cqi - 100%) -50%;");
    expect(css).not.toContain(
      "translate: calc(100cqi - 100% - 6 * var(--ui-switch-border)) -50%;",
    );
    expect(css).toContain("transition: background-color 120ms ease-out 180ms;");
    expect(css).toContain("transition: box-shadow 120ms ease-out 180ms;");
    expect(css).toContain(
      "transition: height 200ms ease-out,translate 120ms ease-out 180ms,background-color 120ms ease-out 180ms;",
    );
    expect(css).toContain("[data-layer=filter]");
    expect(css).toContain("scale: 1.65;");
    expect(css).toContain("--ui-switch-glow-color: var(--ui-switch-off);");
    expect(css).toContain("--ui-switch-glow-color: var(--ui-switch-on);");
    expect(css).toContain("border-top-right-radius: 100px;");
    expect(css).toContain("--ui-switch-hue: 144;");
    expect(css).toContain("--ui-switch-off: hsl(var(--ui-switch-hue) 8% 81%);");
    expect(css).toContain("--ui-switch-on: hsl(var(--ui-switch-hue) 92% 43%);");
    expect(css).toContain("--ui-switch-width: 48px;");
    expect(css).toContain("--ui-switch-width: 80px;");
    expect(css).toContain("--ui-switch-border: 2px;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("ships light and dark runtime values", async () => {
    const css = await buildStyles([]);

    expect(css).toContain("--ui-ink: #3e3e3e;");
    expect(css).toContain("--ui-ink: #f5f5f5;");
    expect(css).toContain("--ui-glass-surface: rgb(255 255 255 / 0.06);");
    expect(css).toContain("--ui-glass-glare-stop: 15%;");
    expect(css).toContain(
      "--ui-drop-shadow-label: drop-shadow(0 25px 3px rgb(102 102 102 / 0.15));",
    );
    expect(css).toContain(
      "--ui-drop-shadow-icon: drop-shadow(0 25px 3px rgb(102 102 102 / 0.2));",
    );
    expect(css).toContain(
      "--ui-drop-shadow-label: drop-shadow(0 25px 3px rgb(0 0 0 / 0.45));",
    );
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
    expect(source).not.toContain('@import "./switch.css"');
    expect(source).not.toContain(".ui-switch-");
    expect(source).not.toContain("--ui-switch");
  });

  it("keeps switch styling and tokens in the tailwind-variants theme", async () => {
    const source = await readFile(
      new URL("../src/theme/switch.ts", import.meta.url),
      "utf8",
    );

    expect(source).toContain('from "tailwind-variants"');
    expect(source).toContain("[--ui-switch-off:");
    expect(source).toContain("[--ui-switch-on:");
    expect(source).toContain("group-data-[checked]");
    expect(source).toContain("group-active");
    expect(source).not.toContain("ui-liquid-switch");
    expect(source).toContain("[&_[data-layer=fill]]");
    expect(source).toContain("[&_[data-layer=filter]]");
    expect(source).toContain("[&_[data-layer=inner-glow]]");
    expect(source).not.toContain("[&>svg]");
    expect(source).not.toContain("switchLayers");
    expect(source).not.toMatch(/\b(liquid|liquids|liquidShadow|liquidTrack):/);
    expect(source).not.toContain(".css");
  });

  it("keeps card styling in the tailwind-variants theme", async () => {
    const [recipe, tokens] = await Promise.all([
      readFile(new URL("../src/theme/card.ts", import.meta.url), "utf8"),
      readFile(new URL("../src/index.css", import.meta.url), "utf8"),
    ]);

    expect(recipe).toContain('from "tailwind-variants"');
    expect(recipe).toContain("bg-glass-surface");
    expect(recipe).toContain("shadow-glass");
    expect(recipe).toContain("[filter:brightness(0.9)]");
    expect(recipe).not.toContain("size:");
    expect(recipe).not.toContain(".css");
    expect(tokens).not.toContain(".ui-card-");
    expect(tokens).not.toContain("backdrop-filter");
  });
});
