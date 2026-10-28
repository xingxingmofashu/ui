"use client";

import { ArrowRight } from "lucide-react";

import { Button, Card } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function CardBasicDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <Card
      className="w-full max-w-md"
      title={isZh ? "液态玻璃" : "Liquid glass"}
      description={
        isZh ? "纯 CSS 磨砂玻璃面板。" : "A CSS-only frosted glass panel."
      }
      footer={
        <Button
          size="sm"
          label={isZh ? "查看" : "View"}
          trailingIcon={<ArrowRight />}
        />
      }
    >
      <div className="text-sm text-ink/70">
        {isZh
          ? "把卡片放在有细节的背景上，就能看到玻璃效果。"
          : "Place the card over a detailed background to see the glass effect."}
      </div>
    </Card>
  );
}
