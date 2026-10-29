"use client";

import { useState } from "react";

import { Checkbox } from "@xingxingmofashu/ui";

const channels = [
  {
    id: "comments",
    label: "Comments",
    description: "Replies and mentions on your projects.",
  },
  {
    id: "releases",
    label: "Releases",
    description: "New versions published by your team.",
  },
  {
    id: "billing",
    label: "Billing",
    description: "Invoices, receipts, and payment failures.",
  },
];

export default function CheckboxIndeterminateDemo() {
  const [selected, setSelected] = useState<string[]>(["comments"]);
  const allChecked = selected.length === channels.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        aria-label="Email notifications"
        label="Email notifications"
        description="Choose the channels you want to hear about."
        checked={allChecked}
        indeterminate={someChecked}
        onCheckedChange={(checked) =>
          setSelected(checked ? channels.map((channel) => channel.id) : [])
        }
      />

      <div className="ms-7 flex flex-col gap-3 border-l border-ui-glass-border pl-4">
        {channels.map((channel) => (
          <Checkbox
            key={channel.id}
            aria-label={channel.label}
            label={channel.label}
            description={channel.description}
            checked={selected.includes(channel.id)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked
                  ? [...current, channel.id]
                  : current.filter((id) => id !== channel.id),
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
