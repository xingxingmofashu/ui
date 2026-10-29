"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { Button, Drawer } from "@xingxingmofashu/ui";

export default function DrawerLockedDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open locked drawer"
        leadingIcon={<Lock />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        disablePointerDismissal
        title="Unsaved changes"
        description="Pressing the backdrop will not close this drawer. Use the action below or press Escape."
        footer={
          <Button size="sm" label="Keep editing" onClick={() => setOpen(false)} />
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
