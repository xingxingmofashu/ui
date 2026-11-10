"use client";

import { Button, Popover } from "@xingxingmofashu/ui";

export default function PopoverOffsetsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Popover
        trigger={<Button size="sm">Align start</Button>}
        title="Aligned to the start"
        description="align, alignOffset, and collisionPadding control how the popup sits next to the trigger."
        side="bottom"
        align="start"
        alignOffset={24}
        collisionPadding={32}
        arrow={false}
      >
        <p className="text-sm text-ui-ink/70">
          The popup starts 24px in from the trigger edge and keeps 32px away from
          the viewport. No arrow is rendered.
        </p>
      </Popover>

      <Popover
        trigger={<Button size="sm">Right aligned</Button>}
        title="Right aligned"
        description="The arrow follows the resolved side automatically."
        side="right"
        align="end"
        alignOffset={-8}
      >
        <p className="text-sm text-ui-ink/70">
          This popup prefers the right side and is aligned to the end.
        </p>
      </Popover>
    </div>
  );
}
