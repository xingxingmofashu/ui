"use client";

import { ArrowRight } from "lucide-react";

import { Button, Card } from "@xingxingmofashu.me/ui";

import { DemoStage } from "@/components/demo-stage";
import { useDocsLocale } from "@/components/locale-provider";

export function CardBasic() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Card 组件 · header / body / footer"
          : "Live Card · header / body / footer"
      }
    >
      <Card
        className="w-full max-w-md"
        title={isZh ? "液态玻璃" : "Liquid glass"}
        description={
          isZh
            ? "纯 CSS 磨砂玻璃面板。"
            : "A CSS-only frosted glass panel."
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
    </DemoStage>
  );
}

export function CardContentOnly() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Card 组件 · 仅内容" : "Live Card · content only"
      }
    >
      <Card className="w-full max-w-sm">
        <div className="text-sm text-ink/70">
          {isZh ? "只有 body 的卡片。" : "A card with only a body."}
        </div>
      </Card>
    </DemoStage>
  );
}

export function CardCustomSlots() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Card 组件 · 自定义槽位" : "Live Card · custom slots"
      }
    >
      <Card
        className="w-full max-w-md"
        ui={{
          header: "border-b border-glass-border",
          body: "bg-glass-surface/50",
          title: "tracking-tight",
        }}
        title={isZh ? "自定义样式" : "Custom styles"}
        description={
          isZh
            ? "通过 ui 调整内部结构。"
            : "Adjust internal structure with ui."
        }
      >
        <div className="text-sm text-ink/70">
          {isZh ? "内容是默认插槽。" : "The default slot goes here."}
        </div>
      </Card>
    </DemoStage>
  );
}
