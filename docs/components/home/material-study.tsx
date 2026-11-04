import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@xingxingmofashu/ui";
import {
  GlassPresetScope,
  type GlassPreset,
} from "@xingxingmofashu/ui/plugins/glass-preset";

import content from "./content.json";

export function MaterialStudy() {
  const material = content.material;

  return (
    <section className="border-y border-fd-border bg-fd-muted/20">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
              {material.eyebrow}
            </span>
            <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-4xl">
              {material.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-fd-muted-foreground">
              {material.description}
            </p>
            <Link
              href="/docs/en/plugins/glass-preset"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
            >
              {material.link}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {material.presets.map((preset, index) => (
              <GlassPresetScope
                key={preset.value}
                preset={preset.value as GlassPreset}
              >
                <Card
                  className="h-full"
                  title={preset.name}
                  description={preset.description}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ui-ink/45">
                        0{index + 1}
                      </span>
                      <span className="text-right font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ui-ink/45">
                        {preset.metric}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {material.swatches.map((swatch) => (
                        <div
                          key={swatch}
                          className={
                            swatch === "glare"
                              ? "relative overflow-hidden rounded-lg border border-ui-glass-border bg-gradient-to-br from-white/25 to-transparent p-2.5 text-[0.52rem] uppercase tracking-[0.12em] text-ui-ink/55"
                              : "rounded-lg border border-ui-glass-border bg-ui-glass-surface p-2.5 text-[0.52rem] uppercase tracking-[0.12em] text-ui-ink/55"
                          }
                        >
                          {swatch}
                        </div>
                      ))}
                    </div>

                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ui-ink/45">
                      {preset.blur}
                    </p>
                  </div>
                </Card>
              </GlassPresetScope>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
