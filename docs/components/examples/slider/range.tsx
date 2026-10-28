"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderRangeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <span id="slider-range-label" className="text-sm text-ui-ink">
        Price range
      </span>
      <Slider
        aria-labelledby="slider-range-label"
        defaultValue={[25, 75]}
        format={{ style: "currency", currency: "USD" }}
      />
    </div>
  );
}
