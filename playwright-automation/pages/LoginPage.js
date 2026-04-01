const BasePage = require('./BasePage');
const { getToastText, getFormErrors } = require('../utils/playwright-helpers');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.submitButton = 'button[type="submit"]';
  }

  async navigate() {
    await super.navigate('/login');
  }

  async enterEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.locator(this.submitButton).click();
    await this.page.waitForTimeout(500);
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /** Client-side .form-error or API failure toast */
  async getErrorMessage() {
    const fe = await getFormErrors(this.page);
    if (fe.length) return fe[0];
    const toast = await getToastText(this.page, { errorOnly: true });
    return toast || null;
  }

  async isLoggedIn() {
    return this.page.locator('.navbar-user-dropdown').isVisible().catch(() => false);
  }

  async logout() {
    await this.page.locator('.navbar-user-dropdown button').first().click();
    await this.page.getByRole('button', { name: /logout/i }).click();
    await this.page.waitForTimeout(800);
  }

  async clickRegisterLink() {
    await this.page.locator('a[href="/register"]').click();
    await this.waitForLoad();
  }
}

module.exports = LoginPage;
