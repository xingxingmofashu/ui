import { Bold, Italic, Lock, Pin, Underline } from "lucide-react";
import { useState } from "react";

import { Button, Toggle } from "@xingxingmofashu/ui";

import { DemoGroup, Status } from "../demo";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function TogglePreview() {
  const [pinned, setPinned] = useState(false);

  return (
    <>
      <DemoGroup label="Basic">
        <Toggle label="Bold" icon={<Bold />} defaultPressed />
      </DemoGroup>

      <DemoGroup label="Sizes">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Toggle
              key={size}
              size={size}
              label={size.toUpperCase()}
              defaultPressed={size === "md"}
            />
          ))}
        </div>
      </DemoGroup>

      <DemoGroup label="Icon only">
        <div className="flex items-center gap-2">
          <Toggle aria-label="Bold" icon={<Bold />} defaultPressed />
          <Toggle aria-label="Italic" icon={<Italic />} />
          <Toggle aria-label="Underline" icon={<Underline />} />
        </div>
      </DemoGroup>

      <DemoGroup label="Controlled">
        <div className="flex flex-col items-start gap-3">
          <Toggle
            label="Pin to favorites"
            icon={<Pin />}
            pressed={pinned}
            onPressedChange={setPinned}
          />
          <Status>{pinned ? "Pinned to favorites." : "Not pinned."}</Status>
          <Button
            size="sm"
            label={pinned ? "Unpin externally" : "Pin externally"}
            onClick={() => setPinned((current) => !current)}
          />
        </div>
      </DemoGroup>

      <DemoGroup label="Disabled">
        <div className="flex flex-wrap gap-3">
          <Toggle label="Disabled" icon={<Lock />} disabled />
          <Toggle
            label="Disabled pressed"
            icon={<Lock />}
            disabled
            defaultPressed
          />
        </div>
      </DemoGroup>
    </>
  );
}

export { TogglePreview };
