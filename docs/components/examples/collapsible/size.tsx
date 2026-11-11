"use client";

import { Collapsible } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function CollapsibleSizeDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Collapsible size={size} trigger={`${size.toUpperCase()} panel`}>
            Trigger height, padding, text, and the indicator scale together.
          </Collapsible>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
