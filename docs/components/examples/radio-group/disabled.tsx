"use client";

import { RadioGroup } from "@xingxingmofashu/ui";

const options = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

export default function RadioGroupDisabledDemo() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        label="Disabled group"
        disabled
        defaultValue="free"
        items={options}
      />
      <RadioGroup
        label="Read only"
        readOnly
        defaultValue="pro"
        items={options}
      />
      <RadioGroup
        label="One disabled option"
        defaultValue="free"
        items={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro", disabled: true },
          { value: "team", label: "Team" },
        ]}
      />
    </div>
  );
}
