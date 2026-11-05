"use client";

import { Field, Fieldset, Input } from "@xingxingmofashu/ui";

export default function FieldsetDisabledDemo() {
  return (
    <Fieldset legend="Billing details" disabled className="w-full max-w-sm">
      <Field label="Company" description="Shown on invoices and receipts.">
        <Input defaultValue="Acme Inc." />
      </Field>

      <Field label="Tax ID">
        <Input defaultValue="XX-XXXXXXX" />
      </Field>
    </Fieldset>
  );
}
