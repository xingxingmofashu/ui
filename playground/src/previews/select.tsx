import { useState } from "react";

import { Select } from "@xingxingmofashu/ui";

import { Caption, DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragon fruit", disabled: true },
] as const;

const plans = [
  { value: "starter", label: "Starter" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
] as const;

type Plan = (typeof plans)[number]["value"];

function SelectPreview() {
  const [plan, setPlan] = useState<Plan | null>("team");

  return (
    <>
      <DemoGroup label="Basic">
        <div className="w-full max-w-sm">
          <Select
            label="Fruit"
            description="Choose the fruit for the next delivery."
            placeholder="Pick a fruit"
            items={fruits}
            defaultValue="apple"
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-wrap items-start gap-6">
          {sizes.map((size) => (
            <div key={size} className="flex w-36 flex-col gap-2">
              <Select
                aria-label={`${size} select`}
                size={size}
                placeholder="Pick"
                items={fruits}
                defaultValue="banana"
              />
              <Caption>{size}</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Controlled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Select
            label="Plan"
            description="Switch plans at any time."
            placeholder="Select a plan"
            items={plans}
            value={plan}
            onValueChange={(value) => setPlan(value)}
          />
          <Status>Selected plan: {plan ?? "none"}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Disabled">
        <div className="w-full max-w-sm">
          <Select
            label="Region"
            description="Region changes require an administrator."
            placeholder="Select a region"
            items={[
              { value: "us", label: "United States" },
              { value: "eu", label: "Europe" },
            ]}
            defaultValue="us"
            disabled
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { SelectPreview };
