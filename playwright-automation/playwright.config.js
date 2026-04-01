const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  // Single DB user (john) + shared cart → avoid parallel execution
  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: 1,
  // CI: stateful app + shared DB — one worker avoids races; JWT/DB issues surface as login timeouts
  workers: process.env.CI ? 1 : undefined,

  reporter: [["html", { open: "never" }], ["allure-playwright"], ["list"]],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Ensure we run pure Chromium, not Google Chrome "channel".
        channel: undefined,
        browserName: "chromium",
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // CI: allow extra time for navigation + login retries when the runner is cold
  timeout: process.env.CI ? 90000 : 30000,

});
