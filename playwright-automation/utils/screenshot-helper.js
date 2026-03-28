const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'reports', 'screenshots');

function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

async function captureOnFailure(testInfo, page) {
  if (testInfo.status !== testInfo.expectedStatus) {
    ensureScreenshotDir();
    const sanitizedTitle = testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const screenshotPath = path.join(
      SCREENSHOT_DIR,
      `FAIL_${sanitizedTitle}_${Date.now()}.png`
    );
    const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('failure-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}

async function captureStep(page, stepName, testName) {
  ensureScreenshotDir();
  const sanitizedStep = stepName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const sanitizedTest = testName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const screenshotPath = path.join(
    SCREENSHOT_DIR,
    `${sanitizedTest}_${sanitizedStep}_${Date.now()}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

module.exports = {
  captureOnFailure,
  captureStep,
};
