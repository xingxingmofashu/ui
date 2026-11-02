"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  Button,
  Checkbox,
  Input,
  Slider,
  Switch,
} from "@xingxingmofashu/ui";

export default function GuideFormDemo() {
  const [status, setStatus] = useState("Not submitted yet.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "unknown");
    const volume = String(data.get("volume") ?? "0");
    const digest = data.get("digest") === null ? "off" : "on";
    const notifications = data.get("notifications") === null ? "off" : "on";

    setStatus(
      `Saved ${email}: volume ${volume}%, digest ${digest}, notifications ${notifications}.`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5"
    >
      <Input
        label="Work email"
        description="Used for account notices and receipts."
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />

      <Checkbox
        name="digest"
        value="weekly"
        label="Weekly digest"
        description="Product notes and release highlights, once a week."
      />

      <Switch
        name="notifications"
        value="enabled"
        label="Notifications"
        description="Send a summary when a teammate publishes changes."
        defaultChecked
      />

      <div className="flex flex-col gap-2">
        <span id="guide-form-volume" className="text-sm text-ui-ink">
          Volume
        </span>
        <Slider
          aria-labelledby="guide-form-volume"
          name="volume"
          defaultValue={40}
        />
        <p className="text-xs leading-5 text-ui-ink/60">
          The slider submits its current value through a hidden range input.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="submit"
          size="sm"
          label="Save preferences"
          trailingIcon={<ArrowRight />}
        />
        <p aria-live="polite" className="text-sm text-ui-ink/60">
          {status}
        </p>
      </div>
    </form>
  );
}
