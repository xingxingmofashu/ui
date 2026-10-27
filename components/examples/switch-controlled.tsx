"use client";

import { useState } from "react";

import { useDocsLocale } from "@/components/locale-provider";
import { MonochromeSwitch } from "@/components/monochrome-switch";

export function SwitchControlled() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [checked, setChecked] = useState(true);

  return (
    <MonochromeSwitch
      checked={checked}
      onCheckedChange={setChecked}
      label={
        isZh
          ? checked
            ? "通知已开启"
            : "通知已关闭"
          : checked
            ? "Notifications on"
            : "Notifications off"
      }
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
  );
}
