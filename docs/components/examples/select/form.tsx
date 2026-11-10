"use client";

import { useState } from "react";

import { Button, Select } from "@xingxingmofashu/ui";

const plans = [
  { value: "starter", label: "Starter" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
] as const;

export default function SelectFormDemo() {
  const [submitted, setSubmitted] = useState("No value submitted.");

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const plan = data.get("plan");

        setSubmitted(
          plan ? `Submitted plan: ${String(plan)}.` : "No value submitted.",
        );
      }}
    >
      <Select
        label="Plan"
        name="plan"
        required
        defaultValue="team"
        description="The selected value is submitted with the form."
        items={plans}
      />
      <Button type="submit" className="self-start">Submit</Button>
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        {submitted}
      </p>
    </form>
  );
}
