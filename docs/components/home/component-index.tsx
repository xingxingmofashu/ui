import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@xingxingmofashu/ui";

import { CompositionPreview } from "./composition-preview";
import content from "./content.json";

const groups = [
  {
    label: "Element",
    items: [
      ["Accordion", "accordion"],
      ["Button", "button"],
      ["Card", "card"],
      ["Scroll Area", "scroll-area"],
      ["Tabs", "tabs"],
      ["Toggle", "toggle"],
      ["Toggle Group", "toggle-group"],
    ],
  },
  {
    label: "Form",
    items: [
      ["Form", "form"],
      ["Checkbox", "checkbox"],
      ["Checkbox Group", "checkbox-group"],
      ["Field", "field"],
      ["Fieldset", "fieldset"],
      ["Input", "input"],
      ["Radio Group", "radio-group"],
      ["Select", "select"],
      ["Slider", "slider"],
      ["Switch", "switch"],
    ],
  },
  {
    label: "Overlay",
    items: [
      ["Alert Dialog", "alert-dialog"],
      ["Dialog", "dialog"],
      ["Drawer", "drawer"],
      ["Menu", "menu"],
      ["Popover", "popover"],
      ["Toast", "toast"],
      ["Tooltip", "tooltip"],
    ],
  },
  {
    label: "Feedback",
    items: [["Progress", "progress"]],
  },
] as const;

export function ComponentIndex() {
  const components = content.components;

  return (
    <section
      id="components"
      className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {components.eyebrow}
          </span>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-4xl">
            {components.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-fd-muted-foreground">
            {components.description}
          </p>

          <Card
            className="mt-8"
            title={components.featured.title}
            description={components.featured.description}
            footer={
              <span className="text-xs text-ui-ink/55">
                {components.featured.footer}
              </span>
            }
          >
            <CompositionPreview />
          </Card>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fd-muted-foreground">
                {group.label}
              </h3>
              <ul className="mt-3 divide-y divide-fd-border border-t border-fd-border">
                {group.items.map(([name, slug]) => (
                  <li key={slug}>
                    <Link
                      href={`/docs/en/components/${slug}`}
                      className="group/link flex items-center justify-between gap-4 py-3 text-sm text-fd-foreground transition-colors hover:text-fd-muted-foreground"
                    >
                      {name}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 text-fd-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/docs/en/components"
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
      >
        {components.link}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
