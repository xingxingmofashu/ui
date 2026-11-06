import { ChevronDown, Terminal, Trash2 } from "lucide-react";
import * as React from "react";

import type { ReplConsoleEntry } from "./runtime";

type ReplConsoleProps = {
  entries: ReplConsoleEntry[];
  collapsed: boolean;
  onToggle: () => void;
  onClear: () => void;
};

const levelClasses: Record<ReplConsoleEntry["level"], string> = {
  log: "text-white/75",
  info: "text-sky-200/90",
  warn: "text-amber-200",
  error: "text-rose-200",
  debug: "text-white/50",
  result: "text-emerald-200",
};

function ReplConsole({
  entries,
  collapsed,
  onToggle,
  onClear,
}: ReplConsoleProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const stickToBottom = React.useRef(true);

  React.useEffect(() => {
    if (entries.length === 0) return;

    const element = scrollRef.current;

    if (!element || !stickToBottom.current) return;

    element.scrollTop = element.scrollHeight;
  }, [entries]);

  function handleScroll() {
    const element = scrollRef.current;

    if (!element) return;

    stickToBottom.current =
      element.scrollHeight - element.scrollTop - element.clientHeight < 24;
  }

  return (
    <section
      data-testid="repl-console"
      aria-label="Console"
      className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-pg-line bg-[#0b0b0b] text-white/80 shadow-[var(--pg-shadow)] ${
        collapsed ? "h-11 shrink-0" : "h-56 shrink-0"
      }`}
    >
      <div className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
        >
          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 text-white/45 transition-transform ${
              collapsed ? "-rotate-90" : ""
            }`}
          />
          <Terminal aria-hidden="true" className="size-3.5 text-white/45" />
          <span className="text-xs font-medium tracking-wide text-white/75">
            Console
          </span>
          <span className="rounded-full border border-white/15 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white/45">
            {entries.length}
          </span>
        </button>

        <button
          type="button"
          onClick={onClear}
          aria-label="Clear console"
          title="Clear console"
          className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus"
        >
          <Trash2 aria-hidden="true" className="size-3.5" />
        </button>
      </div>

      {collapsed ? null : (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="min-h-0 flex-1 overflow-auto p-3 font-mono text-[12px] leading-5"
        >
          {entries.length === 0 ? (
            <div className="flex h-full min-h-16 flex-col items-center justify-center gap-2 text-center text-white/35">
              <Terminal aria-hidden="true" className="size-4" />
              <p className="max-w-64 text-[11px] leading-5">
                console.log output and expression results appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-start gap-2">
                  <span
                    className={`w-12 shrink-0 select-none text-right text-[10px] uppercase tracking-[0.12em] ${
                      levelClasses[entry.level]
                    }`}
                  >
                    {entry.level === "result" ? "←" : entry.level}
                  </span>
                  <pre className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-[12px] leading-5">
                    {entry.text}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export { ReplConsole };
export type { ReplConsoleProps };
