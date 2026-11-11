import fs from "node:fs";
import { pathToFileURL } from "node:url";

import packageJson from "../../package.json" with { type: "json" };
import {
  registrySchema,
  type RegistryItemFile,
} from "shadcn/schema";

import { bundleItemSource } from "./bundle.ts";
import { REGISTRY } from "./config.ts";
import { readComponents, type ComponentMetadata } from "./meta.ts";
import {
  mergeCss,
  readCssFile,
  readRegistryStyles,
  type CssObject,
} from "./stylesheet.ts";

const REGISTRY_FILE = "registry.json";
const OUTPUT_DIR = "docs/public/r";
const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

type RegistryItemType = "registry:ui" | "registry:style" | "registry:block";

interface RegistryFile {
  path: string;
  type: RegistryItemFile["type"];
  target: string;
  content?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  categories: string[];
  dependencies: string[];
  files: RegistryFile[];
  cssVars: { theme: Record<string, string> };
  css: CssObject;
  meta: { version: string };
}

export interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

type SharedItemFields = Pick<RegistryItem, "cssVars" | "css" | "meta">;

function getTargetPath(name: string): string {
  return `@ui/${REGISTRY.installFolder}/${name}.tsx`;
}

function createComponentItem(
  component: ComponentMetadata,
  sharedFields: SharedItemFields,
): RegistryItem {
  const entryFile = `src/components/${component.name}.tsx`;
  const source = bundleItemSource(entryFile);

  return {
    ...sharedFields,
    name: component.name,
    type: "registry:ui",
    title: component.title,
    description: component.description,
    categories: component.category
      ? [component.category.toLowerCase()]
      : [],
    dependencies: source.dependencies,
    files: [
      {
        path: entryFile,
        type: "registry:ui",
        target: getTargetPath(component.name),
        content: source.content,
      },
    ],
  };
}

function createGlassItem(sharedFields: SharedItemFields): RegistryItem {
  return {
    ...sharedFields,
    name: "glass",
    type: "registry:style",
    title: "Liquid Glass Styles",
    description:
      "Global Liquid Glass tokens, Tailwind aliases, and material classes used by every component.",
    categories: ["style"],
    dependencies: [],
    files: [],
  };
}

function createGlassPresetItem(
  sharedFields: SharedItemFields,
): RegistryItem {
  const entryFile = "src/plugins/glass-preset/index.tsx";
  const source = bundleItemSource(entryFile);

  return {
    ...sharedFields,
    name: "glass-preset",
    type: "registry:block",
    title: "Glass Preset",
    description:
      "Optional Liquid Glass material presets with a React provider, scope, and pre-hydration script.",
    categories: ["plugin"],
    dependencies: source.dependencies,
    files: [
      {
        path: entryFile,
        type: "registry:component",
        target: getTargetPath("glass-preset"),
        content: source.content,
      },
    ],
    css: mergeCss(
      sharedFields.css,
      readCssFile("src/plugins/glass-preset/index.css"),
    ),
  };
}

export function buildRegistry(): Registry {
  const { theme, css } = readRegistryStyles();
  const sharedFields: SharedItemFields = {
    cssVars: { theme },
    css,
    meta: { version: packageJson.version },
  };

  const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY.name,
    homepage: REGISTRY.homepage,
    items: [
      ...readComponents().map((component) =>
        createComponentItem(component, sharedFields),
      ),
      createGlassItem(sharedFields),
      createGlassPresetItem(sharedFields),
    ],
  };

  registrySchema.parse(registry);

  return registry;
}

/**
 * The committed catalog stays small. Item JSON carries the generated source in
 * `files[].content`, which is what the CLI installs.
 */
export function serializeRegistry(registry: Registry): Registry {
  return {
    ...registry,
    items: registry.items.map((item) => ({
      ...item,
      files: item.files.map(({ path, type, target }) => ({
        path,
        type,
        target,
      })),
    })),
  };
}

function writeIfChanged(filePath: string, contents: string): void {
  if (
    fs.existsSync(filePath) &&
    fs.readFileSync(filePath, "utf8") === contents
  ) {
    return;
  }

  fs.writeFileSync(filePath, contents);
}

function writeRegistry(registry: Registry): void {
  const catalog = serializeRegistry(registry);

  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  writeIfChanged(REGISTRY_FILE, `${JSON.stringify(catalog, null, 2)}\n`);
  writeIfChanged(
    `${OUTPUT_DIR}/registry.json`,
    `${JSON.stringify(catalog, null, 2)}\n`,
  );

  for (const item of registry.items) {
    writeIfChanged(
      `${OUTPUT_DIR}/${item.name}.json`,
      `${JSON.stringify({ $schema: ITEM_SCHEMA, ...item }, null, 2)}\n`,
    );
  }
}

function main(): void {
  const registry = buildRegistry();

  writeRegistry(registry);
  console.log(`Wrote ${registry.items.length} registry items.`);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
