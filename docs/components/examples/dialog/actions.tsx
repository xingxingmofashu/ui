"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";

import { Button, Dialog } from "@xingxingmofashu/ui";

export default function DialogActionsDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No release published.");

  function close(nextStatus: string) {
    setStatus(nextStatus);
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        label="Publish release"
        leadingIcon={<Rocket />}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Publish release 2.4.0?"
        description="The release will become available to everyone immediately."
        footer={
          <>
            <Button
              size="sm"
              label="Cancel"
              onClick={() => close("Release cancelled.")}
            />
            <Button
              size="sm"
              label="Save draft"
              onClick={() => close("Draft saved.")}
            />
            <Button
              size="sm"
              label="Publish"
              onClick={() => close("Release 2.4.0 published.")}
            />
          </>
        }
      >
        <ul className="list-disc space-y-1 pl-5">
          <li>12 features and fixes are included.</li>
          <li>The previous release stays available.</li>
          <li>Rolling back takes one click.</li>
        </ul>
      </Dialog>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}
