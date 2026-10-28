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
      <div className="flex flex-col gap-2">
        <span id="slider-form-label" className="text-sm text-ui-ink">
          Volume
        </span>
        <Slider
          aria-labelledby="slider-form-label"
          aria-describedby="slider-form-description"
          name="volume"
          defaultValue={40}
        />
        <p
          id="slider-form-description"
          className="text-xs leading-5 text-ui-ink/60"
        >
          The current value is submitted through a hidden range input.
        </p>
      </div>
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
