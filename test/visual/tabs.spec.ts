import { expect, test } from "@playwright/test";

test.describe("tabs", () => {
  test.use({ reducedMotion: "no-preference" });

  test("keeps following content in place while panels cross-fade", async ({
    page,
  }) => {
    await page.goto("/#tabs");

    const list = page.getByRole("tablist", {
      name: "Account settings",
      exact: true,
    });
    await expect(list).toBeVisible();
    await expect(
      page.getByText("Active tab: Profile", { exact: true }),
    ).toBeVisible();

    const positions = await page.evaluate(async () => {
      const tabList = document.querySelector<HTMLElement>(
        '[data-slot="list"][aria-label="Account settings"]',
      );
      const tab = [
        ...(tabList?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []),
      ].find((element) => element.textContent?.trim() === "Billing");
      const status = [...document.querySelectorAll("p")].find((element) =>
        element.textContent?.startsWith("Active tab:"),
      );

      const tops = new Set<number>();
      const start = performance.now();
      tab?.click();

      return await new Promise<number[]>((resolve) => {
        const sample = () => {
          if (status) {
            tops.add(Math.round(status.getBoundingClientRect().top));
          }

          if (performance.now() - start < 400) {
            requestAnimationFrame(sample);
          } else {
            resolve([...tops]);
          }
        };

        requestAnimationFrame(sample);
      });
    });

    expect(positions).toHaveLength(1);
    await expect(
      page.getByText("Active tab: Billing", { exact: true }),
    ).toBeVisible();
  });
});
