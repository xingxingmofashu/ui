"use client";

import { Slider } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SliderDisabledDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="w-full max-w-sm">
      <Slider
        aria-label={isZh ? "禁用滑块" : "Disabled slider"}
        defaultValue={35}
        disabled
      />
    </div>
  );
}
