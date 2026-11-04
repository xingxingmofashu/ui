"use client";

import { useState } from "react";

import { CheckboxGroup, Field } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

export default function FieldGroupDemo() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Field
      label="Notifications"
      description="Choose at least one channel."
      error={selected.length === 0 ? "Select at least one channel." : undefined}
      className="w-full max-w-sm"
    >
      <CheckboxGroup
        items={channels}
        value={selected}
        onValueChange={setSelected}
      />
    </Field>
  );
}
