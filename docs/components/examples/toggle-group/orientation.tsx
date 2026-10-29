"use client";

import { ToggleGroup } from "@xingxingmofashu/ui";

export default function ToggleGroupOrientationDemo() {
  return (
    <ToggleGroup
      aria-label="Position"
      defaultValue={["top"]}
      orientation="vertical"
      items={[
        { value: "top", label: "Top" },
        { value: "middle", label: "Middle" },
        { value: "bottom", label: "Bottom" },
      ]}
    />
  );
}
