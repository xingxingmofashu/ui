"use client";

import { useState } from "react";

import { Checkbox } from "@xingxingmofashu/ui";

export default function CheckboxControlledDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Enable two-factor authentication"
        description="Require a verification code when signing in."
        checked={enabled}
        onCheckedChange={setEnabled}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {enabled ? "Two-factor authentication is on." : "Two-factor authentication is off."}
      </p>
    </div>
  );
}
