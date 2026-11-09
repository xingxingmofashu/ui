// @vitest-environment node

import { beforeAll, describe, expect, it } from "vitest";

import { buildStyles, themeCandidates } from "./helpers";

let css: string;

beforeAll(async () => {
  css = await buildStyles(themeCandidates());
});

describe("compiled CSS", () => {
  it("compiles the button utilities against the live --ui variables", () => {
    expect(css).toContain("color: var(--ui-ink);");
    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("outline-color: var(--ui-glass-focus);");
    expect(css).toContain("box-shadow: var(--ui-shadow-glass);");
    expect(css).toContain("var(--ui-glass-highlight)");
    expect(css).toContain("var(--ui-glass-glare-stop)");
    expect(css).toContain("filter: var(--ui-drop-shadow-label);");
    expect(css).not.toContain("filter: var(--ui-drop-shadow-icon);");
    expect(css).toContain("--ui-glass-tone: brightness(0.98);");
    expect(css).toContain("--ui-glass-tone: brightness(0.95);");
    expect(css).toContain("--ui-glass-contrast: 1.05;");
    expect(css).toContain("--ui-glass-contrast: 1;");
    expect(css).toContain(
      "filter: var(--ui-glass-tone, brightness(0.98)) contrast(var(--ui-glass-contrast, 1.05));",
    );
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 4px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain(
      "top: calc(var(--ui-glass-inner-inset, 8px) + var(--ui-glass-inner-offset, 1px));",
    );
    expect(css).toContain(
      "transition-property: background-color,translate,scale;",
    );
    expect(css).not.toContain("var(--color-glass-highlight)");
    expect(css).not.toContain("--color-ink");
  });

  it("compiles the overlay glass layer", () => {
    expect(css).toContain(".ui-glass-overlay");
    expect(css).toContain(".bg-ui-glass-overlay-surface");
    expect(css).toContain("background-color: var(--ui-glass-overlay-surface);");
  });

  it("compiles every card layer from the theme recipe", () => {
    expect(css).toContain("background-color: var(--ui-glass-surface);");
    expect(css).toContain("box-shadow: var(--ui-shadow-glass);");
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 4px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain("border: 1px double var(--ui-glass-border);");
    expect(css).toContain("border: 1px solid var(--ui-glass-inner-border);");
    expect(css).toContain("border: 1px solid var(--ui-glass-rim);");
    expect(css).toContain(
      "filter: var(--ui-glass-tone, brightness(0.98)) contrast(var(--ui-glass-contrast, 1.05));",
    );
    expect(css).toContain("filter: var(--ui-drop-shadow-label);");
    expect(css).not.toContain("font-family: system-ui");
    expect(css).toContain("border-radius: 2rem;");
    expect(css).toContain("padding: calc(var(--spacing) * 4);");
  });

  it("compiles the switch controls from the theme recipe", () => {
    expect(css).toContain("width: var(--ui-switch-width);");
    expect(css).toContain("height: var(--ui-switch-height);");
    expect(css).toContain("height: var(--ui-switch-thumb-size);");
    expect(css).toContain("width: var(--ui-switch-thumb-size);");
    expect(css).toContain("left: var(--ui-switch-inset);");
    expect(css).toContain("line-height: var(--ui-switch-height);");
    expect(css).toContain("background-color: var(--ui-switch-off);");
    expect(css).toContain("background-color: var(--ui-switch-on);");
    expect(css).toContain(
      "background-image: linear-gradient(180deg,rgb(255 255 255/0.14),transparent 55%);",
    );
    expect(css).toContain(
      "box-shadow: inset 0 1px 1px rgb(255 255 255/0.3),inset 0 -1px 2px rgb(0 0 0/0.14);",
    );
    expect(css).toContain(
      "box-shadow: 0 1px 3px rgb(0 0 0/0.22),inset 0 0 0 1px rgb(255 255 255/0.5),inset 0 1px 1px rgb(255 255 255/0.65),inset 0 -1px 2px rgb(0 0 0/0.08);",
    );
    expect(css).toContain("translate: var(--ui-switch-travel) -50%;");
    expect(css).toContain("transition-property: translate,scale;");
    expect(css).toContain("--ui-switch-off: var(--ui-ink);");
    expect(css).toContain(
      "--ui-switch-off: color-mix(in srgb,var(--ui-ink) 20%,transparent);",
    );
    expect(css).toContain("--ui-switch-on: var(--ui-ink);");
    expect(css).toContain("--ui-switch-width: 48px;");
    expect(css).toContain("--ui-switch-width: 80px;");
    expect(css).toContain("--ui-switch-inset: 2px;");
    expect(css).toContain(
      "--ui-switch-thumb-size: calc(var(--ui-switch-height) - 2 * var(--ui-switch-inset));",
    );
    expect(css).toContain(
      "--ui-switch-travel: calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - 2 * var(--ui-switch-inset));",
    );
    expect(css).not.toContain("--ui-switch-goo-filter");
    expect(css).not.toContain("--ui-switch-remove-black-filter");
    expect(css).not.toContain("--ui-switch-border");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("compiles the accordion glass controls from the theme recipe", () => {
    expect(css).toContain(
      "--ui-accordion-divider: color-mix(in srgb,var(--ui-ink) 14%,transparent);",
    );
    expect(css).toContain(
      "--ui-accordion-hover: color-mix(in srgb,var(--ui-ink) 5%,transparent);",
    );
    expect(css).toContain("min-height: var(--ui-accordion-trigger-height);");
    expect(css).toContain("height: var(--accordion-panel-height);");
    expect(css).toContain("transition-property: height;");
    expect(css).toContain(
      "transition-timing-function: cubic-bezier(0.4,0,0.2,1);",
    );
    expect(css).toContain("transition-duration: 300ms;");
    expect(css).toContain("[data-starting-style]");
    expect(css).toContain("[data-ending-style]");
    expect(css).toContain("rotate: 45deg;");
    expect(css).toContain("border-color: var(--ui-accordion-divider);");
    expect(css).toContain("background-color: var(--ui-accordion-hover);");
    expect(css).toContain("width: var(--ui-accordion-indicator-size);");
    expect(css).toContain("color: var(--ui-ink-active);");
    expect(css).toContain("outline-color: var(--ui-glass-focus);");
    expect(css).toContain("--ui-accordion-trigger-height: 36px;");
    expect(css).toContain("--ui-accordion-trigger-height: 64px;");
    expect(css).toContain("--ui-accordion-panel-font-size: 0.875rem;");
  });

  it("compiles the alert dialog overlay and glass popup", () => {
    expect(css).toContain("position: fixed;");
    expect(css).toContain("z-index: 40;");
    expect(css).toContain("z-index: 50;");
    expect(css).toContain("backdrop-filter: blur(2px);");
    expect(css).toContain("transition-property: opacity;");
    expect(css).toContain("border-radius: 1.75rem;");
    expect(css).toContain("max-width: var(--container-md);");
    expect(css).toContain("transition-property: opacity,scale,translate;");
    expect(css).toContain("--tw-translate-y: calc(var(--spacing) * 2);");
    expect(css).toContain("--tw-scale-x: 95%;");
    expect(css).toContain("[data-starting-style]");
    expect(css).toContain("[data-ending-style]");
    expect(css).toContain("border: 1px solid var(--ui-glass-inner-border);");
    expect(css).toContain("border: 1px solid var(--ui-glass-rim);");
    expect(css).toContain("--tw-font-weight: var(--font-weight-semibold);");
    expect(css).toContain("opacity: 60%;");
    expect(css).toContain("opacity: 75%;");
    expect(css).toContain("justify-content: flex-end;");
  });

  it("compiles the drawer edges and glass popup", () => {
    expect(css).toContain("z-index: 40;");
    expect(css).toContain("z-index: 50;");
    expect(css).toContain("opacity: calc(1 - var(--drawer-swipe-progress));");
    expect(css).toContain("cubic-bezier(0.32,0.72,0,1)");
    expect(css).toContain("max-height: 85dvh;");
    expect(css).toContain("border-top-left-radius: 1.75rem;");
    expect(css).toContain("border-top-right-radius: 1.75rem;");
    expect(css).toContain("border-bottom-right-radius: 1.75rem;");
    expect(css).toContain("border-bottom-left-radius: 1.75rem;");
    expect(css).toContain("width: min(20rem, 100vw);");
    expect(css).toContain("padding-bottom: env(safe-area-inset-bottom);");
    expect(css).toContain("padding-top: env(safe-area-inset-top);");
    expect(css).toContain(
      "transform: translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y)));",
    );
    expect(css).toContain("transform: translateX(var(--drawer-swipe-movement-x));");
    expect(css).toContain("transform: translateY(calc(100% + 2px));");
    expect(css).toContain("transform: translateY(calc(-100% - 2px));");
    expect(css).toContain("transform: translateX(calc(100% + 2px));");
    expect(css).toContain("transform: translateX(calc(-100% - 2px));");
    expect(css).toContain("overflow-y: auto;");
    expect(css).toContain("overscroll-behavior: contain;");
    expect(css).toContain("border: 1px solid var(--ui-glass-rim);");
  });

  it("compiles the toggle group glass controls from the theme recipe", () => {
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 4px)) saturate(var(--ui-glass-saturate, 150%));",
    );
    expect(css).toContain("background-color: var(--ui-toggle-group-thumb);");
    expect(css).toContain(
      "--tw-shadow: var(--ui-toggle-group-thumb-shadow);",
    );
    expect(css).toContain("animation: ui-toggle-group-select 240ms ease-out;");
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

  it("compiles the toggle controls from the theme recipe", () => {
    expect(css).toContain(
      "--ui-toggle-thumb: color-mix(in srgb,var(--ui-ink) 12%,transparent);",
    );
    expect(css).toContain("--ui-toggle-height: 24px;");
    expect(css).toContain("--ui-toggle-height: 32px;");
    expect(css).toContain("--ui-toggle-height: 40px;");
    expect(css).toContain("aspect-ratio: 1 / 1;");
    expect(css).toContain("data-pressed");
  });

  it("compiles the slider glass controls from the theme recipe", () => {
    expect(css).toContain(
      "--ui-slider-track: color-mix(in srgb,var(--ui-ink) 14%,transparent);",
    );
    expect(css).toContain("--ui-slider-fill-from: var(--ui-ink);");
    expect(css).toContain("--ui-slider-fill-to: var(--ui-ink-active);");
    expect(css).toContain(
      "--ui-slider-fill-glow: color-mix(in srgb,var(--ui-ink) 30%,transparent);",
    );
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

  it("compiles the progress glass controls from the theme recipe", () => {
    expect(css).toContain(
      "--ui-progress-track: color-mix(in srgb,var(--ui-ink) 12%,transparent);",
    );
    expect(css).toContain("--ui-progress-fill-from: var(--ui-ink);");
    expect(css).toContain("--ui-progress-fill-to: var(--ui-ink-active);");
    expect(css).toContain(
      "--ui-progress-glow: color-mix(in srgb,var(--ui-ink) 28%,transparent);",
    );
    expect(css).toContain("--ui-progress-height: 6px;");
    expect(css).toContain("--ui-progress-height: 10px;");
    expect(css).toContain("--ui-progress-gap: 8px;");
    expect(css).toContain("--ui-progress-font-size: 0.875rem;");
    expect(css).toContain("height: var(--ui-progress-height);");
    expect(css).toContain("background-color: var(--ui-progress-track);");
    expect(css).toContain(
      "background-image: linear-gradient(117deg,var(--ui-progress-fill-from) 0%,var(--ui-progress-fill-to) 100%);",
    );
    expect(css).toContain("transition-property: width;");
    expect(css).toContain(
      "animation: ui-progress-indeterminate 1.4s ease-in-out infinite;",
    );
    expect(css).toContain("@keyframes ui-progress-indeterminate");
    expect(css).toContain("translate: -120% 0;");
    expect(css).toContain("translate: 320% 0;");
    expect(css).toContain("width: 38%;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("compiles the radio group glass controls from the theme recipe", () => {
    expect(css).toContain(
      "--ui-glass-surface: color-mix(in srgb,var(--ui-ink) 5%,transparent);",
    );
    expect(css).toContain("--ui-radio-size: 16px;");
    expect(css).toContain("--ui-radio-size: 20px;");
    expect(css).toContain("--ui-radio-size: 28px;");
    expect(css).toContain("--ui-radio-dot-size: 10px;");
    expect(css).toContain("--ui-radio-gap: 8px;");
    expect(css).toContain("--ui-radio-group-gap: 12px;");
    expect(css).toContain("--ui-radio-group-item-gap: 12px;");
    expect(css).toContain("--ui-radio-group-label-size: 0.875rem;");
    expect(css).toContain("height: var(--ui-radio-size);");
    expect(css).toContain("width: var(--ui-radio-size);");
    expect(css).toContain("width: var(--ui-radio-dot-size);");
    expect(css).toContain("height: var(--ui-radio-dot-size);");
    expect(css).toContain("background-color: var(--ui-ink);");
    expect(css).toContain("[data-checked]");
    expect(css).toContain("opacity: 100%;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
