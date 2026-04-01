const BasePage = require('./BasePage');
const { getToastText, getFormErrors } = require('../utils/playwright-helpers');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = 'input[name="firstName"]';
    this.lastNameInput = 'input[name="lastName"]';
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.confirmPasswordInput = 'input[name="confirmPassword"]';
    this.phoneInput = 'input[name="phone"]';
    this.submitButton = 'button[type="submit"]';
  }

  async navigate() {
    await super.navigate('/register');
  }

  async fillRegistrationForm(data) {
    if (data.firstName !== undefined) await this.fillInput(this.firstNameInput, data.firstName);
    if (data.lastName !== undefined) await this.fillInput(this.lastNameInput, data.lastName);
    if (data.email !== undefined) await this.fillInput(this.emailInput, data.email);
    if (data.password !== undefined) await this.fillInput(this.passwordInput, data.password);
    if (data.confirmPassword !== undefined) await this.fillInput(this.confirmPasswordInput, data.confirmPassword);
    if (data.phone !== undefined) await this.fillInput(this.phoneInput, data.phone);
  }

  async clickRegister() {
    await this.page.locator(this.submitButton).click();
    await this.page.waitForTimeout(600);
  }

  async register(data) {
    await this.fillRegistrationForm(data);
    await this.clickRegister();
  }

  async getFieldErrors() {
    return getFormErrors(this.page);
  }

  async getToastError() {
    return getToastText(this.page, { errorOnly: true });
  }

  async clickLoginLink() {
    await this.page.locator('a[href="/login"]').click();
    await this.waitForLoad();
  }
}

module.exports = RegisterPage;
