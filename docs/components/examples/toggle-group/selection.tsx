"use client";

import { Bold, Italic, Lamp, Moon, Sun, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@xingxingmofashu/ui";

export default function ToggleGroupSelectionDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <ToggleGroup aria-label="Theme" defaultValue={["light"]}>
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            icon={<Sun />}
          />
          <ToggleGroupItem value="dark" aria-label="Dark" icon={<Moon />} />
          <ToggleGroupItem value="dim" aria-label="Dim" icon={<Lamp />} />
        </ToggleGroup>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
          single
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
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
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ui-ink/60">
          multiple
        </span>
      </div>
    </div>
  );
}
