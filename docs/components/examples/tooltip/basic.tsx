"use client";

import { Eye, Rocket, Save } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip trigger={<Button leadingIcon={<Save />}>Save</Button>}>
        Save changes
      </Tooltip>
      <Tooltip trigger={<Button leadingIcon={<Eye />}>Preview</Button>}>
        Preview the current draft
      </Tooltip>
      <Tooltip trigger={<Button leadingIcon={<Rocket />}>Publish</Button>}>
        Publish to everyone
      </Tooltip>
    </div>
  );
}
