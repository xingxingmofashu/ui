"use client";

import { Bold, Italic, Lamp, Moon, Sun, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ToggleGroupSelectionDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
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
  );
}
