import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  HelpCircle,
  Loader2,
  Play,
  RotateCcw,
} from "lucide-react";
import * as React from "react";

import { Button, Popover, Switch } from "@xingxingmofashu/ui";

import { BrandMark } from "../components/brand-mark";
import { GlassPresetToggle } from "../components/glass-preset-toggle";
import { ThemeToggle } from "../components/theme-toggle";
import { useTheme } from "../theme";
import { ReplConsole } from "./console";
import { exampleById, exampleGroups, loadExampleCode } from "./examples";
import { replModules } from "./modules";
import { ReplPreview } from "./preview";
import {
  ReplExecutionError,
  createLogEntry,
  resolveReplOutput,
  toReplError,
  type ReplConsoleEntry,
  type ReplError,
  type ReplLogEntry,
} from "./runtime";
import { installTailwindRuntime } from "./tailwind-runtime";
import {
  BLANK_ID,
  WELCOME_ID,
  getTemplate,
  welcomeCode,
} from "./templates";

const STORAGE_KEY = "ui-playground-repl-v1";
const DOCS_URL = `${import.meta.env.BASE_URL}../docs/en/`;

type StoredState = {
  exampleId: string;
  autoRun: boolean;
  drafts: Record<string, string>;
};

type RunStatus = "idle" | "running" | "success" | "error";

let compilerPromise: Promise<typeof import("./compiler")> | null = null;

function loadCompiler() {
  compilerPromise ??= import("./compiler").catch((error) => {
    compilerPromise = null;
    throw error;
  });

  return compilerPromise;
}

function readStoredState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredState> | null;

    if (!parsed || typeof parsed !== "object") return null;

    const drafts: Record<string, string> = {};

    if (parsed.drafts && typeof parsed.drafts === "object") {
      for (const [key, value] of Object.entries(parsed.drafts)) {
        if (typeof value === "string") drafts[key] = value;
      }
    }

    return {
      exampleId:
        typeof parsed.exampleId === "string" ? parsed.exampleId : WELCOME_ID,
      autoRun: typeof parsed.autoRun === "boolean" ? parsed.autoRun : true,
      drafts,
    };
  } catch {
    return null;
  }
}

function writeStoredState(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable in private or sandboxed contexts.
  }
}

function saveDraft(exampleId: string, code: string, autoRun: boolean) {
  const stored = readStoredState();

  writeStoredState({
    exampleId: stored?.exampleId ?? exampleId,
    autoRun,
    drafts: { ...stored?.drafts, [exampleId]: code },
  });
}

function removeDraft(exampleId: string) {
  const stored = readStoredState();

  if (!stored || stored.drafts[exampleId] === undefined) return;

  const drafts = { ...stored.drafts };

  delete drafts[exampleId];
  writeStoredState({ ...stored, drafts });
}

function appendEntry(
  entries: ReplConsoleEntry[],
  entry: ReplLogEntry,
): ReplConsoleEntry[] {
  if (entry.level === "clear") return [];

  const next = [...entries, entry as ReplConsoleEntry];

  return next.length > 200 ? next.slice(-200) : next;
}

const ReplEditor = React.lazy(async () => {
  const module = await import("./editor");

  return { default: module.ReplEditor };
});

function EditorSkeleton() {
  return (
    <div
      aria-label="Loading editor"
      className="flex h-full flex-col gap-3 p-4 font-mono text-[12px] text-pg-muted"
    >
      <div className="h-3 w-1/3 animate-pulse rounded-full bg-pg-line/70" />
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-pg-line/50" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-pg-line/40" />
      <div className="mt-3 h-3 w-3/4 animate-pulse rounded-full bg-pg-line/30" />
      <div className="h-3 w-2/5 animate-pulse rounded-full bg-pg-line/20" />
    </div>
  );
}

function Repl() {
  const { theme } = useTheme();
  const [initial] = React.useState(() => {
    const stored = readStoredState();
    const storedId = stored?.exampleId;
    const exampleId =
      storedId === WELCOME_ID ||
      storedId === BLANK_ID ||
      (storedId !== undefined && exampleById.has(storedId))
        ? storedId
        : WELCOME_ID;
    const saved = stored?.drafts[exampleId];
    const template = getTemplate(exampleId);

    return {
      exampleId,
      autoRun: stored?.autoRun ?? true,
      code: saved ?? template ?? welcomeCode,
      needsLoad: saved === undefined && template === null,
      cleanCode: saved === undefined ? template : null,
    };
  });

  const [exampleId, setExampleId] = React.useState(initial.exampleId);
  const [code, setCode] = React.useState(initial.code);
  const [autoRun, setAutoRun] = React.useState(initial.autoRun);
  const [resetKey, setResetKey] = React.useState(0);
  const [entries, setEntries] = React.useState<ReplConsoleEntry[]>([]);
  const [error, setError] = React.useState<ReplError | null>(null);
  const [output, setOutput] = React.useState<React.ReactNode>(null);
  const [runId, setRunId] = React.useState(0);
  const [status, setStatus] = React.useState<RunStatus>("idle");
  const [duration, setDuration] = React.useState<number | null>(null);
  const [cursor, setCursor] = React.useState({ line: 1, column: 1 });
  const [loadingExample, setLoadingExample] = React.useState(initial.needsLoad);
  const [copied, setCopied] = React.useState(false);
  const [consoleCollapsed, setConsoleCollapsed] = React.useState(false);

  const codeRef = React.useRef(code);
  const runTokenRef = React.useRef(0);
  const loadTokenRef = React.useRef(0);
  const mountedRef = React.useRef(true);
  const initializedRef = React.useRef(false);
  const pendingInitialLoadRef = React.useRef(initial.needsLoad);
  const skipNextAutoRunRef = React.useRef(false);
  const cleanCodeRef = React.useRef<string | null>(initial.cleanCode);

  React.useEffect(() => {
    codeRef.current = code;
  }, [code]);

  React.useEffect(() => {
    installTailwindRuntime();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const runCode = React.useCallback(async (source: string) => {
    const token = ++runTokenRef.current;
    const startedAt = performance.now();

    setStatus("running");
    setError(null);
    setEntries([]);

    try {
      const { runRepl } = await loadCompiler();

      if (runTokenRef.current !== token) return;

      const result = await runRepl(source, {
        modules: replModules,
        onEntry: (entry) => {
          if (runTokenRef.current !== token || !mountedRef.current) return;
          setEntries((current) => appendEntry(current, entry));
        },
      });

      if (runTokenRef.current !== token || !mountedRef.current) return;

      let completion: unknown;

      try {
        completion = await result.completion;
      } catch (reason) {
        throw new ReplExecutionError("evaluate", reason);
      }

      if (runTokenRef.current !== token || !mountedRef.current) return;

      const resolved = resolveReplOutput({ ...result, completion });

      if (resolved.kind === "result") {
        setEntries((current) =>
          appendEntry(
            current,
            createLogEntry("result", resolved.resultText ?? ""),
          ),
        );
      }

      setOutput(resolved.node ?? null);

      setError(null);
      setStatus("success");
      setDuration(result.durationMs);
      setRunId(token);
    } catch (reason) {
      if (runTokenRef.current !== token || !mountedRef.current) return;

      const nextError = toReplError(reason, "compile");

      setError(nextError);
      setStatus("error");
      setDuration(performance.now() - startedAt);
      setRunId(token);
      setEntries((current) =>
        appendEntry(
          current,
          createLogEntry(
            "error",
            `${nextError.name}: ${nextError.message}`,
          ),
        ),
      );
    }
  }, []);

  const applyCode = React.useCallback(
    (next: string, runNow = true) => {
      const changed = next !== codeRef.current;

      setCode(next);
      codeRef.current = next;
      setResetKey((key) => key + 1);

      if (runNow) {
        if (changed) skipNextAutoRunRef.current = true;
        void runCode(next);
      }
    },
    [runCode],
  );

  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      if (pendingInitialLoadRef.current) return;

      void runCode(code);
      return;
    }

    if (skipNextAutoRunRef.current) {
      skipNextAutoRunRef.current = false;
      return;
    }

    if (!autoRun) return;

    const timer = window.setTimeout(() => {
      void runCode(code);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [autoRun, code, runCode]);

  React.useEffect(() => {
    if (!initial.needsLoad) return;

    const token = ++loadTokenRef.current;
    let cancelled = false;

    void (async () => {
      try {
        const source = await loadExampleCode(initial.exampleId);

        if (cancelled || loadTokenRef.current !== token) return;

        pendingInitialLoadRef.current = false;
        cleanCodeRef.current = source;
        setLoadingExample(false);
        applyCode(source);
      } catch (reason) {
        if (cancelled) return;

        pendingInitialLoadRef.current = false;
        cleanCodeRef.current = welcomeCode;
        setLoadingExample(false);
        setExampleId(WELCOME_ID);

        const nextError = toReplError(reason, "compile");

        setError(nextError);
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyCode, initial.exampleId, initial.needsLoad]);

  React.useEffect(() => {
    if (loadingExample) return;

    if (code === cleanCodeRef.current) {
      removeDraft(exampleId);
      return;
    }

    const timer = window.setTimeout(() => {
      const stored = readStoredState();

      writeStoredState({
        exampleId,
        autoRun,
        drafts: { ...stored?.drafts, [exampleId]: code },
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [autoRun, code, exampleId, loadingExample]);

  async function selectExample(nextId: string) {
    if (nextId === exampleId) return;

    const previousId = exampleId;

    if (codeRef.current !== cleanCodeRef.current) {
      saveDraft(exampleId, codeRef.current, autoRun);
    }

    const token = ++loadTokenRef.current;

    setExampleId(nextId);
    setLoadingExample(true);
    setError(null);

    const template = getTemplate(nextId);

    if (template !== null) {
      cleanCodeRef.current = template;
      setLoadingExample(false);
      applyCode(template);
      return;
    }

    const stored = readStoredState();
    const draft = stored?.drafts[nextId];

    if (draft !== undefined) {
      cleanCodeRef.current = null;
      setLoadingExample(false);
      applyCode(draft);
      return;
    }

    try {
      const source = await loadExampleCode(nextId);

      if (loadTokenRef.current !== token) return;

      cleanCodeRef.current = source;
      setLoadingExample(false);
      applyCode(source);
    } catch (reason) {
      if (loadTokenRef.current !== token) return;

      setLoadingExample(false);
      setExampleId(previousId);

      const nextError = toReplError(reason, "compile");

      setError(nextError);
      setStatus("error");
    }
  }

  async function resetExample() {
    removeDraft(exampleId);

    const template = getTemplate(exampleId);

    if (template !== null) {
      cleanCodeRef.current = template;
      applyCode(template);
      return;
    }

    setLoadingExample(true);

    try {
      const source = await loadExampleCode(exampleId);

      cleanCodeRef.current = source;
      setLoadingExample(false);
      applyCode(source);
    } catch (reason) {
      setLoadingExample(false);

      const nextError = toReplError(reason, "compile");

      setError(nextError);
      setStatus("error");
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeRef.current);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = codeRef.current;
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function handleRenderError(reason: Error, info: React.ErrorInfo) {
    const stack = [reason.stack, info.componentStack]
      .filter((value): value is string => Boolean(value))
      .join("\n");

    // The failed tree may still be the last good output. Keep the error panel
    // instead of rendering it again outside the error boundary.
    setOutput(null);
    setError({
      phase: "render",
      name: reason.name || "Error",
      message: reason.message,
      stack,
    });
    setStatus("error");
    setEntries((current) =>
      appendEntry(
        current,
        createLogEntry("error", `Render error: ${reason.message}`),
      ),
    );
  }

  const statusText = loadingExample
    ? "Loading example…"
    : status === "running"
      ? "Starting…"
      : status === "error"
        ? "Error"
        : status === "success" && duration !== null
          ? `${Math.round(duration)} ms`
          : "Ready";

  const lineCount = code.split("\n").length;

  return (
    <div
      id="top"
      data-testid="repl"
      className="pg-app flex min-h-dvh flex-col text-pg-ink lg:h-dvh lg:overflow-hidden"
    >
      <header className="sticky top-0 z-40 shrink-0 border-b border-pg-line bg-pg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 w-full max-w-[110rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2 sm:px-5 lg:h-16 lg:flex-nowrap lg:py-0">
          <a
            href="#top"
            className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus"
          >
            <BrandMark className="size-8 shrink-0 rounded-xl" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-pg-ink">
                Liquid Glass
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-pg-muted">
                REPL
              </span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            <GlassPresetToggle />
            <ThemeToggle />
            <Popover
              trigger={
                <Button
                  aria-label="REPL help"
                  leadingIcon={<HelpCircle />}
                />
              }
              title="React REPL"
              description="Write TSX and run it in this browser."
              side="bottom"
              align="end"
              className="w-[min(22rem,calc(100vw-2rem))]"
            >
              <div className="flex flex-col gap-3 text-sm leading-6 text-ui-ink/70">
                <p>
                  Preview priority: <code>render(...)</code>, then{" "}
                  <code>export default</code>, then the last expression.
                </p>
                <p>
                  Supported imports: <code>react</code>,{" "}
                  <code>@xingxingmofashu/ui</code>, the glass preset plugin, and
                  the lucide icons used by the examples.
                </p>
                <p>
                  Press <kbd>Ctrl/Cmd + Enter</kbd> to run. Type checking is off;
                  syntax and runtime errors appear in the preview panel.
                </p>
                <p className="text-xs text-ui-ink/55">
                  Code runs in this page, not a sandbox. Use a scratch project for
                  untrusted code.
                </p>
              </div>
            </Popover>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-pg-line px-3 text-xs font-medium text-pg-muted transition-colors hover:bg-pg-line/40 hover:text-pg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
            >
              Docs
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[110rem] flex-1 flex-col gap-3 px-3 pb-4 pt-3 sm:px-5 lg:min-h-0 lg:overflow-hidden">
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div className="relative min-w-0 basis-full sm:max-w-xs sm:basis-auto sm:flex-1">
            <select
              aria-label="Example"
              value={exampleId}
              disabled={loadingExample}
              onChange={(event) => {
                void selectExample(event.target.value);
              }}
              className="h-9 w-full appearance-none rounded-lg border border-pg-line bg-pg-canvas/70 pl-3 pr-9 text-xs font-medium text-pg-ink transition-colors hover:border-pg-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus disabled:cursor-wait disabled:opacity-60"
            >
              <option value={WELCOME_ID}>Welcome</option>
              <option value={BLANK_ID}>Blank</option>
              {exampleGroups.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.examples.map((example) => (
                    <option key={example.id} value={example.id}>
                      {example.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-pg-muted"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              size="sm"
              label="Auto-run"
              checked={autoRun}
              onCheckedChange={setAutoRun}
            />
            <Button
              size="sm"
              label={status === "running" ? "Running" : "Run"}
              leadingIcon={
                status === "running" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Play />
                )
              }
              onClick={() => {
                void runCode(codeRef.current);
              }}
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span
              aria-live="polite"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-pg-muted"
            >
              {statusText}
            </span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <section className="flex h-[60vh] min-h-104 flex-col overflow-hidden rounded-2xl border border-pg-line bg-pg-canvas/80 shadow-(--pg-shadow) lg:h-auto lg:min-h-0">
            <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-pg-line px-3">
              <div className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-emerald-500/70" />
                <span className="truncate font-mono text-xs text-pg-ink">
                  App.tsx
                </span>
                <span className="rounded-full border border-pg-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-pg-muted">
                  TSX
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    void copyCode();
                  }}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-pg-muted transition-colors hover:bg-pg-line/40 hover:text-pg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
                >
                  {copied ? (
                    <Check aria-hidden="true" className="size-3" />
                  ) : (
                    <Copy aria-hidden="true" className="size-3" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void resetExample();
                  }}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-pg-muted transition-colors hover:bg-pg-line/40 hover:text-pg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
                >
                  <RotateCcw aria-hidden="true" className="size-3" />
                  Reset
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1">
              <React.Suspense fallback={<EditorSkeleton />}>
                <ReplEditor
                  value={code}
                  resetKey={resetKey}
                  theme={theme}
                  onChange={setCode}
                  onRun={() => {
                    void runCode(codeRef.current);
                  }}
                  onCursorChange={(line, column) => {
                    setCursor({ line, column });
                  }}
                />
              </React.Suspense>
            </div>

            <div className="flex h-7 shrink-0 items-center justify-between border-t border-pg-line px-3 font-mono text-[10px] text-pg-muted">
              <span>
                Ln {cursor.line}, Col {cursor.column}
              </span>
              <span>{lineCount} lines</span>
            </div>
          </section>

          <div className="flex min-h-0 flex-col gap-3">
            <ReplPreview
              output={output}
              error={error}
              runId={runId}
              onRenderError={handleRenderError}
              onDismissError={() => {
                setError(null);
                setStatus("idle");
              }}
            />

            <ReplConsole
              entries={entries}
              collapsed={consoleCollapsed}
              onToggle={() => {
                setConsoleCollapsed((value) => !value);
              }}
              onClear={() => {
                setEntries([]);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export { Repl };
