"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Button, Drawer } from "@xingxingmofashu/ui";

export default function DrawerSidesDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Open release notes"
        leadingIcon={<Menu />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction="right"
        title="Release notes"
        description="Version 2.4.0 is ready to ship."
        footer={
          <Button size="sm" label="Close" onClick={() => setOpen(false)} />
        }
      >
        <ul className="list-disc space-y-2 pl-5">
          <li>Added adaptive glass surfaces for every control.</li>
          <li>Improved keyboard navigation across grouped actions.</li>
          <li>Fixed focus restoration after nested overlays close.</li>
        </ul>
      </Drawer>
    </>
  );
}
