"use client";

import { Select } from "@xingxingmofashu/ui";

const groups = [
  {
    label: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ],
  },
  {
    label: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "kale", label: "Kale" },
      { value: "spinach", label: "Spinach" },
    ],
  },
] as const;

export default function SelectGroupsDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select
        label="Produce"
        description="Options are grouped by category."
        placeholder="Select produce"
        items={groups}
      />
    </div>
  );
}
