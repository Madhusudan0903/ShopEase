const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  timeout: 30000,

  expect: {
    timeout: 10000,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],

  outputDir: 'reports/test-results',
});
