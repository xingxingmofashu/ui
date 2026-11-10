"use client";

import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogControlledDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No changes published.");

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>Publish changes</Button>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Publish changes?"
        description="The current draft will become the live version for everyone."
        confirmLabel="Publish"
        cancelLabel="Cancel"
        onConfirm={() => setStatus("Changes published.")}
        onCancel={() => setStatus("Publish cancelled.")}
      />

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}
