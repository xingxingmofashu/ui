import { expect, test } from "@playwright/test";

type Rgba = [red: number, green: number, blue: number, alpha: number];

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

function expectColor(value: string, expected: Rgba) {
  const [red, green, blue, alpha] = parseColor(value);

  expect([red, green, blue]).toEqual(expected.slice(0, 3));
  expect(alpha).toBeCloseTo(expected[3], 2);
}

test("data-glass scopes shared presets to a container", async ({ page }) => {
  await page.goto("/");

  const light = await page.evaluate(() => {
    return ["thin", "soft", "regular", "thick"].map((preset) => {
      const container = document.createElement("div");
      container.dataset.glass = preset;

      const glass = document.createElement("div");
      glass.className = "ui-glass";
      container.append(glass);
      document.body.append(container);

      const result = {
        preset,
        surface: getComputedStyle(glass).backgroundColor,
        border: getComputedStyle(glass).borderTopColor,
        blur: getComputedStyle(container)
          .getPropertyValue("--ui-glass-blur")
          .trim(),
        saturate: getComputedStyle(container)
          .getPropertyValue("--ui-glass-saturate")
          .trim(),
      };

      container.remove();
      return result;
    });
  });

  const lightExpected = [
    {
      preset: "thin",
      surface: [255, 255, 255, 0.2],
      border: [31, 31, 31, 0.16],
      blur: "4px",
      saturate: "150%",
    },
    {
      preset: "soft",
      surface: [255, 255, 255, 0.283],
      border: [31, 31, 31, 0.187],
      blur: "8px",
      saturate: "146.7%",
    },
    {
      preset: "regular",
      surface: [255, 255, 255, 0.367],
      border: [31, 31, 31, 0.213],
      blur: "12px",
      saturate: "143.3%",
    },
    {
      preset: "thick",
      surface: [255, 255, 255, 0.45],
      border: [31, 31, 31, 0.24],
      blur: "16px",
      saturate: "140%",
    },
  ] satisfies Array<{
    preset: string;
    surface: Rgba;
    border: Rgba;
    blur: string;
    saturate: string;
  }>;

  for (const [index, expected] of lightExpected.entries()) {
    const actual = light[index];

    if (!actual) {
      throw new Error(`Missing ${expected.preset} light result`);
    }

    expect(actual.preset).toBe(expected.preset);
    expectColor(actual.surface, expected.surface);
    expectColor(actual.border, expected.border);
    expect(actual.blur).toBe(expected.blur);
    expect(actual.saturate).toBe(expected.saturate);
  }

  const dark = await page.evaluate(() => {
    return ["thin", "soft", "regular", "thick"].map((preset) => {
      const container = document.createElement("div");
      container.className = "dark";
      container.dataset.theme = "dark";
      container.dataset.glass = preset;

      const glass = document.createElement("div");
      glass.className = "ui-glass";
      container.append(glass);
      document.body.append(container);

      const result = {
        preset,
        surface: getComputedStyle(glass).backgroundColor,
        border: getComputedStyle(glass).borderTopColor,
      };

      container.remove();
      return result;
    });
  });

  const darkExpected = [
    {
      preset: "thin",
      surface: [20, 20, 20, 0.62],
      border: [255, 255, 255, 0.2],
    },
    {
      preset: "soft",
      surface: [20, 20, 20, 0.653],
      border: [255, 255, 255, 0.227],
    },
    {
      preset: "regular",
      surface: [20, 20, 20, 0.687],
      border: [255, 255, 255, 0.253],
    },
    {
      preset: "thick",
      surface: [20, 20, 20, 0.72],
      border: [255, 255, 255, 0.28],
    },
  ] satisfies Array<{
    preset: string;
    surface: Rgba;
    border: Rgba;
  }>;

  for (const [index, expected] of darkExpected.entries()) {
    const actual = dark[index];

    if (!actual) {
      throw new Error(`Missing ${expected.preset} dark result`);
    }

    expect(actual.preset).toBe(expected.preset);
    expectColor(actual.surface, expected.surface);
    expectColor(actual.border, expected.border);
  }

  const inheritedDark = await page.evaluate(() => {
    document.documentElement.className = "dark";
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";

    const container = document.createElement("div");
    container.dataset.glass = "regular";

    const glass = document.createElement("div");
    glass.className = "ui-glass";
    container.append(glass);
    document.body.append(container);

    return getComputedStyle(glass).backgroundColor;
  });

  expectColor(inheritedDark, [20, 20, 20, 0.687]);
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
