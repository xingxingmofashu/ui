"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderVerticalDemo() {
  return (
    <Slider
      aria-label="Level"
      orientation="vertical"
      defaultValue={60}
      ui={{ control: "h-48" }}
    />
  );
}
