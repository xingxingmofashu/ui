"use client";

import { Switch } from "@xingxingmofashu/ui";

export default function SwitchUncontrolledDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full max-w-sm">
        <Switch
          label="Enable notifications"
          description="New messages will be sent to your inbox."
          defaultChecked
        />
      </div>
      <Switch aria-label="Enable notifications" defaultChecked />
    </div>
  );
}
