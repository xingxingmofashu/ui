"use client";

import { Bold, Italic, Underline } from "lucide-react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarDisabledDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Toolbar
        aria-label="Text formatting"
        disabled
        items={[
          { label: "Bold", icon: <Bold /> },
          { label: "Italic", icon: <Italic /> },
          { label: "Underline", icon: <Underline /> },
        ]}
      />

      <p className="text-sm text-ui-ink/60">
        Disabled buttons keep their place and stay in the toolbar's roving
        focus, but they ignore activation.
      </p>
    </div>
  );
}
