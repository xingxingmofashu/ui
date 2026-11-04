"use client";

import { useState } from "react";

import { Field, Input } from "@xingxingmofashu/ui";

const takenEmail = "hello@example.com";

export default function FieldErrorDemo() {
  const [email, setEmail] = useState(takenEmail);

  return (
    <Field
      label="Email"
      description="Change the address to see the error clear."
      error={
        email === takenEmail ? "This address is already in use." : undefined
      }
      className="w-full max-w-sm"
    >
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onValueChange={setEmail}
      />
    </Field>
  );
}
