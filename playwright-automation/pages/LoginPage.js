const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = 'input[name="email"], input[type="email"], [data-testid="email-input"]';
    this.passwordInput = 'input[name="password"], input[type="password"], [data-testid="password-input"]';
    this.loginButton = 'button[type="submit"], [data-testid="login-button"]';
    this.errorMessage = '.error-message, .alert-danger, [data-testid="error-message"], .error';
    this.registerLink = 'a[href="/register"], [data-testid="register-link"]';
    this.logoutButton = '[data-testid="logout-button"], .logout-btn, button:has-text("Logout")';
    this.userMenu = '[data-testid="user-menu"], .user-menu, .profile-menu';
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
    await this.page.locator(this.loginButton).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getErrorMessage() {
    const errorLocator = this.page.locator(this.errorMessage);
    await errorLocator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await errorLocator.isVisible()) {
      return await errorLocator.textContent();
    }
    return null;
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isLoggedIn() {
    try {
      await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async logout() {
    const userMenu = this.page.locator(this.userMenu);
    if (await userMenu.isVisible().catch(() => false)) {
      await userMenu.click();
    }
    await this.page.locator(this.logoutButton).click();
    await this.waitForLoad();
  }

  async clickRegisterLink() {
    await this.page.locator(this.registerLink).click();
    await this.waitForLoad();
  }
}

module.exports = LoginPage;
