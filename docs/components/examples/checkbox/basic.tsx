"use client";

import { Checkbox } from "@xingxingmofashu/ui";

export default function CheckboxBasicDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Product updates"
        description="Receive an email when a new release ships."
        defaultChecked
      />
      <Checkbox
        label="Security alerts"
        description="Get notified about sign-ins from new devices."
        defaultChecked
      />
      <Checkbox
        label="Research invites"
        description="Occasional invitations to product interviews."
      />
    </div>
  );
}
