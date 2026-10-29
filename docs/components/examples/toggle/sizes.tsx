"use client";

import { Type } from "lucide-react";

import { Toggle } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ToggleSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {sizes.map((size) => (
        <Toggle
          key={size}
          size={size}
          label={size.toUpperCase()}
          icon={<Type />}
          defaultPressed={size === "md"}
        />
      ))}
    </div>
  );
}
