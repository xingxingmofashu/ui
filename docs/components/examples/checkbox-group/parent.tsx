"use client";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

export default function CheckboxGroupParentDemo() {
  return (
    <CheckboxGroup
      items={[
        {
          parent: true,
          label: "Notifications",
          description: "Select or clear every channel.",
        },
        ...channels,
      ]}
      defaultValue={["comments"]}
      className="w-full max-w-sm"
    />
  );
}
