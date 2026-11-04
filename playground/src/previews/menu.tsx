import { Copy, Link, Pencil, Settings, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, Menu, ToggleGroup } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sides = [
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
] as const;

type Side = (typeof sides)[number]["value"];

const baseItems = [
  {
    type: "group" as const,
    label: "Edit",
    items: [
      { value: "rename", label: "Rename", icon: <Pencil />, shortcut: "⌘R" },
      { value: "duplicate", label: "Duplicate", icon: <Copy /> },
      { value: "copy-link", label: "Copy link", icon: <Link /> },
    ],
  },
  { type: "separator" as const },
  {
    type: "group" as const,
    label: "Danger zone",
    items: [
      { value: "settings", label: "Settings", icon: <Settings /> },
      {
        value: "delete",
        label: "Delete",
        icon: <Trash2 />,
        disabled: true,
      },
    ],
  },
];

function MenuPreview() {
  const [action, setAction] = useState("No action selected.");
  const [side, setSide] = useState<Side>("bottom");
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoGroup label="Groups">
        <div className="flex flex-col items-start gap-3">
          <Menu
            trigger={<Button label="Open menu" />}
            items={baseItems.map((entry) => {
              if (entry.type === "separator") {
                return entry;
              }

              return {
                ...entry,
                items: entry.items.map((item) => ({
                  ...item,
                  onSelect: () => setAction(`${item.label} selected.`),
                })),
              };
            })}
          />
          <Status>{action}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Placement">
        <div className="flex flex-col items-start gap-4">
          <ToggleGroup
            aria-label="Menu side"
            size="sm"
            value={[side]}
            onValueChange={(value) => {
              const next = value[0];

              if (
                next === "top" ||
                next === "right" ||
                next === "bottom" ||
                next === "left"
              ) {
                setSide(next);
              }
            }}
            items={sides}
          />
          <Menu
            side={side}
            trigger={<Button label={`Open ${side} menu`} />}
            items={[
              { value: "profile", label: "Profile" },
              { value: "billing", label: "Billing" },
              { value: "settings", label: "Settings" },
            ]}
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Menu
              open={open}
              onOpenChange={setOpen}
              trigger={<Button label="Controlled menu" />}
              items={[
                { value: "profile", label: "Profile" },
                { value: "billing", label: "Billing" },
              ]}
            />
            <Button
              size="sm"
              label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            />
          </div>
          <Status>The menu is {open ? "open" : "closed"}.</Status>
        </div>
      </DemoGroup>
    </>
  );
}

export { MenuPreview };
