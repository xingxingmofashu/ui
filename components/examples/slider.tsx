"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Slider } from "@xingxingmofashu.me/ui";

import { DemoStage } from "@/components/demo-stage";
import { useDocsLocale } from "@/components/locale-provider";

export function SliderBasic() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [volume, setVolume] = useState(40);

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Slider 组件 · 受控音量"
          : "Live Slider · controlled volume"
      }
    >
      <div className="w-full max-w-md">
        <Slider
          label={isZh ? "音量" : "Volume"}
          description={
            isZh
              ? "拖动玻璃滑块，或使用方向键调整。"
              : "Drag the glass thumb or use the arrow keys."
          }
          showValue
          value={volume}
          onValueChange={setVolume}
        />
      </div>
    </DemoStage>
  );
}

export function SliderRange() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Slider 组件 · 双滑块价格区间"
          : "Live Slider · two-thumb price range"
      }
    >
      <div className="w-full max-w-md">
        <Slider
          label={isZh ? "价格区间" : "Price range"}
          description={
            isZh
              ? "每个值对应一个滑块，数值通过 Intl.NumberFormat 格式化。"
              : "One thumb per value, formatted with Intl.NumberFormat."
          }
          defaultValue={[25, 75]}
          showValue
          format={{ style: "currency", currency: "USD" }}
        />
      </div>
    </DemoStage>
  );
}

export function SliderVertical() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Slider 组件 · 纵向布局"
          : "Live Slider · vertical orientation"
      }
    >
      <Slider
        aria-label={isZh ? "等级" : "Level"}
        orientation="vertical"
        defaultValue={60}
        ui={{ control: "h-48" }}
      />
    </DemoStage>
  );
}

export function SliderDisabled() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Slider 组件 · 禁用状态" : "Live Slider · disabled state"
      }
    >
      <div className="w-full max-w-sm">
        <Slider
          aria-label={isZh ? "禁用滑块" : "Disabled slider"}
          defaultValue={35}
          disabled
        />
      </div>
    </DemoStage>
  );
}

export function SliderForm() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(String(data.get("volume") ?? ""));
  }

  return (
    <DemoStage
      label={
        isZh ? "真实 Slider 组件 · 表单提交" : "Live Slider · form submission"
      }
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <Slider
          name="volume"
          label={isZh ? "音量" : "Volume"}
          description={
            isZh
              ? "提交表单时会通过隐藏的 range input 发送当前值。"
              : "The current value is submitted through a hidden range input."
          }
          defaultValue={40}
          showValue
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            type="submit"
            size="sm"
            label={isZh ? "提交" : "Submit"}
            trailingIcon={<ArrowRight />}
          />
          <p aria-live="polite" className="text-sm text-fd-muted-foreground">
            {submitted !== null
              ? isZh
                ? `提交值：${submitted}`
                : `Submitted: ${submitted}`
              : isZh
                ? "尚未提交"
                : "Not submitted yet"}
          </p>
        </div>
      </form>
    </DemoStage>
  );
}
