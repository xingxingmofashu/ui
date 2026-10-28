"use client";

import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderBasicDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span id="slider-basic-label">Volume</span>
        <span className="font-mono tabular-nums text-ui-ink/70">{volume}</span>
      </div>
      <Slider
        aria-labelledby="slider-basic-label"
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  );
}
