"use client";

import { CreditCard, UserRound, UsersRound } from "lucide-react";

import { Tabs } from "@xingxingmofashu/ui";

export default function TabsBasicDemo() {
  return (
    <Tabs
      className="w-full max-w-lg"
      aria-label="Account settings"
      defaultValue="profile"
      items={[
        {
          value: "profile",
          label: "Profile",
          icon: <UserRound />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Profile</p>
              <p className="text-sm text-ui-ink/60">
                Update your name, photo, and contact details.
              </p>
            </div>
          ),
        },
        {
          value: "billing",
          label: "Billing",
          icon: <CreditCard />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Billing</p>
              <p className="text-sm text-ui-ink/60">
                Review invoices, payment methods, and billing history.
              </p>
            </div>
          ),
        },
        {
          value: "team",
          label: "Team",
          icon: <UsersRound />,
          content: (
            <div className="space-y-1">
              <p className="font-medium text-ui-ink">Team</p>
              <p className="text-sm text-ui-ink/60">
                Invite teammates and choose what each person can access.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
