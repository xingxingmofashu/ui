"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

import { Toolbar } from "@xingxingmofashu/ui";

const formats = ["bold", "italic", "underline"] as const;

type Format = (typeof formats)[number];

export default function ToolbarToggleDemo() {
  const [active, setActive] = useState<readonly Format[]>(["bold"]);

  function toggle(format: Format, pressed: boolean) {
    setActive((current) =>
      pressed
        ? [...current, format]
        : current.filter((value) => value !== format),
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Toolbar
        aria-label="Text formatting"
        items={[
          {
            kind: "toggle",
            label: "Bold",
            icon: <Bold />,
            pressed: active.includes("bold"),
            onPressedChange: (pressed) => toggle("bold", pressed),
          },
          {
            kind: "toggle",
            label: "Italic",
            icon: <Italic />,
            pressed: active.includes("italic"),
            onPressedChange: (pressed) => toggle("italic", pressed),
          },
          {
            kind: "toggle",
            label: "Underline",
            icon: <Underline />,
            pressed: active.includes("underline"),
            onPressedChange: (pressed) => toggle("underline", pressed),
          },
        ]}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Active: {active.length > 0 ? active.join(", ") : "none"}
      </p>
    </div>
  );
}
