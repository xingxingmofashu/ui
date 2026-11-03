"use client";

import { useState } from "react";

import { RadioGroup } from "@xingxingmofashu/ui";

const options = [
  { value: "standard", label: "Standard shipping", description: "Arrives in 3–5 days." },
  { value: "express", label: "Express shipping", description: "Arrives in 1–2 days." },
  { value: "pickup", label: "Store pickup", description: "Ready today at your local store." },
];

export default function RadioGroupControlledDemo() {
  const [value, setValue] = useState("standard");
  const selected = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        label="Shipping"
        value={value}
        onValueChange={setValue}
        items={options}
      />
      <p className="text-sm text-ui-ink/60">
        Selected: {selected?.label ?? "None"}
      </p>
    </div>
  );
}
