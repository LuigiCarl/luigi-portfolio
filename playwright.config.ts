import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "qa-results/test-results",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 3,
  reporter: [
    ["list"],
    ["html", { outputFolder: "qa-results/html-report", open: "never" }],
    ["json", { outputFile: "qa-results/results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command: "npm.cmd run start -- --hostname 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
