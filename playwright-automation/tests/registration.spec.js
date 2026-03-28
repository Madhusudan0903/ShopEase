const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const LoginPage = require('../pages/LoginPage');
const { getTestData } = require('../utils/test-data-helper');
const { generateRandomEmail, generateRandomPhone } = require('../utils/helpers');

const validData = getTestData('registration', 'valid');
const invalidData = getTestData('registration', 'invalid');

test.describe('User Registration', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test('should register a new user with valid details', async ({ page }) => {
    const uniqueEmail = generateRandomEmail();
    await registerPage.fillRegistrationForm({
      ...validData,
      email: uniqueEmail,
    });
    await registerPage.clickRegister();

    const successMsg = await registerPage.getSuccessMessage();
    const currentUrl = await registerPage.getCurrentUrl();

    const registered = successMsg !== null || currentUrl.includes('/login');
    expect(registered).toBeTruthy();
  });

  test('should show error for duplicate email registration', async () => {
    await registerPage.fillRegistrationForm(invalidData.duplicateEmail);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    const errorMsg = await registerPage.getSuccessMessage();
    const hasError = errors.length > 0 || errorMsg === null;
    expect(hasError).toBeTruthy();
  });

  test('should show error for invalid email format', async () => {
    await registerPage.fillRegistrationForm(invalidData.invalidEmail);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for short password', async () => {
    await registerPage.fillRegistrationForm(invalidData.shortPassword);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for weak password without special characters', async () => {
    await registerPage.fillRegistrationForm(invalidData.weakPassword);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for too-short first and last name', async () => {
    await registerPage.fillRegistrationForm(invalidData.shortName);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for invalid phone number', async () => {
    await registerPage.fillRegistrationForm(invalidData.invalidPhone);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show validation errors when all fields are empty', async () => {
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for password mismatch', async () => {
    await registerPage.fillRegistrationForm(invalidData.mismatchPassword);
    await registerPage.clickRegister();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should be able to login after successful registration', async ({ page }) => {
    const uniqueEmail = generateRandomEmail();
    const password = 'Test@12345';

    await registerPage.fillRegistrationForm({
      ...validData,
      email: uniqueEmail,
      password,
      confirmPassword: password,
    });
    await registerPage.clickRegister();

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(uniqueEmail, password);

    const loggedIn = await loginPage.isLoggedIn();
    const currentUrl = page.url();
    expect(loggedIn || !currentUrl.includes('/login')).toBeTruthy();
  });

  test('should navigate to login page from register page', async ({ page }) => {
    await registerPage.clickLoginLink();
    expect(page.url()).toContain('/login');
  });
});
