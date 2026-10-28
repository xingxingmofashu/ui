"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderVerticalDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span id="slider-vertical-label" className="text-sm text-ui-ink">
        Level
      </span>
      <Slider
        aria-labelledby="slider-vertical-label"
        orientation="vertical"
        defaultValue={60}
      />
    </div>
  );
}
