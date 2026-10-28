"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <Button
            size={size}
            label={size.toUpperCase()}
            trailingIcon={<ArrowRight />}
          />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
