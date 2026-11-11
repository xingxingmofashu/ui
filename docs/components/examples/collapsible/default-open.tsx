"use client";

import { Collapsible } from "@xingxingmofashu/ui";

export default function CollapsibleDefaultOpenDemo() {
  return (
    <Collapsible
      defaultOpen
      className="w-full max-w-md"
      trigger="Return policy"
    >
      You can return any item within 30 days of delivery. Opened items may be
      subject to a restocking fee.
    </Collapsible>
  );
}
