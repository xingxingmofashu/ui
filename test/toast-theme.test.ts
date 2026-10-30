// @vitest-environment node

import { compile } from "@tailwindcss/node";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import toastTheme from "../src/theme/toast";

const packageRoot = fileURLToPath(new URL("../", import.meta.url)).replaceAll(
  "\\",
  "/",
);

const input = `@import "tailwindcss";
@import "./src/index.css";
`;

const positions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

const slots = [
  "viewport",
  "root",
  "glass",
  "overlay",
  "content",
  "icon",
  "text",
  "title",
  "description",
  "actions",
  "action",
  "close",
] as const;

function themeCandidates() {
  return positions
    .flatMap((position) => {
      const styles = toastTheme({ position });

      return slots.map((slot) => styles[slot]());
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
}

async function buildStyles() {
  const compiler = await compile(input, {
    base: packageRoot,
    onDependency() {},
  });

  return compiler.build(themeCandidates());
}

describe("Toast theme compilation", () => {
  it("compiles the glass surface and stack geometry", async () => {
    const css = await buildStyles();

    expect(css).toContain("background-color: var(--ui-dialog-surface);");
    expect(css).toContain("height: var(--height);");
    expect(css).toContain("height: var(--toast-height);");
    expect(css).toContain("var(--toast-frontmost-height,var(--toast-height))");
    expect(css).toContain("var(--toast-swipe-movement-x)");
    expect(css).toContain("--toast-offset-y");
    expect(css).toContain("translateY(calc(");
    expect(css).toContain(
      "transition: transform 500ms cubic-bezier(0.22,1,0.36,1),opacity 500ms,height 150ms;",
    );
  });

  it("compiles every swipe exit direction", async () => {
    const css = await buildStyles();

    expect(css).toContain('[data-swipe-direction="up"]');
    expect(css).toContain('[data-swipe-direction="down"]');
    expect(css).toContain('[data-swipe-direction="left"]');
    expect(css).toContain('[data-swipe-direction="right"]');
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("compiles the shared glass layers", async () => {
    const css = await buildStyles();

    expect(css).toContain("border: 1px double var(--ui-glass-border);");
    expect(css).toContain("box-shadow: var(--ui-shadow-glass);");
    expect(css).toContain(
      "backdrop-filter: blur(var(--ui-glass-blur, 2px)) saturate(var(--ui-glass-saturate, 150%));",
    );
  });
});
