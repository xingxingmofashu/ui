"use client";

import { useState } from "react";

import { Button, Menu } from "@xingxingmofashu/ui";

export default function MenuControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Menu
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Controlled menu</Button>}
          items={[
            { value: "profile", label: "Profile" },
            { value: "settings", label: "Settings" },
          ]}
        />
        <Button
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close menu" : "Open menu"}
        </Button>
      </div>
      <p className="text-sm text-ui-ink/60" aria-live="polite">
        The menu is {open ? "open" : "closed"}.
      </p>
    </div>
  );
}
