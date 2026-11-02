import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { homeCopy, type HomeLocale } from "./copy";

export function QuickStart({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].quickStart;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="grid gap-8 rounded-3xl border border-fd-border bg-fd-card/40 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {copy.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
            {copy.description}
          </p>
          <Link
            href={`/docs/${lang}/get-started/installation`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
          >
            {copy.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <pre className="overflow-x-auto rounded-2xl border border-fd-border bg-fd-background p-5 text-xs leading-6 text-fd-foreground">
          <code>{`import { Button, Card, Switch } from "@xingxingmofashu/ui";

export function Example() {
  return (
    <Card title="Liquid glass" description="CSS-only frosted panel.">
      <Switch label="Notifications" defaultChecked />
      <Button label="Continue" />
    </Card>
  );
}`}</code>
        </pre>
      </div>
    </section>
  );
}
