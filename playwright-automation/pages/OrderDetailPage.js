const BasePage = require('./BasePage');
const { dismissConfirmDialog } = require('../utils/playwright-helpers');

class OrderDetailPage extends BasePage {
  async navigate(id) {
    await super.navigate(`/orders/${id}`);
    await this.page.locator('.order-detail').waitFor({ state: 'visible', timeout: 35000 });
  }

  async getHeadingText() {
    return (await this.page.locator('.order-detail h1').textContent())?.trim() || '';
  }

  async hasStatusTracker() {
    return this.page.locator('.status-tracker').isVisible().catch(() => false);
  }

  async getOrderItemRows() {
    return this.page.locator('.order-item-row').count();
  }

  async clickCancelOrder() {
    dismissConfirmDialog(this.page);
    await this.page.getByRole('button', { name: /cancel order/i }).click();
    await this.page.waitForTimeout(1200);
  }

  async isCancelVisible() {
    return this.page.getByRole('button', { name: /cancel order/i }).isVisible().catch(() => false);
  }
}

module.exports = OrderDetailPage;
