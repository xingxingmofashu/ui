"use client";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ToggleGroupOrientationDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <ToggleGroup
      aria-label={isZh ? "位置" : "Position"}
      defaultValue={["top"]}
      orientation="vertical"
    >
      <ToggleGroupItem value="top" aria-label={isZh ? "顶部" : "Top"}>
        {isZh ? "顶部" : "Top"}
      </ToggleGroupItem>
      <ToggleGroupItem value="middle" aria-label={isZh ? "中间" : "Middle"}>
        {isZh ? "中间" : "Middle"}
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label={isZh ? "底部" : "Bottom"}>
        {isZh ? "底部" : "Bottom"}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
