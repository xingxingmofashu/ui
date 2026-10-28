import * as React from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type DemoGroupProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function DemoGroup({ label, children, className }: DemoGroupProps) {
  return (
    <div
      className={cx(
        "grid gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-6",
        className,
      )}
    >
      <p className="pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-pg-muted">
        {label}
      </p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "font-mono text-[10px] uppercase tracking-[0.18em] text-pg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Status({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs leading-5 text-pg-muted" aria-live="polite">
      {children}
    </p>
  );
}

export { Caption, DemoGroup, Status, cx };
