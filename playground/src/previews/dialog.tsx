import { Pencil, Rocket } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, Switch } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

function DialogPreview() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [status, setStatus] = useState("No release published.");

  function close(nextStatus: string) {
    setStatus(nextStatus);
    setActionsOpen(false);
  }

  return (
    <>
      <DemoGroup label="Basic">
        <Button
          label="Open settings"
          leadingIcon={<Pencil />}
          onClick={() => setBasicOpen(true)}
        />
        <Dialog
          open={basicOpen}
          onOpenChange={setBasicOpen}
          title="Workspace settings"
          description="Choose how your workspace behaves for everyone on the team."
          footer={
            <>
              <Button
                size="sm"
                label="Cancel"
                onClick={() => setBasicOpen(false)}
              />
              <Button
                size="sm"
                label="Save changes"
                onClick={() => setBasicOpen(false)}
              />
            </>
          }
        >
          <Switch
            label="Email notifications"
            description="Send a summary when a teammate publishes changes."
            defaultChecked
          />
        </Dialog>
      </DemoGroup>

      <DemoGroup label="Actions">
        <div className="flex flex-col items-start gap-3">
          <Button
            label="Publish release"
            leadingIcon={<Rocket />}
            onClick={() => setActionsOpen(true)}
          />
          <Dialog
            open={actionsOpen}
            onOpenChange={setActionsOpen}
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
          <Status>{status}</Status>
        </div>
      </DemoGroup>
    </>
  );
}

export { DialogPreview };
