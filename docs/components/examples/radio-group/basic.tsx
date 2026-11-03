"use client";

import { RadioGroup } from "@xingxingmofashu/ui";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup
      label="Plan"
      description="Choose the plan that fits your team."
      defaultValue="pro"
      items={[
        {
          value: "free",
          label: "Free",
          description: "For personal projects and experiments.",
        },
        {
          value: "pro",
          label: "Pro",
          description: "For growing teams that need more room.",
        },
        {
          value: "team",
          label: "Team",
          description: "For larger organizations with shared billing.",
        },
      ]}
    />
  );
}
