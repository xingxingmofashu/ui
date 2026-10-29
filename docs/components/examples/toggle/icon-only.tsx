"use client";

import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "@xingxingmofashu/ui";

export default function ToggleIconOnlyDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold" icon={<Bold />} defaultPressed />
      <Toggle aria-label="Italic" icon={<Italic />} />
      <Toggle aria-label="Underline" icon={<Underline />} />
    </div>
  );
}
