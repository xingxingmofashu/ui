"use client";

import { useState } from "react";

import { Switch } from "@xingxingmofashu/ui";

export default function SwitchControlledDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full max-w-sm">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="Receive notifications"
        description={
          checked
            ? "New messages will be sent to your inbox."
            : "No notifications will be sent right now."
        }
      />
    </div>
  );
}
