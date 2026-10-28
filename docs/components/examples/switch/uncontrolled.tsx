"use client";

import { Switch } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function SwitchUncontrolledDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full max-w-sm">
        <Switch
          label={isZh ? "启用通知" : "Enable notifications"}
          description={
            isZh
              ? "新消息会推送到你的邮箱。"
              : "New messages will be sent to your inbox."
          }
          defaultChecked
        />
      </div>
      <Switch
        aria-label={isZh ? "启用通知" : "Enable notifications"}
        defaultChecked
      />
    </div>
  );
}
