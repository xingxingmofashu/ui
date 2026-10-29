"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Button, Drawer, ToggleGroup } from "@xingxingmofashu/ui";

const directionOptions = [
  { value: "down", label: "Down" },
  { value: "up", label: "Up" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
] as const;

type Direction = (typeof directionOptions)[number]["value"];

export default function DrawerSidesDemo() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="Drawer direction"
        size="sm"
        value={[direction]}
        onValueChange={(value) => {
          const next = value[0];

          if (
            next === "down" ||
            next === "up" ||
            next === "left" ||
            next === "right"
          ) {
            setDirection(next);
          }
        }}
        items={directionOptions}
      />

      <Button
        label={`Open ${direction} drawer`}
        leadingIcon={<Menu />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction={direction}
        title="Release notes"
        description={`Version 2.4.0 slides in from the ${direction} edge.`}
        footer={
          <Button size="sm" label="Close" onClick={() => setOpen(false)} />
        }
      >
        <ul className="list-disc space-y-2 pl-5">
          <li>Added adaptive glass surfaces for every control.</li>
          <li>Improved keyboard navigation across grouped actions.</li>
          <li>Fixed focus restoration after nested overlays close.</li>
        </ul>
      </Drawer>
    </div>
  );
}
