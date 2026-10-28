"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

export default function ToggleGroupBasicDemo() {
  const [value, setValue] = useState<string[]>(["grid"]);
  const selected = value[0] ?? "";

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup aria-label="View" value={value} onValueChange={setValue}>
        <ToggleGroupItem
          value="grid"
          aria-label="Grid"
          icon={<LayoutGrid />}
        >
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List" icon={<List />}>
          List
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-ui-ink/60">
        Current view:{" "}
        {selected === "grid" ? "Grid" : selected === "list" ? "List" : "None"}
      </p>
    </div>
  );
}
