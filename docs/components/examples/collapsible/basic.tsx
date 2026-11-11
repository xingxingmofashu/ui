"use client";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleTriggerDemo() {
  return (
    <Collapsible className="w-full max-w-md" trigger="Shipping details">
      Standard shipping takes 3-5 business days. Express delivery arrives in
      1-2 business days.
    </Collapsible>
  );
}
