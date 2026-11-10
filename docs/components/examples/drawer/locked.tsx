"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { Button, Drawer } from "@xingxingmofashu/ui";

export default function DrawerLockedDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        leadingIcon={<Lock />}
        onClick={() => setOpen(true)}
      >
        Open locked drawer
      </Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        disablePointerDismissal
        title="Unsaved changes"
        description="Pressing the backdrop will not close this drawer. Use the action below or press Escape."
        footer={
          <Button size="sm" onClick={() => setOpen(false)}>Keep editing</Button>
        }
      >
        <p className="text-sm text-ui-ink/70">
          Use a locked drawer when an accidental backdrop press could discard
          unfinished work.
        </p>
      </Drawer>
    </>
  );
}
