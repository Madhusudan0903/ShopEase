const BasePage = require('./BasePage');

class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.orderCard = '.order-card';
  }

  async navigate() {
    const userMenu = this.page.locator('.navbar-user-dropdown button').first();
    if (await userMenu.isVisible().catch(() => false)) {
      await userMenu.click();
      const myOrdersLink = this.page.locator('.navbar-dropdown-menu a[href="/orders"]').first();
      if (await myOrdersLink.isVisible().catch(() => false)) {
        await myOrdersLink.click();
      } else {
        await super.navigate('/orders');
      }
    } else {
      await super.navigate('/orders');
    }
    await this.page.waitForURL(/\/orders|\/login/, { timeout: 20000 });
    await this.page.waitForTimeout(600);
  }

  async getOrderCardsCount() {
    return this.page.locator(this.orderCard).count();
  }

  async openOrderDetail(index = 0) {
    await this.page.locator(this.orderCard).nth(index).getByRole('link', { name: /view details/i }).click();
    await this.waitForLoad();
  }

  async getFirstOrderIdText() {
    return (await this.page.locator('.order-card-id').first().textContent())?.trim() || '';
  }
}

module.exports = OrdersPage;
