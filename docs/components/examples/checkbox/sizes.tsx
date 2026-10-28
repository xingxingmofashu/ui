"use client";

import { Checkbox } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function CheckboxSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Checkbox
          key={size}
          size={size}
          label={`Size ${size}`}
          defaultChecked
        />
      ))}
    </div>
  );
}
