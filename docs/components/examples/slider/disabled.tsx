"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderDisabledDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <span id="slider-disabled-label" className="text-sm text-ui-ink">
        Disabled slider
      </span>
      <Slider
        aria-labelledby="slider-disabled-label"
        defaultValue={35}
        disabled
      />
    </div>
  );
}
