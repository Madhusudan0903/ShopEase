const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
    await this.waitForLoad();
  }

  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle() {
    return await this.page.title();
  }

  async isElementVisible(selector) {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, value) {
    const locator = this.page.locator(selector);
    await locator.clear();
    await locator.fill(value);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  async takeScreenshot(name) {
    const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();
    const path = `reports/screenshots/${sanitized}_${timestamp}.png`;
    await this.page.screenshot({ path, fullPage: true });
    return path;
  }

  async waitForSelector(selector, options = {}) {
    await this.page.locator(selector).waitFor(options);
  }

  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async goBack() {
    await this.page.goBack();
    await this.waitForLoad();
  }
}

module.exports = BasePage;
