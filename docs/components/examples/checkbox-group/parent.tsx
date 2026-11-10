"use client";

import { useState } from "react";

import {
  CheckboxGroup,
  type CheckboxGroupItemProps,
} from "@xingxingmofashu/ui";

const indent = "ms-[calc(var(--ui-checkbox-size)_+_var(--ui-checkbox-gap))]";

const channels = [
  { value: "comments", label: "Comments", className: indent },
  { value: "releases", label: "Releases", className: indent },
  { value: "billing", label: "Billing", className: indent },
] as const satisfies readonly CheckboxGroupItemProps[];

const channelValues = channels.map((channel) => channel.value);

const items = [
  { parent: true, label: "All channels" },
  ...channels,
] as const satisfies readonly CheckboxGroupItemProps[];

export default function CheckboxGroupParentDemo() {
  const [value, setValue] = useState<string[]>(["comments"]);

  return (
    <CheckboxGroup
      label="Notification channels"
      allValues={channelValues}
      items={items}
      value={value}
      onValueChange={setValue}
      className="w-full max-w-sm"
    />
  );
}
