"use client";

import { Eye, Rocket, Save } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip
        content="Save changes"
        trigger={<Button label="Save" leadingIcon={<Save />} />}
      />
      <Tooltip
        content="Preview the current draft"
        trigger={<Button label="Preview" leadingIcon={<Eye />} />}
      />
      <Tooltip
        content="Publish to everyone"
        trigger={<Button label="Publish" leadingIcon={<Rocket />} />}
      />
    </div>
  );
}
