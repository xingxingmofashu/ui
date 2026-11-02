import { Moon, Palette, ShieldCheck, Sparkles } from "lucide-react";

import { homeCopy, type HomeLocale } from "./copy";

const icons = [Sparkles, Moon, Palette, ShieldCheck] as const;

export function Features({ lang }: { lang: HomeLocale }) {
  const copy = homeCopy[lang].features;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
          {copy.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map((feature, index) => {
          const Icon = icons[index] ?? Sparkles;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-fd-border bg-fd-card/40 p-5"
            >
              <div className="grid size-9 place-items-center rounded-xl border border-fd-border bg-fd-background text-fd-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fd-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
