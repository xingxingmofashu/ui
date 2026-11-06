import { AlertCircle, FileCode2, X } from "lucide-react";
import * as React from "react";

import type { ReplError } from "./runtime";

type ReplPreviewProps = {
  output: React.ReactNode;
  error: ReplError | null;
  runId: number;
  onRenderError: (error: Error, info: React.ErrorInfo) => void;
  onDismissError: () => void;
};

type PreviewBoundaryProps = {
  onError: (error: Error, info: React.ErrorInfo) => void;
  children: React.ReactNode;
};

type PreviewBoundaryState = {
  failed: boolean;
};

class PreviewBoundary extends React.Component<
  PreviewBoundaryProps,
  PreviewBoundaryState
> {
  state: PreviewBoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError(error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex flex-col items-center gap-2 text-center text-pg-muted">
          <AlertCircle aria-hidden="true" className="size-5" />
          <p className="text-sm">The preview crashed.</p>
          <p className="text-xs">See the error above for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function EmptyPreview({ message }: { message: string }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 text-center text-pg-muted">
      <span className="flex size-10 items-center justify-center rounded-full border border-pg-line bg-pg-panel">
        <FileCode2 aria-hidden="true" className="size-4" />
      </span>
      <p className="max-w-sm text-sm leading-6">{message}</p>
      <p className="max-w-sm font-mono text-[10px] uppercase tracking-[0.16em] text-pg-muted/70">
        Export a component, end with JSX, or call render()
      </p>
    </div>
  );
}

const phaseLabels = {
  compile: "Compile error",
  evaluate: "Runtime error",
  render: "Render error",
} as const;

function ReplPreview({
  output,
  error,
  runId,
  onRenderError,
  onDismissError,
}: ReplPreviewProps) {
  const hasOutput = output !== null && output !== undefined;
  const status = error ? "Error" : hasOutput ? "Live" : "Empty";

  return (
    <section
      aria-label="Preview"
      data-testid="repl-preview"
      className="flex min-h-[22rem] flex-1 flex-col overflow-hidden rounded-2xl border border-pg-line bg-pg-canvas/70 shadow-[var(--pg-shadow)]"
    >
      <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-pg-line px-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${
              error ? "bg-rose-500" : hasOutput ? "bg-emerald-500" : "bg-pg-muted/50"
            }`}
          />
          <span className="text-xs font-medium tracking-wide text-pg-ink">
            Preview
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-pg-muted">
          {status}
        </span>
      </div>

      {error ? (
        <div
          data-testid="repl-error"
          role="alert"
          className="shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-3 py-3 text-rose-900 dark:text-rose-100"
        >
          <div className="flex items-start gap-2">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rose-700/80 dark:text-rose-200/80">
                {phaseLabels[error.phase]}
              </p>
              <pre className="mt-1 whitespace-pre-wrap break-words font-mono text-xs leading-5">
                {error.message}
              </pre>
              {error.stack ? (
                <details className="mt-2">
                  <summary className="cursor-pointer text-[11px] text-rose-700/70 dark:text-rose-200/60">
                    Stack trace
                  </summary>
                  <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-4 text-rose-800/70 dark:text-rose-100/60">
                    {error.stack}
                  </pre>
                </details>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onDismissError}
              aria-label="Dismiss error"
              className="rounded-md p-1 text-rose-700/60 transition-colors hover:bg-rose-500/10 hover:text-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus dark:text-rose-200/60 dark:hover:text-rose-100"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="pg-stage min-h-0 flex-1 overflow-auto p-5 sm:p-8">
        <div
          className={`relative flex min-h-full items-center justify-center ${
            error && hasOutput ? "pointer-events-none opacity-35" : ""
          }`}
        >
          {error ? (
            hasOutput ? (
              <div aria-hidden="true" className="w-full">
                {output}
              </div>
            ) : (
              <EmptyPreview message="No successful preview yet. Fix the error and run again." />
            )
          ) : hasOutput ? (
            <PreviewBoundary key={runId} onError={onRenderError}>
              {output}
            </PreviewBoundary>
          ) : (
            <EmptyPreview message="Nothing to preview yet. Write a component or evaluate an expression." />
          )}
        </div>
      </div>
    </section>
  );
}

export { ReplPreview };
export type { ReplPreviewProps };
