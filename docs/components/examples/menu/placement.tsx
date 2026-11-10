"use client";

import { useState } from "react";

import { Button, Menu, ToggleGroup } from "@xingxingmofashu/ui";

const sides = [
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
] as const;

type Side = (typeof sides)[number]["value"];

export default function MenuPlacementDemo() {
  const [side, setSide] = useState<Side>("bottom");

  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleGroup
        aria-label="Menu side"
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

      <Menu
        side={side}
        trigger={<Button>{`Open ${side} menu`}</Button>}
        items={[
          { value: "profile", label: "Profile" },
          { value: "billing", label: "Billing" },
          { value: "settings", label: "Settings" },
        ]}
      />
    </div>
  );
}
