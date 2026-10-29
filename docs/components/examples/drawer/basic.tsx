"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Drawer, Switch } from "@xingxingmofashu/ui";

export default function DrawerBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open settings"
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Choose how your workspace behaves for everyone on the team."
        footer={
          <>
            <Button size="sm" label="Cancel" onClick={() => setOpen(false)} />
            <Button
              size="sm"
              label="Save changes"
              onClick={() => setOpen(false)}
            />
          </>
        }
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
          <Switch
            label="Mentions"
            description="Notify you when someone mentions your name."
            defaultChecked
          />
        </div>
      </Drawer>
    </>
  );
}
