import * as React from "react";

import type { Theme } from "../theme";
import { monaco } from "./monaco";

const MODEL_URI = monaco.Uri.parse("file:///App.tsx");

type ReplEditorProps = {
  value: string;
  theme: Theme;
  onChange: (value: string) => void;
  onRun: () => void;
  onCursorChange?: (line: number, column: number) => void;
};

function ReplEditor({
  value,
  theme,
  onChange,
  onRun,
  onCursorChange,
}: ReplEditorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const applyingExternalValue = React.useRef(false);
  const onChangeRef = React.useRef(onChange);
  const onRunRef = React.useRef(onRun);
  const onCursorChangeRef = React.useRef(onCursorChange);
  const initialValueRef = React.useRef(value);
  const initialThemeRef = React.useRef(theme);

  React.useEffect(() => {
    onChangeRef.current = onChange;
    onRunRef.current = onRun;
    onCursorChangeRef.current = onCursorChange;
  }, [onChange, onCursorChange, onRun]);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    monaco.editor.getModel(MODEL_URI)?.dispose();

    const model = monaco.editor.createModel(
      initialValueRef.current,
      "typescript",
      MODEL_URI,
    );
    const editor = monaco.editor.create(container, {
      model,
      theme:
        initialThemeRef.current === "dark" ? "liquid-dark" : "liquid-light",
      ariaLabel: "Code editor",
      automaticLayout: true,
      fontFamily:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      fontSize: 13,
      lineHeight: 22,
      minimap: { enabled: false },
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      renderLineHighlight: "all",
      renderWhitespace: "selection",
      roundedSelection: true,
      wordWrap: "on",
      tabSize: 2,
      insertSpaces: true,
      lineNumbersMinChars: 3,
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
        useShadows: false,
      },
      bracketPairColorization: { enabled: true },
      guides: { bracketPairs: true, indentation: true },
      suggest: { showWords: true },
      quickSuggestions: { other: true, comments: false, strings: false },
      formatOnPaste: true,
      formatOnType: false,
      fixedOverflowWidgets: true,
      stickyScroll: { enabled: false },
      contextmenu: true,
    });

    editorRef.current = editor;

    const contentSubscription = editor.onDidChangeModelContent(() => {
      if (applyingExternalValue.current) return;
      onChangeRef.current(editor.getValue());
    });
    const cursorSubscription = editor.onDidChangeCursorPosition((event) => {
      onCursorChangeRef.current?.(
        event.position.lineNumber,
        event.position.column,
      );
    });

    editor.addAction({
      id: "repl.run",
      label: "Run REPL",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: "navigation",
      run: () => {
        onRunRef.current();
      },
    });

    const position = editor.getPosition();
    onCursorChangeRef.current?.(
      position?.lineNumber ?? 1,
      position?.column ?? 1,
    );

    return () => {
      contentSubscription.dispose();
      cursorSubscription.dispose();
      editor.dispose();
      model.dispose();
      editorRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    monaco.editor.setTheme(theme === "dark" ? "liquid-dark" : "liquid-light");
  }, [theme]);

  React.useEffect(() => {
    const editor = editorRef.current;

    if (!editor || editor.getValue() === value) return;

    applyingExternalValue.current = true;
    editor.setValue(value);
    applyingExternalValue.current = false;
    editor.setPosition({ lineNumber: 1, column: 1 });
    editor.setScrollPosition({ scrollTop: 0 });
  }, [value]);

  return <div ref={containerRef} className="h-full w-full" />;
}

export { ReplEditor };
export type { ReplEditorProps };
