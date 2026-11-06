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

  await expect(page.getByText("Save changes", { exact: true })).toBeVisible();
  await expectGlass(page.locator('[data-slot="popup"]:visible'));
});
