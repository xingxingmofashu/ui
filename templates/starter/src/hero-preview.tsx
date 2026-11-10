import { Rocket } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Card,
  Progress,
  Switch,
  Tabs,
  ToggleGroup,
  useToast,
} from "@xingxingmofashu/ui";
import {
  GlassPresetScope,
  type GlassPreset,
} from "@xingxingmofashu/ui/plugins/glass-preset";

const metrics = [
  { label: "Projects", value: "12" },
  { label: "Members", value: "24" },
  { label: "Health", value: "92%" },
];

const activity = [
  { time: "2m", title: "Mia published Atlas 2.4" },
  { time: "18m", title: "Noah invited three members" },
  { time: "1h", title: "Ava updated billing" },
  { time: "3h", title: "The team connected GitHub" },
];

const presetItems = [
  { value: "thin", label: "Thin" },
  { value: "soft", label: "Soft" },
  { value: "regular", label: "Regular" },
  { value: "thick", label: "Thick" },
] as const;

export function HeroPreview() {
  const toast = useToast();
  const [preset, setPreset] = useState<GlassPreset>("thin");
  const [autoPublish, setAutoPublish] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-ui-ink/5 blur-2xl"
      />

      <GlassPresetScope preset={preset} className="relative">
        <span className="ui-glass-chip absolute -top-3 left-6 z-20 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ui-ink/55">
          Live preview
        </span>

        <Card
          className="w-full"
          title="Workspace overview"
          description="A live sample of the glass material."
        >
          <Tabs
            aria-label="Workspace preview"
            size="sm"
            defaultValue="overview"
            items={[
              {
                value: "overview",
                label: "Overview",
                content: (
                  <div className="min-h-[14rem] space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      {metrics.map((metric) => (
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

                    <div className="rounded-xl border border-ui-glass-border bg-ui-glass-surface p-3">
                      <Switch
                        label="Auto-publish"
                        description="Ship approved changes automatically."
                        size="sm"
                        checked={autoPublish}
                        onCheckedChange={(checked) => setAutoPublish(checked)}
                      />
                    </div>

                    <Progress size="sm" label="Storage used" value={72} />
                  </div>
                ),
              },
              {
                value: "activity",
                label: "Activity",
                content: (
                  <div className="min-h-[14rem] space-y-2 pt-4">
                    {activity.map((item) => (
                      <div
                        key={`${item.time}-${item.title}`}
                        className="flex items-center gap-4 rounded-xl border border-ui-glass-border bg-ui-glass-surface px-3 py-2.5"
                      >
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ui-ink/45">
                          {item.time}
                        </span>
                        <span className="text-xs text-ui-ink">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ui-glass-border pt-4">
            <ToggleGroup
              aria-label="Preview glass material"
              size="xs"
              value={[preset]}
              onValueChange={(value) => {
                const next = value[0];

                if (
                  next === "thin" ||
                  next === "soft" ||
                  next === "regular" ||
                  next === "thick"
                ) {
                  setPreset(next);
                }
              }}
              items={presetItems}
            />

            <Button
              type="button"
              size="sm"
              leadingIcon={<Rocket />}
              onClick={() =>
                toast.add({
                  type: "success",
                  title: "Release published",
                  description: "Lumen 2.4 is live for everyone.",
                })
              }
            >
              Publish
            </Button>
          </div>
        </Card>
      </GlassPresetScope>
    </div>
  );
}
