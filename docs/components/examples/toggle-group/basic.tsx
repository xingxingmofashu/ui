"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { ToggleGroup } from "@xingxingmofashu/ui";

export default function ToggleGroupBasicDemo() {
  const [value, setValue] = useState<string[]>(["grid"]);
  const selected = value[0] ?? "";

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="View"
        value={value}
        onValueChange={setValue}
        items={[
          { value: "grid", label: "Grid", icon: <LayoutGrid /> },
          { value: "list", label: "List", icon: <List /> },
        ]}
      />
      <p className="text-sm text-ui-ink/60">
        Current view:{" "}
        {selected === "grid" ? "Grid" : selected === "list" ? "List" : "None"}
      </p>
    </div>
  );
}
