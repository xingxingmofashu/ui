"use client";

import { Sparkles } from "lucide-react";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleIndicatorDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Collapsible
        indicator={<Sparkles className="size-3" />}
        trigger="Custom icon"
      >
        The indicator slot accepts any React node and still rotates when the
        panel opens.
      </Collapsible>

      <Collapsible indicator={false} trigger="No indicator">
        Set the indicator to false when the trigger should read as plain text.
      </Collapsible>
    </div>
  );
}
