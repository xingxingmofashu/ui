"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Redo2,
  Undo2,
} from "lucide-react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarGroupDemo() {
  return (
    <Toolbar
      aria-label="Editor"
      items={[
        {
          kind: "group",
          "aria-label": "History",
          items: [
            { "aria-label": "Undo", icon: <Undo2 /> },
            { "aria-label": "Redo", icon: <Redo2 /> },
          ],
        },
        { kind: "separator" },
        {
          kind: "group",
          "aria-label": "Alignment",
          items: [
            { "aria-label": "Align left", icon: <AlignLeft /> },
            { "aria-label": "Align center", icon: <AlignCenter /> },
            { "aria-label": "Align right", icon: <AlignRight /> },
          ],
        },
      ]}
    />
  );
}
