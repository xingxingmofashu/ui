import { expect, test, type Locator, type Page } from "@playwright/test";

async function openExample(page: Page, example: string) {
  await page.goto("/");
  await page.getByLabel("Example").selectOption(example);
}

async function expectGlass(container: Locator) {
  const glass = container
    .locator('[data-slot="glass"], [data-slot="popup-glass"]')
    .first();

  await expect(glass).toBeVisible();

  const { backdropFilter, borderTopStyle, boxShadow } = await glass.evaluate(
    (element) => {
      const style = getComputedStyle(element);

      return {
        backdropFilter: style.backdropFilter,
        borderTopStyle: style.borderTopStyle,
        boxShadow: style.boxShadow,
      };
    },
  );

  expect(borderTopStyle).toBe("double");
  expect(backdropFilter).toContain("blur");
  expect(boxShadow).not.toBe("none");

  const box = await glass.boundingBox();
  const viewport = glass.page().viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (box && viewport) {
    expect(box.x).toBeGreaterThanOrEqual(-1);
    expect(box.y).toBeGreaterThanOrEqual(-1);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
  }
}

test("select opens a glass popup and chooses an option", async ({ page }) => {
  await openExample(page, "select/basic");

  const trigger = page.getByRole("combobox", { name: "Fruit" });

  await trigger.click();
  await expectGlass(page.locator('[data-slot="popup"]:visible'));

  await page.getByRole("option", { name: "Banana" }).click();
  await expect(trigger).toContainText("Banana");
});

test("menu renders a glass popup and closes on select", async ({ page }) => {
  await openExample(page, "menu/basic");

  await page.getByRole("button", { name: "Open menu" }).click();
  await expectGlass(page.locator('[data-slot="popup"]:visible'));

  await page.getByRole("menuitem", { name: "Rename" }).click();
  await expect(page.getByRole("menu")).toBeHidden();
});

test("toolbar groups actions and moves focus with arrow keys", async ({
  page,
}) => {
  await openExample(page, "toolbar/basic");

  const toolbar = page.getByRole("toolbar", { name: "Document actions" });

  await expect(toolbar).toBeVisible();
  await expectGlass(toolbar);

  const undo = toolbar.getByRole("button", { name: "Undo" });
  const redo = toolbar.getByRole("button", { name: "Redo" });

  await undo.focus();
  await page.keyboard.press("ArrowRight");
  await expect(redo).toBeFocused();

  await toolbar.getByRole("button", { name: "Copy" }).click();
  await expect(page.getByText("Last action: Copy")).toBeVisible();
});

test("toast renders a glass notification", async ({ page }) => {
  await openExample(page, "toast/basic");

  await page.getByRole("button", { name: "Show notification" }).click();

  await expect(
    page.getByRole("heading", { name: "Changes saved" }),
  ).toBeVisible();
  await expectGlass(page.locator('[data-slot="viewport"]'));
});

test("tooltip opens on hover", async ({ page }) => {
  await openExample(page, "tooltip/basic");

  await page.getByRole("button", { name: "Save" }).hover();

  const popup = page.locator('[data-slot="popup"]:visible');

  await expect(page.getByText("Save changes", { exact: true })).toBeVisible();
  await expectGlass(popup);

  const arrow = popup.locator('[data-slot="arrow"]');

  await expect(arrow).toBeVisible();

  const { backgroundColor, clipPath } = await arrow.evaluate((element) => {
    const style = getComputedStyle(element);

    return {
      backgroundColor: style.backgroundColor,
      clipPath: style.clipPath,
    };
  });

  expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(clipPath).toContain("polygon");
});
