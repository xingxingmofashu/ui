"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { Button, Dialog } from "@xingxingmofashu/ui";

export default function DialogDismissalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open locked dialog"
        leadingIcon={<Lock />}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        disablePointerDismissal
        title="Finish this review"
        description="Pressing the backdrop will not close this dialog. Choose an action or press Escape."
        footer={
          <>
            <Button size="sm" label="Cancel" onClick={() => setOpen(false)} />
            <Button size="sm" label="Continue" onClick={() => setOpen(false)} />
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
