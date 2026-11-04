"use client";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  {
    value: "comments",
    label: "Comments",
    description: "Replies and mentions on your posts.",
  },
  {
    value: "releases",
    label: "Releases",
    description: "A summary when a new version ships.",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Invoices, receipts, and plan changes.",
  },
] as const;

export default function CheckboxGroupBasicDemo() {
  return (
    <CheckboxGroup
      label="Notifications"
      description="Choose the channels you want to hear about."
      items={channels}
      defaultValue={["comments", "releases"]}
      className="w-full max-w-sm"
    />
  );
}
