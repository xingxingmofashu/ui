"use client";

import { Input } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function InputSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <Input
          key={size}
          size={size}
          label={`Size ${size}`}
          placeholder={`${size} input`}
        />
      ))}
    </div>
  );
}
