// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  getThemeEntry,
  themeClassNames,
  themeEntries,
} from "./helpers";

const fullGlass = [
  "ui-glass",
  "ui-glass-inner",
  "ui-glass-highlight",
  "ui-glass-rim",
];

const overlayGlass = [...fullGlass, "ui-glass-overlay"];
const inputGlass = ["ui-glass", "ui-glass-highlight", "ui-glass-rim"];
const controlGlass = ["ui-glass", "ui-glass-rim"];

const glassContracts: Array<[string, string[]]> = [
  ["accordion", fullGlass],
  ["alert-dialog", overlayGlass],
  ["button", fullGlass],
  ["card", fullGlass],
  ["dialog", overlayGlass],
  ["drawer", overlayGlass],
  ["menu", overlayGlass],
  ["popover", overlayGlass],
  ["scroll-area", fullGlass],
  ["select", overlayGlass],
  ["tabs", fullGlass],
  ["toast", overlayGlass],
  ["toggle", fullGlass],
  ["toggle-group", fullGlass],
  ["tooltip", overlayGlass],
  ["input", inputGlass],
  ["checkbox", controlGlass],
  ["checkbox-group", controlGlass],
  ["radio-group", controlGlass],
];

type TokenContract = {
  name: string;
  includes: string[];
  excludes?: string[];
};

const tokenContracts: TokenContract[] = [
  {
    name: "switch",
    includes: [
      "--ui-switch-off",
      "--ui-switch-on",
      "--ui-switch-thumb-size",
      "--ui-switch-travel",
      "group-data-[checked]",
      "group-active",
      "bg-ui-surface",
      "motion-reduce",
    ],
    excludes: [
      "ui-liquid-switch",
      "switchLayers",
      "[&>svg]",
      "data-layer",
      "filter:",
      "mask",
      "goo",
      "--ui-switch-border",
      "--ui-switch-hue",
      "--ui-switch-thumb:",
      "--ui-switch-thumb-shadow",
      "--ui-switch-track-shadow",
      "--ui-switch-glass-shadow",
    ],
  },
  {
    name: "accordion",
    includes: ["--ui-accordion-divider", "--accordion-panel-height"],
  },
  {
    name: "alert-dialog",
    includes: [
      "data-[starting-style]:opacity-0",
      "data-[ending-style]:opacity-0",
    ],
  },
  {
    name: "dialog",
    includes: [
      "ui-glass-overlay",
      "data-[starting-style]:opacity-0",
      "data-[ending-style]:opacity-0",
    ],
  },
  {
    name: "drawer",
    includes: [
      "ui-glass-overlay",
      "--drawer-swipe-progress",
      "--drawer-swipe-movement-y",
      "--drawer-swipe-movement-x",
      "data-[starting-style]",
    ],
  },
  {
    name: "checkbox",
    includes: ["--ui-checkbox-size", "--ui-shadow-glass"],
  },
  {
    name: "toggle-group",
    includes: [
      "--ui-toggle-group-thumb",
      "--ui-toggle-group-thumb-shadow",
      "data-[orientation=vertical]",
      "ui-toggle-group-select",
      "overflow-hidden",
    ],
  },
  {
    name: "popover",
    includes: ["bg-ui-glass-overlay-surface"],
  },
  {
    name: "tooltip",
    includes: ["bg-ui-glass-overlay-surface"],
  },
  {
    name: "slider",
    includes: [
      "--ui-glass-lens-blur",
      "--ui-glass-lens-surface",
      "--ui-slider-control-height",
    ],
    excludes: ["--ui-slider-filter"],
  },
  {
    name: "progress",
    includes: [
      "--ui-progress-track",
      "ui-progress-indeterminate",
      "motion-reduce",
    ],
  },
];

function classesFor(name: string) {
  const theme = getThemeEntry(name);

  return theme.samples.flatMap((sample) =>
    themeClassNames(theme.recipe, sample),
  );
}

function hasFragment(classes: string[], fragment: string) {
  return classes.some((className) => className.includes(fragment));
}

function isLegacyUtility(className: string) {
  return /(^|:)(bg-glass-surface|shadow-glass)(\/|$)/.test(className);
}

describe("theme recipes", () => {
  it("renders every slot with classes", () => {
    for (const theme of themeEntries) {
      expect(theme.samples.length).toBeGreaterThan(0);

      const styles = theme.recipe(theme.samples[0]);

      for (const [slot, getClasses] of Object.entries(styles)) {
        if (slot === "base") {
          continue;
        }

        expect(getClasses().trim(), `${theme.name}.${slot}`).not.toBe("");
      }
    }
  });

  describe("shared glass material", () => {
    for (const [name, utilities] of glassContracts) {
      it(`${name} uses the shared glass utilities`, () => {
        expect(classesFor(name)).toEqual(expect.arrayContaining(utilities));
      });
    }
  });

  describe("component tokens", () => {
    for (const { name, includes, excludes = [] } of tokenContracts) {
      it(`${name} exposes its tokens and state selectors`, () => {
        const classes = classesFor(name);

        for (const token of includes) {
          expect(hasFragment(classes, token), token).toBe(true);
        }

        for (const token of excludes) {
          expect(hasFragment(classes, token), token).toBe(false);
        }
      });
    }
  });

  it("does not use legacy glass utility aliases", () => {
    for (const theme of themeEntries) {
      const classes = classesFor(theme.name);

      for (const className of classes) {
        expect(isLegacyUtility(className), `${theme.name}: ${className}`).toBe(
          false,
        );
      }
    }
  });
});
