"use client";

import { ArrowRight, Plus, Search } from "lucide-react";

import { Button } from "@xingxingmofashu/ui";

import { useDocsLocale } from "@/components/locale-provider";

export default function ButtonIconsDemo() {
  const locale = useDocsLocale();
  const isZh = locale === "zh";

  return (
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
  );
}
