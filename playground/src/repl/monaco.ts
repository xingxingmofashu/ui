import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/editor/editor.worker?worker";
import TsWorker from "monaco-editor/language/typescript/ts.worker?worker";

type MonacoEnvironment = {
  getWorker: (moduleId: string, label: string) => Worker;
};

const globalWithMonaco = globalThis as typeof globalThis & {
  MonacoEnvironment?: MonacoEnvironment;
};

globalWithMonaco.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    if (label === "typescript" || label === "javascript") {
      return new TsWorker();
    }

    return new EditorWorker();
  },
};

monaco.editor.defineTheme("liquid-light", {
  base: "vs",
  inherit: true,
  rules: [
    { token: "comment", foreground: "8a8a85", fontStyle: "italic" },
    { token: "keyword", foreground: "7c3aed" },
    { token: "string", foreground: "0f766e" },
    { token: "number", foreground: "b45309" },
    { token: "regexp", foreground: "be123c" },
    { token: "type.identifier", foreground: "0e7490" },
    { token: "identifier", foreground: "161616" },
    { token: "delimiter", foreground: "63635f" },
    { token: "tag", foreground: "be123c" },
    { token: "attribute.name", foreground: "0e7490" },
    { token: "attribute.value", foreground: "0f766e" },
  ],
  colors: {
    "editor.background": "#efefed",
    "editor.foreground": "#161616",
    "editorLineNumber.foreground": "#a3a39f",
    "editorLineNumber.activeForeground": "#161616",
    "editor.selectionBackground": "#d5d5d1",
    "editor.inactiveSelectionBackground": "#e2e2de",
    "editor.lineHighlightBackground": "#e7e7e3",
    "editorCursor.foreground": "#161616",
    "editorIndentGuide.background1": "#d9d9d5",
    "editorIndentGuide.activeBackground1": "#b8b8b3",
    "editorWidget.background": "#ffffff",
    "editorWidget.border": "#d8d8d4",
    "editorSuggestWidget.background": "#ffffff",
    "editorSuggestWidget.border": "#d8d8d4",
    "editorSuggestWidget.selectedBackground": "#e7e7e3",
    "editorHoverWidget.background": "#ffffff",
    "editorHoverWidget.border": "#d8d8d4",
    "editorBracketMatch.background": "#e2e2de",
    "editorBracketMatch.border": "#a3a39f",
    "editor.findMatchBackground": "#d9d5c8",
    "editor.findMatchHighlightBackground": "#e7e3d5",
    "editorGutter.background": "#efefed",
  },
});

monaco.editor.defineTheme("liquid-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "7a7a75", fontStyle: "italic" },
    { token: "keyword", foreground: "c4b5fd" },
    { token: "string", foreground: "5eead4" },
    { token: "number", foreground: "fbbf24" },
    { token: "regexp", foreground: "fda4af" },
    { token: "type.identifier", foreground: "67e8f9" },
    { token: "identifier", foreground: "f2f2f0" },
    { token: "delimiter", foreground: "9d9d99" },
    { token: "tag", foreground: "fda4af" },
    { token: "attribute.name", foreground: "67e8f9" },
    { token: "attribute.value", foreground: "5eead4" },
  ],
  colors: {
    "editor.background": "#0a0a0a",
    "editor.foreground": "#f2f2f0",
    "editorLineNumber.foreground": "#6b6b67",
    "editorLineNumber.activeForeground": "#f2f2f0",
    "editor.selectionBackground": "#2a2a28",
    "editor.inactiveSelectionBackground": "#1c1c1a",
    "editor.lineHighlightBackground": "#151513",
    "editorCursor.foreground": "#f2f2f0",
    "editorIndentGuide.background1": "#242422",
    "editorIndentGuide.activeBackground1": "#3a3a37",
    "editorWidget.background": "#141414",
    "editorWidget.border": "#2a2a28",
    "editorSuggestWidget.background": "#141414",
    "editorSuggestWidget.border": "#2a2a28",
    "editorSuggestWidget.selectedBackground": "#242422",
    "editorHoverWidget.background": "#141414",
    "editorHoverWidget.border": "#2a2a28",
    "editorBracketMatch.background": "#1c1c1a",
    "editorBracketMatch.border": "#6b6b67",
    "editor.findMatchBackground": "#4a4330",
    "editor.findMatchHighlightBackground": "#2f2b20",
    "editorGutter.background": "#0a0a0a",
  },
});

const typescript = monaco.typescript;

typescript.typescriptDefaults.setCompilerOptions({
  target: typescript.ScriptTarget.ESNext,
  module: typescript.ModuleKind.CommonJS,
  moduleResolution: typescript.ModuleResolutionKind.NodeJs,
  jsx: typescript.JsxEmit.ReactJSX,
  jsxImportSource: "react",
  allowNonTsExtensions: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  skipLibCheck: true,
  noEmit: false,
  noEmitOnError: false,
  types: [],
});
typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false,
});
typescript.typescriptDefaults.setEagerModelSync(true);

// Creating a model activates the TypeScript language contribution. The worker
// factory is only registered after that activation, so warm it up here.
const probeUri = monaco.Uri.parse("file:///repl-probe.ts");

if (!monaco.editor.getModel(probeUri)) {
  monaco.editor.createModel("", "typescript", probeUri);
}

export { monaco };
