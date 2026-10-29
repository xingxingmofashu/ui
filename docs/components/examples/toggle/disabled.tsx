"use client";

import { Lock } from "lucide-react";

import { Toggle } from "@xingxingmofashu/ui";

export default function ToggleDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle label="Disabled" icon={<Lock />} disabled />
      <Toggle label="Disabled pressed" icon={<Lock />} disabled defaultPressed />
    </div>
  );
}
