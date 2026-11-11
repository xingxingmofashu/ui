"use client";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleDisabledDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Collapsible disabled trigger="Shipping details">
        Disabled collapsibles ignore pointer and keyboard interaction.
      </Collapsible>

      <p className="text-sm text-ui-ink/60">
        The trigger stays in the layout but is skipped by the Tab key.
      </p>
    </div>
  );
}
