const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItem = '.cart-item';
    this.emptyState = '.cart-empty';
    this.orderSummary = '.order-summary';
  }

  async navigate() {
    await super.navigate('/cart');
    await this.page.waitForTimeout(500);
  }

  async getLineCount() {
    return this.page.locator(this.cartItem).count();
  }

  async clickQuantityIncrease(itemIndex = 0) {
    await this.page.locator(this.cartItem).nth(itemIndex).locator('.quantity-selector button').last().click();
    await this.page.waitForTimeout(600);
  }

  async clickQuantityDecrease(itemIndex = 0) {
    await this.page.locator(this.cartItem).nth(itemIndex).locator('.quantity-selector button').first().click();
    await this.page.waitForTimeout(600);
  }

  async removeItem(itemIndex = 0) {
    await this.page.locator(this.cartItem).nth(itemIndex).locator('.cart-item-remove').click();
    await this.page.waitForTimeout(600);
  }

  async clearCart() {
    const clearBtn = this.page.getByRole('button', { name: /clear cart/i });
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
      await this.page.waitForTimeout(600);
    }
  }

  async getSubtotalText() {
    const row = this.page.locator('.order-summary-row').filter({ hasText: /Subtotal/i });
    return (await row.locator('span').last().textContent())?.trim() || '';
  }

  async getTotalText() {
    const row = this.page.locator('.order-summary-row.total');
    return (await row.locator('span').last().textContent())?.trim() || '';
  }

  async proceedToCheckout() {
    await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
    await this.waitForLoad();
  }

  async isEmptyVisible() {
    return this.page.locator(this.emptyState).isVisible();
  }
}

module.exports = CartPage;
