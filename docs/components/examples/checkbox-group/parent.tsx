"use client";

import { useState } from "react";

import { Checkbox, CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

const channelValues = channels.map((channel) => channel.value);

export default function CheckboxGroupParentDemo() {
  const [value, setValue] = useState<string[]>(["comments"]);

  const allSelected = value.length === channelValues.length;
  const someSelected = value.length > 0 && !allSelected;

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Checkbox
        label="Notifications"
        checked={allSelected}
        indeterminate={someSelected}
        onCheckedChange={(checked) => {
          setValue(checked ? [...channelValues] : []);
        }}
      />
      <CheckboxGroup
        aria-label="Notification channels"
        value={value}
        onValueChange={setValue}
        items={channels}
        className="ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]"
      />
    </div>
  );
}
