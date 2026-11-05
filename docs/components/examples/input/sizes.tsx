"use client";

import { Field, Input } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function InputSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <Field key={size} size={size} label={`Size ${size}`}>
          <Input size={size} placeholder={`${size} input`} />
        </Field>
      ))}
    </div>
  );
}
