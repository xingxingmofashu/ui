import { expect, test, type Page } from "@playwright/test";

// Mirrors the REPL draft storage contract in `playground/src/repl`.
const STORAGE_KEY = "ui-playground-repl-v1";
const BLANK_ID = "__blank__";
const SEED_FLAG = "ui-repl-e2e-seeded";

function consoleOutput(page: Page) {
  return page.getByTestId("repl-console").locator('[role="log"] pre');
}

async function replaceCode(page: Page, code: string) {
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type(code);
}

async function openWithCode(page: Page, code: string) {
  await page.addInitScript(
    ({ blankId, flag, storageKey, source }) => {
      // Seed once so reload-based tests keep whatever the app persisted.
      if (sessionStorage.getItem(flag) === "1") return;

      sessionStorage.setItem(flag, "1");
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          exampleId: blankId,
          autoRun: true,
          drafts: { [blankId]: source },
        }),
      );
    },
    {
      blankId: BLANK_ID,
      flag: SEED_FLAG,
      storageKey: STORAGE_KEY,
      source: code,
    },
  );
  await page.goto("/");
}

test("boots the welcome example and Monaco", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".monaco-editor")).toBeVisible();
  await expect(page.getByTestId("repl-welcome")).toBeVisible();
  await expect(page.getByTestId("repl-preview")).toContainText(
    "Glass on photography",
  );
  await expect(page.getByTestId("repl-welcome-background")).toHaveCSS(
    "background-image",
    /w53k9q\.jpg/,
  );
});

test("resizes the code and preview panes with the splitter", async ({
  page,
}) => {
  await page.goto("/");

  const codePane = page.getByTestId("repl-code");
  const preview = page.getByTestId("repl-preview");
  const separator = page.getByRole("separator", {
    name: "Resize code and preview panes",
  });

  await expect(separator).toBeVisible();
  const codeWidth = (await codePane.boundingBox())?.width ?? 0;
  const previewWidth = (await preview.boundingBox())?.width ?? 0;
  const startValue = await separator.getAttribute("aria-valuenow");
  const box = await separator.boundingBox();

  if (!box) throw new Error("Missing splitter bounds.");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x - 120, box.y + box.height / 2, { steps: 6 });
  await page.mouse.up();

  await expect(separator).not.toHaveAttribute("aria-valuenow", startValue ?? "");
  expect((await codePane.boundingBox())?.width ?? 0).toBeLessThan(codeWidth);
  expect((await preview.boundingBox())?.width ?? 0).toBeGreaterThan(previewWidth);

  const resizedValue = await separator.getAttribute("aria-valuenow");

  await page.reload();

  await expect(
    page.getByRole("separator", {
      name: "Resize code and preview panes",
    }),
  ).toHaveAttribute("aria-valuenow", resizedValue ?? "");
});

test("resizes the preview and console panes", async ({ page }) => {
  await page.goto("/");

  const preview = page.getByTestId("repl-preview");
  const consolePanel = page.getByTestId("repl-console");
  const separator = page.getByRole("separator", {
    name: "Resize preview and console panes",
  });

  await expect(separator).toBeVisible();
  const previewHeight = (await preview.boundingBox())?.height ?? 0;
  const consoleHeight = (await consolePanel.boundingBox())?.height ?? 0;
  const box = await separator.boundingBox();

  if (!box) throw new Error("Missing splitter bounds.");

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, box.y + 60, { steps: 6 });
  await page.mouse.up();

  expect((await preview.boundingBox())?.height ?? 0).toBeGreaterThan(
    previewHeight,
  );
  expect((await consolePanel.boundingBox())?.height ?? 0).toBeLessThan(
    consoleHeight,
  );

  const resizedValue = await separator.getAttribute("aria-valuenow");

  await page.reload();

  await expect(
    page.getByRole("separator", {
      name: "Resize preview and console panes",
    }),
  ).toHaveAttribute("aria-valuenow", resizedValue ?? "");
});

test("restores the collapsed console after reload", async ({ page }) => {
  await page.goto("/");

  const consolePanel = page.getByTestId("repl-console");
  const toggle = consolePanel.getByRole("button").first();

  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  expect((await consolePanel.boundingBox())?.height ?? 0).toBeLessThan(60);

  await page.reload();

  await expect(
    page.getByTestId("repl-console").getByRole("button").first(),
  ).toHaveAttribute("aria-expanded", "false");

  await expect
    .poll(async () => (await consolePanel.boundingBox())?.height ?? 0)
    .toBeLessThan(60);
});

test("evaluates the last expression", async ({ page }) => {
  await openWithCode(page, "1 + 1;");

  await expect(consoleOutput(page)).toHaveText("2");
});

test("awaits promise expression results", async ({ page }) => {
  await openWithCode(page, "Promise.resolve(7);");

  await expect(consoleOutput(page)).toHaveText("7");
});

test("renders a JSX expression with imports", async ({ page }) => {
  await openWithCode(
    page,
    'import { Button } from "@xingxingmofashu/ui";\n\n<Button label="Run me" />;',
  );

  await expect(page.getByRole("button", { name: "Run me" })).toBeVisible();
});

test("reports compile errors", async ({ page }) => {
  await openWithCode(
    page,
    "export default function App() { return <div>; }",
  );

  await expect(page.getByTestId("repl-error")).toContainText("Compile error");
});

test("reports render errors", async ({ page }) => {
  await openWithCode(
    page,
    'export default function App() { throw new Error("boom"); }',
  );

  await expect(page.getByTestId("repl-error")).toContainText("boom");
});

test("recovers after a render error", async ({ page }) => {
  await openWithCode(
    page,
    'export default function App() { throw new Error("boom"); }',
  );
  await expect(page.getByTestId("repl-error")).toContainText("boom");

  await replaceCode(page, "1 + 1;");

  await expect(consoleOutput(page)).toHaveText("2");
  await expect(page.getByTestId("repl-error")).toBeHidden();
});

test("captures console output", async ({ page }) => {
  await openWithCode(
    page,
    'console.log("hello", 42);\n\nexport default function App() { return <div>Done</div>; }',
  );

  await expect(consoleOutput(page)).toHaveText("hello 42");
});

test("keeps the console on the active theme", async ({ page }) => {
  await page.goto("/");

  const consolePanel = page.getByTestId("repl-console");
  const readBackground = () =>
    consolePanel.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );

  await expect(consolePanel).toBeVisible();
  const lightBackground = await readBackground();

  await page.getByRole("button", { name: "Dark" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await readBackground()).not.toBe(lightBackground);

  await page.getByRole("button", { name: "Light" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  expect(await readBackground()).toBe(lightBackground);
});

test("compiles Tailwind utilities written in the REPL", async ({ page }) => {
  await openWithCode(
    page,
    'export default function App() { return <div data-testid="dynamic-style" className="text-[42px]">Dynamic</div>; }',
  );

  const element = page.getByTestId("dynamic-style");

  await expect(element).toBeVisible();
  await expect(element).toHaveCSS("font-size", "42px");
});

test("runs manually when auto-run is off", async ({ page }) => {
  await openWithCode(page, "1 + 1;");
  await expect(consoleOutput(page)).toHaveText("2");

  await page.getByRole("switch", { name: "Auto-run" }).click();

  await replaceCode(page, "9 + 9;");
  await page.waitForTimeout(800);
  await expect(consoleOutput(page)).toHaveText("2");

  await page.getByRole("button", { name: "Run", exact: true }).click();
  await expect(consoleOutput(page)).toHaveText("18");

  await replaceCode(page, "5 + 5;");
  await page.waitForTimeout(800);
  await expect(consoleOutput(page)).toHaveText("18");

  await page.keyboard.press("ControlOrMeta+Enter");
  await expect(consoleOutput(page)).toHaveText("10");
});

test("restores an edited draft after reload", async ({ page }) => {
  await openWithCode(page, "1 + 1;");
  await expect(consoleOutput(page)).toHaveText("2");

  await replaceCode(page, "2 + 3;");
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY))
    .toContain("2 + 3");

  await page.reload();

  await expect(consoleOutput(page)).toHaveText("5");
});

test("loads a docs example and keeps overlays interactive", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Example").selectOption("dialog/basic");

  await page.getByRole("button", { name: "Open settings" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
