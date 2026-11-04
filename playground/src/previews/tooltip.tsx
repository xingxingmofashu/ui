import { Info, Save, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sides = ["top", "right", "bottom", "left"] as const;

function TooltipPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoGroup label="Basic">
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip
            content="Save changes"
            trigger={<Button label="Save" leadingIcon={<Save />} />}
          />
          <Tooltip
            content="This action cannot be undone"
            trigger={
              <Button aria-label="Delete" leadingIcon={<Trash2 />} />
            }
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Placement">
        <div className="flex flex-wrap items-center gap-3">
          {sides.map((side) => (
            <Tooltip
              key={side}
              side={side}
              content={`Placed on the ${side}`}
              trigger={<Button size="sm" label={side} />}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Controlled">
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
              size="sm"
              label={open ? "Hide tooltip" : "Show tooltip"}
              onClick={() => setOpen((value) => !value)}
            />
          </div>
          <Status>The tooltip is {open ? "open" : "closed"}.</Status>
        </div>
      </DemoGroup>
    </>
  );
}

export { TooltipPreview };
