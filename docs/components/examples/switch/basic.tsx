"use client";

import { Switch } from "@xingxingmofashu/ui";

export default function SwitchBasicDemo() {
  return (
    <div className="w-full max-w-sm">
      <Switch
        label="Receive notifications"
        description="When enabled, new messages are sent to your inbox."
        defaultChecked
      />
    </div>
  );
}
