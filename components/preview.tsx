"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Bold,
  Italic,
  Lamp,
  Moon,
  Plus,
  Search,
  Sun,
  Underline,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  Button,
  Card,
  ToggleGroup,
  ToggleGroupItem,
} from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "./locale-provider";
import { MonochromeSwitch } from "./monochrome-switch";

const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const switchSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function DemoStage({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-fd-border bg-fd-card/50">
      <div className="docs-grid relative flex min-h-56 items-center justify-center px-6 py-10 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-fd-background/30"
        />
        <div className="relative flex w-full flex-col items-center gap-6">
          {children}
        </div>
      </div>
      {label ? (
        <div className="border-t border-fd-border bg-fd-muted/30 px-4 py-2 text-xs text-fd-muted-foreground">
          {label}
        </div>
      ) : null}
    </div>
  );
}

export function ButtonSizes() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Button 组件 · 五种尺寸" : "Live Button · five sizes"
      }
    >
      <div className="flex flex-wrap items-end justify-center gap-4">
        {buttonSizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Button
              size={size}
              label={size.toUpperCase()}
              trailingIcon={<ArrowRight />}
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
              {size}
            </span>
          </div>
        ))}
      </div>
    </DemoStage>
  );
}

export function ButtonIcons() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Button 组件 · 图标与无障碍名称"
          : "Live Button · icons and accessible names"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          label={isZh ? "新建" : "Create"}
          leadingIcon={<Plus />}
        />
        <Button
          label={isZh ? "搜索" : "Search"}
          leadingIcon={<Search />}
        />
        <Button
          label={isZh ? "继续" : "Continue"}
          trailingIcon={<ArrowRight />}
        />
        <Button
          aria-label={isZh ? "下一步" : "Next"}
          leadingIcon={<ArrowRight />}
        />
      </div>
    </DemoStage>
  );
}

export function ButtonStates() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Button 组件 · 禁用状态" : "Live Button · disabled state"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          label={isZh ? "保存" : "Save"}
          trailingIcon={<ArrowRight />}
        />
        <Button label={isZh ? "不可用" : "Unavailable"} disabled />
      </div>
    </DemoStage>
  );
}

export function CardPreview() {
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
        title={isZh ? "黑白液态玻璃" : "Monochrome liquid glass"}
        description={
          isZh
            ? "纯 CSS 绘制的表面、边框高光与内阴影。"
            : "A CSS-only surface, rim highlight, and inner shadow."
        }
        footer={
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-fd-muted-foreground">
              {isZh ? "主题 token 驱动" : "Driven by theme tokens"}
            </span>
            <Button
              size="sm"
              label={isZh ? "查看详情" : "View details"}
              trailingIcon={<ArrowRight />}
            />
          </div>
        }
      >
        <p className="text-sm leading-6 text-ink/70">
          {isZh
            ? "把卡片放在有细节的背景上，玻璃层次会自然浮现。文档中的预览全部来自"
            : "Place the card over a detailed background and the glass layers appear naturally. Every preview in these docs comes from"}
          <code className="mx-1 rounded bg-fd-muted px-1 py-0.5 text-[0.8em]">
            @xingxingmofashu.me/ui
          </code>
          {isZh ? "本身。" : "itself."}
        </p>
        <div className="mt-4 border-t border-fd-border pt-4">
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
      </Card>
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
        {switchSizes.map((size) => (
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

export function ToggleGroupSizes() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 五种尺寸"
          : "Live Toggle Group · five sizes"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <ToggleGroup
              aria-label={`${size} toggle group`}
              defaultValue={["one"]}
              size={size}
            >
              <ToggleGroupItem value="one" aria-label="One">
                One
              </ToggleGroupItem>
              <ToggleGroupItem value="two" aria-label="Two">
                Two
              </ToggleGroupItem>
              <ToggleGroupItem value="three" aria-label="Three">
                Three
              </ToggleGroupItem>
            </ToggleGroup>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
              {size}
            </span>
          </div>
        ))}
      </div>
    </DemoStage>
  );
}

export function ToggleGroupModes() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 单选 / 多选 / 纵向"
          : "Live Toggle Group · single, multiple, and vertical"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-8">
        <ToggleGroup aria-label="Theme" defaultValue={["light"]} size="lg">
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            icon={<Sun />}
          />
          <ToggleGroupItem
            value="dark"
            aria-label="Dark"
            icon={<Moon />}
          />
          <ToggleGroupItem value="dim" aria-label="Dim" icon={<Lamp />} />
        </ToggleGroup>

        <ToggleGroup
          aria-label="Text formatting"
          defaultValue={["bold"]}
          multiple
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
            icon={<Bold />}
          />
          <ToggleGroupItem
            value="italic"
            aria-label="Italic"
            icon={<Italic />}
          />
          <ToggleGroupItem
            value="underline"
            aria-label="Underline"
            icon={<Underline />}
          />
        </ToggleGroup>

        <ToggleGroup
          aria-label="Text alignment"
          defaultValue={["left"]}
          size="xl"
        >
          <ToggleGroupItem
            value="left"
            aria-label="Align left"
            icon={<AlignLeft />}
          />
          <ToggleGroupItem
            value="center"
            aria-label="Align center"
            icon={<AlignCenter />}
          />
          <ToggleGroupItem
            value="right"
            aria-label="Align right"
            icon={<AlignRight />}
          />
        </ToggleGroup>

        <ToggleGroup
          aria-label="Position"
          defaultValue={["top"]}
          orientation="vertical"
        >
          <ToggleGroupItem value="top" aria-label="Top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="middle" aria-label="Middle">
            Middle
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Bottom">
            Bottom
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </DemoStage>
  );
}
