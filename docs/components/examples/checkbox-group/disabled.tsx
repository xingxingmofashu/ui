"use client";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

export default function CheckboxGroupDisabledDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <CheckboxGroup
        label="Disabled group"
        description="Every option inherits the disabled state."
        items={channels}
        defaultValue={["comments", "releases"]}
        disabled
      />
      <CheckboxGroup
        label="One disabled option"
        description="The remaining options stay interactive."
        items={[
          { value: "comments", label: "Comments" },
          { value: "releases", label: "Releases", disabled: true },
          { value: "billing", label: "Billing" },
        ]}
        defaultValue={["comments"]}
      />
      <CheckboxGroup
        label="Read only"
        description="Focus stays available, but values cannot change."
        items={channels}
        defaultValue={["comments", "billing"]}
        readOnly
      />
    </div>
  );
}
