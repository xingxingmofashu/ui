import tailwindBrowserUrl from "@tailwindcss/browser?url";

const STYLE_ID = "ui-repl-tailwind-config";
const SCRIPT_SELECTOR = 'script[data-ui-repl-tailwind="true"]';

const runtimeCss = `
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);

@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));
@custom-variant ui-light (&:where(.light, .light *, [data-theme="light"], [data-theme="light"] *));
@custom-variant ui-dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));

@theme inline {
  --color-ui-ink: var(--ui-ink);
  --color-ui-ink-active: var(--ui-ink-active);
  --color-ui-surface: var(--ui-surface);
  --color-ui-glass-surface: var(--ui-glass-surface);
  --color-ui-glass-overlay-surface: var(--ui-glass-overlay-surface);
  --color-ui-glass-border: var(--ui-glass-border);
  --color-ui-glass-focus: var(--ui-glass-focus);
  --color-ui-glass-inner-border: var(--ui-glass-inner-border);
  --color-ui-glass-rim: var(--ui-glass-rim);
  --color-ui-glass-highlight: var(--ui-glass-highlight);
  --color-pg-canvas: var(--pg-canvas);
  --color-pg-ink: var(--pg-ink);
  --color-pg-muted: var(--pg-muted);
  --color-pg-line: var(--pg-line);
  --color-pg-panel: var(--pg-panel);
}
`;

function installTailwindRuntime() {
  if (typeof document === "undefined") return;
  if (document.querySelector(SCRIPT_SELECTOR)) return;

  let style = document.getElementById(STYLE_ID);

  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    style.setAttribute("type", "text/tailwindcss");
    style.textContent = runtimeCss;
    document.head.append(style);
  }

  const script = document.createElement("script");

  script.src = tailwindBrowserUrl;
  script.async = true;
  script.dataset.uiReplTailwind = "true";
  script.addEventListener("error", () => {
    console.warn("The Tailwind browser runtime failed to load.");
  });
  document.head.append(script);
}

export { installTailwindRuntime };
