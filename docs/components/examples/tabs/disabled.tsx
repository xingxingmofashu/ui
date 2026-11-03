"use client";

import { Tabs } from "@xingxingmofashu/ui";

const tabs = [
  { value: "overview", label: "Overview", content: "Workspace summary." },
  { value: "billing", label: "Billing", content: "Invoices and payment methods." },
  { value: "team", label: "Team", content: "People with workspace access." },
];

export default function TabsDisabledDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-ui-ink/60">Disabled group</span>
        <Tabs
          aria-label="Disabled settings"
          disabled
          defaultValue="overview"
          items={tabs}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-ui-ink/60">One disabled tab</span>
        <Tabs
          aria-label="Partially disabled settings"
          defaultValue="overview"
          items={[tabs[0], { ...tabs[1], disabled: true }, tabs[2]]}
        />
      </div>
    </div>
  );
}
