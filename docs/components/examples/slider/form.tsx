"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Slider } from "@xingxingmofashu/ui";

export default function SliderFormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(String(data.get("volume") ?? ""));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <Slider
        name="volume"
        label="Volume"
        description="The current value is submitted through a hidden range input."
        defaultValue={40}
        showValue
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="submit"
          size="sm"
          label="Submit"
          trailingIcon={<ArrowRight />}
        />
        <p aria-live="polite" className="text-sm text-ui-ink/60">
          {submitted === null ? "Not submitted yet" : `Submitted: ${submitted}`}
        </p>
      </div>
    </form>
  );
}
