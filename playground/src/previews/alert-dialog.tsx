import { Trash2, Upload, UserMinus } from "lucide-react";
import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

function AlertDialogPreview() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No changes published.");

  return (
    <>
      <DemoGroup label="Basic">
        <AlertDialog
          trigger={<Button label="Delete project" leadingIcon={<Trash2 />} />}
          title="Delete project?"
          description="This action cannot be undone. All files, deployments, and environment variables will be permanently removed."
          confirmLabel="Delete project"
          cancelLabel="Cancel"
        />
      </DemoGroup>

      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
          <Button
            label="Publish changes"
            leadingIcon={<Upload />}
            onClick={() => setOpen(true)}
          />
          <AlertDialog
            open={open}
            onOpenChange={setOpen}
            title="Publish changes?"
            description="The current draft will become the live version for everyone."
            confirmLabel="Publish"
            onConfirm={() => setStatus("Changes published.")}
            onCancel={() => setStatus("Publish cancelled.")}
          />
          <Status>{status}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Content">
        <AlertDialog
          trigger={
            <Button label="Remove member" leadingIcon={<UserMinus />} />
          }
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
      </DemoGroup>
    </>
  );
}

export { AlertDialogPreview };
