"use client";

import { useState } from "react";

import { Button, Field, Form, Input } from "@xingxingmofashu/ui";

type SubmittedValues = {
  name: string;
  email: string;
};

export default function FormSubmitValuesDemo() {
  const [submitted, setSubmitted] = useState<SubmittedValues | null>(null);

  return (
    <Form<SubmittedValues>
      className="w-full max-w-sm"
      onFormSubmit={(formValues) => setSubmitted(formValues)}
    >
      <Field label="Name" name="name">
        <Input defaultValue="Ada Lovelace" />
      </Field>

      <Field label="Email" name="email">
        <Input type="email" defaultValue="ada@example.com" />
      </Field>

      <Button type="submit" label="Submit" />

      {submitted ? (
        <p className="text-sm text-ui-ink/60">
          Submitted {submitted.name} at {submitted.email}.
        </p>
      ) : null}
    </Form>
  );
}
