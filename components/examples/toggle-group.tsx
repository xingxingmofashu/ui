"use client";

import {
  Bold,
  Italic,
  Lamp,
  LayoutGrid,
  List,
  Moon,
  Sun,
  Underline,
} from "lucide-react";
import { useState } from "react";

import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@xingxingmofashu.me/ui";

import { DemoStage } from "@/components/demo-stage";
import { useDocsLocale } from "@/components/locale-provider";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function ToggleGroupBasic() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [value, setValue] = useState<string[]>(["grid"]);
  const selected = value[0] ?? "";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 受控单选"
          : "Live Toggle Group · controlled single selection"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <ToggleGroup
          aria-label={isZh ? "视图" : "View"}
          value={value}
          onValueChange={setValue}
        >
          <ToggleGroupItem
            value="grid"
            aria-label={isZh ? "网格" : "Grid"}
            icon={<LayoutGrid />}
          >
            {isZh ? "网格" : "Grid"}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label={isZh ? "列表" : "List"}
            icon={<List />}
          >
            {isZh ? "列表" : "List"}
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-fd-muted-foreground">
          {isZh
            ? `当前视图：${
                selected === "grid"
                  ? "网格"
                  : selected === "list"
                    ? "列表"
                    : "未选择"
              }`
            : `Current view: ${
                selected === "grid"
                  ? "Grid"
                  : selected === "list"
                    ? "List"
                    : "None"
              }`}
        </p>
      </div>
    </DemoStage>
  );
}

export function ToggleGroupSizes() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

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
              aria-label={isZh ? `${size} 尺寸` : `${size} toggle group`}
              defaultValue={["one"]}
              size={size}
            >
              <ToggleGroupItem value="one" aria-label={isZh ? "一" : "One"}>
                {isZh ? "一" : "One"}
              </ToggleGroupItem>
              <ToggleGroupItem value="two" aria-label={isZh ? "二" : "Two"}>
                {isZh ? "二" : "Two"}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="three"
                aria-label={isZh ? "三" : "Three"}
              >
                {isZh ? "三" : "Three"}
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

export function ToggleGroupSelection() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 单选与多选"
          : "Live Toggle Group · single and multiple selection"
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ToggleGroup
            aria-label={isZh ? "主题" : "Theme"}
            defaultValue={["light"]}
          >
            <ToggleGroupItem
              value="light"
              aria-label={isZh ? "浅色" : "Light"}
              icon={<Sun />}
            />
            <ToggleGroupItem
              value="dark"
              aria-label={isZh ? "深色" : "Dark"}
              icon={<Moon />}
            />
            <ToggleGroupItem
              value="dim"
              aria-label={isZh ? "暗色" : "Dim"}
              icon={<Lamp />}
            />
          </ToggleGroup>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
            {isZh ? "单选" : "single"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ToggleGroup
            aria-label={isZh ? "文本格式" : "Text formatting"}
            defaultValue={["bold"]}
            multiple
          >
            <ToggleGroupItem
              value="bold"
              aria-label={isZh ? "粗体" : "Bold"}
              icon={<Bold />}
            />
            <ToggleGroupItem
              value="italic"
              aria-label={isZh ? "斜体" : "Italic"}
              icon={<Italic />}
            />
            <ToggleGroupItem
              value="underline"
              aria-label={isZh ? "下划线" : "Underline"}
              icon={<Underline />}
            />
          </ToggleGroup>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
            {isZh ? "多选" : "multiple"}
          </span>
        </div>
      </div>
    </DemoStage>
  );
}

export function ToggleGroupOrientation() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 纵向布局"
          : "Live Toggle Group · vertical orientation"
      }
    >
      <ToggleGroup
        aria-label={isZh ? "位置" : "Position"}
        defaultValue={["top"]}
        orientation="vertical"
      >
        <ToggleGroupItem value="top" aria-label={isZh ? "顶部" : "Top"}>
          {isZh ? "顶部" : "Top"}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="middle"
          aria-label={isZh ? "中间" : "Middle"}
        >
          {isZh ? "中间" : "Middle"}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bottom"
          aria-label={isZh ? "底部" : "Bottom"}
        >
          {isZh ? "底部" : "Bottom"}
        </ToggleGroupItem>
      </ToggleGroup>
    </DemoStage>
  );
}

export function ToggleGroupControlled() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [value, setValue] = useState<string[]>(["bold"]);

  return (
    <DemoStage
      label={
        isZh
          ? "真实 Toggle Group 组件 · 受控多选"
          : "Live Toggle Group · controlled multiple selection"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <ToggleGroup
          aria-label={isZh ? "文本格式" : "Text formatting"}
          multiple
          value={value}
          onValueChange={setValue}
        >
          <ToggleGroupItem
            value="bold"
            aria-label={isZh ? "粗体" : "Bold"}
            icon={<Bold />}
          />
          <ToggleGroupItem
            value="italic"
            aria-label={isZh ? "斜体" : "Italic"}
            icon={<Italic />}
          />
          <ToggleGroupItem
            value="underline"
            aria-label={isZh ? "下划线" : "Underline"}
            icon={<Underline />}
          />
        </ToggleGroup>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-fd-muted-foreground">
            {isZh
              ? `已选：${value.length ? value.join("、") : "无"}`
              : `Selected: ${value.length ? value.join(", ") : "none"}`}
          </span>
          <Button
            size="sm"
            label={isZh ? "清空" : "Clear"}
            onClick={() => setValue([])}
            disabled={value.length === 0}
          />
        </div>
      </div>
    </DemoStage>
  );
}
