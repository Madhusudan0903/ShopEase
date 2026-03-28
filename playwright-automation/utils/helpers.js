const crypto = require('crypto');

function generateRandomEmail() {
  const timestamp = Date.now();
  const rand = randomString(6);
  return `testuser_${rand}_${timestamp}@example.com`;
}

function generateRandomPhone() {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  digits[0] = Math.max(digits[0], 6);
  return digits.join('');
}

async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => {});
}

async function takeScreenshot(page, name) {
  const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = `reports/screenshots/${sanitized}_${timestamp}.png`;
  await page.screenshot({ path, fullPage: true });
  return path;
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function randomString(length = 8) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

module.exports = {
  generateRandomEmail,
  generateRandomPhone,
  waitForPageLoad,
  takeScreenshot,
  formatDate,
  randomString,
  formatCurrency,
};
