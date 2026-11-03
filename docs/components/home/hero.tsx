import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { homeCopy } from "./copy";
import { HeroPreview } from "./hero-preview";

export function Hero() {
  const copy = homeCopy.hero;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1">
              <span className="size-1.5 rounded-full bg-fd-foreground" />
              {copy.eyebrow}
            </span>
            <span>{copy.badge}</span>
          </div>

          <h1 className="mt-8 max-w-5xl text-balance text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-fd-foreground sm:text-7xl lg:text-[6.5rem]">
            {copy.titleLine1}
            <span className="block text-fd-muted-foreground">
              {copy.titleLine2}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-7 text-fd-muted-foreground">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/en/get-started/introduction"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fd-foreground px-5 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              {copy.readDocs}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/playground/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              {copy.openPlayground}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-fd-border pt-4 text-xs text-fd-muted-foreground">
            {copy.meta.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full border border-fd-foreground/40 bg-fd-foreground/20" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}
