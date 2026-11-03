import { CreditCard, Settings, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";

import { Tabs } from "@xingxingmofashu/ui";

import { Caption, DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const settingsTabs = [
  {
    value: "profile",
    label: "Profile",
    icon: <UserRound />,
    content: "Update your name, photo, and contact details.",
  },
  {
    value: "billing",
    label: "Billing",
    icon: <CreditCard />,
    content: "Review invoices, payment methods, and billing history.",
  },
  {
    value: "security",
    label: "Security",
    icon: <ShieldCheck />,
    content: "Manage passwords, sessions, and two-factor authentication.",
  },
];

function TabsPreview() {
  const [value, setValue] = useState("profile");
  const selected = settingsTabs.find((tab) => tab.value === value);

  return (
    <>
      <DemoGroup label="Controlled">
        <div className="flex w-full max-w-xl flex-col gap-3">
          <Tabs
            aria-label="Account settings"
            value={value}
            onValueChange={setValue}
            items={settingsTabs}
          />
          <Status>Active tab: {selected?.label ?? "None"}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex w-full max-w-xl flex-col gap-5">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <Caption>{size}</Caption>
              <Tabs
                aria-label={`${size} preview tabs`}
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
      </DemoGroup>

      <DemoGroup label="Vertical">
        <Tabs
          className="w-full max-w-xl"
          aria-label="Project settings"
          orientation="vertical"
          defaultValue="general"
          items={[
            {
              value: "general",
              label: "General",
              icon: <Settings />,
              content:
                "Project name, description, and visibility controls live here.",
            },
            {
              value: "members",
              label: "Members",
              icon: <UserRound />,
              content: "Manage who can view and edit this project.",
            },
          ]}
        />
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>disabled</Caption>
            <Tabs
              aria-label="Disabled account settings"
              disabled
              defaultValue="profile"
              items={settingsTabs}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Caption>one disabled tab</Caption>
            <Tabs
              aria-label="Partially disabled account settings"
              defaultValue="profile"
              items={[
                settingsTabs[0],
                { ...settingsTabs[1], disabled: true },
                settingsTabs[2],
              ]}
            />
          </div>
        </div>
      </DemoGroup>
    </>
  );
}

export { TabsPreview };
