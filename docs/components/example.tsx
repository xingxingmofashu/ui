"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { DemoStage } from "@/components/demo-stage";
import { examples, type ExampleName } from "@/components/examples/registry";
import { useDocsLocale } from "@/components/locale-provider";

export function Example({ name }: { name: ExampleName }) {
  const locale = useDocsLocale();
  const isZh = locale === "zh";
  const [open, setOpen] = useState(false);
  const codeId = useId();
  const { Demo, source } = examples[name];

  return (
    <DemoStage
      footer={
        <div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={codeId}
            className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <span>{open ? (isZh ? "收起代码" : "Hide code") : isZh ? "查看代码" : "View code"}</span>
            <ChevronDown
              className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <div id={codeId} hidden={!open}>
            {open ? <DynamicCodeBlock lang="tsx" code={source} /> : null}
          </div>
        </div>
      }
    >
      <Demo />
    </DemoStage>
  );
}
