import {
  BookOpen,
  Code,
  Layers,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button, Card, Toggle } from "@xingxingmofashu/ui";

type Theme = "light" | "dark";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const themeKey = "lumen-theme";
const docsUrl = "https://xingxingmofashu.github.io/ui/docs/en";
const installUrl = `${docsUrl}/get-started/installation`;
const templatesUrl = `${docsUrl}/guides/templates`;
const githubUrl = "https://github.com/xingxingmofashu/ui";
const packageUrl = "https://www.npmjs.com/package/@xingxingmofashu/ui";

const features: Feature[] = [
  {
    icon: Layers,
    title: "Liquid Glass by default",
    description:
      "The glass surface, rim highlights, and inner shadows are drawn entirely with CSS.",
  },
  {
    icon: Sparkles,
    title: "25 components",
    description:
      "Elements, forms, overlays, and feedback behind one consistent API.",
  },
  {
    icon: Palette,
    title: "Light and dark",
    description:
      "Shared tokens switch between dark and light, and the starter remembers the user's choice.",
  },
  {
    icon: Code,
    title: "Typed styling",
    description:
      "Tailwind Variants recipes expose typed ui slots keyed by data-slot, with className for layout.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Vite, React 19, and Tailwind CSS 4 with HMR, an ESM-only package, and no runtime CSS-in-JS.",
  },
  {
    icon: BookOpen,
    title: "Bilingual docs",
    description:
      "Every component ships with live examples, API tables, and guidance in English and Chinese.",
  },
];

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.29-5.14 5.56.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.78.54 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const stored = window.localStorage.getItem(themeKey);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Fall back to the system preference when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    const dark = theme === "dark";

    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(themeKey, theme);
    } catch {
      // The theme still applies for this session.
    }
  }, [theme]);

  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div id="top" className="relative min-h-svh overflow-x-clip">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ui-glass-focus"
        >
          <span className="relative flex size-9 shrink-0 items-center justify-center rounded-2xl border border-ui-glass-border bg-ui-glass-surface shadow-sm">
            <span className="size-3 rounded-full bg-ui-ink" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-[-0.02em] text-ui-ink">
              Lumen
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-ui-ink/45">
              Liquid Glass starter
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <Toggle
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            size="sm"
            pressed={theme === "dark"}
            onPressedChange={(pressed) =>
              setTheme(pressed ? "dark" : "light")
            }
            icon={theme === "dark" ? <Moon /> : <Sun />}
          />
          <Button
            size="sm"
            aria-label="View the source on GitHub"
            leadingIcon={<GitHubIcon />}
            nativeButton={false}
            render={
              <a href={githubUrl} target="_blank" rel="noreferrer" />
            }
          />
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 text-center sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-ui-ink sm:text-6xl">
              Liquid Glass Starter Template
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ui-ink/60 sm:text-base">
              A production-ready starter template powered by{" "}
              <a
                className="text-ui-ink underline underline-offset-4 hover:text-ui-ink/70"
                href={packageUrl}
                target="_blank"
                rel="noreferrer"
              >
                @xingxingmofashu/ui
              </a>
              . Build polished, performant React applications
              in minutes, not hours.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                label="Get started"
                nativeButton={false}
                render={
                  <a href={installUrl} target="_blank" rel="noreferrer" />
                }
              />
              <Button
                size="lg"
                label="Use this template"
                nativeButton={false}
                render={
                  <a href={templatesUrl} target="_blank" rel="noreferrer" />
                }
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-ui-ink sm:text-4xl">
              Everything you need to build modern React apps
            </h2>
            <p className="mt-3 text-sm leading-7 text-ui-ink/60">
              Start with a solid foundation. This template includes the
              essentials for building production-ready applications with the
              Liquid Glass component system.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="h-full">
                <span className="flex size-10 items-center justify-center rounded-2xl border border-ui-glass-border bg-ui-glass-surface text-ui-ink">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-ui-ink">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-ui-ink/55">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-ui-glass-border/70">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-ui-ink sm:text-4xl">
              Ready to build your next React app?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ui-ink/60">
              Start from the starter, keep the components you need, and make the
              glass your own.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                label="Start building"
                nativeButton={false}
                render={
                  <a href={installUrl} target="_blank" rel="noreferrer" />
                }
              />
              <Button
                size="lg"
                label="View on GitHub"
                nativeButton={false}
                render={
                  <a href={githubUrl} target="_blank" rel="noreferrer" />
                }
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ui-glass-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-[11px] text-ui-ink/50 sm:flex-row">
          <p>
            Built with{" "}
            <a
              className="underline-offset-4 hover:text-ui-ink hover:underline"
              href={packageUrl}
              target="_blank"
              rel="noreferrer"
            >
              @xingxingmofashu/ui
            </a>{" "}
            · © 2026
          </p>
          <nav aria-label="Footer" className="flex items-center gap-4">
            <a
              className="underline-offset-4 hover:text-ui-ink hover:underline"
              href={docsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
            <a
              className="underline-offset-4 hover:text-ui-ink hover:underline"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
