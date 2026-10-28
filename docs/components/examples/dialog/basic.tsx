"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, Switch } from "@xingxingmofashu/ui";

export default function DialogBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open settings"
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      />

      <Dialog
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
        <Switch
          label="Email notifications"
          description="Send a summary when a teammate publishes changes."
          defaultChecked
        />
      </Dialog>
    </>
  );
}
