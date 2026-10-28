"use client";

import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SliderBasicDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [volume, setVolume] = useState(40);

  return (
    <div className="w-full max-w-md">
      <Slider
        label={isZh ? "音量" : "Volume"}
        description={
          isZh
            ? "拖动玻璃滑块，或使用方向键调整。"
            : "Drag the glass thumb or use the arrow keys."
        }
        showValue
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  );
}
