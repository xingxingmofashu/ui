"use client";

import { Button, Select } from "@xingxingmofashu/ui";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon fruit", disabled: true },
] as const;

export default function SelectBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select
        label="Fruit"
        description="Choose the fruit for the next delivery."
        placeholder="Pick a fruit"
        items={fruits}
        defaultValue="apple"
      />
    </div>
  );
}
