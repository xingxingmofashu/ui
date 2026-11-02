import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { LocaleLink } from "@/components/locale-link";

import { homeCopy, type HomeLocale } from "./copy";
import { HeroPreview } from "./hero-preview";

export function Hero({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].hero;

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:pt-24">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fd-muted-foreground">
            <span className="size-1.5 rounded-full bg-fd-foreground" />
            {copy.badge}
          </span>

          <LocaleLink
            href={copy.languageHref}
            locale={lang === "zh" ? "en" : "zh"}
            className="text-xs font-medium text-fd-muted-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:text-fd-foreground hover:decoration-fd-foreground"
          >
            {copy.language}
          </LocaleLink>
        </div>

        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.045em] text-fd-foreground sm:text-6xl lg:text-[4.25rem]">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-fd-muted-foreground">
          {copy.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/docs/${lang}/get-started/introduction`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
          >
            {copy.readDocs}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href="#components"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            {copy.viewComponents}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-fd-muted-foreground">
          {copy.meta.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full border border-fd-foreground/40 bg-fd-foreground/20" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <HeroPreview lang={lang} />
    </section>
  );
}
