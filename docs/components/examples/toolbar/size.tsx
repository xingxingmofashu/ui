"use client";

import { Redo2, Undo2 } from "lucide-react";

import { Toolbar } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function ToolbarSizeDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-5 font-mono text-xs text-ui-ink/50">{size}</span>
          <Toolbar
            size={size}
            aria-label={`${size} toolbar`}
            items={[
              { label: "Undo", icon: <Undo2 /> },
              { label: "Redo", icon: <Redo2 /> },
            ]}
          />
        </div>
      ))}
    </div>
  );
}
