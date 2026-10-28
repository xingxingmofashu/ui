"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderDisabledDemo() {
  return (
    <div className="w-full max-w-sm">
      <Slider aria-label="Disabled slider" defaultValue={35} disabled />
    </div>
  );
}
