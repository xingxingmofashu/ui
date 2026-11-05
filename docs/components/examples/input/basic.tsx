"use client";

import { useState } from "react";

import { Field, Input } from "@xingxingmofashu/ui";

export default function InputBasicDemo() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field
        label="Email"
        description="We only use this address for account notices."
      >
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onValueChange={setEmail}
        />
      </Field>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {email ? `Ready to send to ${email}.` : "Enter an email address."}
      </p>
    </div>
  );
}
