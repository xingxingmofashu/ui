"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Switch } from "@xingxingmofashu/ui";

export default function SwitchFormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = data.get("notifications");
    setSubmitted(value === null ? "off" : String(value));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <Switch
        name="notifications"
        value="enabled"
        label="Receive notifications"
        description="When enabled, new messages are sent to your inbox."
        defaultChecked
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="submit"
          size="sm"
          label="Submit"
          trailingIcon={<ArrowRight />}
        />
        <p aria-live="polite" className="text-sm text-ui-ink/60">
          {submitted === null
            ? "Not submitted yet"
            : submitted === "off"
              ? "Not enabled"
              : `Submitted: ${submitted}`}
        </p>
      </div>
    </form>
  );
}
