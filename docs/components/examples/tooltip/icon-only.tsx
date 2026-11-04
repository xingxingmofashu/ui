"use client";

import { Heart, Settings, Share2 } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipIconOnlyDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip
        trigger={<Button aria-label="Save to favorites" leadingIcon={<Heart />} />}
      >
        Save to favorites
      </Tooltip>
      <Tooltip
        trigger={<Button aria-label="Share this page" leadingIcon={<Share2 />} />}
      >
        Share this page
      </Tooltip>
      <Tooltip
        trigger={<Button aria-label="Open settings" leadingIcon={<Settings />} />}
      >
        Open settings
      </Tooltip>
    </div>
  );
}
