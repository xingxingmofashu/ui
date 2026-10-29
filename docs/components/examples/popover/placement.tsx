"use client";

import { useState } from "react";

import { Button, Popover, ToggleGroup } from "@xingxingmofashu/ui";

const sideOptions = [
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
] as const;

type Side = (typeof sideOptions)[number]["value"];

export default function PopoverPlacementDemo() {
  const [side, setSide] = useState<Side>("bottom");

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="Popover side"
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
        items={sideOptions}
      />

      <Popover
        side={side}
        sideOffset={10}
        trigger={<Button label={`Open ${side} popover`} />}
        title="Placement"
        description={`This popover prefers the ${side} side of its trigger.`}
      >
        <p>
          Base UI flips the popup to the opposite side when there is not enough
          room.
        </p>
      </Popover>
    </div>
  );
}
