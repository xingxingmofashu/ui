"use client";

import { useState } from "react";

import { CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

type Channel = (typeof channels)[number]["value"];

export default function CheckboxGroupControlledDemo() {
  const [selected, setSelected] = useState<Channel[]>(["comments", "billing"]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <CheckboxGroup
        label="Notifications"
        description="Select every channel you want to keep."
        items={channels}
        value={selected}
        onValueChange={setSelected}
      />
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        {selected.length === 0
          ? "No channels selected."
          : `Selected: ${selected.join(", ")}`}
      </p>
    </div>
  );
}
