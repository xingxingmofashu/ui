"use client";

import { ScrollArea } from "@xingxingmofashu/ui";

const entries = Array.from(
  { length: 12 },
  (_, index) => `Release note ${index + 1}`,
);

export default function ScrollAreaEdgeThresholdDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ScrollArea
        aria-label="Release notes"
        overflowEdgeThreshold={16}
        className="h-48 w-full data-[overflow-y-start]:ring-2 data-[overflow-y-start]:ring-ui-glass-focus"
      >
        <ul className="flex flex-col gap-2 p-4 text-sm text-ui-ink/70">
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </ScrollArea>

      <p className="text-xs leading-5 text-ui-ink/60">
        The ring appears once the viewport scrolls 16px past the top edge.
      </p>
    </div>
  );
}
