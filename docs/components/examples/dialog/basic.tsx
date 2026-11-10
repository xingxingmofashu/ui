"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, Switch } from "@xingxingmofashu/ui";

export default function DialogBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        leadingIcon={<Settings />}
        onClick={() => setOpen(true)}
      >
        Open settings
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Choose how your workspace behaves for everyone on the team."
        footer={
          <>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
            >
              Save changes
            </Button>
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
