import { useState } from "react";

import { RadioGroup } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const plans = [
  {
    value: "free",
    label: "Free",
    description: "For personal projects.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "For growing teams.",
  },
  {
    value: "team",
    label: "Team",
    description: "For larger organizations.",
  },
];

function RadioGroupPreview() {
  const [value, setValue] = useState("pro");
  const selected = plans.find((plan) => plan.value === value);

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex flex-col gap-4">
          <RadioGroup
            label="Plan"
            description="Choose the plan that fits your team."
            value={value}
            onValueChange={setValue}
            items={plans}
          />
          <Status>Selected: {selected?.label ?? "None"}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-col gap-5">
          {sizes.map((size) => (
            <RadioGroup
              key={size}
              size={size}
              label={`Size ${size}`}
              defaultValue="one"
              items={[
                { value: "one", label: "First option" },
                { value: "two", label: "Second option" },
              ]}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex flex-col gap-5">
          <RadioGroup label="Disabled" disabled defaultValue="free" items={plans} />
          <RadioGroup label="Read only" readOnly defaultValue="pro" items={plans} />
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
      </DemoGroup>
    </>
  );
}

export { RadioGroupPreview };
