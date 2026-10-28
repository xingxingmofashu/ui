import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

function SliderPreview() {
  const [volume, setVolume] = useState(40);

  return (
    <>
      <DemoGroup label="Horizontal">
        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span id="slider-volume-label">Volume</span>
              <span className="font-mono tabular-nums text-ui-ink/70">
                {volume}
              </span>
            </div>
            <Slider
              aria-labelledby="slider-volume-label"
              value={volume}
              onValueChange={setVolume}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span id="slider-price-label" className="text-sm text-ui-ink">
              Price range
            </span>
            <Slider
              aria-labelledby="slider-price-label"
              defaultValue={[25, 75]}
              format={{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }}
            />
          </div>
        </div>
      </DemoGroup>

      <DemoGroup label="Vertical">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <span
              id="slider-level-label"
              className="text-xs text-ui-ink/60"
            >
              Level
            </span>
            <Slider
              aria-labelledby="slider-level-label"
              orientation="vertical"
              defaultValue={60}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span
              id="slider-disabled-level-label"
              className="text-xs text-ui-ink/60"
            >
              Disabled level
            </span>
            <Slider
              aria-labelledby="slider-disabled-level-label"
              orientation="vertical"
              defaultValue={30}
              disabled
            />
          </div>
        </div>
      </DemoGroup>
    </>
  );
}

export { SliderPreview };
