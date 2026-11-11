"use client";

import { Copy, Redo2, Scissors, Undo2 } from "lucide-react";
import { useState } from "react";

import { Toolbar } from "@xingxingmofashu/ui";

export default function ToolbarBasicDemo() {
  const [lastAction, setLastAction] = useState("None");

  return (
    <div className="flex flex-col items-center gap-4">
      <Toolbar
        aria-label="Document actions"
        items={[
          {
            label: "Undo",
            icon: <Undo2 />,
            onClick: () => setLastAction("Undo"),
          },
          {
            label: "Redo",
            icon: <Redo2 />,
            onClick: () => setLastAction("Redo"),
          },
          { kind: "separator" },
          {
            label: "Cut",
            icon: <Scissors />,
            onClick: () => setLastAction("Cut"),
          },
          {
            label: "Copy",
            icon: <Copy />,
            onClick: () => setLastAction("Copy"),
          },
        ]}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Last action: {lastAction}
      </p>
    </div>
  );
}
