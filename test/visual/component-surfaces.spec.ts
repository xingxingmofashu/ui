import { expect, test } from "@playwright/test";

type SurfaceCase = {
  id: string;
  selector: string;
  material: "glass" | "gradient" | "layout" | "lens" | "track";
};

const surfaces: SurfaceCase[] = [
  { id: "accordion", selector: '[data-slot="glass"]', material: "glass" },
  { id: "button", selector: '[data-slot="glass"]', material: "glass" },
  { id: "card", selector: '[data-slot="glass"]', material: "glass" },
  { id: "checkbox", selector: '[data-slot="glass"]', material: "glass" },
  {
    id: "checkbox-group",
    selector: '[data-slot="glass"]',
    material: "glass",
  },
  { id: "field", selector: '[data-slot="label"]', material: "layout" },
  { id: "fieldset", selector: '[data-slot="root"]', material: "layout" },
  { id: "form", selector: "form", material: "layout" },
  { id: "input", selector: '[data-slot="glass"]', material: "glass" },
  { id: "progress", selector: '[data-slot="indicator"]', material: "gradient" },
  {
    id: "radio-group",
    selector: '[data-slot="glass"]',
    material: "glass",
  },
  { id: "scroll-area", selector: '[data-slot="glass"]', material: "glass" },
  {
    id: "slider",
    selector: '[data-layer="thumb-glass"]',
    material: "lens",
  },
  { id: "switch", selector: '[data-layer="track"]', material: "track" },
  { id: "tabs", selector: '[data-slot="glass"]', material: "glass" },
  { id: "toggle", selector: '[data-slot="glass"]', material: "glass" },
  {
    id: "toggle-group",
    selector: '[data-slot="glass"]',
    material: "glass",
  },
];

for (const surface of surfaces) {
  test(`${surface.id} renders its expected surface`, async ({ page }) => {
    await page.goto(`/#${surface.id}`);

    const section = page.locator(`#${surface.id}`);
    await expect(section).toBeVisible();

    const target = section.locator(surface.selector).first();
    await expect(target).toBeVisible();

    const style = await target.evaluate((element) => {
      const computed = getComputedStyle(element);

      return {
        backdropFilter: computed.backdropFilter,
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        borderTopStyle: computed.borderTopStyle,
        boxShadow: computed.boxShadow,
      };
    });

    if (surface.material === "glass") {
      expect(style.borderTopStyle).toBe("double");
      expect(style.backdropFilter).toContain("blur");
      expect(style.boxShadow).not.toBe("none");
    }

    if (surface.material === "gradient") {
      expect(style.backgroundImage).toContain("linear-gradient");
    }

    if (surface.material === "lens") {
      expect(style.borderTopStyle).toBe("solid");
      expect(style.backdropFilter).toContain("blur");
      expect(style.boxShadow).not.toBe("none");
    }

    if (surface.material === "track") {
      expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(style.boxShadow).not.toBe("none");
    }
  });
}
