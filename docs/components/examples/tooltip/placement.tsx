"use client";

import { useState } from "react";

import { Button, ToggleGroup, Tooltip } from "@xingxingmofashu/ui";

const sides = [
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
] as const;

type Side = (typeof sides)[number]["value"];

export default function TooltipPlacementDemo() {
  const [side, setSide] = useState<Side>("top");

  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleGroup
        aria-label="Tooltip side"
        size="sm"
        value={[side]}
        onValueChange={(value) => {
          const next = value[0];

          if (
            next === "top" ||
            next === "right" ||
            next === "bottom" ||
            next === "left"
          ) {
            setSide(next);
          }
        }}
        items={sides}
      />

      <Tooltip side={side} trigger={<Button>Hover or focus</Button>}>
        {`Placed on the ${side}`}
      </Tooltip>
    </div>
  );
}
