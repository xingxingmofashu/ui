import { compile } from "@tailwindcss/node";
import { fileURLToPath } from "node:url";

import accordionTheme from "../../src/theme/accordion";
import alertDialogTheme from "../../src/theme/alert-dialog";
import buttonTheme from "../../src/theme/button";
import cardTheme from "../../src/theme/card";
import checkboxGroupTheme from "../../src/theme/checkbox-group";
import checkboxTheme from "../../src/theme/checkbox";
import dialogTheme from "../../src/theme/dialog";
import drawerTheme from "../../src/theme/drawer";
import fieldTheme from "../../src/theme/field";
import fieldsetTheme from "../../src/theme/fieldset";
import formTheme from "../../src/theme/form";
import inputTheme from "../../src/theme/input";
import menuTheme from "../../src/theme/menu";
import popoverTheme from "../../src/theme/popover";
import progressTheme from "../../src/theme/progress";
import radioGroupTheme from "../../src/theme/radio-group";
import scrollAreaTheme from "../../src/theme/scroll-area";
import selectTheme from "../../src/theme/select";
import sliderTheme from "../../src/theme/slider";
import switchTheme from "../../src/theme/switch";
import tabsTheme from "../../src/theme/tabs";
import toastTheme from "../../src/theme/toast";
import toggleGroupTheme from "../../src/theme/toggle-group";
import toggleTheme from "../../src/theme/toggle";
import tooltipTheme from "../../src/theme/tooltip";

const packageRoot = fileURLToPath(new URL("../../", import.meta.url)).replaceAll(
  "\\",
  "/",
);

const input = `@import "tailwindcss";
@import "./src/index.css";
`;

export type ThemeProps = Record<string, unknown>;
export type ThemeSlotStyles = Record<string, () => string>;
export type ThemeRecipe = (props?: ThemeProps) => ThemeSlotStyles;

export type ThemeEntry = {
  name: string;
  recipe: ThemeRecipe;
  samples: readonly ThemeProps[];
};

const sizes = ["md", "xs", "sm", "lg", "xl"] as const;
const directions = ["down", "up", "left", "right"] as const;
const positions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

const sizeSamples = sizes.map((size) => ({ size }));

function entry(
  name: string,
  recipe: unknown,
  samples: readonly ThemeProps[],
): ThemeEntry {
  return { name, recipe: recipe as ThemeRecipe, samples };
}

export const themeEntries: readonly ThemeEntry[] = [
  entry("accordion", accordionTheme, sizeSamples),
  entry("alert-dialog", alertDialogTheme, [{}]),
  entry("button", buttonTheme, sizeSamples),
  entry("card", cardTheme, [{}]),
  entry("checkbox-group", checkboxGroupTheme, sizeSamples),
  entry("checkbox", checkboxTheme, sizeSamples),
  entry("dialog", dialogTheme, [{}]),
  entry("drawer", drawerTheme, directions.map((direction) => ({ direction }))),
  entry("field", fieldTheme, sizeSamples),
  entry("fieldset", fieldsetTheme, [{}]),
  entry("form", formTheme, [{}]),
  entry("input", inputTheme, sizeSamples),
  entry("menu", menuTheme, [{}]),
  entry("popover", popoverTheme, [{}]),
  entry("progress", progressTheme, sizeSamples),
  entry("radio-group", radioGroupTheme, sizeSamples),
  entry("scroll-area", scrollAreaTheme, [{}]),
  entry("select", selectTheme, sizeSamples),
  entry("slider", sliderTheme, [{}]),
  entry("switch", switchTheme, sizeSamples),
  entry("tabs", tabsTheme, sizeSamples),
  entry("toast", toastTheme, positions.map((position) => ({ position }))),
  entry("toggle-group", toggleGroupTheme, sizeSamples),
  entry(
    "toggle",
    toggleTheme,
    [...sizeSamples, { iconOnly: true, size: "md" }],
  ),
  entry("tooltip", tooltipTheme, [{}]),
];

export function getThemeEntry(name: string) {
  const theme = themeEntries.find((candidate) => candidate.name === name);

  if (!theme) {
    throw new Error(`Unknown theme entry "${name}".`);
  }

  return theme;
}

export function themeClassNames(
  recipe: ThemeRecipe,
  props: ThemeProps = {},
): string[] {
  return Object.values(recipe(props))
    .map((slot) => slot())
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
}

export function themeCandidates() {
  return [
    ...new Set(
      themeEntries.flatMap(({ recipe, samples }) =>
        samples.flatMap((props) => themeClassNames(recipe, props)),
      ),
    ),
  ];
}

export async function buildStyles(candidates: string[]) {
  const compiler = await compile(input, {
    base: packageRoot,
    onDependency() {},
  });

  return compiler.build(candidates);
}
