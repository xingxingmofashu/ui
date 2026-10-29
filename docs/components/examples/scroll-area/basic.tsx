"use client";

import { ScrollArea } from "@xingxingmofashu/ui";

const activity = [
  {
    time: "09:12",
    title: "Design review scheduled",
    detail: "Maya added the component audit to Thursday's agenda.",
  },
  {
    time: "08:47",
    title: "Release notes drafted",
    detail: "The 2.4.0 notes now cover all twelve shipped components.",
  },
  {
    time: "08:20",
    title: "Playground deployed",
    detail: "The light and dark previews are available on the staging site.",
  },
  {
    time: "Yesterday",
    title: "Glass tokens updated",
    detail: "Rim contrast now follows the active light or dark theme.",
  },
  {
    time: "Yesterday",
    title: "Accessibility pass",
    detail: "Every scrollable viewport now receives a visible focus ring.",
  },
  {
    time: "Monday",
    title: "New contributors",
    detail: "Two engineers joined the interface team for the next cycle.",
  },
];

export default function ScrollAreaBasicDemo() {
  return (
    <ScrollArea
      aria-label="Recent activity"
      className="h-72 w-full max-w-md"
    >
      <div className="flex flex-col gap-3 p-4">
        {activity.map((item) => (
          <article
            key={`${item.time}-${item.title}`}
            className="rounded-2xl border border-ui-glass-border bg-ui-glass-surface p-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ui-ink/50">
              {item.time}
            </p>
            <h3 className="mt-1 text-sm font-medium text-ui-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-ui-ink/65">
              {item.detail}
            </p>
          </article>
        ))}
      </div>
    </ScrollArea>
  );
}
