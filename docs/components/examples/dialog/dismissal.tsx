"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { Button, Dialog } from "@xingxingmofashu/ui";

export default function DialogDismissalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        leadingIcon={<Lock />}
        onClick={() => setOpen(true)}
      >
        Open locked dialog
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        disablePointerDismissal
        title="Finish this review"
        description="Pressing the backdrop will not close this dialog. Choose an action or press Escape."
        footer={
          <>
            <Button size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Continue</Button>
          </>
        }
      >
        <p className="text-sm text-ui-ink/70">
          Use a locked dialog when an accidental backdrop press would lose
          work.
        </p>
      </Dialog>
    </>
  );
}
