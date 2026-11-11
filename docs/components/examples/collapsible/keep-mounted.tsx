"use client";

import { Collapsible, Input } from "@xingxingmofashu/ui";

export default function CollapsibleKeepMountedDemo() {
  return (
    <Collapsible
      keepMounted
      className="w-full max-w-md"
      trigger="Draft title"
    >
      <Input
        aria-label="Draft title"
        placeholder="Type, close the panel, then reopen it"
      />
    </Collapsible>
  );
}
