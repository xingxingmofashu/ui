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
  await expect(page.getByTestId("repl-preview")).toContainText("Hello, REPL");
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
