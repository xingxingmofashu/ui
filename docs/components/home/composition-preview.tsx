"use client";

import { Progress, Switch, Tabs } from "@xingxingmofashu/ui";

import { homeCopy } from "./copy";

export function CompositionPreview() {
  const copy = homeCopy.components.featured;

  return (
    <Tabs
      aria-label="Workspace preview"
      className="w-full"
      size="sm"
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: copy.overview,
          content: (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-2">
                {copy.metrics.map((metric) => (
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
                    {copy.updatesLabel}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-5 text-ui-ink/55">
                    {copy.updatesDescription}
                  </p>
                </div>
                <Switch
                  aria-label={copy.updatesLabel}
                  size="sm"
                  defaultChecked
                />
              </div>

              <Progress size="sm" label={copy.syncLabel} value={72} />
            </div>
          ),
        },
        {
          value: "activity",
          label: copy.activity,
          content: (
            <div className="space-y-2 pt-4">
              {copy.activityItems.map((item) => (
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
