const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/checkout');
    await this.page.waitForTimeout(500);
  }

  async fillShipping(data) {
    if (data.line1) await this.page.locator('input[placeholder*="Street address"]').fill(data.line1);
    if (data.line2 !== undefined) await this.page.locator('input[placeholder*="Apartment"]').fill(data.line2);
    if (data.city) await this.page.locator('input[placeholder="City"]').fill(data.city);
    if (data.state) await this.page.locator('input[placeholder="State"]').fill(data.state);
    if (data.zip) await this.page.locator('input[placeholder="123456"]').fill(data.zip);
  }

  async clearShippingFields() {
    await this.page.locator('input[placeholder*="Street address"]').fill('');
    await this.page.locator('input[placeholder*="Apartment"]').fill('');
    await this.page.locator('input[placeholder="City"]').fill('');
    await this.page.locator('input[placeholder="State"]').fill('');
    await this.page.locator('input[placeholder="123456"]').fill('');
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: /^Continue$/i }).click();
    await this.page.waitForTimeout(500);
  }

  async clickBack() {
    await this.page.getByRole('button', { name: /^Back$/i }).click();
    await this.page.waitForTimeout(400);
  }

  async selectPaymentLabel(name) {
    await this.page.locator('.payment-option', { hasText: name }).click();
    await this.page.waitForTimeout(400);
  }

  async fillUpiId(id) {
    await this.page.getByPlaceholder(/paytm|ybl/i).fill(id);
  }

  async fillCardFields(card) {
    if (card.cardNumber) await this.page.getByPlaceholder(/1234 5678/).fill(card.cardNumber);
    if (card.expiry) await this.page.getByPlaceholder('MM/YY').fill(card.expiry);
    if (card.cvv) await this.page.getByPlaceholder('***').fill(card.cvv);
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: /place order/i }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isOnOrderOrOrders() {
    await this.page.waitForURL(/\/orders/, { timeout: 25000 });
  }
}

module.exports = CheckoutPage;
