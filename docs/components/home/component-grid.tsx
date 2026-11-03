import {
  ArrowRight,
  Bold,
  LayoutGrid,
  List,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Input,
  Popover,
  Progress,
  RadioGroup,
  ScrollArea,
  Switch,
  Toggle,
  ToggleGroup,
} from "@xingxingmofashu/ui";

import { HomeAlertDialog } from "@/components/home-alert-dialog";
import { HomeDialog } from "@/components/home-dialog";

import { homeCopy, type HomeLocale } from "./copy";
import { DrawerPreview } from "./previews/drawer-preview";
import { SliderPreview } from "./previews/slider-preview";
import { ToastPreview } from "./previews/toast-preview";

type ComponentItem = {
  id: string;
  name: string;
  description: string;
  preview: ReactNode;
};

export function ComponentGrid({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].components;
  const items = copy.items;

  const components: ComponentItem[] = [
    {
      id: "accordion",
      name: items.accordion.name,
      description: items.accordion.description,
      preview: (
        <Accordion
          className="w-full"
          size="sm"
          defaultValue={["surface"]}
          items={[
            {
              value: "surface",
              title: items.accordion.surfaceTitle,
              content: items.accordion.surfaceContent,
            },
            {
              value: "tokens",
              title: items.accordion.tokensTitle,
              content: items.accordion.tokensContent,
            },
          ]}
        />
      ),
    },
    {
      id: "alert-dialog",
      name: items.alertDialog.name,
      description: items.alertDialog.description,
      preview: <HomeAlertDialog lang={lang} />,
    },
    {
      id: "button",
      name: items.button.name,
      description: items.button.description,
      preview: (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            size="sm"
            label={items.button.continue}
            trailingIcon={<ArrowRight />}
          />
          <Button
            size="sm"
            aria-label={items.button.create}
            leadingIcon={<Plus />}
          />
        </div>
      ),
    },
    {
      id: "card",
      name: items.card.name,
      description: items.card.description,
      preview: (
        <Card
          className="w-full max-w-[16rem]"
          title={items.card.previewTitle}
          description={items.card.previewDescription}
        >
          <p className="text-xs leading-5 text-ui-ink/65">
            {items.card.previewBody}
          </p>
        </Card>
      ),
    },
    {
      id: "checkbox",
      name: items.checkbox.name,
      description: items.checkbox.description,
      preview: (
        <div className="flex w-full flex-col gap-3">
          <Checkbox
            size="sm"
            label={items.checkbox.productUpdates}
            defaultChecked
          />
          <Checkbox size="sm" label={items.checkbox.securityAlerts} />
        </div>
      ),
    },
    {
      id: "dialog",
      name: items.dialog.name,
      description: items.dialog.description,
      preview: <HomeDialog lang={lang} />,
    },
    {
      id: "drawer",
      name: items.drawer.name,
      description: items.drawer.description,
      preview: <DrawerPreview lang={lang} />,
    },
    {
      id: "input",
      name: items.input.name,
      description: items.input.description,
      preview: (
        <Input
          className="w-full max-w-[16rem]"
          size="sm"
          type="email"
          label={items.input.label}
          placeholder={items.input.placeholder}
        />
      ),
    },
    {
      id: "popover",
      name: items.popover.name,
      description: items.popover.description,
      preview: (
        <Popover
          trigger={
            <Button
              size="sm"
              label={items.popover.trigger}
              leadingIcon={<Settings />}
            />
          }
          title={items.popover.title}
          description={items.popover.descriptionText}
        >
          <Switch size="sm" label={items.popover.switchLabel} defaultChecked />
        </Popover>
      ),
    },
    {
      id: "progress",
      name: items.progress.name,
      description: items.progress.description,
      preview: (
        <Progress
          className="w-full max-w-[16rem]"
          size="sm"
          label={items.progress.label}
          value={64}
        />
      ),
    },
    {
      id: "radio-group",
      name: items.radioGroup.name,
      description: items.radioGroup.description,
      preview: (
        <RadioGroup
          className="w-full max-w-[16rem]"
          size="sm"
          label={items.radioGroup.label}
          defaultValue="pro"
          items={[
            { value: "free", label: items.radioGroup.free },
            { value: "pro", label: items.radioGroup.pro },
            { value: "team", label: items.radioGroup.team },
          ]}
        />
      ),
    },
    {
      id: "scroll-area",
      name: items.scrollArea.name,
      description: items.scrollArea.description,
      preview: (
        <ScrollArea aria-label={items.scrollArea.ariaLabel} className="h-40 w-full">
          <div className="flex flex-col gap-2 p-3">
            {copy.activity.map((item) => (
              <div
                key={`${item.time}-${item.title}`}
                className="rounded-lg border border-ui-glass-border bg-ui-glass-surface px-3 py-2"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ui-ink/50">
                  {item.time}
                </p>
                <p className="mt-0.5 text-xs text-ui-ink">{item.title}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      ),
    },
    {
      id: "slider",
      name: items.slider.name,
      description: items.slider.description,
      preview: <SliderPreview lang={lang} />,
    },
    {
      id: "switch",
      name: items.switch.name,
      description: items.switch.description,
      preview: (
        <Switch size="sm" label={items.switch.label} defaultChecked />
      ),
    },
    {
      id: "toast",
      name: items.toast.name,
      description: items.toast.description,
      preview: <ToastPreview lang={lang} />,
    },
    {
      id: "toggle",
      name: items.toggle.name,
      description: items.toggle.description,
      preview: (
        <Toggle
          size="sm"
          label={items.toggle.label}
          icon={<Bold />}
          defaultPressed
        />
      ),
    },
    {
      id: "toggle-group",
      name: items.toggleGroup.name,
      description: items.toggleGroup.description,
      preview: (
        <ToggleGroup
          aria-label={items.toggleGroup.ariaLabel}
          size="sm"
          defaultValue={["grid"]}
          items={[
            {
              value: "grid",
              label: items.toggleGroup.grid,
              icon: <LayoutGrid />,
            },
            {
              value: "list",
              label: items.toggleGroup.list,
              icon: <List />,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <section
      id="components"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16"
    >
      <div className="max-w-2xl">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
          {copy.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((item) => (
          <article
            key={item.id}
            className="group/card flex flex-col rounded-2xl border border-fd-border bg-fd-card/40 p-4 transition-colors hover:bg-fd-accent/40"
          >
            <Link
              href={`/docs/${lang}/components/${item.id}`}
              className="flex items-start justify-between gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fd-foreground">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-fd-muted-foreground transition-transform group-hover/card:translate-x-0.5"
              />
            </Link>

            <div className="mt-4 flex min-h-44 flex-1 items-center justify-center overflow-hidden rounded-xl border border-dashed border-fd-border/70 bg-fd-background/40 p-4">
              {item.preview}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
