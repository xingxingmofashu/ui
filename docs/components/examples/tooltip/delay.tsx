"use client";

import { Zap } from "lucide-react";

import { Button, Tooltip } from "@xingxingmofashu/ui";

export default function TooltipDelayDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip
        delay={0}
        trigger={<Button label="No delay" leadingIcon={<Zap />} />}
      >
        Opens immediately
      </Tooltip>
      <Tooltip
        delay={1200}
        closeDelay={300}
        trigger={<Button label="Slow delay" />}
      >
        Opens after 1.2 seconds and waits 0.3 seconds to close
      </Tooltip>
    </div>
  );
}
