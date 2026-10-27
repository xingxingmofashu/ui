"use client";

import { ArrowRight, Plus, RotateCcw, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@xingxingmofashu.me/ui";

import { DemoStage } from "@/components/demo-stage";
import { useDocsLocale } from "@/components/locale-provider";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function ButtonBasic() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [count, setCount] = useState(0);

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Button 组件 · 点击按钮更新状态"
          : "Live Button · click to update state"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            label={isZh ? "增加计数" : "Add one"}
            leadingIcon={<Plus />}
            onClick={() => setCount((value) => value + 1)}
          />
          <Button
            size="sm"
            label={isZh ? "重置" : "Reset"}
            leadingIcon={<RotateCcw />}
            onClick={() => setCount(0)}
            disabled={count === 0}
          />
        </div>
        <p aria-live="polite" className="text-sm text-fd-muted-foreground">
          {isZh
            ? `已点击 ${count} 次`
            : `Clicked ${count} ${count === 1 ? "time" : "times"}`}
        </p>
      </div>
    </DemoStage>
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
        {sizes.map((size) => (
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
        <Button label={isZh ? "新建" : "Create"} leadingIcon={<Plus />} />
        <Button label={isZh ? "搜索" : "Search"} leadingIcon={<Search />} />
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

export function ButtonFullWidth() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Button 组件 · 全宽" : "Live Button · full width"
      }
    >
      <Button label={isZh ? "全宽" : "Full width"} className="w-full" />
    </DemoStage>
  );
}

export function ButtonLink() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh ? "真实 Button 组件 · 渲染为链接" : "Live Button · rendered as a link"
      }
    >
      <Button
        nativeButton={false}
        render={<a href={`/${locale}/docs`} />}
        label={isZh ? "阅读文档" : "Read the docs"}
        trailingIcon={<ArrowRight />}
      />
    </DemoStage>
  );
}
