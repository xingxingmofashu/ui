import { Rocket, Settings } from "lucide-react";
import { useState } from "react";

import { Button, Popover, Switch, ToggleGroup } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sideOptions = [
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
] as const;

type Side = (typeof sideOptions)[number]["value"];

function PopoverPreview() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No release published.");
  const [side, setSide] = useState<Side>("bottom");

  function close(nextStatus: string) {
    setStatus(nextStatus);
    setOpen(false);
  }

  return (
    <>
      <DemoGroup label="Basic">
        <Popover
          trigger={<Button label="Open settings" leadingIcon={<Settings />} />}
          title="Workspace settings"
          description="Changes apply to everyone on the team."
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
          </div>
        </Popover>
      </DemoGroup>

      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
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
          <Status>{status}</Status>
        </div>
      </DemoGroup>

      <DemoGroup label="Placement">
        <div className="flex flex-col items-start gap-3">
          <ToggleGroup
            aria-label="Popover side"
            size="sm"
            value={[side]}
            onValueChange={(value) => {
              const next = value[0];

              if (
                next === "top" ||
                next === "right" ||
                next === "bottom" ||
                next === "left"
              ) {
                setSide(next);
              }
            }}
            items={sideOptions}
          />

          <Popover
            side={side}
            align="center"
            sideOffset={10}
            trigger={<Button label={`Open ${side} popover`} />}
            title="Placement"
            description={`This popover prefers the ${side} side of its trigger.`}
          >
            <p>
              Base UI flips the popup to the opposite side when there is not
              enough room.
            </p>
          </Popover>
        </div>
      </DemoGroup>
    </>
  );
}

export { PopoverPreview };
