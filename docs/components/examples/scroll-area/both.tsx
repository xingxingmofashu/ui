"use client";

import { ScrollArea } from "@xingxingmofashu/ui";

const items = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  label: `Task ${index + 1}`,
  owner: ["Maya", "Theo", "Rin"][index % 3],
}));

export default function ScrollAreaBothDemo() {
  return (
    <ScrollArea
      aria-label="Team task board"
      orientation="both"
      className="h-64 w-full max-w-md"
    >
      <div className="grid w-max grid-cols-6 gap-2 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex size-20 flex-col justify-between rounded-xl border border-ui-glass-border bg-ui-glass-surface p-2"
          >
            <span className="font-mono text-[10px] text-ui-ink/45">
              #{String(item.id).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium text-ui-ink">
              {item.label}
            </span>
            <span className="text-[10px] text-ui-ink/50">{item.owner}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
