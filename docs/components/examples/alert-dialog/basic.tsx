"use client";

import { Trash2 } from "lucide-react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogBasicDemo() {
  return (
    <AlertDialog
      trigger={<Button label="Delete project" leadingIcon={<Trash2 />} />}
      title="Delete project?"
      description="This action cannot be undone. All files, deployments, and environment variables will be permanently removed."
      confirmLabel="Delete project"
      cancelLabel="Cancel"
    />
  );
}
