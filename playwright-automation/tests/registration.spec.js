const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const { getTestData } = require('../utils/test-data-helper');
const { getToastText, getFormErrors } = require('../utils/playwright-helpers');

const valid = getTestData('registration', 'valid');
const invalid = getTestData('registration', 'invalid');

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('01 should register with valid unique email', async ({ page }) => {
    const reg = new RegisterPage(page);
    const email = `e2e.${Date.now()}@example.com`;
    await reg.register({
      firstName: valid.firstName,
      lastName: valid.lastName,
      email,
      password: valid.password,
      confirmPassword: valid.confirmPassword,
      phone: valid.phone,
    });
    await page.waitForURL((u) => !u.pathname.includes('/register'), { timeout: 20000 });
    expect(page.url()).not.toContain('/register');
  });

  test('02 should reject duplicate email', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'X',
      lastName: 'Y',
      email: invalid.duplicateEmail.email,
      password: invalid.duplicateEmail.password,
      confirmPassword: invalid.duplicateEmail.confirmPassword,
      phone: '9876543299',
    });
    const toast = await getToastText(page, { errorOnly: true });
    expect(toast.length + (await getFormErrors(page)).length).toBeGreaterThan(0);
  });

  test('03 should reject invalid email format', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'A',
      lastName: 'B',
      email: invalid.invalidEmail.email,
      password: invalid.invalidEmail.password,
      confirmPassword: invalid.invalidEmail.confirmPassword,
      phone: '9876543210',
    });
    const errs = await getFormErrors(page);
    const html5Invalid = await page.locator('input[name="email"]:invalid').count();
    expect(errs.some((e) => /valid email/i.test(e)) || html5Invalid > 0).toBeTruthy();
  });

  test('04 should reject short password', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'Test',
      lastName: 'User',
      email: `shortpw.${Date.now()}@example.com`,
      password: invalid.shortPassword.password,
      confirmPassword: invalid.shortPassword.confirmPassword,
      phone: '9876543210',
    });
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /8 characters/i.test(e))).toBeTruthy();
  });

  test('05 should reject weak password without uppercase', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'Test',
      lastName: 'User',
      email: `weak.${Date.now()}@example.com`,
      password: invalid.weakPassword.password,
      confirmPassword: invalid.weakPassword.confirmPassword,
      phone: '9876543210',
    });
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /uppercase/i.test(e))).toBeTruthy();
  });

  test('06 should reject password mismatch', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'Test',
      lastName: 'User',
      email: `mis.${Date.now()}@example.com`,
      password: invalid.mismatchPassword.password,
      confirmPassword: invalid.mismatchPassword.confirmPassword,
      phone: '9876543210',
    });
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /match/i.test(e))).toBeTruthy();
  });

  test('07 should reject invalid phone', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.register({
      firstName: 'Test',
      lastName: 'User',
      email: `ph.${Date.now()}@example.com`,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: invalid.invalidPhone.phone,
    });
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /phone|digit/i.test(e))).toBeTruthy();
  });

  test('08 should show errors when required fields empty', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    expect(errs.length).toBeGreaterThan(0);
  });

  test('09 should navigate to login from footer link', async ({ page }) => {
    await page.getByRole('link', { name: /^Sign in$/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('10 should require first name', async ({ page }) => {
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="email"]').fill(`fn.${Date.now()}@example.com`);
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('input[name="confirmPassword"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /first name/i.test(e))).toBeTruthy();
  });

  test('11 should require last name', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="email"]').fill(`ln.${Date.now()}@example.com`);
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('input[name="confirmPassword"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();
    const errs = await getFormErrors(page);
    expect(errs.some((e) => /last name/i.test(e))).toBeTruthy();
  });

  test('12 should display Create Account heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
  });

  test('13 should accept optional empty phone when other fields valid', async ({ page }) => {
    const reg = new RegisterPage(page);
    const email = `nophone.${Date.now()}@example.com`;
    await reg.register({
      firstName: 'No',
      lastName: 'Phone',
      email,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: '',
    });
    await page.waitForURL((u) => !u.pathname.includes('/register'), { timeout: 20000 });
  });

  test('14 should show password fields as password type', async ({ page }) => {
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    await expect(page.locator('input[name="confirmPassword"]')).toHaveAttribute('type', 'password');
  });

  test('15 should stay on register when client validation fails', async ({ page }) => {
    await page.locator('input[name="email"]').fill('bad');
    await page.locator('button[type="submit"]').click();
    expect(page.url()).toContain('/register');
  });
});
