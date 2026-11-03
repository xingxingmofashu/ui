import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { githubUrl } from "@/lib/site";

import content from "./content.json";

export function Cta() {
  const cta = content.cta;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-fd-border bg-fd-muted/50 px-6 py-14 text-center shadow-sm sm:px-12">
        <div
          aria-hidden="true"
          className="docs-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        />

        <div className="relative">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {cta.eyebrow}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-fd-muted-foreground">
            {cta.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/en/get-started/introduction"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fd-foreground px-5 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              {cta.readDocs}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/playground/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              {cta.playground}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={githubUrl}
              className="inline-flex h-10 items-center rounded-full border border-fd-border px-5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              {cta.github}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
