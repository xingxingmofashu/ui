"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ToggleGroupControlledDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [value, setValue] = useState<string[]>(["bold"]);

  return (
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
  );
}
