"use client";

import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "../copy";

export function SliderPreview({ lang }: { lang: HomeLocale }) {
  const label = homeCopy[lang].components.items.slider.label;
  const [value, setValue] = useState(64);

  return (
    <div className="w-full max-w-[16rem] space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ui-ink/70">{label}</span>
        <span className="font-mono tabular-nums text-ui-ink/50">{value}</span>
      </div>
      <Slider aria-label={label} value={value} onValueChange={setValue} />
    </div>
  );
}
