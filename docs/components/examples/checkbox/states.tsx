"use client";

import { Checkbox } from "@xingxingmofashu/ui";

export default function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        aria-label="Disabled option"
        label="Disabled"
        description="The checked value is visible but cannot change."
        defaultChecked
        disabled
      />
      <Checkbox
        aria-label="Read-only option"
        label="Read-only"
        description="Focus and selection work, but the value cannot change."
        defaultChecked
        readOnly
      />
    </div>
  );
}
