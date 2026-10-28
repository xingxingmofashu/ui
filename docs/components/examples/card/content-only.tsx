"use client";

import { Card } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function CardContentOnlyDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <Card className="w-full max-w-sm">
      <div className="text-sm text-ink/70">
        {isZh ? "只有 body 的卡片。" : "A card with only a body."}
      </div>
    </Card>
  );
}
