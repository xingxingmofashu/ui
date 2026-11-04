"use client";

import { Eye, Rocket, Save } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip trigger={<Button label="Save" leadingIcon={<Save />} />}>
        Save changes
      </Tooltip>
      <Tooltip trigger={<Button label="Preview" leadingIcon={<Eye />} />}>
        Preview the current draft
      </Tooltip>
      <Tooltip trigger={<Button label="Publish" leadingIcon={<Rocket />} />}>
        Publish to everyone
      </Tooltip>
    </div>
  );
}
