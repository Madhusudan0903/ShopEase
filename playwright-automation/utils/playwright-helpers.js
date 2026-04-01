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
  const resetState = async () => {
    if (page.isClosed()) return;
    await page.context().clearCookies().catch(() => {});
    await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page
      .evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      })
      .catch(() => {});
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (page.isClosed()) break;

    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    await emailInput.waitFor({ state: 'visible', timeout: 20000 });
    await emailInput.fill(email);
    await passwordInput.fill(password);

    const loginResponsePromise = page
      .waitForResponse(
        (r) => r.request().method() === 'POST' && r.url().includes('/api/auth/login'),
        { timeout: 25000 }
      )
      .catch(() => null);

    await submitBtn.click();
    await loginResponsePromise;

    const userMenuVisible = await page
      .locator('.navbar-user-dropdown')
      .waitFor({ state: 'visible', timeout: 20000 })
      .then(() => true)
      .catch(() => false);

    if (userMenuVisible) return;

    await resetState();
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
