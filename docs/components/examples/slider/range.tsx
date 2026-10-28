"use client";

import { Slider } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SliderRangeDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="w-full max-w-md">
      <Slider
        label={isZh ? "价格区间" : "Price range"}
        description={
          isZh
            ? "每个值对应一个滑块，数值通过 Intl.NumberFormat 格式化。"
            : "One thumb per value, formatted with Intl.NumberFormat."
        }
        defaultValue={[25, 75]}
        showValue
        format={{ style: "currency", currency: "USD" }}
      />
    </div>
  );
}
