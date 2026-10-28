"use client";

import { Button } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ButtonFullWidthDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return <Button label={isZh ? "全宽" : "Full width"} className="w-full" />;
}
