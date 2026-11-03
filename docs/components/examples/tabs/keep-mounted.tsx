"use client";

import { Input, Tabs } from "@xingxingmofashu/ui";

export default function TabsKeepMountedDemo() {
  return (
    <Tabs
      className="w-full max-w-lg"
      aria-label="Draft and notes"
      defaultValue="draft"
      items={[
        {
          value: "draft",
          label: "Draft",
          content: (
            <div className="flex flex-col gap-2">
              <Input
                aria-label="Draft title"
                placeholder="Type here, switch tabs, then come back"
              />
              <p className="text-sm text-ui-ink/60">
                This panel unmounts when another tab becomes active, so the field
                is cleared.
              </p>
            </div>
          ),
        },
        {
          value: "notes",
          label: "Notes",
          keepMounted: true,
          content: (
            <div className="flex flex-col gap-2">
              <Input
                aria-label="Internal notes"
                placeholder="Type here, switch tabs, then come back"
              />
              <p className="text-sm text-ui-ink/60">
                This panel stays mounted, so the field keeps its value.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
