// @vitest-environment node

import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../", import.meta.url));
const configPath = join(root, "tsconfig.json");
const entry = join(root, "src", "index.ts");

/**
 * Props the wrapper owns outright. Base UI types both as a value or a state
 * function; the wrapper narrows `className` to cn's `ClassValue` and `style`
 * to `CSSProperties` because it merges them itself for its primary element.
 */
const wrapperOwnedProps = new Set(["className", "style"]);

/**
 * Same-name props the wrapper deliberately defines itself instead of
 * inheriting. Each entry must state why the Base UI definition is not reused.
 */
const allowedOverrides: Record<string, Record<string, string>> = {
  AccordionItemProps: {
    content:
      "Panel content is a React node; Base UI types content as a string.",
    title:
      "Trigger heading is a React node; Base UI types title as a string.",
    value:
      "Required identifier for the composed item descriptor; Base UI marks it optional.",
  },
  AlertDialogProps: {
    children:
      "Body content; the wrapper does not expose Base UI's payload render function.",
  },
  ButtonProps: {
    ref: "Ref is typed to the wrapper's rendered root element.",
  },
  CheckboxGroupItemProps: {
    value:
      "Required identifier for the composed item descriptor; Base UI marks it optional.",
  },
  DialogProps: {
    children:
      "Body content; the wrapper does not expose Base UI's payload render function.",
  },
  DrawerProps: {
    children:
      "Body content; the wrapper does not expose Base UI's payload render function.",
  },
  FieldProps: {
    children: "A single control element is required for label wiring.",
  },
  FieldsetProps: {
    children: "Grouped fields are required.",
  },
  InputProps: {
    size: "Visual size variant replaces the native input size attribute.",
  },
  MenuItemProps: {
    label:
      "Visible item content; Base UI's typeahead label is exposed as textValue.",
    onSelect:
      "Wrapper event handler forwarded to Base UI's onClick; Base UI's onSelect has a different signature.",
  },
  PopoverProps: {
    children:
      "Body content; the wrapper does not expose Base UI's payload render function.",
  },
  ProgressProps: {
    value: "Optional; defaults to null for indeterminate progress.",
  },
  SelectProps: {
    items:
      "Grouped option descriptors with per-item disabled and textValue fields.",
  },
  TabsItemProps: {
    content:
      "Panel content is a React node; Base UI types content as a string.",
  },
  ToggleGroupItemProps: {
    value:
      "Required identifier for the composed item descriptor; Base UI marks it optional.",
  },
  TooltipProps: {
    children:
      "Tooltip content is required; Base UI's payload render function is not exposed.",
  },
};

/** Props types with no Base UI counterpart. */
const allowedNoBase: Record<string, string> = {
  CardProps: "Native div layout component with no Base UI counterpart.",
  SelectItemProps: "Data descriptor, not a pass-through of Select.Item props.",
  SelectItemGroupProps:
    "Data descriptor, not a pass-through of Select.Group props.",
};

type ReferenceNode = ts.TypeNode | ts.ExpressionWithTypeArguments;

/** Present at runtime but omitted from the public TypeChecker surface. */
type CheckerWithPropertyType = ts.TypeChecker & {
  getTypeOfPropertyOfType(
    type: ts.Type,
    name: string,
  ): ts.Type | undefined;
};

type BaseRecord = {
  selected?: Set<string>;
  type: ts.Type;
};

type BaseProp = {
  base: string;
  optional: boolean;
  type: ts.Type;
};

type OverrideReport = {
  base: string;
  expected: string;
  kind: "local" | "variant";
  local: string;
  name: string;
};

type PropReport = {
  bases: string[];
  deadKeys: string[];
  localProps: string[];
  name: string;
  overrides: OverrideReport[];
  redundancies: string[];
};

const normalized = (file: string) => file.replace(/\\/g, "/");

const isBaseUiSource = (declaration: ts.Declaration) =>
  normalized(declaration.getSourceFile().fileName).includes(
    "/node_modules/@base-ui/react/",
  );

const isReferenceNode = (node: ts.Node): node is ReferenceNode =>
  ts.isTypeReferenceNode(node) || ts.isExpressionWithTypeArguments(node);

const referenceName = (node: ReferenceNode) => {
  if (ts.isTypeReferenceNode(node)) {
    return node.typeName.getText();
  }

  if (ts.isExpressionWithTypeArguments(node)) {
    return node.expression.getText();
  }

  return "";
};

const referenceTypeArguments = (node: ReferenceNode) => {
  if (ts.isTypeReferenceNode(node)) {
    return node.typeArguments;
  }

  if (ts.isExpressionWithTypeArguments(node)) {
    return node.typeArguments;
  }

  return undefined;
};

function createReports() {
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
  const getTypeOfPropertyOfType = (
    checker as CheckerWithPropertyType
  ).getTypeOfPropertyOfType.bind(checker);
  const source = program.getSourceFile(entry);

  if (!source) {
    throw new Error(`Could not load ${entry}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(source);

  if (!moduleSymbol) {
    throw new Error(`Could not resolve the exports of ${entry}`);
  }

  const resolveSymbol = (symbol: ts.Symbol | undefined) =>
    symbol && symbol.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(symbol)
      : symbol;

  const typeNodeSymbol = (node: ReferenceNode) => {
    if (ts.isTypeReferenceNode(node)) {
      return resolveSymbol(checker.getSymbolAtLocation(node.typeName));
    }

    if (ts.isExpressionWithTypeArguments(node)) {
      return resolveSymbol(checker.getSymbolAtLocation(node.expression));
    }

    return undefined;
  };

  const isBaseUiNode = (node: ReferenceNode) =>
    Boolean(typeNodeSymbol(node)?.declarations?.some(isBaseUiSource));

  const getLiteralKeys = (node: ts.TypeNode | undefined): string[] => {
    if (!node) {
      return [];
    }

    if (ts.isUnionTypeNode(node)) {
      return node.types.flatMap(getLiteralKeys);
    }

    if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
      return [node.literal.text];
    }

    return [];
  };

  const addMembers = (
    members: ts.NodeArray<ts.TypeElement>,
    locals: Map<string, ts.Symbol>,
  ) => {
    for (const member of members) {
      if (!ts.isPropertySignature(member) && !ts.isMethodSignature(member)) {
        continue;
      }

      if (!member.name) {
        continue;
      }

      const symbol = checker.getSymbolAtLocation(member.name);

      if (symbol) {
        locals.set(symbol.getName(), symbol);
      }
    }
  };

  const addVariantProps = (
    node: ReferenceNode,
    omitted: Set<string>,
    variants: Map<string, ts.Symbol>,
  ) => {
    const type = checker.getTypeAtLocation(node);

    for (const property of checker.getPropertiesOfType(type)) {
      if (!omitted.has(property.getName())) {
        variants.set(property.getName(), property);
      }
    }
  };

  type Analysis = {
    bases: Map<string, BaseRecord>;
    deadKeys: string[];
    locals: Map<string, ts.Symbol>;
    variants: Map<string, ts.Symbol>;
  };

  const analyzeNode = (
    node: ReferenceNode,
    result: Analysis,
    omitted = new Set<string>(),
  ) => {
    if (ts.isParenthesizedTypeNode(node)) {
      analyzeNode(node.type, result, omitted);
      return;
    }

    if (ts.isIntersectionTypeNode(node)) {
      for (const part of node.types) {
        analyzeNode(part, result, omitted);
      }
      return;
    }

    if (ts.isTypeLiteralNode(node)) {
      addMembers(node.members, result.locals);
      return;
    }

    if (!isReferenceNode(node)) {
      return;
    }

    const name = referenceName(node);
    const args = referenceTypeArguments(node);

    if (name === "Omit" || name === "Pick") {
      const inner = args?.[0];

      if (!inner) {
        return;
      }

      const keys = getLiteralKeys(args?.[1]);

      if (name === "Omit" && isBaseUiNode(inner)) {
        const innerType = checker.getTypeAtLocation(inner);

        for (const key of keys) {
          if (!checker.getPropertyOfType(innerType, key)) {
            result.deadKeys.push(key);
          }
        }
      }

      if (name === "Pick" && isBaseUiNode(inner)) {
        result.bases.set(inner.getText(), {
          selected: new Set(keys),
          type: checker.getTypeAtLocation(inner),
        });
        return;
      }

      analyzeNode(inner, result, new Set(keys));
      return;
    }

    if (name === "Required" || name === "Partial" || name === "Readonly") {
      const inner = args?.[0];

      if (inner) {
        analyzeNode(inner, result, omitted);
      }

      return;
    }

    if (name === "VariantProps") {
      addVariantProps(node, omitted, result.variants);
      return;
    }

    if (isBaseUiNode(node)) {
      result.bases.set(node.getText(), {
        type: checker.getTypeAtLocation(node),
      });
    }
  };

  const analyzeDeclaration = (
    declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration,
  ): Analysis => {
    const result: Analysis = {
      bases: new Map(),
      deadKeys: [],
      locals: new Map(),
      variants: new Map(),
    };

    if (ts.isTypeAliasDeclaration(declaration)) {
      analyzeNode(declaration.type, result);
      return result;
    }

    for (const heritage of declaration.heritageClauses ?? []) {
      for (const typeNode of heritage.types) {
        analyzeNode(typeNode, result);
      }
    }

    addMembers(declaration.members, result.locals);

    return result;
  };

  const formatType = (type: ts.Type, declaration: ts.Declaration) =>
    checker.typeToString(
      type,
      declaration,
      ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
    );

  const isEquivalent = (local: ts.Type, base: ts.Type) => {
    const localAny = (local.flags & ts.TypeFlags.Any) !== 0;
    const baseAny = (base.flags & ts.TypeFlags.Any) !== 0;

    if (localAny !== baseAny) {
      return false;
    }

    return (
      checker.isTypeAssignableTo(local, base) &&
      checker.isTypeAssignableTo(base, local)
    );
  };

  const reports: PropReport[] = [];

  for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
    const name = exportSymbol.getName();

    if (!name.endsWith("Props")) {
      continue;
    }

    const target = resolveSymbol(exportSymbol);
    const declaration = target?.declarations?.find(
      (item): item is ts.TypeAliasDeclaration | ts.InterfaceDeclaration =>
        ts.isTypeAliasDeclaration(item) || ts.isInterfaceDeclaration(item),
    );

    if (!declaration) {
      continue;
    }

    const analysis = analyzeDeclaration(declaration);
    const baseProps = new Map<string, BaseProp>();

    for (const [baseName, base] of analysis.bases) {
      const properties = base.selected
        ? [...base.selected].flatMap((key) => {
            const property = checker.getPropertyOfType(base.type, key);
            return property ? [property] : [];
          })
        : checker.getPropertiesOfType(base.type);

      for (const property of properties) {
        if (baseProps.has(property.getName())) {
          continue;
        }

        const type = getTypeOfPropertyOfType(
          base.type,
          property.getName(),
        );

        if (type) {
          baseProps.set(property.getName(), {
            base: baseName,
            optional: (property.flags & ts.SymbolFlags.Optional) !== 0,
            type,
          });
        }
      }
    }

    const localProps: string[] = [];
    const redundancies: string[] = [];
    const overrides: OverrideReport[] = [];

    for (const [propName, symbol] of analysis.locals) {
      if (wrapperOwnedProps.has(propName)) {
        continue;
      }

      localProps.push(propName);

      const base = baseProps.get(propName);

      if (!base) {
        continue;
      }

      const localDeclaration =
        symbol.valueDeclaration ?? symbol.declarations?.[0] ?? declaration;
      const localType = checker.getTypeOfSymbolAtLocation(
        symbol,
        localDeclaration,
      );
      const localOptional =
        (symbol.flags & ts.SymbolFlags.Optional) !== 0;

      if (
        localOptional === base.optional &&
        isEquivalent(localType, base.type)
      ) {
        redundancies.push(
          `${propName}: local ${formatType(localType, declaration)}`,
        );
        continue;
      }

      overrides.push({
        base: base.base,
        expected: formatType(base.type, declaration),
        kind: "local",
        local: formatType(localType, declaration),
        name: propName,
      });
    }

    for (const [propName, symbol] of analysis.variants) {
      const base = baseProps.get(propName);

      if (!base || wrapperOwnedProps.has(propName)) {
        continue;
      }

      const variantDeclaration =
        symbol.valueDeclaration ?? symbol.declarations?.[0] ?? declaration;

      overrides.push({
        base: base.base,
        expected: formatType(base.type, declaration),
        kind: "variant",
        local: formatType(
          checker.getTypeOfSymbolAtLocation(symbol, variantDeclaration),
          declaration,
        ),
        name: propName,
      });
    }

    reports.push({
      bases: [...analysis.bases.keys()].sort(),
      deadKeys: [...new Set(analysis.deadKeys)].sort(),
      localProps: localProps.sort(),
      name,
      overrides: overrides.sort((a, b) => a.name.localeCompare(b.name)),
      redundancies: redundancies.sort(),
    });
  }

  return reports.sort((a, b) => a.name.localeCompare(b.name));
}

const reports = createReports();

describe("Base UI prop inheritance", () => {
  it("uses only current allowlist entries", () => {
    const failures: string[] = [];

    for (const [typeName, entries] of Object.entries(allowedOverrides)) {
      const report = reports.find((item) => item.name === typeName);

      if (!report) {
        failures.push(`${typeName}: allowlisted type is not exported`);
        continue;
      }

      for (const propName of Object.keys(entries)) {
        if (!report.overrides.some((item) => item.name === propName)) {
          failures.push(
            `${typeName}.${propName}: no longer shadows a Base UI prop; remove the allowlist entry`,
          );
        }
      }
    }

    for (const typeName of Object.keys(allowedNoBase)) {
      const report = reports.find((item) => item.name === typeName);

      if (!report) {
        failures.push(`${typeName}: allowlisted type is not exported`);
      } else if (report.bases.length > 0) {
        failures.push(
          `${typeName}: now has a Base UI base; remove the no-base allowlist entry`,
        );
      }
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });

  for (const report of reports) {
    describe(report.name, () => {
      it("inherits from a Base UI props type", () => {
        if (report.bases.length === 0) {
          expect(
            allowedNoBase[report.name],
            `${report.name}: expected Omit/Pick/extends of a @base-ui/react props type`,
          ).toBeTruthy();
        }
      });

      it("adds only props that Base UI does not define", () => {
        const failures: string[] = [];

        for (const item of report.redundancies) {
          failures.push(
            `remove the duplicate local declaration ${item}`,
          );
        }

        for (const item of report.overrides) {
          if (allowedOverrides[report.name]?.[item.name]) {
            continue;
          }

          failures.push(
            `${item.name}: local ${item.local} shadows ${item.base} (${item.expected}). ` +
              "Keep it only if intentional, then add it to allowedOverrides with a reason.",
          );
        }

        expect(failures, failures.join("\n")).toEqual([]);
      });

      it("only omits props that exist on the Base UI type", () => {
        expect(
          report.deadKeys,
          `${report.name}: Omit lists unknown keys: ${report.deadKeys.join(", ")}`,
        ).toEqual([]);
      });
    });
  }
});
