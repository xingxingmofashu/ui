"use client";

import { Slider } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SliderVerticalDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <Slider
      aria-label={isZh ? "等级" : "Level"}
      orientation="vertical"
      defaultValue={60}
      ui={{ control: "h-48" }}
    />
  );
}
