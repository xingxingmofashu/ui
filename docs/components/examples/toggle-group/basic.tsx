"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ToggleGroupBasicDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [value, setValue] = useState<string[]>(["grid"]);
  const selected = value[0] ?? "";

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label={isZh ? "视图" : "View"}
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem
          value="grid"
          aria-label={isZh ? "网格" : "Grid"}
          icon={<LayoutGrid />}
        >
          {isZh ? "网格" : "Grid"}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="list"
          aria-label={isZh ? "列表" : "List"}
          icon={<List />}
        >
          {isZh ? "列表" : "List"}
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-fd-muted-foreground">
        {isZh
          ? `当前视图：${
              selected === "grid"
                ? "网格"
                : selected === "list"
                  ? "列表"
                  : "未选择"
            }`
          : `Current view: ${
              selected === "grid"
                ? "Grid"
                : selected === "list"
                  ? "List"
                  : "None"
            }`}
      </p>
    </div>
  );
}
