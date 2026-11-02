import { ComponentGrid } from "./home/component-grid";
import type { HomeLocale } from "./home/copy";
import { Cta } from "./home/cta";
import { Features } from "./home/features";
import { Hero } from "./home/hero";
import { QuickStart } from "./home/quick-start";

export function HomePageContent({ lang }: { lang: HomeLocale }) {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="docs-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />

      <Hero lang={lang} />
      <ComponentGrid lang={lang} />
      <Features lang={lang} />
      <QuickStart lang={lang} />
      <Cta lang={lang} />
    </main>
  );
}
