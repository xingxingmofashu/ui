"use client";

import { Info } from "lucide-react";
import { useState } from "react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip
          open={open}
          onOpenChange={setOpen}
          arrow={false}
          content="Controlled by external state"
          trigger={<Button label="Hover or focus" leadingIcon={<Info />} />}
        />
        <Button
          label={open ? "Hide tooltip" : "Show tooltip"}
          onClick={() => setOpen((value) => !value)}
        />
      </div>
      <p className="text-sm text-ui-ink/60">
        The tooltip is {open ? "open" : "closed"}.
      </p>
    </div>
  );
}
