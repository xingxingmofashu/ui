"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";

import { Button, Popover } from "@xingxingmofashu/ui";

export default function PopoverControlledDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No release published.");

  function close(nextStatus: string) {
    setStatus(nextStatus);
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<Button label="Publish release" leadingIcon={<Rocket />} />}
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
              label="Publish"
              onClick={() => close("Release 2.4.0 published.")}
            />
          </>
        }
      >
        <p>12 features and fixes are included.</p>
      </Popover>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}
