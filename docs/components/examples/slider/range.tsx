"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderRangeDemo() {
  return (
    <div className="w-full max-w-md">
      <Slider
        label="Price range"
        description="One thumb per value, formatted with Intl.NumberFormat."
        defaultValue={[25, 75]}
        showValue
        format={{ style: "currency", currency: "USD" }}
      />
    </div>
  );
}
