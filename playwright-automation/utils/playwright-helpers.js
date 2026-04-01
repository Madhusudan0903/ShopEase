/**
 * Shared helpers for Playwright e2e (toast, login, dialogs).
 */

async function dismissConfirmDialog(page) {
  page.once('dialog', (dialog) => dialog.accept());
}

async function getToastText(page, { errorOnly = false } = {}) {
  const sel = errorOnly
    ? '.Toastify__toast--error .Toastify__toast-body'
    : '.Toastify__toast-body';
  const loc = page.locator(sel).last();
  await loc.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
  if (await loc.isVisible().catch(() => false)) {
    return (await loc.textContent())?.trim() || '';
  }
  return '';
}

async function getFormErrors(page) {
  const errs = page.locator('.form-error');
  const n = await errs.count();
  const out = [];
  for (let i = 0; i < n; i += 1) {
    const t = await errs.nth(i).textContent();
    if (t?.trim()) out.push(t.trim());
  }
  return out;
}

async function loginAsUser(page, email, password) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    const moved = await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 30000 }).then(() => true).catch(() => false);
    if (moved) {
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
      const userMenuVisible = await page
        .locator('.navbar-user-dropdown')
        .waitFor({ state: 'visible', timeout: 12000 })
        .then(() => true)
        .catch(() => false);
      if (userMenuVisible) return;
    }
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  }
  throw new Error(`loginAsUser failed after 3 attempts for ${email}`);
}

async function logoutIfPossible(page) {
  const dropdownBtn = page.locator('.navbar-user-dropdown button').first();
  if (await dropdownBtn.isVisible().catch(() => false)) {
    await dropdownBtn.click();
    await page.getByRole('button', { name: /logout/i }).click();
    await page.waitForTimeout(500);
  }
}

module.exports = {
  dismissConfirmDialog,
  getToastText,
  getFormErrors,
  loginAsUser,
  logoutIfPossible,
};
