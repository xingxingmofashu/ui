// @vitest-environment node

import { compile } from "@tailwindcss/node";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import buttonTheme from "../src/theme/button";
import cardTheme from "../src/theme/card";
import sliderTheme from "../src/theme/slider";
import theme from "../src/theme/switch";
import toggleGroupTheme from "../src/theme/toggle-group";

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
  const toggleGroupSlots = [
    "root",
    "glass",
    "indicator",
    "item",
    "content",
    "icon",
    "label",
  ] as const;
  const toggleGroupSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const toggleGroupCandidates = toggleGroupSizes.flatMap((size) => {
    const toggleGroupStyles = toggleGroupTheme({ size });

    return toggleGroupSlots.map((slot) => toggleGroupStyles[slot]());
  });
  const sliderSlots = [
    "root",
    "header",
    "label",
    "value",
    "description",
    "control",
    "track",
    "indicator",
    "thumb",
  ] as const;
  const sliderStyles = sliderTheme();
  const sliderCandidates = sliderSlots.map((slot) => sliderStyles[slot]());

  return [
    buttonStyles.root(),
    buttonStyles.base(),
    buttonStyles.label(),
    buttonStyles.leadingIcon(),
    buttonStyles.trailingIcon(),
    buttonStyles.overlay(),
    ...cardSlots.map((slot) => cardStyles[slot]()),
    ...switchCandidates,
    ...toggleGroupCandidates,
    ...sliderCandidates,
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
    expect(css).toContain("box-shadow: var(--ui-shadow-glass);");
    expect(css).toContain("var(--ui-glass-highlight)");
    expect(css).toContain("var(--ui-glass-glare-stop)");
    expect(css).toContain("filter: var(--ui-drop-shadow-label);");
    expect(css).not.toContain("filter: var(--ui-drop-shadow-icon);");
    expect(css).toContain("--ui-glass-tone: brightness(1);");
    expect(css).toContain("--ui-glass-tone: brightness(0.9);");
    expect(css).toContain(
      "filter: var(--ui-glass-tone, brightness(1));",
    );
    expect(css).not.toContain("filter: contrast(3);");
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 8px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain(
      "transition-property: background-color,translate,scale;",
    );
    expect(css).not.toContain("var(--color-glass-highlight)");
  });

  it("compiles every card layer from the theme recipe", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("box-shadow: var(--ui-shadow-glass);");
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 8px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain("border: 1px double var(--ui-glass-border);");
    expect(css).toContain("border: 1px solid var(--ui-glass-inner-border);");
    expect(css).toContain("border: 1px solid var(--ui-glass-rim);");
    expect(css).toContain("filter: var(--ui-glass-tone, brightness(1));");
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
    expect(css).toContain("background-color: var(--color-white);");
    expect(css).toContain(
      "box-shadow: inset 0 1px 1px rgb(255 255 255/0.35),inset 0 -1px 2px rgb(0 0 0/0.12);",
    );
    expect(css).toContain("box-shadow: var(--ui-glass-thumb-shadow);");
    expect(css).toContain("box-shadow: var(--ui-glass-edge-shadow);");
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
    expect(css).toContain("--ui-switch-off: hsl(144 8% 81%);");
    expect(css).toContain("--ui-switch-on: hsl(144 92% 43%);");
    expect(css).not.toContain("--ui-switch-hue");
    expect(css).not.toContain("--ui-switch-thumb:");
    expect(css).not.toContain("--ui-switch-thumb-shadow");
    expect(css).not.toContain("--ui-switch-track-shadow");
    expect(css).not.toContain("--ui-switch-glass-shadow");
    expect(css).toContain("--ui-switch-width: 48px;");
    expect(css).toContain("--ui-switch-width: 80px;");
    expect(css).toContain("--ui-switch-border: 2px;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("compiles the toggle group glass controls from the theme recipe", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 8px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain("background-color: var(--ui-toggle-group-thumb);");
    expect(css).toContain(
      "border-color: var(--ui-toggle-group-thumb-rim);",
    );
    expect(css).toContain(
      "--tw-shadow: var(--ui-toggle-group-thumb-shadow);",
    );
    expect(css).toContain(
      "width: var(--ui-toggle-group-indicator-width);",
    );
    expect(css).toContain(
      "height: var(--ui-toggle-group-indicator-height);",
    );
    expect(css).toContain(
      "translate: var(--ui-toggle-group-indicator-x) var(--ui-toggle-group-indicator-y);",
    );
    expect(css).toContain("transform-origin: var(--ui-toggle-group-origin);");
    expect(css).toContain("color: var(--ui-ink-active);");
    expect(css).toContain("--ui-toggle-group-item-height: 24px;");
    expect(css).toContain("--ui-toggle-group-item-height: 32px;");
    expect(css).toContain("--ui-toggle-group-item-height: 40px;");
    expect(css).toContain("--ui-toggle-group-item-px: 12px;");
    expect(css).toContain("--ui-toggle-group-icon-size: 20px;");
    expect(css).toContain("--ui-toggle-group-padding: 4px;");
    expect(css).toContain("--ui-toggle-group-gap: 3px;");
    expect(css).toContain("--ui-toggle-group-vertical-radius: 20px;");
    expect(css).toContain(
      "border-radius: var(--ui-toggle-group-vertical-radius);",
    );
    expect(css).toContain("overflow: hidden;");
    expect(css).toContain("border: 1px solid var(--ui-glass-inner-border);");
  });

  it("compiles the slider glass controls from the theme recipe", async () => {
    const css = await buildStyles(themeCandidates());

    expect(css).toContain(
      "--ui-slider-track: color-mix(in srgb,var(--ui-ink) 14%,transparent);",
    );
    expect(css).toContain("--ui-slider-fill-from: #49a3fc;");
    expect(css).toContain("--ui-slider-fill-to: #3681ee;");
    expect(css).toContain("--ui-slider-thumb-width: 40px;");
    expect(css).toContain("--ui-slider-track-height: 6px;");
    expect(css).toContain("--ui-slider-thumb-height: 24px;");
    expect(css).toContain(
      "background-image: linear-gradient(117deg,var(--ui-slider-fill-from) 0%,var(--ui-slider-fill-to) 100%);",
    );
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-lens-blur)) saturate(var(--ui-glass-lens-saturate));",
    );
    expect(css).not.toContain("--ui-slider-filter");
    expect(css).toContain(
      "inset 0 1px 2px var(--tw-shadow-color, rgb(0 0 0/0.14))",
    );
    expect(css).toContain("scale: 1.08 0.96;");
    expect(css).toContain("[data-layer=thumb-glass]");
    expect(css).toContain("--ui-slider-control-height: calc(");
    expect(css).toContain("background-image: radial-gradient(");
  });

  it("ships light and dark runtime values", async () => {
    const css = await buildStyles([]);

    expect(css).toContain("--ui-ink: #3e3e3e;");
    expect(css).toContain("--ui-ink: #f5f5f5;");
    expect(css).toContain("--ui-glass-surface: rgb(0 0 0 / 0.01);");
    expect(css).toContain("--ui-glass-surface: rgb(255 255 255 / 0.06);");
    expect(css).toContain("--ui-glass-inner-border: rgb(0 0 0 / 0.7);");
    expect(css).toContain("--ui-glass-tone: brightness(1);");
    expect(css).toContain("--ui-glass-tone: brightness(0.9);");
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
    expect(source).not.toContain("--ui-toggle-group");
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
    expect(recipe).toContain("ui-glass");
    expect(recipe).toContain("ui-glass-inner");
    expect(recipe).toContain("ui-glass-highlight");
    expect(recipe).toContain("ui-glass-rim");
    expect(recipe).not.toContain("bg-glass-surface");
    expect(recipe).not.toContain("shadow-glass");
    expect(recipe).not.toContain("[filter:brightness(0.9)_contrast(3)]");
    expect(recipe).not.toContain("size:");
    expect(recipe).not.toContain(".css");
    expect(tokens).not.toContain(".ui-card-");
    expect(tokens).toContain("backdrop-filter");
    expect(tokens).toContain(".ui-glass");
  });

  it("keeps toggle group styling in the tailwind-variants theme", async () => {
    const recipe = await readFile(
      new URL("../src/theme/toggle-group.ts", import.meta.url),
      "utf8",
    );

    expect(recipe).toContain('from "tailwind-variants"');
    expect(recipe).toContain("ui-glass");
    expect(recipe).toContain("ui-glass-inner");
    expect(recipe).toContain("ui-glass-highlight");
    expect(recipe).not.toContain("bg-glass-surface");
    expect(recipe).not.toContain("shadow-glass");
    expect(recipe).toContain("--ui-toggle-group-thumb:");
    expect(recipe).toContain("--ui-toggle-group-thumb-shadow:");
    expect(recipe).toContain("data-[orientation=vertical]:items-stretch");
    expect(recipe).toContain("group-data-[multiple]/toggle-group");
    expect(recipe).toContain(
      "[translate:var(--ui-toggle-group-indicator-x)",
    );
    expect(recipe).toContain("overflow-hidden");
    expect(recipe).not.toContain("LIQUID_GLASS_MAP");
    expect(recipe).not.toContain(".css");
  });

  it("keeps slider styling in the tailwind-variants theme", async () => {
    const [recipe, component] = await Promise.all([
      readFile(new URL("../src/theme/slider.ts", import.meta.url), "utf8"),
      readFile(
        new URL("../src/components/slider.tsx", import.meta.url),
        "utf8",
      ),
    ]);

    expect(recipe).toContain('from "tailwind-variants"');
    expect(recipe).toContain("ui-glass-chip");
    expect(recipe).toContain("--ui-glass-lens-blur");
    expect(recipe).not.toContain("--ui-slider-filter");
    expect(recipe).not.toContain("LIQUID_GLASS_MAP");
    expect(component).not.toContain("--ui-slider-filter");
    expect(component).not.toContain("LIQUID_GLASS_MAP");
    expect(component).not.toContain(".css");
  });
});
