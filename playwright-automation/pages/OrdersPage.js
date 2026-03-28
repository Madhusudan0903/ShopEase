const BasePage = require('./BasePage');

class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.orderRows = '.order-row, .order-card, [data-testid="order-item"], .order-item';
    this.orderCount = '.order-count, [data-testid="order-count"]';
    this.orderNumber = '.order-number, [data-testid="order-number"]';
    this.orderStatus = '.order-status, [data-testid="order-status"]';
    this.orderDate = '.order-date, [data-testid="order-date"]';
    this.orderTotal = '.order-total, [data-testid="order-total"]';
    this.viewDetailButton = '[data-testid="view-detail"], .view-detail, a:has-text("View Details"), button:has-text("View")';
    this.emptyOrders = '.empty-orders, [data-testid="empty-orders"], .no-orders';
  }

  async navigate() {
    await super.navigate('/orders');
  }

  async getOrders() {
    const orders = [];
    const count = await this.page.locator(this.orderRows).count();
    for (let i = 0; i < count; i++) {
      const row = this.page.locator(this.orderRows).nth(i);
      orders.push({
        number: await row.locator('.order-number, [data-testid="order-number"]').textContent().catch(() => ''),
        status: await row.locator('.order-status, [data-testid="order-status"]').textContent().catch(() => ''),
        date: await row.locator('.order-date, [data-testid="order-date"]').textContent().catch(() => ''),
        total: await row.locator('.order-total, [data-testid="order-total"]').textContent().catch(() => ''),
      });
    }
    return orders;
  }

  async getOrderCount() {
    return await this.page.locator(this.orderRows).count();
  }

  async clickOrderDetail(index = 0) {
    const row = this.page.locator(this.orderRows).nth(index);
    const detailBtn = row.locator(this.viewDetailButton.split(', ').join(', ')).first();
    if (await detailBtn.isVisible().catch(() => false)) {
      await detailBtn.click();
    } else {
      await row.click();
    }
    await this.waitForLoad();
  }

  async getOrderStatus(index = 0) {
    const row = this.page.locator(this.orderRows).nth(index);
    return await row.locator('.order-status, [data-testid="order-status"]').textContent();
  }

  async isEmptyOrdersVisible() {
    return await this.isElementVisible(this.emptyOrders);
  }
}

module.exports = OrdersPage;
