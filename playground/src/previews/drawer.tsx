import { Menu, Settings } from "lucide-react";
import { useState } from "react";

import { Button, Drawer, Switch } from "@xingxingmofashu/ui";

import { DemoGroup } from "../demo";

function DrawerPreview() {
  const [bottomOpen, setBottomOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <>
      <DemoGroup label="Bottom">
        <Button
          label="Open settings"
          leadingIcon={<Settings />}
          onClick={() => setBottomOpen(true)}
        />
        <Drawer
          open={bottomOpen}
          onOpenChange={setBottomOpen}
          title="Workspace settings"
          description="Choose how your workspace behaves for everyone on the team."
          footer={
            <>
              <Button
                size="sm"
                label="Cancel"
                onClick={() => setBottomOpen(false)}
              />
              <Button
                size="sm"
                label="Save changes"
                onClick={() => setBottomOpen(false)}
              />
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Switch
              label="Email notifications"
              description="Send a summary when a teammate publishes changes."
              defaultChecked
            />
            <Switch
              label="Weekly digest"
              description="Email the team every Monday morning."
            />
            <Switch
              label="Mentions"
              description="Notify you when someone mentions your name."
              defaultChecked
            />
          </div>
        </Drawer>
      </DemoGroup>

      <DemoGroup label="Side">
        <Button
          label="Open release notes"
          leadingIcon={<Menu />}
          onClick={() => setSideOpen(true)}
        />
        <Drawer
          open={sideOpen}
          onOpenChange={setSideOpen}
          direction="right"
          title="Release notes"
          description="Version 2.4.0 is ready to ship."
          footer={
            <Button
              size="sm"
              label="Close"
              onClick={() => setSideOpen(false)}
            />
          }
        >
          <ul className="list-disc space-y-2 pl-5">
            <li>Added adaptive glass surfaces for every control.</li>
            <li>Improved keyboard navigation across grouped actions.</li>
            <li>Fixed focus restoration after nested overlays close.</li>
          </ul>
        </Drawer>
      </DemoGroup>
    </>
  );
}

export { DrawerPreview };
