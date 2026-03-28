const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = 'input[name="firstName"], [data-testid="firstName-input"]';
    this.lastNameInput = 'input[name="lastName"], [data-testid="lastName-input"]';
    this.emailInput = 'input[name="email"], input[type="email"], [data-testid="email-input"]';
    this.passwordInput = 'input[name="password"], [data-testid="password-input"]';
    this.confirmPasswordInput = 'input[name="confirmPassword"], [data-testid="confirmPassword-input"]';
    this.phoneInput = 'input[name="phone"], input[type="tel"], [data-testid="phone-input"]';
    this.registerButton = 'button[type="submit"], [data-testid="register-button"]';
    this.validationErrors = '.error-message, .field-error, .invalid-feedback, [data-testid="validation-error"]';
    this.successMessage = '.success-message, .alert-success, [data-testid="success-message"]';
    this.loginLink = 'a[href="/login"], [data-testid="login-link"]';
  }

  async navigate() {
    await super.navigate('/register');
  }

  async fillRegistrationForm({ firstName, lastName, email, password, confirmPassword, phone }) {
    if (firstName !== undefined) await this.fillInput(this.firstNameInput, firstName);
    if (lastName !== undefined) await this.fillInput(this.lastNameInput, lastName);
    if (email !== undefined) await this.fillInput(this.emailInput, email);
    if (password !== undefined) await this.fillInput(this.passwordInput, password);
    if (confirmPassword !== undefined) await this.fillInput(this.confirmPasswordInput, confirmPassword);
    if (phone !== undefined) await this.fillInput(this.phoneInput, phone);
  }

  async clickRegister() {
    await this.page.locator(this.registerButton).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getValidationErrors() {
    const errors = this.page.locator(this.validationErrors);
    await errors.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const count = await errors.count();
    const messages = [];
    for (let i = 0; i < count; i++) {
      const text = await errors.nth(i).textContent();
      if (text && text.trim()) {
        messages.push(text.trim());
      }
    }
    return messages;
  }

  async getSuccessMessage() {
    const success = this.page.locator(this.successMessage);
    await success.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await success.isVisible()) {
      return await success.textContent();
    }
    return null;
  }

  async register(formData) {
    await this.fillRegistrationForm(formData);
    await this.clickRegister();
  }

  async clickLoginLink() {
    await this.page.locator(this.loginLink).click();
    await this.waitForLoad();
  }
}

module.exports = RegisterPage;
