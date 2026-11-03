import { expect, test } from "@playwright/test";

test("data-glass scopes shared presets to a container", async ({ page }) => {
  await page.goto("/");

  const light = await page.evaluate(() => {
    const container = document.createElement("div");
    container.dataset.glass = "thick";

    const glass = document.createElement("div");
    glass.className = "ui-glass";
    container.append(glass);
    document.body.append(container);

    return {
      surface: getComputedStyle(glass).backgroundColor,
      blur: getComputedStyle(container)
        .getPropertyValue("--ui-glass-blur")
        .trim(),
    };
  });

  expect(light.surface).toBe("rgba(255, 255, 255, 0.45)");
  expect(light.blur).toBe("16px");

  const dark = await page.evaluate(() => {
    const container = document.createElement("div");
    container.className = "dark";
    container.dataset.theme = "dark";
    container.dataset.glass = "thin";

    const glass = document.createElement("div");
    glass.className = "ui-glass";
    container.append(glass);
    document.body.append(container);

    return {
      surface: getComputedStyle(glass).backgroundColor,
      blur: getComputedStyle(container)
        .getPropertyValue("--ui-glass-blur")
        .trim(),
    };
  });

  expect(dark.surface).toBe("rgba(20, 20, 20, 0.62)");
  expect(dark.blur).toBe("4px");

  const inheritedDark = await page.evaluate(() => {
    document.documentElement.className = "dark";
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";

    const container = document.createElement("div");
    container.dataset.glass = "thick";

    const glass = document.createElement("div");
    glass.className = "ui-glass";
    container.append(glass);
    document.body.append(container);

    return getComputedStyle(glass).backgroundColor;
  });

  expect(inheritedDark).toBe("rgba(20, 20, 20, 0.72)");
});

test("playground switches the shared glass material", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("html");
  const thick = page.getByRole("button", { name: "Thick", exact: true });

  await expect(root).toHaveAttribute("data-glass", "regular");
  await thick.click();
  await expect(root).toHaveAttribute("data-glass", "thick");
  await expect(thick).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(root).toHaveAttribute("data-glass", "thick");
});
