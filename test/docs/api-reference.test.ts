// @vitest-environment node

import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const configPath = join(root, "tsconfig.json");
const entry = join(root, "src", "index.ts");

const locales = [
  {
    name: "en",
    directory: join(root, "docs", "content", "docs", "en", "components"),
    extension: ".mdx",
    apiHeading: "## API reference",
    propHeader: /^\|\s*Prop\s*\|/,
    attributeHeader: /^\|\s*Attribute\s*\|/,
  },
  {
    name: "zh",
    directory: join(root, "docs", "content", "docs", "zh", "components"),
    extension: ".mdx",
    apiHeading: "## API 参考",
    propHeader: /^\|\s*属性\s*\|\s*类型\s*\|/,
    attributeHeader: /^\|\s*属性\s*\|\s*说明\s*\|/,
  },
  {
    name: "skill",
    directory: join(
      root,
      "skills",
      "xingxingmofashu-ui",
      "references",
      "components",
    ),
    extension: ".md",
    apiHeading: "## API reference",
    propHeader: /^\|\s*Prop\s*\|/,
    attributeHeader: /^\|\s*Attribute\s*\|/,
  },
] as const;

/** Props forwarded by React or the DOM rather than defined by the library. */
const universalProps = new Set(["ref", "children", "className", "style"]);

type PropSection = {
  name: string;
  props: Set<string>;
};

type TypeProps = {
  all: Set<string>;
  owned: string[];
};

function createTypeProps() {
  const config = ts.readConfigFile(configPath, ts.sys.readFile);

  if (config.error) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext([config.error], {
        getCanonicalFileName: (file) => file,
        getCurrentDirectory: () => root,
        getNewLine: () => "\n",
      }),
    );
  }

  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    root,
    undefined,
    configPath,
  );
  const program = ts.createProgram([entry], parsed.options);
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entry);

  if (!source) {
    throw new Error(`Could not load ${entry}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(source);

  if (!moduleSymbol) {
    throw new Error(`Could not resolve the exports of ${entry}`);
  }

  const result = new Map<string, TypeProps>();

  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const name = symbol.getName();

    if (!name.endsWith("Props")) {
      continue;
    }

    const target =
      symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol;
    const type = checker.getDeclaredTypeOfSymbol(target);
    const properties = checker.getPropertiesOfType(type);

    result.set(name, {
      all: new Set(properties.map((property) => property.getName())),
      owned: properties
        .filter((property) => !isFrameworkProp(property))
        .map((property) => property.getName())
        .sort(),
    });
  }

  return result;
}

function isFrameworkProp(symbol: ts.Symbol) {
  const files = (symbol.declarations ?? []).map((declaration) =>
    declaration.getSourceFile().fileName.replace(/\\/g, "/"),
  );

  return (
    files.length > 0 &&
    files.every(
      (file) =>
        file.includes("/@types/react/") ||
        /\/typescript\/lib\/lib\..*\.d\.ts$/.test(file),
    )
  );
}

function pascalCase(file: string, extension: string) {
  return basename(file, extension)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function parseSections(
  source: string,
  pageName: string,
  apiHeading: string,
  propHeader: RegExp,
  attributeHeader: RegExp,
) {
  const index = source.indexOf(apiHeading);

  if (index === -1) {
    return [];
  }

  const sections: PropSection[] = [];
  let current: PropSection | null = null;
  let inPropTable = false;

  for (const line of source.slice(index).split(/\r?\n/)) {
    const bold = /^\*\*(.+?)\*\*$/.exec(line.trim());

    if (bold) {
      current = { name: bold[1], props: new Set() };
      sections.push(current);
      inPropTable = false;
      continue;
    }

    if (propHeader.test(line)) {
      if (!current) {
        current = { name: pageName, props: new Set() };
        sections.push(current);
      }
      inPropTable = true;
      continue;
    }

    if (attributeHeader.test(line)) {
      inPropTable = false;
      continue;
    }

    if (!inPropTable) {
      continue;
    }

    const row = /^\|\s*`([^`]+)`\s*\|/.exec(line);

    if (row) {
      current?.props.add(row[1]);
    }

    if (!line.trimStart().startsWith("|")) {
      inPropTable = false;
    }
  }

  return sections;
}

function resolveTypeName(sectionName: string, types: Map<string, TypeProps>) {
  const candidates = sectionName.endsWith("Props")
    ? [sectionName]
    : [`${sectionName}Props`, sectionName];

  return candidates.find((candidate) => types.has(candidate));
}

describe("API reference documentation", () => {
  it(
    "documents every public prop in both locales",
    { timeout: 120_000 },
    async () => {
      const types = createTypeProps();
      const failures: string[] = [];

      for (const locale of locales) {
        const documentedTypes = new Set<string>();
        const files = (await readdir(locale.directory)).filter(
          (file) =>
            file.endsWith(locale.extension) &&
            file !== `index${locale.extension}`,
        );

        for (const file of files) {
          const source = await readFile(
            join(locale.directory, file),
            "utf8",
          );
          const sections = parseSections(
            source,
            pascalCase(file, locale.extension),
            locale.apiHeading,
            locale.propHeader,
            locale.attributeHeader,
          );

          for (const section of sections) {
            const typeName = resolveTypeName(section.name, types);

            if (!typeName) {
              continue;
            }

            const type = types.get(typeName);

            if (!type) {
              continue;
            }

            documentedTypes.add(typeName);

            const missing = type.owned.filter(
              (prop) => !section.props.has(prop),
            );
            const unknown = [...section.props].filter(
              (prop) => !type.all.has(prop) && !universalProps.has(prop),
            );

            if (missing.length > 0) {
              failures.push(
                `${locale.name}/${file} ${typeName}: missing ${missing.join(", ")}`,
              );
            }

            if (unknown.length > 0) {
              failures.push(
                `${locale.name}/${file} ${typeName}: unknown ${unknown.join(", ")}`,
              );
            }
          }
        }

        for (const typeName of types.keys()) {
          if (!documentedTypes.has(typeName)) {
            failures.push(
              `${locale.name}: ${typeName}: no API reference section`,
            );
          }
        }
      }

      expect(failures, failures.join("\n")).toEqual([]);
    },
  );
});
