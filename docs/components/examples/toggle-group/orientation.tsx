"use client";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

export default function ToggleGroupOrientationDemo() {
  return (
    <ToggleGroup
      aria-label="Position"
      defaultValue={["top"]}
      orientation="vertical"
    >
      <ToggleGroupItem value="top" aria-label="Top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value="middle" aria-label="Middle">
        Middle
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Bottom">
        Bottom
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
