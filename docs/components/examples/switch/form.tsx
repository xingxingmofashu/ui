"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Switch } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SwitchFormDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = data.get("notifications");
    setSubmitted(value === null ? "off" : String(value));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <Switch
        name="notifications"
        value="enabled"
        label={isZh ? "接收通知" : "Receive notifications"}
        description={
          isZh
            ? "开启后，新消息会推送到你的邮箱。"
            : "When enabled, new messages are sent to your inbox."
        }
        defaultChecked
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="submit"
          size="sm"
          label={isZh ? "提交" : "Submit"}
          trailingIcon={<ArrowRight />}
        />
        <p aria-live="polite" className="text-sm text-fd-muted-foreground">
          {submitted === null
            ? isZh
              ? "尚未提交"
              : "Not submitted yet"
            : submitted === "off"
              ? isZh
                ? "未启用"
                : "Not enabled"
              : isZh
                ? `提交值：${submitted}`
                : `Submitted: ${submitted}`}
        </p>
      </div>
    </form>
  );
}
