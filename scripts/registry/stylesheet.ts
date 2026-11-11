import fs from "node:fs";
import postcss, { type AtRule, type Root, type Rule } from "postcss";

export type CssObject = Record<string, unknown>;

export interface RegistryStylePayload {
  theme: Record<string, string>;
  css: CssObject;
}

function normalizeCssValue(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getAtRuleKey(atRule: AtRule): string {
  const params = normalizeCssValue(atRule.params);

  return params === "" ? `@${atRule.name}` : `@${atRule.name} ${params}`;
}

function isCssObject(value: unknown): value is CssObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeCss(base: CssObject, extra: CssObject): CssObject {
  const result = { ...base };

  for (const [key, value] of Object.entries(extra)) {
    const current = result[key];

    result[key] =
      isCssObject(value) && isCssObject(current)
        ? mergeCss(current, value)
        : value;
  }

  return result;
}

function mergeCssInto(
  target: CssObject,
  key: string,
  value: CssObject,
): void {
  const current = target[key];

  target[key] = isCssObject(current)
    ? mergeCss(current, value)
    : value;
}

function toCssObject(node: Rule | AtRule): CssObject {
  const result: CssObject = {};

  for (const child of node.nodes ?? []) {
    if (child.type === "decl") {
      result[child.prop] = normalizeCssValue(child.value);
    } else if (child.type === "rule") {
      mergeCssInto(
        result,
        normalizeCssValue(child.selector),
        toCssObject(child),
      );
    } else if (child.type === "atrule") {
      mergeCssInto(result, getAtRuleKey(child), toCssObject(child));
    }
  }

  return result;
}

function parseCssFile(filePath: string): Root {
  return postcss.parse(fs.readFileSync(filePath, "utf8"), {
    from: filePath,
  });
}

function convertCssRoot(
  root: Root,
  theme?: Record<string, string>,
): CssObject {
  const result: CssObject = {};

  for (const node of root.nodes ?? []) {
    if (node.type === "comment") {
      continue;
    }

    if (node.type === "atrule") {
      if (node.name === "import" || node.name === "source") {
        continue;
      }

      if (
        theme &&
        node.name === "theme" &&
        normalizeCssValue(node.params) === "inline"
      ) {
        for (const child of node.nodes ?? []) {
          if (child.type === "decl") {
            theme[child.prop.replace(/^--/, "")] = normalizeCssValue(
              child.value,
            );
          }
        }

        continue;
      }

      mergeCssInto(result, getAtRuleKey(node), toCssObject(node));
      continue;
    }

    if (node.type === "rule") {
      mergeCssInto(
        result,
        normalizeCssValue(node.selector),
        toCssObject(node),
      );
    }
  }

  return result;
}

export function readRegistryStyles(): RegistryStylePayload {
  const theme: Record<string, string> = {};
  const css = mergeCss(
    convertCssRoot(parseCssFile("src/index.css"), theme),
    convertCssRoot(parseCssFile("src/keyframes.css")),
  );

  return { theme, css };
}

export function readCssFile(filePath: string): CssObject {
  return convertCssRoot(parseCssFile(filePath));
}
