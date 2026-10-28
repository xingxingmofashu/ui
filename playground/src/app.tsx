import * as React from "react";

import { ThemeToggle } from "./components/theme-toggle";
import { AccordionPreview } from "./previews/accordion";
import { AlertDialogPreview } from "./previews/alert-dialog";
import { ButtonPreview } from "./previews/button";
import { CardPreview } from "./previews/card";
import { SliderPreview } from "./previews/slider";
import { SwitchPreview } from "./previews/switch";
import { ToggleGroupPreview } from "./previews/toggle-group";

const sections = [
  {
    id: "button",
    index: "01",
    title: "Button",
    description:
      "Rounded glass actions with icon slots, five sizes, and hover and press motion.",
    Preview: ButtonPreview,
  },
  {
    id: "card",
    index: "02",
    title: "Card",
    description:
      "A composed panel with a glass surface, header, body, and optional footer.",
    Preview: CardPreview,
  },
  {
    id: "accordion",
    index: "03",
    title: "Accordion",
    description:
      "Disclosure rows that share one glass surface. Change the size to see every value.",
    Preview: AccordionPreview,
  },
  {
    id: "alert-dialog",
    index: "04",
    title: "Alert Dialog",
    description:
      "A modal confirmation with a glass popup, built-in actions, and controlled usage.",
    Preview: AlertDialogPreview,
  },
  {
    id: "switch",
    index: "05",
    title: "Switch",
    description:
      "A liquid thumb that stretches while it moves, in all five sizes.",
    Preview: SwitchPreview,
  },
  {
    id: "slider",
    index: "06",
    title: "Slider",
    description:
      "Single values, ranges, and vertical controls with a glass thumb.",
    Preview: SliderPreview,
  },
  {
    id: "toggle-group",
    index: "07",
    title: "Toggle Group",
    description:
      "Single and multiple selection with a liquid glass selected state.",
    Preview: ToggleGroupPreview,
  },
] as const;

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-pg-line bg-pg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus"
        >
          <span
            aria-hidden="true"
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-ui-glass-border bg-ui-glass-surface shadow-[inset_1px_1px_0_rgb(255_255_255/0.35),0_2px_6px_rgb(0_0_0/0.12)]"
          >
            <span className="size-2.5 rounded-full bg-ui-ink/75 shadow-[0_0_0_2px_rgb(255_255_255/0.14)]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-pg-ink">
              Liquid Glass
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-pg-muted">
              Playground
            </span>
          </span>
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="lg:w-44 lg:shrink-0">
      <div className="lg:sticky lg:top-24">
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-pg-muted lg:block">
          Components
        </p>
        <nav
          aria-label="Components"
          className="-mx-1 flex flex-wrap gap-1 pb-2 lg:mx-0 lg:mt-3 lg:flex-col lg:pb-0"
        >
          {sections.map(({ id, title }) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm text-pg-muted transition-colors hover:bg-pg-line/50 hover:text-pg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-glass-focus lg:rounded-lg"
            >
              {title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function Intro() {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2 rounded-full border border-pg-line bg-pg-panel px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-pg-muted backdrop-blur-sm">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-ui-ink/60" />
        Seven components · two themes
      </p>
      <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-pg-ink sm:text-5xl">
        Liquid glass, in light and dark.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-pg-muted">
        A live playground for{" "}
        <code className="rounded-md border border-pg-line bg-pg-panel px-1.5 py-0.5 font-mono text-[0.9em] text-pg-ink">
          @xingxingmofashu/ui
        </code>
        . Use the toggle in the header to compare the same components across
        both themes; your choice is remembered on the next visit.
      </p>
    </div>
  );
}

type SectionProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

function Section({ id, index, title, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pg-muted">
            {index} — Component
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-pg-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-pg-muted">{description}</p>
        </div>
        <span className="hidden rounded-full border border-pg-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-pg-muted sm:inline-block">
          Live
        </span>
      </div>

      <div className="pg-stage overflow-hidden rounded-[2rem] border border-pg-line p-5 sm:p-8">
        <div className="relative z-10 flex flex-col gap-8">{children}</div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div id="top" className="pg-app min-h-screen text-pg-ink">
      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 pt-6 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Intro />

          <div className="mt-14 flex flex-col gap-16">
            {sections.map(({ id, index, title, description, Preview }) => (
              <Section
                key={id}
                id={id}
                index={index}
                title={title}
                description={description}
              >
                <Preview />
              </Section>
            ))}
          </div>

          <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-pg-line pt-6 text-xs leading-5 text-pg-muted">
            <p>Built with React 19, Vite, and Tailwind CSS 4.</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
              Light / Dark
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export { App };
