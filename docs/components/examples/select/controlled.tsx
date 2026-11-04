"use client";

import { useState } from "react";

import { Select } from "@xingxingmofashu/ui";

const items = [
  { value: "starter", label: "Starter" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
] as const;

type Plan = (typeof items)[number]["value"];

export default function SelectControlledDemo() {
  const [plan, setPlan] = useState<Plan | null>("team");

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Select
        label="Plan"
        description="Switch plans at any time."
        placeholder="Select a plan"
        items={items}
        value={plan}
        onValueChange={(value) => setPlan(value)}
      />
      <p className="text-sm text-ui-ink/60">
        Selected plan: {plan ?? "none"}
      </p>
    </div>
  );
}
