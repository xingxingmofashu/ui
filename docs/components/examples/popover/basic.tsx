"use client";

import { Settings } from "lucide-react";

import { Button, Popover, Switch } from "@xingxingmofashu/ui";

export default function PopoverBasicDemo() {
  return (
    <Popover
      trigger={<Button label="Open settings" leadingIcon={<Settings />} />}
      title="Workspace settings"
      description="Changes apply to everyone on the team."
    >
      <div className="flex flex-col gap-4">
        <Switch
          label="Email notifications"
          description="Send a summary when a teammate publishes changes."
          defaultChecked
        />
        <Switch
          label="Weekly digest"
          description="Email the team every Monday morning."
        />
      </div>
    </Popover>
  );
}
