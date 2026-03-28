const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = '.cart-item, [data-testid="cart-item"], .cart-row';
    this.itemCount = '.cart-count, [data-testid="cart-count"], .item-count';
    this.quantityInput = '.cart-item input[type="number"], [data-testid="quantity-input"]';
    this.quantityIncrease = '.cart-item .qty-increase, [data-testid="quantity-increase"]';
    this.quantityDecrease = '.cart-item .qty-decrease, [data-testid="quantity-decrease"]';
    this.removeButton = '.remove-item, [data-testid="remove-item"], button:has-text("Remove")';
    this.clearCartButton = '[data-testid="clear-cart"], .clear-cart, button:has-text("Clear Cart")';
    this.subtotal = '.subtotal, [data-testid="subtotal"]';
    this.total = '.cart-total, [data-testid="cart-total"], .total';
    this.checkoutButton = '[data-testid="checkout-button"], .checkout-btn, a:has-text("Checkout"), button:has-text("Checkout")';
    this.emptyCartMessage = '.empty-cart, [data-testid="empty-cart"], .cart-empty';
    this.itemName = '.cart-item .item-name, .cart-item .product-name, [data-testid="item-name"]';
    this.itemPrice = '.cart-item .item-price, .cart-item .price, [data-testid="item-price"]';
  }

  async navigate() {
    await super.navigate('/cart');
  }

  async getCartItems() {
    const items = [];
    const count = await this.page.locator(this.cartItems).count();
    for (let i = 0; i < count; i++) {
      const item = this.page.locator(this.cartItems).nth(i);
      items.push({
        name: await item.locator('.item-name, .product-name, [data-testid="item-name"]').textContent().catch(() => ''),
        price: await item.locator('.item-price, .price, [data-testid="item-price"]').textContent().catch(() => ''),
      });
    }
    return items;
  }

  async getItemCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async updateQuantity(itemIndex, qty) {
    const item = this.page.locator(this.cartItems).nth(itemIndex);
    const qtyInput = item.locator('input[type="number"], [data-testid="quantity-input"]');
    if (await qtyInput.isVisible().catch(() => false)) {
      await qtyInput.clear();
      await qtyInput.fill(String(qty));
      await qtyInput.press('Tab');
    }
    await this.page.waitForTimeout(500);
  }

  async removeItem(itemIndex) {
    const item = this.page.locator(this.cartItems).nth(itemIndex);
    await item.locator(this.removeButton.split(', ').join(', ')).first().click();
    await this.page.waitForTimeout(500);
  }

  async clearCart() {
    await this.page.locator(this.clearCartButton).click();
    await this.page.waitForTimeout(500);
  }

  async getSubtotal() {
    const text = await this.getText(this.subtotal);
    const match = text.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  }

  async getTotal() {
    const text = await this.getText(this.total);
    const match = text.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  }

  async clickCheckout() {
    await this.page.locator(this.checkoutButton).click();
    await this.waitForLoad();
  }

  async isCartEmpty() {
    return await this.isElementVisible(this.emptyCartMessage);
  }
}

module.exports = CartPage;
