"use client";

import { ScrollArea } from "@xingxingmofashu/ui";

const releases = [
  {
    version: "2.4.0",
    date: "Oct 24",
    summary: "Scroll area, refined glass rims, and focus states.",
  },
  {
    version: "2.3.2",
    date: "Oct 12",
    summary: "Stability fixes for drawer gestures and nested dialogs.",
  },
  {
    version: "2.3.0",
    date: "Sep 28",
    summary: "Accordion sizes, slider ranges, and form integration.",
  },
  {
    version: "2.2.1",
    date: "Sep 09",
    summary: "Improved dark theme contrast across all controls.",
  },
];

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea
      aria-label="Recent releases"
      orientation="horizontal"
      className="h-44 w-full max-w-xl"
    >
      <div className="flex w-max gap-3 p-4">
        {releases.map((release) => (
          <article
            key={release.version}
            className="w-56 shrink-0 rounded-2xl border border-ui-glass-border bg-ui-glass-surface p-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-mono text-xs text-ui-ink">
                v{release.version}
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-ui-ink/50">
                {release.date}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-ui-ink/70">
              {release.summary}
            </p>
          </article>
        ))}
      </div>
    </ScrollArea>
  );
}
