"use client";

import { LayoutGrid, List, Rows3 } from "lucide-react";

import { ToggleGroup } from "@xingxingmofashu/ui";

const items = [
  { value: "grid", label: "Grid", icon: <LayoutGrid /> },
  { value: "list", label: "List", icon: <List /> },
  { value: "board", label: "Board", icon: <Rows3 />, disabled: true },
];

const enabledItems = items.slice(0, 2);

export default function ToggleGroupDisabledDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <ToggleGroup
          aria-label="View with one disabled option"
          defaultValue={["grid"]}
          items={items}
        />
        <span className="text-sm text-ui-ink/60">One item disabled</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ToggleGroup
          aria-label="Disabled view group"
          disabled
          defaultValue={["grid"]}
          items={enabledItems}
        />
        <span className="text-sm text-ui-ink/60">Whole group disabled</span>
      </div>
    </div>
  );
}
