"use client";

import { Tabs } from "@xingxingmofashu/ui";

export default function TabsVerticalDemo() {
  return (
    <Tabs
      className="w-full max-w-xl"
      aria-label="Project settings"
      orientation="vertical"
      defaultValue="general"
      items={[
        {
          value: "general",
          label: "General",
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">General</p>
              <p className="text-sm text-ui-ink/60">
                Project name, description, and visibility.
              </p>
            </div>
          ),
        },
        {
          value: "members",
          label: "Members",
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Members</p>
              <p className="text-sm text-ui-ink/60">
                Manage who can view and edit this project.
              </p>
            </div>
          ),
        },
        {
          value: "advanced",
          label: "Advanced",
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Advanced</p>
              <p className="text-sm text-ui-ink/60">
                Delete the project or transfer its ownership.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
