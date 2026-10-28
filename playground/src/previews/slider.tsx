import { useState } from "react";

import { Slider } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

function SliderPreview() {
  const [volume, setVolume] = useState(40);

  return (
    <>
      <DemoGroup label="Horizontal">
        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          <Slider
            label="Volume"
            description="Drag the glass thumb or use the arrow keys."
            showValue
            value={volume}
            onValueChange={setVolume}
          />
          <Slider
            label="Price range"
            description="One thumb per value, formatted with Intl.NumberFormat."
            defaultValue={[25, 75]}
            showValue
            format={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }}
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Vertical">
        <div className="flex items-center gap-10">
          <Slider
            aria-label="Level"
            orientation="vertical"
            defaultValue={60}
            ui={{ control: "h-48" }}
          />
          <Slider
            aria-label="Disabled level"
            orientation="vertical"
            defaultValue={30}
            disabled
            ui={{ control: "h-48" }}
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { SliderPreview };
