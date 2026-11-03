"use client";

import { Tabs } from "@xingxingmofashu/ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function TabsSizesDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
            {size}
          </span>
          <Tabs
            aria-label={`${size} size tabs`}
            size={size}
            defaultValue="overview"
            items={[
              {
                value: "overview",
                label: "Overview",
                content: "Workspace summary and recent activity.",
              },
              {
                value: "members",
                label: "Members",
                content: "People with access to this workspace.",
              },
              {
                value: "settings",
                label: "Settings",
                content: "Workspace name, region, and preferences.",
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
}
