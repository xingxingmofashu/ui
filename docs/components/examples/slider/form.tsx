"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Slider } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SliderFormDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(String(data.get("volume") ?? ""));
  }

  return (
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
  );
}
