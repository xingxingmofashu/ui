"use client";

import { Switch } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SwitchStatesDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      <Switch label={isZh ? "禁用" : "Disabled"} disabled />
      <Switch
        label={isZh ? "只读" : "Read-only"}
        readOnly
        defaultChecked
      />
    </div>
  );
}
