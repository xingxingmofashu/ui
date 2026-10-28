"use client";

import { Card } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function CardCustomSlotsDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <Card
      className="w-full max-w-md"
      ui={{
        header: "border-b border-glass-border",
        body: "bg-glass-surface/50",
        title: "tracking-tight",
      }}
      title={isZh ? "自定义样式" : "Custom styles"}
      description={
        isZh ? "通过 ui 调整内部结构。" : "Adjust internal structure with ui."
      }
    >
      <div className="text-sm text-ink/70">
        {isZh ? "内容是默认插槽。" : "The default slot goes here."}
      </div>
    </Card>
  );
}
