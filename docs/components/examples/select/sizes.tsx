"use client";

import { Select } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const items = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
] as const;

export default function SelectSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <Select
          key={size}
          size={size}
          label={size}
          placeholder={`Size ${size}`}
          items={items}
          defaultValue="two"
        />
      ))}
    </div>
  );
}
