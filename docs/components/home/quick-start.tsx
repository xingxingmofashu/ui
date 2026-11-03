import { ArrowRight } from "lucide-react";
import Link from "next/link";

import content from "./content.json";

export function QuickStart() {
  const quickStart = content.quickStart;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-3xl border border-fd-border bg-fd-muted/30">
        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="p-8 sm:p-10">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
              {quickStart.eyebrow}
            </span>
            <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-4xl">
              {quickStart.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-fd-muted-foreground">
              {quickStart.description}
            </p>
            <Link
              href="/docs/en/get-started/installation"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-foreground"
            >
              {quickStart.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-t border-fd-border bg-fd-background/60 p-4 sm:p-6 lg:border-l lg:border-t-0">
            <div className="space-y-3">
              {quickStart.steps.map((step, index) => (
                <div
                  key={step.label}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-4 rounded-xl border border-fd-border bg-fd-background p-4"
                >
                  <span className="pt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fd-muted-foreground">
                    0{index + 1} / {step.label}
                  </span>
                  <pre className="overflow-x-auto text-xs leading-6 text-fd-foreground">
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
