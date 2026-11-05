"use client";

import { Field, Fieldset, Input } from "@xingxingmofashu/ui";

export default function FieldsetBasicDemo() {
  return (
    <Fieldset legend="Billing details" className="w-full max-w-sm">
      <Field label="Company" description="Shown on invoices and receipts.">
        <Input placeholder="Acme Inc." />
      </Field>

      <Field label="Tax ID">
        <Input placeholder="XX-XXXXXXX" />
      </Field>
    </Fieldset>
  );
}
