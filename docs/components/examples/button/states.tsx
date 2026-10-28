"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ButtonStatesDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button
        label={isZh ? "保存" : "Save"}
        trailingIcon={<ArrowRight />}
      />
      <Button label={isZh ? "不可用" : "Unavailable"} disabled />
    </div>
  );
}
