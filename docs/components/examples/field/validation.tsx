"use client";

import { useState } from "react";

import { Field, Input } from "@xingxingmofashu/ui";

export default function FieldValidationDemo() {
  const [email, setEmail] = useState("");

  return (
    <Field
      label="Email"
      description="Use a work address so we can reach your team."
      validationMode="onChange"
      validate={(value) => {
        const text = String(value);

        if (!text) {
          return null;
        }

        return text.includes("@") ? null : "Enter a valid email address.";
      }}
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
