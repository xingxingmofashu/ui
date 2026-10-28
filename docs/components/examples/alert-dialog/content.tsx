"use client";

import { UserMinus } from "lucide-react";
import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogContentDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Remove member"
        leadingIcon={<UserMinus />}
        onClick={() => setOpen(true)}
      />

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Remove Maya from the workspace?"
        description="Maya will lose access to every project in this workspace immediately."
        confirmLabel="Remove member"
        cancelLabel="Keep access"
      >
        <ul className="list-disc space-y-1 pl-5">
          <li>Assigned issues stay in the workspace.</li>
          <li>Comments and files created by Maya are kept.</li>
          <li>Maya can be invited again at any time.</li>
        </ul>
      </AlertDialog>
    </>
  );
}
