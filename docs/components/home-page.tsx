import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Locale = "zh" | "en";

export function HomePageContent({ lang }: { lang: Locale }) {
  const isZh = lang === "zh";

  const copy = isZh
    ? {
        badge: "React 19 · Tailwind CSS 4 · Base UI",
        titleLine1: "黑白之间，",
        titleLine2: "玻璃有光。",
        description: "为 React 19 与 Tailwind CSS 4 打造的纯 CSS 液态玻璃组件。",
        readDocs: "阅读文档",
        viewComponents: "查看组件",
      }
    : {
        badge: "React 19 · Tailwind CSS 4 · Base UI",
        titleLine1: "Between black and white,",
        titleLine2: "glass finds its light.",
        description: "Pure CSS liquid glass components for React 19 and Tailwind CSS 4.",
        readDocs: "Read the docs",
        viewComponents: "View components",
      };

  return (
    <main className="relative flex flex-1 items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="docs-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />

      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fd-muted-foreground">
          <span className="size-1.5 rounded-full bg-fd-foreground" />
          {copy.badge}
        </span>

        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.045em] text-fd-foreground sm:text-6xl lg:text-[4.25rem]">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-fd-muted-foreground">
          {copy.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/docs/${lang}/get-started`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-medium text-fd-background transition-opacity hover:opacity-85"
          >
            {copy.readDocs}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={`/docs/${lang}/components/button`}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            {copy.viewComponents}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
