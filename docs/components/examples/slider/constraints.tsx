"use client";

import { Slider } from "@xingxingmofashu/ui";

export default function SliderConstraintsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span id="slider-constraints-budget" className="text-sm text-ui-ink">
          Budget
        </span>
        <Slider
          aria-labelledby="slider-constraints-budget"
          min={0}
          max={1000}
          step={10}
          defaultValue={[200, 800]}
          minStepsBetweenValues={5}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
        <p className="text-xs leading-5 text-ui-ink/60">
          Step 10 with five steps between values keeps a minimum gap of 50.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span id="slider-constraints-swap" className="text-sm text-ui-ink">
          Swap range
        </span>
        <Slider
          aria-labelledby="slider-constraints-swap"
          defaultValue={[35, 65]}
          thumbAlignment="edge"
          thumbCollisionBehavior="swap"
        />
        <p className="text-xs leading-5 text-ui-ink/60">
          Thumbs align to the control edges and swap places when they meet.
        </p>
      </div>
    </div>
  );
}
