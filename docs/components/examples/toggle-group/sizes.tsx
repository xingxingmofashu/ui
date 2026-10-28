"use client";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ToggleGroupSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <ToggleGroup
            aria-label={`${size} toggle group`}
            defaultValue={["one"]}
            size={size}
          >
            <ToggleGroupItem value="one" aria-label="One">
              One
            </ToggleGroupItem>
            <ToggleGroupItem value="two" aria-label="Two">
              Two
            </ToggleGroupItem>
            <ToggleGroupItem value="three" aria-label="Three">
              Three
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
