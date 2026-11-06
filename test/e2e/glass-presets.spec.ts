import { expect, test } from "@playwright/test";

type Rgba = [red: number, green: number, blue: number, alpha: number];

type PresetReading = {
  preset: string;
  surface: string;
  border: string;
  blur: string;
  saturate: string;
};

const PRESETS = ["thin", "soft", "regular", "thick"] as const;

function parseColor(value: string): Rgba {
  const match = value.match(/rgba?\(([^)]+)\)/);

  if (!match) {
    throw new Error(`Unsupported color value: ${value}`);
  }

  const [red, green, blue, alpha = 1] = match[1]
    .split(/[,\s/]+/)
    .filter(Boolean)
    .map(Number);

  return [red, green, blue, alpha];
}

function alphaOf(value: string) {
  return Math.round(parseColor(value)[3] * 100) / 100;
}

function redOf(value: string) {
  return parseColor(value)[0];
}

function expectAscending(values: number[]) {
  expect([...values].sort((a, b) => a - b)).toEqual(values);
  expect(new Set(values).size).toBe(values.length);
}

test("data-glass scopes presets in light and dark", async ({ page }) => {
  await page.goto("/");

  const readings = await page.evaluate((presets) => {
    function read(theme: "light" | "dark"): PresetReading[] {
      return presets.map((preset) => {
        const scope = document.createElement("div");

        scope.className = theme;
        scope.dataset.theme = theme;
        scope.dataset.glass = preset;

        const glass = document.createElement("div");
        glass.className = "ui-glass";
        scope.append(glass);
        document.body.append(scope);

        const style = getComputedStyle(glass);
        const scopeStyle = getComputedStyle(scope);
        const reading = {
          preset,
          surface: style.backgroundColor,
          border: style.borderTopColor,
          blur: scopeStyle.getPropertyValue("--ui-glass-blur").trim(),
          saturate: scopeStyle.getPropertyValue("--ui-glass-saturate").trim(),
        };

        scope.remove();
        return reading;
      });
    }

    const light = read("light");
    const dark = read("dark");

    // Replace the app's theme classes: `.light` wins the class cascade.
    document.documentElement.className = "dark";
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";

    const scope = document.createElement("div");
    scope.dataset.glass = "regular";

    const glass = document.createElement("div");
    glass.className = "ui-glass";
    scope.append(glass);
    document.body.append(scope);

    return { light, dark, inherited: getComputedStyle(glass).backgroundColor };
  }, [...PRESETS]);

  expect(readings.light.map(({ preset }) => preset)).toEqual([...PRESETS]);
  expect(readings.dark.map(({ preset }) => preset)).toEqual([...PRESETS]);

  // Exact preset values live in `test/tokens/runtime.test.ts`; this checks
  // that the browser resolves the preset, its theme, and the blur scale.
  expect(readings.light.map(({ blur }) => blur)).toEqual([
    "4px",
    "8px",
    "12px",
    "16px",
  ]);
  expect(readings.light.map(({ surface }) => redOf(surface))).toEqual([
    255, 255, 255, 255,
  ]);
  expect(readings.dark.map(({ surface }) => redOf(surface))).toEqual([
    20, 20, 20, 20,
  ]);

  for (const theme of [readings.light, readings.dark]) {
    expectAscending(theme.map(({ surface }) => alphaOf(surface)));
    expectAscending(theme.map(({ border }) => alphaOf(border)));
  }

  expect(readings.light.map(({ saturate }) => parseFloat(saturate))).toEqual([
    150, 146.7, 143.3, 140,
  ]);
  expect(readings.inherited).toBe(readings.dark[2].surface);
});

test("playground switches the shared glass material", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("html");
  const soft = page.getByRole("button", { name: "Soft", exact: true });
  const thick = page.getByRole("button", { name: "Thick", exact: true });

  await expect(root).toHaveAttribute("data-glass", "thin");
  await soft.click();
  await expect(root).toHaveAttribute("data-glass", "soft");
  await expect(soft).toHaveAttribute("aria-pressed", "true");
  await thick.click();
  await expect(root).toHaveAttribute("data-glass", "thick");
  await expect(thick).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(root).toHaveAttribute("data-glass", "thick");
});
