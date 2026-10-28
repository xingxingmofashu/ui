"use client";

import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderBasicDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <div className="w-full max-w-md">
      <Slider
        label="Volume"
        description="Drag the glass thumb or use the arrow keys."
        showValue
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  );
}
