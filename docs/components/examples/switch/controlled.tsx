"use client";

import { useState } from "react";

import { Switch } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SwitchControlledDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full max-w-sm">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label={isZh ? "接收通知" : "Receive notifications"}
        description={
          isZh
            ? checked
              ? "新消息会推送到你的邮箱。"
              : "当前不会发送任何通知。"
            : checked
              ? "New messages will be sent to your inbox."
              : "No notifications will be sent right now."
        }
      />
    </div>
  );
}
