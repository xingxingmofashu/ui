"use client";

import { Field, Input } from "@xingxingmofashu/ui";

export default function FieldBasicDemo() {
  return (
    <Field
      label="Email"
      description="We only use this address for account notices."
      className="w-full max-w-sm"
    >
      <Input type="email" placeholder="you@example.com" />
    </Field>
  );
}
