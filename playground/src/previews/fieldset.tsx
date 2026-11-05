import { Field, Fieldset, Input } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

function FieldsetPreview() {
  return (
    <>
      <DemoGroup label="Basic">
        <Fieldset legend="Billing details" className="w-full max-w-sm">
          <Field label="Company" description="Shown on invoices and receipts.">
            <Input placeholder="Acme Inc." />
          </Field>

          <Field label="Tax ID">
            <Input placeholder="XX-XXXXXXX" />
          </Field>
        </Fieldset>
      </DemoGroup>

      <DemoGroup label="Disabled">
        <Fieldset legend="Billing details" disabled className="w-full max-w-sm">
          <Field label="Company" description="Shown on invoices and receipts.">
            <Input defaultValue="Acme Inc." />
          </Field>

          <Field label="Tax ID">
            <Input defaultValue="XX-XXXXXXX" />
          </Field>
        </Fieldset>
      </DemoGroup>
    </>
  );
}

export { FieldsetPreview };
