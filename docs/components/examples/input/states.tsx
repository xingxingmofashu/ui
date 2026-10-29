"use client";

import { Input } from "@xingxingmofashu/ui";

export default function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input
        label="Disabled field"
        description="The value cannot be changed."
        defaultValue="Locked value"
        disabled
      />
      <Input
        label="Read-only field"
        description="The value can be selected and copied."
        defaultValue="Read-only value"
        readOnly
      />
    </div>
  );
}
