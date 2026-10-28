"use client";

import { Switch } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SwitchBasicDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="w-full max-w-sm">
      <Switch
        label={isZh ? "接收通知" : "Receive notifications"}
        description={
          isZh
            ? "开启后，新消息会推送到你的邮箱。"
            : "When enabled, new messages are sent to your inbox."
        }
        defaultChecked
      />
    </div>
  );
}
