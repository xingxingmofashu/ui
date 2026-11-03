import { expect, test } from "@playwright/test";

const themes = ["light", "dark"] as const;

const presets = [
  { id: "image", label: "Image" },
  { id: "aurora", label: "Aurora" },
  { id: "spectrum", label: "Spectrum" },
] as const;

for (const theme of themes) {
  for (const preset of presets) {
    test(`surface lab · ${preset.id} · ${theme}`, async ({ page }) => {
      await page.addInitScript((value) => {
        window.localStorage.setItem("ui-playground-theme", value);
      }, theme);

      await page.goto("/");

      const panel = page.getByTestId("surface-lab-panel");
      await expect(panel).toBeVisible();

      await page.addStyleTag({
        content:
          "html, body, #root, .pg-app { background: transparent !important; }",
      });

      if (preset.id !== "image") {
        await page.locator(`[data-preset="${preset.id}"]`).click();
        await expect(
          page.locator(`[data-preset="${preset.id}"]`),
        ).toHaveAttribute("aria-pressed", "true");
      }

      await page.evaluate(async () => {
        await document.fonts.ready;

        const background = document.querySelector<HTMLElement>(
          '[data-testid="surface-lab-background"]',
        );
        const value = background
          ? getComputedStyle(background).backgroundImage
          : "";
        const url = value.match(/url\("?(.*?)"?\)/)?.[1];

        if (!url) return;

        const image = new Image();
        image.src = url;
        await image.decode().catch(() => undefined);
      });

      await expect(panel).toHaveScreenshot(
        `surface-lab-${preset.id}-${theme}.png`,
        { omitBackground: true },
      );
    });
  }
}
