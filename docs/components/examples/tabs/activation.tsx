"use client";

import { useState } from "react";

import { Tabs } from "@xingxingmofashu/ui";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

export default function TabsActivationDemo() {
  const [value, setValue] = useState("overview");
  const active = tabs.find((tab) => tab.value === value);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Tabs
        aria-label="Workspace"
        activateOnFocus
        value={value}
        onValueChange={setValue}
        items={tabs.map((tab) => ({
          ...tab,
          content: `Showing the ${tab.label.toLowerCase()} panel.`,
        }))}
      />
      <p aria-live="polite" className="text-sm text-ui-ink/60">
        Active tab: {active?.label ?? "None"}. Focus the list and press an arrow
        key to switch without pressing Enter.
      </p>
    </div>
  );
}
