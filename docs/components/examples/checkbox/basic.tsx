"use client";

import { Checkbox } from "@xingxingmofashu/ui";

export default function CheckboxBasicDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        aria-label="Product updates"
        label="Product updates"
        description="Receive an email when a new release ships."
        defaultChecked
      />
      <Checkbox
        aria-label="Security alerts"
        label="Security alerts"
        description="Get notified about sign-ins from new devices."
        defaultChecked
      />
      <Checkbox
        aria-label="Research invites"
        label="Research invites"
        description="Occasional invitations to product interviews."
      />
    </div>
  );
}
