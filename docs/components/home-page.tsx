import { ComponentIndex } from "./home/component-index";
import { Cta } from "./home/cta";
import { Features } from "./home/features";
import { Hero } from "./home/hero";
import { MaterialStudy } from "./home/material-study";
import { QuickStart } from "./home/quick-start";

export function HomePageContent() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="docs-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />

      <Hero />
      <MaterialStudy />
      <ComponentIndex />
      <Features />
      <QuickStart />
      <Cta />
    </main>
  );
}
