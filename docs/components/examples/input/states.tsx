"use client";

import { Field, Input } from "@xingxingmofashu/ui";

export default function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field
        label="Disabled field"
        description="The value cannot be changed."
        disabled
      >
        <Input defaultValue="Locked value" />
      </Field>

      <Field
        label="Read-only field"
        description="The value can be selected and copied."
      >
        <Input defaultValue="Read-only value" readOnly />
      </Field>
    </div>
  );
}
