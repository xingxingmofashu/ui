"use client";

import { useState } from "react";

import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

export default function FormBasicDemo() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className="w-full max-w-sm"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();

        const value = String(
          new FormData(event.currentTarget).get("email") ?? "",
        );

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setLoading(false);

        if (value.endsWith("@example.com")) {
          setStatus("");
          setErrors({ email: "The example domain is not allowed." });
          return;
        }

        setErrors({});
        setStatus("Saved. Check your inbox for a confirmation.");
      }}
    >
      <Field
        label="Email"
        name="email"
        description="We only use this address for account notices."
      >
        <Input
          type="email"
          defaultValue="you@example.com"
          placeholder="you@example.com"
        />
      </Field>

      <Button
        type="submit"
        disabled={loading}
        focusableWhenDisabled
      >
        Submit
      </Button>

      {status ? <p className="text-sm text-ui-ink/60">{status}</p> : null}
    </Form>
  );
}
