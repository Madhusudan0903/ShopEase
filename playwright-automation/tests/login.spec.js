const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser, getToastText, getFormErrors } = require('../utils/playwright-helpers');

const valid = getTestData('login', 'valid');
const invalid = getTestData('login', 'invalid');

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('01 should login successfully with valid seeded credentials', async ({ page }) => {
    await loginAsUser(page, valid.email, valid.password);
    await expect(page.locator('.navbar-user-dropdown')).toBeVisible({ timeout: 20000 });
  });

  test('02 should show toast on wrong password', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.login(invalid.wrongPassword.email, invalid.wrongPassword.password);
    const toast = await getToastText(page, { errorOnly: true });
    expect(toast.length).toBeGreaterThan(0);
  });

  test('03 should show toast for unregistered email', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.login(invalid.unregisteredEmail.email, invalid.unregisteredEmail.password);
    const toast = await getToastText(page, { errorOnly: true });
    expect(toast.length).toBeGreaterThan(0);
  });

  test('04 should validate empty email before submit', async ({ page }) => {
    await page.locator('input[name="password"]').fill('x');
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /email/i.test(e))).toBeTruthy();
  });

  test('05 should validate empty password', async ({ page }) => {
    await page.locator('input[name="email"]').fill('a@b.com');
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /password/i.test(e))).toBeTruthy();
  });

  test('06 should validate invalid email format', async ({ page }) => {
    await page.locator('input[name="email"]').fill('not-an-email');
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    const html5Invalid = await page.locator('input[name="email"]:invalid').count();
    expect(errs.some((e) => /valid email/i.test(e)) || html5Invalid > 0).toBeTruthy();
  });

  test('07 should keep user on login page when validation fails', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    expect(page.url()).toContain('/login');
  });

  test('08 should stay logged in when navigating to products', async ({ page }) => {
    await loginAsUser(page, valid.email, valid.password);
    await page.goto('/products');
    await expect(page.locator('.navbar-user-dropdown')).toBeVisible({ timeout: 10000 });
  });

  test('09 should show Account dropdown after login', async ({ page }) => {
    await loginAsUser(page, valid.email, valid.password);
    await expect(page.getByRole('button', { name: /alice/i })).toBeVisible({ timeout: 10000 });
  });

  test('10 should logout and show Login link', async ({ page }) => {
    await loginAsUser(page, valid.email, valid.password);
    const lp = new LoginPage(page);
    await lp.logout();
    await expect(page.getByRole('link', { name: /^Login$/ })).toBeVisible({ timeout: 10000 });
  });

  test('11 should navigate to register from login page', async ({ page }) => {
    await page.getByRole('link', { name: /create one/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('12 should have password input type password', async ({ page }) => {
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
  });

  test('13 should load login form with email and password fields', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('14 should show Sign In button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('15 should allow login as Bob', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await expect(page.locator('.navbar-user-dropdown')).toBeVisible({ timeout: 15000 });
  });
});
