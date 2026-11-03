"use client";

import { Progress, Switch, Tabs } from "@xingxingmofashu/ui";

import content from "./content.json";

export function CompositionPreview() {
  const featured = content.components.featured;

  return (
    <Tabs
      aria-label="Workspace preview"
      className="w-full"
      size="sm"
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: featured.overview,
          content: (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-2">
                {featured.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-ui-glass-border bg-ui-glass-surface p-3"
                  >
                    <p className="font-mono text-lg tabular-nums text-ui-ink">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-ui-ink/45">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-ui-glass-border bg-ui-glass-surface p-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-ui-ink">
                    {featured.updatesLabel}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-5 text-ui-ink/55">
                    {featured.updatesDescription}
                  </p>
                </div>
                <Switch
                  aria-label={featured.updatesLabel}
                  size="sm"
                  defaultChecked
                />
              </div>

              <Progress size="sm" label={featured.syncLabel} value={72} />
            </div>
          ),
        },
        {
          value: "activity",
          label: featured.activity,
          content: (
            <div className="space-y-2 pt-4">
              {featured.activityItems.map((item) => (
                <div
                  key={`${item.time}-${item.title}`}
                  className="flex items-center gap-4 rounded-xl border border-ui-glass-border bg-ui-glass-surface px-3 py-2.5"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ui-ink/45">
                    {item.time}
                  </span>
                  <span className="text-xs text-ui-ink">{item.title}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
