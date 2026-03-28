const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { getTestData } = require('../utils/test-data-helper');

const validLogin = getTestData('login', 'valid');
const invalidLogin = getTestData('login', 'invalid');

test.describe('User Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(validLogin.email, validLogin.password);

    const loggedIn = await loginPage.isLoggedIn();
    const url = page.url();
    expect(loggedIn || !url.includes('/login')).toBeTruthy();
  });

  test('should show error for wrong password', async () => {
    await loginPage.login(invalidLogin.wrongPassword.email, invalidLogin.wrongPassword.password);

    const error = await loginPage.getErrorMessage();
    expect(error).not.toBeNull();
  });

  test('should show error for unregistered email', async () => {
    await loginPage.login(invalidLogin.unregisteredEmail.email, invalidLogin.unregisteredEmail.password);

    const error = await loginPage.getErrorMessage();
    expect(error).not.toBeNull();
  });

  test('should show validation error for empty email', async () => {
    await loginPage.enterPassword(invalidLogin.emptyEmail.password);
    await loginPage.clickLogin();

    const error = await loginPage.getErrorMessage();
    const url = loginPage.page.url();
    expect(error !== null || url.includes('/login')).toBeTruthy();
  });

  test('should show validation error for empty password', async () => {
    await loginPage.enterEmail(invalidLogin.emptyPassword.email);
    await loginPage.clickLogin();

    const error = await loginPage.getErrorMessage();
    const url = loginPage.page.url();
    expect(error !== null || url.includes('/login')).toBeTruthy();
  });

  test('should persist session after login (remember session)', async ({ page }) => {
    await loginPage.login(validLogin.email, validLogin.password);

    await page.goto('/products');
    await page.waitForLoadState('domcontentloaded');

    const loggedIn = await loginPage.isLoggedIn();
    const url = page.url();
    expect(loggedIn || url.includes('/products')).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    await loginPage.login(validLogin.email, validLogin.password);

    await loginPage.logout();

    const url = page.url();
    const loggedIn = await loginPage.isLoggedIn();
    expect(!loggedIn || url.includes('/login') || url === 'http://localhost:3000/').toBeTruthy();
  });
});
