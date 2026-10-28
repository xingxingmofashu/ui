"use client";

import { Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@xingxingmofashu.me/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ButtonBasicDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-4">
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
  );
}
