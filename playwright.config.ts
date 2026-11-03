import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3002";

export default defineConfig({
  testDir: "./test/visual",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}-{platform}{ext}",
  use: {
    baseURL,
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "UTC",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
      maxDiffPixelRatio: 0.002,
      threshold: 0.2,
    },
  },
  webServer: {
    command:
      "pnpm playground:build && pnpm --filter @xingxingmofashu/playground exec vite preview --port 3002 --host 127.0.0.1",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
