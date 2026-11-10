"use client";

import { MoveDown } from "lucide-react";
import { useState } from "react";

import { Button, Drawer } from "@xingxingmofashu/ui";

const DISMISS_REASONS: Record<string, string> = {
  swipe: "Dismissed with the swipe gesture.",
  "outside-press": "Dismissed by pressing the backdrop.",
  "escape-key": "Dismissed with the Escape key.",
  "close-press": "Dismissed with the close button.",
};

export default function DrawerGestureDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(
    "Open the drawer, then swipe it downward on a touch screen.",
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        leadingIcon={<MoveDown />}
        onClick={() => setOpen(true)}
      >
        Open gesture drawer
      </Button>

      <Drawer
        open={open}
        onOpenChange={(nextOpen, details) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            setStatus(
              DISMISS_REASONS[details.reason] ??
                "Closed with the Close button.",
            );
          }
        }}
        direction="down"
        title="Swipe to dismiss"
        description="Drag the panel toward the bottom edge and release past the threshold."
        footer={
          <Button
            size="sm"
            onClick={() => {
              setOpen(false);
              setStatus("Closed with the Close button.");
            }}
          >
            Close
          </Button>
        }
      >
        <div className="flex items-start gap-3">
          <MoveDown
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-ui-ink/50"
          />
          <p className="text-sm text-ui-ink/70">
            Swipe dismissal is designed for touch screens. On desktop, use the
            Close button, press the backdrop, or press Escape.
          </p>
        </div>
      </Drawer>

      <p aria-live="polite" className="text-sm text-ui-ink/60">
        {status}
      </p>
    </div>
  );
}
