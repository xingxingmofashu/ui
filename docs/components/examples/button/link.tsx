"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ButtonLinkDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <Button
      nativeButton={false}
      render={<a href={`/${locale}/docs`} />}
      label={isZh ? "阅读文档" : "Read the docs"}
      trailingIcon={<ArrowRight />}
    />
  );
}
