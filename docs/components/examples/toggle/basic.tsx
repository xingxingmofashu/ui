"use client";

import { Bold } from "lucide-react";

import { Toggle } from "@xingxingmofashu/ui";

export default function ToggleBasicDemo() {
  return <Toggle label="Bold" icon={<Bold />} defaultPressed />;
}
