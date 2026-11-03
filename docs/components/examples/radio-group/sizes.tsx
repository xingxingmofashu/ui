"use client";

import { RadioGroup } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function RadioGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          size={size}
          label={`Size ${size}`}
          defaultValue="one"
          items={[
            { value: "one", label: "First option" },
            { value: "two", label: "Second option" },
          ]}
        />
      ))}
    </div>
  );
}
