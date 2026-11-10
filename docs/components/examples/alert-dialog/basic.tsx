"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

export default function AlertDialogBasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        leadingIcon={<Trash2 />}
        onClick={() => setOpen(true)}
      >
        Delete project
      </Button>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone. All files, deployments, and environment variables will be permanently removed."
        confirmLabel="Delete project"
        cancelLabel="Cancel"
      />
    </>
  );
}
