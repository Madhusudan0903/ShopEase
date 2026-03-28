const BasePage = require('./BasePage');

class OrderDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.orderNumber = '.order-number, [data-testid="order-number"], h1, h2';
    this.orderStatus = '.order-status, [data-testid="order-status"]';
    this.statusSteps = '.status-step, [data-testid="status-step"], .tracker-step';
    this.statusTracker = '.status-tracker, [data-testid="status-tracker"], .order-tracker';
    this.orderItems = '.order-item, [data-testid="order-item"], .order-product';
    this.cancelButton = '[data-testid="cancel-order"], button:has-text("Cancel Order"), .cancel-order-btn';
    this.orderDate = '.order-date, [data-testid="order-date"]';
    this.orderTotal = '.order-total, [data-testid="order-total"]';
    this.shippingAddress = '.shipping-address, [data-testid="shipping-address"]';
    this.paymentMethod = '.payment-method, [data-testid="payment-method"]';
    this.confirmationDialog = '.confirmation-dialog, [data-testid="confirmation-dialog"], .modal';
    this.confirmCancelButton = '[data-testid="confirm-cancel"], button:has-text("Yes"), button:has-text("Confirm")';
    this.errorMessage = '.error-message, [data-testid="error-message"], .alert-danger';
  }

  async navigate(id) {
    await super.navigate(`/orders/${id}`);
  }

  async getOrderNumber() {
    return await this.getText(this.orderNumber);
  }

  async getOrderStatus() {
    return await this.getText(this.orderStatus);
  }

  async getStatusSteps() {
    const steps = [];
    const count = await this.page.locator(this.statusSteps).count();
    for (let i = 0; i < count; i++) {
      const step = this.page.locator(this.statusSteps).nth(i);
      steps.push({
        text: await step.textContent(),
        isActive: await step.evaluate((el) =>
          el.classList.contains('active') || el.classList.contains('completed') || el.getAttribute('data-active') === 'true'
        ),
      });
    }
    return steps;
  }

  async getOrderItems() {
    const items = [];
    const count = await this.page.locator(this.orderItems).count();
    for (let i = 0; i < count; i++) {
      const item = this.page.locator(this.orderItems).nth(i);
      items.push({
        text: await item.textContent(),
      });
    }
    return items;
  }

  async cancelOrder() {
    await this.page.locator(this.cancelButton).click();
    const confirmDialog = this.page.locator(this.confirmationDialog);
    if (await confirmDialog.isVisible().catch(() => false)) {
      await this.page.locator(this.confirmCancelButton).click();
    }
    await this.page.waitForTimeout(1000);
  }

  async isCancelButtonVisible() {
    return await this.isElementVisible(this.cancelButton);
  }

  async getErrorMessage() {
    const error = this.page.locator(this.errorMessage);
    await error.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await error.isVisible()) {
      return await error.textContent();
    }
    return null;
  }

  async isStatusTrackerVisible() {
    return await this.isElementVisible(this.statusTracker);
  }
}

module.exports = OrderDetailPage;
