"use client";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
] as const;

export default function CheckboxGroupSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {sizes.map((size) => (
        <CheckboxGroup
          key={size}
          size={size}
          label={`Size ${size}`}
          items={channels}
          defaultValue={["comments"]}
        />
      ))}
    </div>
  );
}
