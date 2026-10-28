"use client";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ToggleGroupSizesDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <ToggleGroup
            aria-label={isZh ? `${size} 尺寸` : `${size} toggle group`}
            defaultValue={["one"]}
            size={size}
          >
            <ToggleGroupItem value="one" aria-label={isZh ? "一" : "One"}>
              {isZh ? "一" : "One"}
            </ToggleGroupItem>
            <ToggleGroupItem value="two" aria-label={isZh ? "二" : "Two"}>
              {isZh ? "二" : "Two"}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="three"
              aria-label={isZh ? "三" : "Three"}
            >
              {isZh ? "三" : "Three"}
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
