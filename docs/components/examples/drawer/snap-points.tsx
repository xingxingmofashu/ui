"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button, Checkbox, Drawer } from "@xingxingmofashu/ui";

const filters = [
  {
    id: "stock",
    label: "In stock only",
    description: "Hide items that are currently unavailable.",
  },
  {
    id: "express",
    label: "Express delivery",
    description: "Show items that can arrive within two days.",
  },
  {
    id: "sale",
    label: "On sale",
    description: "Only include items with an active discount.",
  },
  {
    id: "returns",
    label: "Free returns",
    description: "Limit the results to items with free returns.",
  },
];

export default function DrawerSnapPointsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open filter drawer"
        leadingIcon={<SlidersHorizontal />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction="down"
        snapPoints={[0.4, 0.7]}
        defaultSnapPoint={0.7}
        className="min-h-[70dvh]"
        title="Filter results"
        description="Drag the panel between the compact and expanded snap points."
        footer={
          <Button
            size="sm"
            label="Show results"
            onClick={() => setOpen(false)}
          />
        }
      >
        <div className="flex flex-col gap-5">
          {filters.map((filter) => (
            <Checkbox
              key={filter.id}
              aria-label={filter.label}
              label={filter.label}
              description={filter.description}
              defaultChecked
            />
          ))}
        </div>
      </Drawer>
    </>
  );
}
