import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "ui-playground-repl-v1";

async function openWithCode(page: Page, code: string) {
  await page.addInitScript(
    ({ storageKey, source }) => {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          exampleId: "__blank__",
          autoRun: true,
          drafts: { __blank__: source },
        }),
      );
    },
    { storageKey: STORAGE_KEY, source: code },
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

  await expect(page.getByTestId("repl-console")).toContainText("2");
});

test("awaits promise expression results", async ({ page }) => {
  await openWithCode(page, "Promise.resolve(7);");

  await expect(page.getByTestId("repl-console")).toContainText("7");
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

test("captures console output", async ({ page }) => {
  await openWithCode(
    page,
    'console.log("hello", 42);\n\nexport default function App() { return <div>Done</div>; }',
  );

  await expect(page.getByTestId("repl-console")).toContainText("hello 42");
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

test("loads a docs example and keeps overlays interactive", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Example").selectOption("dialog/basic");

  await page.getByRole("button", { name: "Open settings" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
