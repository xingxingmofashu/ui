"use client";

import { Switch } from "@xingxingmofashu/ui";

export default function SwitchStatesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      <Switch label="Disabled" disabled />
      <Switch label="Read-only" readOnly defaultChecked />
    </div>
  );
}
