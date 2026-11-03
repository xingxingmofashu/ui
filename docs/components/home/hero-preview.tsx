"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Card, Slider, Switch, ToggleGroup } from "@xingxingmofashu/ui";
import {
  GlassPresetScope,
  type GlassPreset,
} from "@xingxingmofashu/ui/plugins/glass-preset";

import content from "./content.json";

const presetItems = [
  { value: "thin", label: content.hero.preview.presets.thin },
  { value: "regular", label: content.hero.preview.presets.regular },
  { value: "thick", label: content.hero.preview.presets.thick },
] as const;

export function HeroPreview() {
  const preview = content.hero.preview;
  const [preset, setPreset] = useState<GlassPreset>("thin");
  const [glare, setGlare] = useState(64);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 size-44 rounded-full border border-fd-border bg-fd-muted/30 blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 size-52 rounded-[2.5rem] border border-fd-border bg-fd-muted/20"
      />

      <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fd-muted-foreground backdrop-blur">
        <span className="size-1.5 rounded-full bg-fd-foreground" />
        {preview.label}
      </span>

      <GlassPresetScope preset={preset} className="relative z-10 mt-4">
        <Card title={preview.title} description={preview.description}>
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-ui-ink/65">{preview.presetLabel}</span>
              <span className="font-mono uppercase tracking-[0.14em] text-ui-ink/45">
                {preview.presets[preset]}
              </span>
            </div>

            <ToggleGroup
              aria-label={preview.presetLabel}
              size="sm"
              value={[preset]}
              onValueChange={(value) => {
                const next = value[0];

                if (
                  next === "thin" ||
                  next === "regular" ||
                  next === "thick"
                ) {
                  setPreset(next);
                }
              }}
              items={presetItems}
            />

            <div className="h-px bg-ui-glass-border" />

            <Switch label={preview.switchLabel} defaultChecked />

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-ui-ink/65">{preview.glareLabel}</span>
                <span className="font-mono tabular-nums text-ui-ink/45">
                  {glare}
                </span>
              </div>
              <Slider
                aria-label={preview.glareLabel}
                value={glare}
                onValueChange={setGlare}
              />
            </div>
          </div>
        </Card>
      </GlassPresetScope>

      <div className="relative z-10 mt-4 flex items-center justify-between gap-4 text-xs text-fd-muted-foreground">
        <span>{preview.footerLabel}</span>
        <Link
          href="/docs/en/components/card"
          className="inline-flex items-center gap-1.5 font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
        >
          {preview.footerLink}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
