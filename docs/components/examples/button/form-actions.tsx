"use client";

import { useState, type FormEvent } from "react";

import { Button, Input } from "@xingxingmofashu/ui";

export default function ButtonFormActionsDemo() {
  const [status, setStatus] = useState("No action submitted yet.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const data = new FormData(event.currentTarget, submitter);
    const intent = String(data.get("intent") ?? "unknown");
    const project = String(data.get("project") ?? "unnamed");

    setStatus(`Submitted "${intent}" for ${project}.`);
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <form
        id="button-form-actions-demo"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <Input label="Project name" name="project" defaultValue="Liquid Glass" />
      </form>

      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          form="button-form-actions-demo"
          name="intent"
          value="save"
          label="Save draft"
        />
        <Button
          type="submit"
          form="button-form-actions-demo"
          name="intent"
          value="publish"
          label="Publish"
        />
      </div>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}
