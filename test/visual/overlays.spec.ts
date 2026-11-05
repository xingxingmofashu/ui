import { expect, test, type Locator, type Page } from "@playwright/test";

type OverlayCase = {
  id: string;
  open: (page: Page, section: Locator) => Promise<void>;
  popup: (page: Page) => Locator;
};

const overlays: OverlayCase[] = [
  {
    id: "dialog",
    open: async (_page, section) => {
      await section.getByRole("button", { name: "Open settings" }).click();
    },
    popup: (page) => page.getByRole("dialog"),
  },
  {
    id: "alert-dialog",
    open: async (_page, section) => {
      await section.getByRole("button", { name: "Delete project" }).click();
    },
    popup: (page) => page.getByRole("alertdialog"),
  },
  {
    id: "drawer",
    open: async (_page, section) => {
      await section.getByRole("button", { name: "Open settings" }).click();
    },
    popup: (page) => page.getByRole("dialog"),
  },
  {
    id: "menu",
    open: async (_page, section) => {
      await section
        .getByRole("button", { name: "Open menu" })
        .first()
        .click();
    },
    // Menu.Popup owns the glass layer; Menu.List is the nested role="menu".
    popup: (page) => page.locator('[data-slot="popup"]:visible'),
  },
  {
    id: "popover",
    open: async (_page, section) => {
      await section.getByRole("button", { name: "Open settings" }).click();
    },
    popup: (page) => page.getByRole("dialog"),
  },
  {
    id: "select",
    open: async (_page, section) => {
      await section.getByRole("combobox", { name: "Fruit" }).click();
    },
    // Select.Popup owns the glass layer; Select.List is the nested listbox.
    popup: (page) => page.locator('[data-slot="popup"]:visible'),
  },
  {
    id: "toast",
    open: async (_page, section) => {
      await section.getByRole("button", { name: "Show notification" }).click();
    },
    popup: (page) => page.getByRole("dialog"),
  },
  {
    id: "tooltip",
    open: async (_page, section) => {
      // The controlled tooltip is deterministic under reduced-motion and
      // does not depend on hover timing.
      await section.getByRole("button", { name: "Show tooltip" }).click();
    },
    // Base UI's tooltip popup does not expose a tooltip role; use the popup slot.
    popup: (page) => page.locator('[data-slot="popup"]:visible'),
  },
];

test.use({ viewport: { width: 900, height: 500 } });

test.describe("overlay surfaces", () => {
  for (const overlay of overlays) {
    test(`${overlay.id} renders glass inside the viewport`, async ({
      page,
    }) => {
      await page.goto(`/#${overlay.id}`);

      const section = page.locator(`#${overlay.id}`);
      await expect(section).toBeVisible();

      await overlay.open(page, section);

      const popup = overlay.popup(page);
      await expect(popup).toBeVisible();

      const glass = popup.locator(".ui-glass").first();
      await expect(glass).toBeVisible();

      const material = await glass.evaluate((element) => {
        const style = getComputedStyle(element);

        return {
          backdropFilter: style.backdropFilter,
          borderTopStyle: style.borderTopStyle,
          boxShadow: style.boxShadow,
        };
      });

      expect(material.borderTopStyle).toBe("double");
      expect(material.backdropFilter).toContain("blur");
      expect(material.boxShadow).not.toBe("none");

      const popupBackground = await popup.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      );

      expect(popupBackground).toBe("rgba(0, 0, 0, 0)");

      if (overlay.id === "popover") {
        const arrow = popup.locator('[data-slot="arrow"]');
        await expect(arrow).toBeVisible();

        const arrowStyle = await arrow.evaluate((element) => {
          const style = getComputedStyle(element);

          return {
            backgroundColor: style.backgroundColor,
            clipPath: style.clipPath,
          };
        });

        expect(arrowStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
        expect(arrowStyle.clipPath).toContain("polygon");
      }

      const viewport = page.viewportSize();
      const box = await popup.boundingBox();

      expect(viewport).not.toBeNull();
      expect(box).not.toBeNull();

      if (viewport && box) {
        expect(box.x).toBeGreaterThanOrEqual(-1);
        expect(box.y).toBeGreaterThanOrEqual(-1);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
      }
    });
  }
});

test("tooltip arrow uses the overlay fill and clips to the exposed half", async ({
  page,
}) => {
  await page.goto("/#tooltip");

  const section = page.locator("#tooltip");
  await section.getByRole("button", { name: "Save" }).hover();

  const popup = page.locator('[data-slot="popup"]:visible');
  const arrow = popup.locator('[data-slot="arrow"]');
  await expect(arrow).toBeVisible();

  const arrowStyle = await arrow.evaluate((element) => {
    const style = getComputedStyle(element);

    return {
      backgroundColor: style.backgroundColor,
      clipPath: style.clipPath,
    };
  });

  expect(arrowStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(arrowStyle.clipPath).toContain("polygon");
});

test.describe("tall overlay content", () => {
  for (const overlay of [
    {
      id: "dialog",
      role: "dialog" as const,
      trigger: "Open settings",
    },
    {
      id: "alert-dialog",
      role: "alertdialog" as const,
      trigger: "Delete project",
    },
  ]) {
    test(`${overlay.role} keeps the top of tall content reachable`, async ({
      page,
    }) => {
      await page.goto(`/#${overlay.id}`);

      const section = page.locator(`#${overlay.id}`);
      await section.getByRole("button", { name: overlay.trigger }).click();

      const popup = page.getByRole(overlay.role);
      await expect(popup).toBeVisible();

      await popup.evaluate((element) => {
        const target =
          element.querySelector<HTMLElement>('[data-slot="body"]') ??
          element.querySelector<HTMLElement>('[data-slot="content"]') ??
          element;

        const spacer = document.createElement("div");
        spacer.style.height = "2000px";
        target.append(spacer);
      });

      const metrics = await page.evaluate(() => {
        const popupElement = document.querySelector<HTMLElement>(
          '[role="dialog"], [role="alertdialog"]',
        );
        const viewportElement =
          popupElement?.closest<HTMLElement>('[data-slot="viewport"]');

        if (!popupElement || !viewportElement) {
          throw new Error("Overlay elements were not rendered.");
        }

        const popupRect = popupElement.getBoundingClientRect();
        const viewportRect = viewportElement.getBoundingClientRect();
        const style = getComputedStyle(viewportElement);

        return {
          alignItem: style.alignItems,
          clientHeight: viewportElement.clientHeight,
          maxScrollTop:
            viewportElement.scrollHeight - viewportElement.clientHeight,
          overflowY: style.overflowY,
          popupTop: popupRect.top,
          scrollHeight: viewportElement.scrollHeight,
          viewportTop: viewportRect.top,
        };
      });

      expect(["auto", "scroll"]).toContain(metrics.overflowY);
      expect(metrics.alignItem).not.toBe("center");
      expect(metrics.popupTop).toBeGreaterThanOrEqual(metrics.viewportTop - 1);
      expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight);
      expect(metrics.maxScrollTop).toBeGreaterThan(0);

      const scrollTop = await page.evaluate(() => {
        const popupElement = document.querySelector<HTMLElement>(
          '[role="dialog"], [role="alertdialog"]',
        );
        const viewportElement =
          popupElement?.closest<HTMLElement>('[data-slot="viewport"]');

        if (!viewportElement) {
          throw new Error("Overlay viewport was not rendered.");
        }

        viewportElement.scrollTop = viewportElement.scrollHeight;

        return viewportElement.scrollTop;
      });

      expect(scrollTop).toBeGreaterThan(0);
    });
  }
});
