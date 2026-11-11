import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

import { PEER_DEPENDENCIES, REGISTRY } from "./config.ts";

const MODULE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

interface SourceImport {
  specifier: string;
  resolvedPath?: string;
}

interface SourceModule {
  path: string;
  text: string;
  imports: SourceImport[];
}

interface ModuleInfo {
  module: SourceModule;
  sourceFile: ts.SourceFile;
  defaultName?: string;
  hasUseClient: boolean;
}

interface PublicExport {
  localName: string;
  exportedName: string;
  typeOnly: boolean;
}

export interface BundledSource {
  content: string;
  dependencies: string[];
}

function resolveModulePath(fromFile: string, specifier: string): string {
  const basePath = path.join(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    ...MODULE_EXTENSIONS.map((extension) => `${basePath}${extension}`),
    ...MODULE_EXTENSIONS.map((extension) =>
      path.join(basePath, `index${extension}`),
    ),
  ];
  const resolvedPath = candidates.find(
    (filePath) => fs.existsSync(filePath) && fs.statSync(filePath).isFile(),
  );

  if (!resolvedPath) {
    throw new Error(`Cannot resolve "${specifier}" from ${fromFile}.`);
  }

  return resolvedPath.replaceAll("\\", "/");
}

function getPackageName(specifier: string): string {
  if (specifier.startsWith("node:")) {
    throw new Error(`Node built-in import "${specifier}" is not supported.`);
  }

  const segments = specifier.split("/");

  return specifier.startsWith("@")
    ? segments.slice(0, 2).join("/")
    : segments[0];
}

function getSourceFile(module: SourceModule): ts.SourceFile {
  return ts.createSourceFile(
    module.path,
    module.text,
    ts.ScriptTarget.Latest,
    true,
    module.path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

/**
 * Walk the local import graph for an entry file. Modules are returned in
 * dependency order, with the entry file last.
 */
function collectModules(entryFile: string): {
  modules: SourceModule[];
  packages: Set<string>;
} {
  const modules = new Map<string, SourceModule>();
  const packages = new Set<string>();

  const visit = (filePath: string): void => {
    if (modules.has(filePath)) {
      return;
    }

    const text = fs
      .readFileSync(filePath, "utf8")
      .replaceAll("\r\n", "\n");
    const imports = ts
      .preProcessFile(text, true, true)
      .importedFiles.map(({ fileName }): SourceImport => {
        if (fileName.startsWith(".")) {
          return {
            specifier: fileName,
            resolvedPath: resolveModulePath(filePath, fileName),
          };
        }

        packages.add(getPackageName(fileName));

        return { specifier: fileName };
      });

    modules.set(filePath, { path: filePath, text, imports });

    for (const item of imports) {
      if (item.resolvedPath) {
        visit(item.resolvedPath);
      }
    }
  };

  visit(entryFile);

  const ordered: SourceModule[] = [];
  const visited = new Set<string>();

  const order = (filePath: string): void => {
    if (visited.has(filePath)) {
      return;
    }

    visited.add(filePath);
    const module = modules.get(filePath)!;

    for (const item of module.imports) {
      if (item.resolvedPath) {
        order(item.resolvedPath);
      }
    }

    ordered.push(module);
  };

  order(entryFile);

  return { modules: ordered, packages };
}

function getDefaultName(modulePath: string): string {
  const base = path.posix.basename(
    modulePath,
    path.posix.extname(modulePath),
  );
  const camelCase = base.replace(/-([a-z0-9])/g, (_, character: string) =>
    character.toUpperCase(),
  );

  return `${camelCase}Theme`;
}

function getDefaultNames(
  modules: SourceModule[],
): Map<string, string> {
  const names = new Map<string, string>();

  for (const module of modules) {
    if (
      getSourceFile(module).statements.some((statement) =>
        ts.isExportAssignment(statement),
      )
    ) {
      names.set(module.path, getDefaultName(module.path));
    }
  }

  return names;
}

function getModuleSpecifier(
  node: ts.ImportDeclaration | ts.ExportDeclaration,
): string | undefined {
  const specifier = node.moduleSpecifier;

  return specifier && ts.isStringLiteral(specifier)
    ? specifier.text
    : undefined;
}

function resolveImport(
  module: SourceModule,
  node: ts.ImportDeclaration | ts.ExportDeclaration,
): string | undefined {
  const specifier = getModuleSpecifier(node);

  if (!specifier?.startsWith(".")) {
    return undefined;
  }

  return module.imports.find((item) => item.specifier === specifier)
    ?.resolvedPath;
}

function isDirective(
  statement: ts.Statement,
): statement is ts.ExpressionStatement & { expression: ts.StringLiteral } {
  return (
    ts.isExpressionStatement(statement) &&
    ts.isStringLiteral(statement.expression)
  );
}

function hasExportModifier(node: ts.Node): boolean {
  const modifiers = ts.canHaveModifiers(node)
    ? ts.getModifiers(node)
    : undefined;

  return Boolean(
    modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    ),
  );
}

function isTypeOnlyDeclaration(node: ts.Statement): boolean {
  return (
    ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)
  );
}

function getDeclarationNames(statement: ts.Statement): string[] {
  if (
    (ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement)) &&
    statement.name
  ) {
    return [statement.name.text];
  }

  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap((declaration) =>
      ts.isIdentifier(declaration.name) ? [declaration.name.text] : [],
    );
  }

  return [];
}

function getRenames(
  modules: SourceModule[],
  defaultNames: Map<string, string>,
): Map<string, Map<string, string>> {
  const renames = new Map<string, Map<string, string>>();

  const add = (modulePath: string, from: string, to: string): void => {
    let moduleRenames = renames.get(modulePath);

    if (!moduleRenames) {
      moduleRenames = new Map();
      renames.set(modulePath, moduleRenames);
    }

    moduleRenames.set(from, to);
  };

  for (const module of modules) {
    for (const statement of getSourceFile(module).statements) {
      if (ts.isExportAssignment(statement)) {
        const target = defaultNames.get(module.path);

        if (
          target &&
          ts.isIdentifier(statement.expression) &&
          statement.expression.text !== target
        ) {
          add(module.path, statement.expression.text, target);
        }

        continue;
      }

      if (!ts.isImportDeclaration(statement)) {
        continue;
      }

      const resolved = resolveImport(module, statement);
      const target = resolved
        ? defaultNames.get(resolved)
        : undefined;
      const localName = statement.importClause?.name?.text;

      if (target && localName) {
        add(module.path, localName, target);
      }
    }
  }

  return renames;
}

function isPropertyName(node: ts.Identifier): boolean {
  const parent = node.parent;

  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isPropertyAssignment(parent) && parent.name === node) ||
    (ts.isPropertyDeclaration(parent) && parent.name === node) ||
    (ts.isPropertySignature(parent) && parent.name === node) ||
    (ts.isMethodDeclaration(parent) && parent.name === node) ||
    (ts.isGetAccessorDeclaration(parent) && parent.name === node) ||
    (ts.isSetAccessorDeclaration(parent) && parent.name === node) ||
    (ts.isBindingElement(parent) && parent.propertyName === node) ||
    (ts.isImportSpecifier(parent) && parent.propertyName === node) ||
    (ts.isExportSpecifier(parent) && parent.propertyName === node) ||
    (ts.isJsxAttribute(parent) && parent.name === node)
  );
}

function renameIdentifiers(
  module: SourceModule,
  renames: Map<string, string>,
): string {
  if (renames.size === 0) {
    return module.text;
  }

  const sourceFile = getSourceFile(module);
  const replacements: Array<{ start: number; end: number; text: string }> = [];

  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) &&
      renames.has(node.text) &&
      !isPropertyName(node)
    ) {
      replacements.push({
        start: node.getStart(sourceFile),
        end: node.getEnd(),
        text: renames.get(node.text)!,
      });
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  let result = module.text;

  for (const replacement of replacements.sort(
    (left, right) => right.start - left.start,
  )) {
    result =
      result.slice(0, replacement.start) +
      replacement.text +
      result.slice(replacement.end);
  }

  return result;
}

function stripExportModifiers(
  statement: ts.Statement,
  source: string,
): string {
  const modifiers = ts.canHaveModifiers(statement)
    ? ts.getModifiers(statement)
    : undefined;
  const exportModifier = modifiers?.find(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  );

  if (!exportModifier) {
    return source.slice(statement.getFullStart(), statement.getEnd());
  }

  const defaultModifier = modifiers?.find(
    (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
  );
  const lastModifier =
    defaultModifier && defaultModifier.end > exportModifier.end
      ? defaultModifier
      : exportModifier;
  const after = source
    .slice(lastModifier.getEnd(), statement.getEnd())
    .replace(/^\s+/, "");

  return (
    source.slice(statement.getFullStart(), exportModifier.getStart()) +
    after
  );
}

function addPublicExports(
  statement: ts.ExportDeclaration,
  exports: PublicExport[],
): void {
  const clause = statement.exportClause;

  if (!clause || !ts.isNamedExports(clause)) {
    return;
  }

  for (const element of clause.elements) {
    exports.push({
      localName: (element.propertyName ?? element.name).text,
      exportedName: element.name.text,
      typeOnly: statement.isTypeOnly || element.isTypeOnly,
    });
  }
}

function renderExports(exports: PublicExport[]): string[] {
  const values: string[] = [];
  const types: string[] = [];
  const seen = new Set<string>();
  let defaultExport: string | undefined;

  for (const item of exports) {
    if (item.exportedName === "default") {
      defaultExport = item.localName;
      continue;
    }

    if (seen.has(item.exportedName)) {
      continue;
    }

    seen.add(item.exportedName);
    const specifier =
      item.localName === item.exportedName
        ? item.exportedName
        : `${item.localName} as ${item.exportedName}`;

    (item.typeOnly ? types : values).push(specifier);
  }

  const statements: string[] = [];

  if (values.length > 0) {
    statements.push(`export { ${values.join(", ")} };`);
  }

  if (types.length > 0) {
    statements.push(`export type { ${types.join(", ")} };`);
  }

  if (defaultExport) {
    statements.push(`export default ${defaultExport};`);
  }

  return statements;
}

function renderModule(
  info: ModuleInfo,
  isEntry: boolean,
  exports: PublicExport[],
): string {
  const parts: string[] = [];

  for (const statement of info.sourceFile.statements) {
    if (isDirective(statement) || ts.isImportDeclaration(statement)) {
      continue;
    }

    if (ts.isExportDeclaration(statement)) {
      if (isEntry) {
        addPublicExports(statement, exports);
      }

      continue;
    }

    if (ts.isExportAssignment(statement)) {
      if (isEntry) {
        exports.push({
          localName: info.defaultName!,
          exportedName: "default",
          typeOnly: false,
        });
      }

      if (ts.isIdentifier(statement.expression)) {
        continue;
      }

      const expression = info.module.text.slice(
        statement.expression.getStart(),
        statement.expression.getEnd(),
      );

      parts.push(`const ${info.defaultName} = ${expression};`);
      continue;
    }

    if (isEntry && hasExportModifier(statement)) {
      const typeOnly = isTypeOnlyDeclaration(statement);

      for (const name of getDeclarationNames(statement)) {
        exports.push({
          localName: name,
          exportedName: name,
          typeOnly,
        });
      }
    }

    parts.push(stripExportModifiers(statement, info.module.text));
  }

  return parts.join("\n\n");
}

function collectExternalImports(infos: ModuleInfo[]): string[] {
  interface ImportGroup {
    defaultName?: string;
    namespace?: string;
    named: string[];
  }

  const groups = new Map<string, ImportGroup>();
  const seen = new Set<string>();
  const sideEffects = new Set<string>();

  for (const info of infos) {
    for (const statement of info.sourceFile.statements) {
      if (!ts.isImportDeclaration(statement)) {
        continue;
      }

      const source = getModuleSpecifier(statement);

      if (!source || source.startsWith(".")) {
        continue;
      }

      const clause = statement.importClause;

      if (!clause) {
        sideEffects.add(source);
        continue;
      }

      let group = groups.get(source);

      if (!group) {
        group = { named: [] };
        groups.set(source, group);
      }

      if (clause.name && !seen.has(clause.name.text)) {
        seen.add(clause.name.text);
        group.defaultName = clause.isTypeOnly
          ? `type ${clause.name.text}`
          : clause.name.text;
      }

      const bindings = clause.namedBindings;

      if (!bindings) {
        continue;
      }

      if (ts.isNamespaceImport(bindings)) {
        if (!seen.has(bindings.name.text)) {
          seen.add(bindings.name.text);
          group.namespace = clause.isTypeOnly
            ? `type * as ${bindings.name.text}`
            : `* as ${bindings.name.text}`;
        }

        continue;
      }

      for (const element of bindings.elements) {
        const localName = element.name.text;

        if (seen.has(localName)) {
          continue;
        }

        seen.add(localName);
        const typeOnly = clause.isTypeOnly || element.isTypeOnly;
        const imported = element.propertyName
          ? `${element.propertyName.text} as `
          : "";

        group.named.push(
          `${typeOnly ? "type " : ""}${imported}${localName}`,
        );
      }
    }
  }

  const lines: string[] = [];

  for (const source of sideEffects) {
    lines.push(`import "${source}";`);
  }

  for (const [source, group] of groups) {
    const parts: string[] = [];

    if (group.defaultName) {
      parts.push(group.defaultName);
    }

    if (group.named.length > 0) {
      parts.push(`{ ${group.named.join(", ")} }`);
    }

    if (parts.length > 0) {
      lines.push(`import ${parts.join(", ")} from "${source}";`);
    }

    if (group.namespace) {
      lines.push(`import ${group.namespace} from "${source}";`);
    }
  }

  return lines;
}

/**
 * Inline an item's local modules into one TypeScript file. External imports stay
 * at the top, local modules are emitted in dependency order, and the entry
 * file's exports become the public API.
 */
export function bundleItemSource(entryFile: string): BundledSource {
  const { modules, packages } = collectModules(entryFile);

  for (const packageName of packages) {
    if (
      !PEER_DEPENDENCIES.has(packageName) &&
      !Object.hasOwn(REGISTRY.dependencies, packageName)
    ) {
      throw new Error(
        `Unknown package "${packageName}" imported by ${entryFile}. ` +
          "Add it to REGISTRY.dependencies.",
      );
    }
  }

  const defaultNames = getDefaultNames(modules);
  const renames = getRenames(modules, defaultNames);
  const infos: ModuleInfo[] = modules.map((module) => {
    const text = renameIdentifiers(
      module,
      renames.get(module.path) ?? new Map(),
    );
    const sourceFile = getSourceFile({ ...module, text });
    const hasUseClient = sourceFile.statements.some(
      (statement) =>
        isDirective(statement) && statement.expression.text === "use client",
    );

    return {
      module: { ...module, text },
      sourceFile,
      defaultName: defaultNames.get(module.path),
      hasUseClient,
    };
  });
  const entry = infos[infos.length - 1];
  const exports: PublicExport[] = [];
  const bodies: string[] = [];

  for (const info of infos) {
    const body = renderModule(info, info === entry, exports);

    if (body) {
      bodies.push(body);
    }
  }

  const content = [
    infos.some((info) => info.hasUseClient) ? '"use client";' : "",
    collectExternalImports(infos).join("\n"),
    bodies.join("\n\n"),
    ...renderExports(exports),
  ]
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+$/gm, "")
    .trim();

  return {
    content: `${content}\n`,
    dependencies: Object.entries(REGISTRY.dependencies)
      .filter(([name]) => packages.has(name))
      .map(([name, version]) => `${name}@${version}`),
  };
}
