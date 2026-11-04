"use client";

import { useState } from "react";

import { Button, CheckboxGroup } from "@xingxingmofashu/ui";

const channels = [
  { value: "comments", label: "Comments" },
  { value: "releases", label: "Releases" },
  { value: "billing", label: "Billing" },
] as const;

export default function CheckboxGroupFormDemo() {
  const [submitted, setSubmitted] = useState<string[] | null>(null);

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(data.getAll("channels").map(String));
      }}
    >
      <CheckboxGroup
        label="Notifications"
        description="Each checked option submits its value."
        name="channels"
        items={channels}
        defaultValue={["comments", "billing"]}
      />
      <Button type="submit" label="Submit" />
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        Submitted: {submitted === null ? "nothing yet" : submitted.join(", ")}
      </p>
    </form>
  );
}
