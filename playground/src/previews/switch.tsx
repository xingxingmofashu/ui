import { useState } from "react";

import { Switch } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function SwitchPreview() {
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <DemoGroup label="Controlled">
        <div className="flex max-w-sm flex-col gap-2">
          <Switch
            label="Receive notifications"
            description="When enabled, new messages are sent to your inbox."
            checked={notifications}
            onCheckedChange={(checked) => setNotifications(checked)}
          />
          <Status>
            Notifications are {notifications ? "on" : "off"}.
          </Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          {sizes.map((size) => (
            <Switch
              key={size}
              size={size}
              label={size.toUpperCase()}
              defaultChecked
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="States">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <Switch label="Checked" defaultChecked />
          <Switch label="Disabled" disabled />
          <Switch label="Read only" readOnly defaultChecked />
        </div>
      </DemoGroup>
    </>
  );
}

export { SwitchPreview };
