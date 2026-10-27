"use client";

import { ArrowRight } from "lucide-react";
import { useState, type CSSProperties, type FormEvent } from "react";

import { Button, Switch } from "@xingxingmofashu.me/ui";

import { DemoStage } from "@/components/demo-stage";
import { useDocsLocale } from "@/components/locale-provider";
import { MonochromeSwitch } from "@/components/monochrome-switch";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function SwitchBasic() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 黑白轨道"
          : "Live Switch · monochrome track"
      }
    >
      <div className="w-full max-w-sm">
        <MonochromeSwitch
          label={isZh ? "接收通知" : "Receive notifications"}
          description={
            isZh
              ? "开启后，新消息会推送到你的邮箱。"
              : "When enabled, new messages are sent to your inbox."
          }
          defaultChecked
        />
      </div>
    </DemoStage>
  );
}

export function SwitchSizes() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 黑白轨道 · 五种尺寸"
          : "Live Switch · monochrome track · five sizes"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
        {sizes.map((size) => (
          <MonochromeSwitch
            key={size}
            size={size}
            label={size.toUpperCase()}
            defaultChecked
          />
        ))}
      </div>
    </DemoStage>
  );
}

export function SwitchStates() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 禁用与只读"
          : "Live Switch · disabled and read-only"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <MonochromeSwitch label={isZh ? "禁用" : "Disabled"} disabled />
        <MonochromeSwitch
          label={isZh ? "只读" : "Read-only"}
          readOnly
          defaultChecked
        />
      </div>
    </DemoStage>
  );
}

export function SwitchControlled() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [checked, setChecked] = useState(true);

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 受控状态"
          : "Live Switch · controlled state"
      }
    >
      <div className="w-full max-w-sm">
        <MonochromeSwitch
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
    </DemoStage>
  );
}

export function SwitchUncontrolled() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 非受控状态"
          : "Live Switch · uncontrolled state"
      }
    >
      <div className="flex flex-col items-center gap-5">
        <div className="w-full max-w-sm">
          <MonochromeSwitch
            label={isZh ? "启用通知" : "Enable notifications"}
            description={
              isZh
                ? "新消息会推送到你的邮箱。"
                : "New messages will be sent to your inbox."
            }
            defaultChecked
          />
        </div>
        <MonochromeSwitch
          aria-label={isZh ? "启用通知" : "Enable notifications"}
          defaultChecked
        />
      </div>
    </DemoStage>
  );
}

export function SwitchForm() {
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
    <DemoStage
      label={
        isZh ? "真实 Switch 组件 · 表单提交" : "Live Switch · form submission"
      }
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <MonochromeSwitch
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
    </DemoStage>
  );
}

export function SwitchMonochrome() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Switch 组件 · 自定义轨道颜色"
          : "Live Switch · custom track colors"
      }
    >
      <div className="w-full max-w-sm">
        <Switch
          label={isZh ? "启用通知" : "Enable notifications"}
          style={
            {
              "--ui-switch-on": "var(--docs-switch-on)",
              "--ui-switch-off": "var(--docs-switch-off)",
            } as CSSProperties
          }
        />
      </div>
    </DemoStage>
  );
}
