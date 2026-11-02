import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { githubUrl } from "@/lib/site";

import { homeCopy, type HomeLocale } from "./copy";

export function Cta({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].cta;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8">
      <div className="rounded-3xl border border-fd-border bg-fd-muted/60 px-6 py-12 text-center text-fd-foreground shadow-sm sm:px-12">
        <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 opacity-70">
          {copy.description}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={`/docs/${lang}/get-started/introduction`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
          >
            {copy.readDocs}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={githubUrl}
            className="inline-flex h-9 items-center rounded-full border border-fd-border px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            {copy.github}
          </a>
        </div>
      </div>
    </section>
  );
}
