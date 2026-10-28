"use client";

import { Switch } from "@xingxingmofashu.me/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function SwitchSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
      {sizes.map((size) => (
        <Switch
          key={size}
          size={size}
          label={size.toUpperCase()}
          defaultChecked
        />
      ))}
    </div>
  );
}
