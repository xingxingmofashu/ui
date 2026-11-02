"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";

import {
  Button,
  Card,
  Dialog,
  Slider,
  Switch,
} from "@xingxingmofashu/ui";

import { homeCopy, type HomeLocale } from "./copy";

export function HeroPreview({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].hero.preview;
  const [open, setOpen] = useState(false);
  const [intensity, setIntensity] = useState(64);
  const sliderId = useId();

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden="true"
        className="docs-grid absolute -inset-8 rounded-[3rem] opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
      />

      <span className="absolute -top-3 right-6 z-10 rounded-full border border-fd-border bg-fd-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fd-muted-foreground backdrop-blur">
        {copy.live}
      </span>

      <Card
        className="relative w-full"
        title={copy.cardTitle}
        description={copy.cardDescription}
        footer={
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-ui-ink/60">{copy.footerLabel}</span>
            <Button
              size="sm"
              label={copy.openSettings}
              trailingIcon={<ArrowRight />}
              onClick={() => setOpen(true)}
            />
          </div>
        }
      >
        <div className="space-y-5">
          <Switch
            label={copy.switchLabel}
            description={copy.switchDescription}
            defaultChecked
          />

          <div className="h-px bg-ui-glass-border" />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span id={sliderId} className="text-ui-ink/70">
                {copy.sliderLabel}
              </span>
              <span className="font-mono tabular-nums text-ui-ink/50">
                {intensity}
              </span>
            </div>
            <Slider
              aria-labelledby={sliderId}
              value={intensity}
              onValueChange={setIntensity}
            />
          </div>
        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          title={copy.dialogTitle}
          description={copy.dialogDescription}
          footer={
            <>
              <Button
                size="sm"
                label={copy.cancel}
                onClick={() => setOpen(false)}
              />
              <Button
                size="sm"
                label={copy.save}
                onClick={() => setOpen(false)}
              />
            </>
          }
        >
          <Switch
            label={copy.dialogSwitchLabel}
            description={copy.dialogSwitchDescription}
            defaultChecked
          />
        </Dialog>
      </Card>
    </div>
  );
}
