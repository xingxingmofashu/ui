import {
  Accessibility,
  Layers,
  Moon,
  Palette,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { Button, Card, ToggleGroup } from "@xingxingmofashu/ui";
import { useGlassPreset } from "@xingxingmofashu/ui/plugins/glass-preset";

import { HeroPreview } from "./hero-preview";
import { useTheme } from "./use-theme";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const docsUrl = "https://xingxingmofashu.github.io/ui/docs/en";
const installUrl = `${docsUrl}/get-started/installation`;
const componentsUrl = `${docsUrl}/components`;
const templatesUrl = `${docsUrl}/guides/templates`;
const githubUrl = "https://github.com/xingxingmofashu/ui";
const packageUrl = "https://www.npmjs.com/package/@xingxingmofashu/ui";

const features: Feature[] = [
  {
    icon: Layers,
    title: "CSS-only material",
    description:
      "Surfaces, rims, inner shadows, and highlights are drawn with regular CSS. No canvas, WebGL, or image assets.",
  },
  {
    icon: Palette,
    title: "Theme and material",
    description:
      "Light, dark, and four glass presets share one token layer, so the whole page follows a single source of truth.",
  },
  {
    icon: Accessibility,
    title: "Accessible primitives",
    description:
      "Base UI supplies labels, focus management, keyboard behavior, and ARIA state under every component.",
  },
];

const presetItems = [
  { value: "thin", label: "Thin" },
  { value: "soft", label: "Soft" },
  { value: "regular", label: "Regular" },
  { value: "thick", label: "Thick" },
] as const;

function backgroundSrcSet(extension: "avif" | "webp") {
  return [1280, 1920, 2560]
    .map((width) => `/rqev27-${width}.${extension} ${width}w`)
    .join(", ");
}

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

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { preset, setPreset } = useGlassPreset();

  return (
    <div id="top" className="relative isolate min-h-svh overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <picture>
          <source
            type="image/avif"
            srcSet={backgroundSrcSet("avif")}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={backgroundSrcSet("webp")}
            sizes="100vw"
          />
          <img
            src="/rqev27.jpg"
            alt=""
            decoding="async"
            fetchPriority="high"
            className="size-full object-cover"
          />
        </picture>
      </div>
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

        <div className="flex shrink-0 items-center gap-4">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-4 text-xs font-medium text-ui-ink/55 sm:flex"
          >
            <a
              className="transition-colors hover:text-ui-ink"
              href={componentsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Components
            </a>
            <a
              className="transition-colors hover:text-ui-ink"
              href={docsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </nav>

          <ToggleGroup
            aria-label="Glass preset"
            size="sm"
            className="hidden md:flex"
            value={[preset]}
            onValueChange={(value) => {
              const next = value[0];

              if (next) {
                setPreset(next);
              }
            }}
            items={presetItems}
          />

          <div className="flex items-center gap-2">
            <Button
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              size="sm"
              leadingIcon={theme === "dark" ? <Moon /> : <Sun />}
              onClick={toggleTheme}
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
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-24 lg:pt-16">
          <div>
            <span className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ui-ink/55">
              <span className="size-1.5 rounded-full bg-ui-ink" />
              Liquid Glass starter
            </span>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-ui-ink sm:text-5xl xl:text-6xl">
              A calmer workspace for shipping software.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ui-ink/60 sm:text-base">
              Lumen is a compact landing-page starter built with{" "}
              <a
                className="text-ui-ink underline decoration-ui-glass-border underline-offset-4 transition-colors hover:decoration-ui-ink"
                href={packageUrl}
                target="_blank"
                rel="noreferrer"
              >
                @xingxingmofashu/ui
              </a>
              . It brings the Liquid Glass material, light and dark tokens, and
              accessible React components into one small page you can make your
              own.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a href={installUrl} target="_blank" rel="noreferrer" />
                }
              >
                Get started
              </Button>
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a href={componentsUrl} target="_blank" rel="noreferrer" />
                }
              >
                View components
              </Button>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ui-ink/40">
              React 19 · Tailwind CSS 4 · Base UI
            </p>
          </div>

          <HeroPreview />
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 lg:pb-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ui-ink/40">
              What is inside
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.04em] text-ui-ink sm:text-4xl">
              A small surface area, with the details in place.
            </h2>
            <p className="mt-3 text-sm leading-7 text-ui-ink/60">
              Keep the patterns that fit your product and replace the rest. The
              starter uses the same components, tokens, and material as the
              documentation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
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

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 lg:pb-24">
          <div className="ui-glass ui-glass-inner ui-glass-highlight relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
            <span aria-hidden="true" className="ui-glass-rim" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-ui-ink sm:text-4xl">
                Make it yours.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ui-ink/60">
                Replace the copy, keep the glass, and add the components you
                need. The starter is a single page with no routing or data
                layer.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <a href={templatesUrl} target="_blank" rel="noreferrer" />
                  }
                >
                  Use this template
                </Button>
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <a href={githubUrl} target="_blank" rel="noreferrer" />
                  }
                >
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ui-glass-border/60">
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
