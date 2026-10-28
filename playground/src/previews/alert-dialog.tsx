import { Trash2, Upload, UserMinus } from "lucide-react";
import { useState } from "react";

import { AlertDialog, Button } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

function AlertDialogPreview() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [status, setStatus] = useState("No changes published.");

  return (
    <>
      <DemoGroup label="Basic">
        <Button
          label="Delete project"
          leadingIcon={<Trash2 />}
          onClick={() => setBasicOpen(true)}
        />
        <AlertDialog
          open={basicOpen}
          onOpenChange={setBasicOpen}
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
            onClick={() => setControlledOpen(true)}
          />
          <AlertDialog
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            title="Publish changes?"
            description="The current draft will become the live version for everyone."
            confirmLabel="Publish"
            cancelLabel="Cancel"
            onConfirm={() => setStatus("Changes published.")}
            onCancel={() => setStatus("Publish cancelled.")}
          />
          <Status>{status}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Content">
        <Button
          label="Remove member"
          leadingIcon={<UserMinus />}
          onClick={() => setContentOpen(true)}
        />
        <AlertDialog
          open={contentOpen}
          onOpenChange={setContentOpen}
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
