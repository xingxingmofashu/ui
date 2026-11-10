"use client";

import { Copy, Download, Link, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, Menu } from "@xingxingmofashu/ui";

export default function MenuBasicDemo() {
  const [lastAction, setLastAction] = useState("No action selected.");

  return (
    <div className="flex flex-col items-start gap-3">
      <Menu
        trigger={<Button>Open menu</Button>}
        items={[
          {
            type: "group",
            label: "Edit",
            items: [
              {
                value: "rename",
                label: "Rename",
                icon: <Pencil />,
                shortcut: "⌘R",
                onSelect: () => setLastAction("Rename selected."),
              },
              {
                value: "duplicate",
                label: "Duplicate",
                icon: <Copy />,
                shortcut: "⌘D",
                onSelect: () => setLastAction("Duplicate selected."),
              },
              {
                value: "copy-link",
                label: "Copy link",
                icon: <Link />,
                onSelect: () => setLastAction("Copy link selected."),
              },
            ],
          },
          { type: "separator" },
          {
            type: "group",
            label: "Danger zone",
            items: [
              {
                value: "download",
                label: "Download",
                icon: <Download />,
                onSelect: () => setLastAction("Download selected."),
              },
              {
                value: "delete",
                label: "Delete",
                icon: <Trash2 />,
                disabled: true,
                onSelect: () => setLastAction("Delete selected."),
              },
            ],
          },
        ]}
      />
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        {lastAction}
      </p>
    </div>
  );
}
