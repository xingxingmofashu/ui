"use client";

import { UserMinus } from "lucide-react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogContentDemo() {
  return (
    <AlertDialog
      trigger={<Button label="Remove member" leadingIcon={<UserMinus />} />}
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
  );
}
