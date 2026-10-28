import type { ReactNode } from "react";

export function DemoStage({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border bg-fd-card/50">
      <div className="docs-grid relative flex min-h-56 items-center justify-center px-6 py-10 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-fd-background/30"
        />
        <div className="relative flex w-full flex-col items-center gap-6">
          {children}
        </div>
      </div>
      {footer ? (
        <div className="border-t border-fd-border bg-fd-muted/20">{footer}</div>
      ) : null}
    </div>
  );
}
