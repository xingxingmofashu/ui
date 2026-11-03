"use client";

import { CreditCard, ShieldCheck, UserRound } from "lucide-react";

import { Tabs } from "@xingxingmofashu/ui";

export default function TabsIconOnlyDemo() {
  return (
    <Tabs
      className="w-full max-w-lg"
      aria-label="Account settings"
      defaultValue="profile"
      items={[
        {
          value: "profile",
          "aria-label": "Profile",
          icon: <UserRound />,
          content: "Update your name, photo, and contact details.",
        },
        {
          value: "billing",
          "aria-label": "Billing",
          icon: <CreditCard />,
          content: "Review invoices, payment methods, and billing history.",
        },
        {
          value: "security",
          "aria-label": "Security",
          icon: <ShieldCheck />,
          content: "Manage passwords, sessions, and two-factor authentication.",
        },
      ]}
    />
  );
}
