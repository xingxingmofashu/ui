"use client";

import { Progress } from "@xingxingmofashu/ui";

export default function ProgressRangeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress
        label="Temperature"
        description="The value sits inside a custom -20 to 40 range."
        min={-20}
        max={40}
        value={12}
        format={{ maximumFractionDigits: 0 }}
      />

      <Progress
        label="Storage used"
        description="With a custom minimum, the default label reports the percentage of the range."
        min={20}
        max={100}
        value={45}
      />
    </div>
  );
}
