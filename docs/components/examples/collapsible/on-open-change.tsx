"use client";

import { useState } from "react";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleOnOpenChangeDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        trigger="Order tracking"
      >
        Once your order ships, you will receive a tracking link by email.
        Tracking updates can take up to 24 hours to appear.
      </Collapsible>

      <p className="text-sm text-ui-ink/60">
        The panel is {open ? "open" : "closed"}.
      </p>
    </div>
  );
}
