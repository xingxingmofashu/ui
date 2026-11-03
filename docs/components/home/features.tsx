import { homeCopy } from "./copy";

export function Features() {
  const copy = homeCopy.features;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            {copy.eyebrow}
          </span>
          <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-fd-muted-foreground">
            {copy.description}
          </p>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-fd-border bg-fd-border sm:grid-cols-2">
          {copy.items.map((item) => (
            <div key={item.number} className="bg-fd-background p-6 sm:p-8">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fd-muted-foreground">
                {item.number}
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-fd-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
