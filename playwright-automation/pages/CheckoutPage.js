const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.addressLine1 = 'input[name="addressLine1"], input[name="line1"], [data-testid="address-line1"]';
    this.addressLine2 = 'input[name="addressLine2"], input[name="line2"], [data-testid="address-line2"]';
    this.cityInput = 'input[name="city"], [data-testid="city-input"]';
    this.stateInput = 'input[name="state"], [data-testid="state-input"]';
    this.zipInput = 'input[name="zip"], input[name="zipCode"], input[name="postalCode"], [data-testid="zip-input"]';
    this.paymentMethodRadio = 'input[name="paymentMethod"], [data-testid="payment-method"]';
    this.creditCardOption = '[data-testid="payment-credit-card"], input[value="credit-card"]';
    this.upiOption = '[data-testid="payment-upi"], input[value="upi"]';
    this.codOption = '[data-testid="payment-cod"], input[value="cod"]';
    this.cardNumberInput = 'input[name="cardNumber"], [data-testid="card-number"]';
    this.expiryDateInput = 'input[name="expiryDate"], [data-testid="expiry-date"]';
    this.cvvInput = 'input[name="cvv"], [data-testid="cvv"]';
    this.nameOnCardInput = 'input[name="nameOnCard"], [data-testid="name-on-card"]';
    this.upiIdInput = 'input[name="upiId"], [data-testid="upi-id"]';
    this.reviewOrderButton = '[data-testid="review-order"], button:has-text("Review Order"), .review-order-btn';
    this.placeOrderButton = '[data-testid="place-order"], button:has-text("Place Order"), .place-order-btn';
    this.orderConfirmation = '.order-confirmation, [data-testid="order-confirmation"], .order-success';
    this.orderNumber = '.order-number, [data-testid="order-number"]';
    this.validationErrors = '.error-message, .field-error, .invalid-feedback, [data-testid="validation-error"]';
  }

  async navigate() {
    await super.navigate('/checkout');
  }

  async fillShippingAddress({ line1, line2, city, state, zip }) {
    if (line1 !== undefined) await this.fillInput(this.addressLine1, line1);
    if (line2 !== undefined) await this.fillInput(this.addressLine2, line2);
    if (city !== undefined) await this.fillInput(this.cityInput, city);
    if (state !== undefined) await this.fillInput(this.stateInput, state);
    if (zip !== undefined) await this.fillInput(this.zipInput, zip);
  }

  async selectPaymentMethod(method) {
    switch (method) {
      case 'credit-card':
        await this.page.locator(this.creditCardOption).click();
        break;
      case 'upi':
        await this.page.locator(this.upiOption).click();
        break;
      case 'cod':
        await this.page.locator(this.codOption).click();
        break;
      default:
        await this.page.locator(`input[value="${method}"]`).click();
    }
    await this.page.waitForTimeout(500);
  }

  async fillCreditCardDetails({ cardNumber, expiryDate, cvv, nameOnCard }) {
    if (cardNumber) await this.fillInput(this.cardNumberInput, cardNumber);
    if (expiryDate) await this.fillInput(this.expiryDateInput, expiryDate);
    if (cvv) await this.fillInput(this.cvvInput, cvv);
    if (nameOnCard) await this.fillInput(this.nameOnCardInput, nameOnCard);
  }

  async fillUpiDetails(upiId) {
    await this.fillInput(this.upiIdInput, upiId);
  }

  async reviewOrder() {
    await this.page.locator(this.reviewOrderButton).click();
    await this.page.waitForTimeout(1000);
  }

  async placeOrder() {
    await this.page.locator(this.placeOrderButton).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getOrderConfirmation() {
    const confirmation = this.page.locator(this.orderConfirmation);
    await confirmation.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await confirmation.isVisible()) {
      return await confirmation.textContent();
    }
    return null;
  }

  async getOrderNumber() {
    const orderNum = this.page.locator(this.orderNumber);
    await orderNum.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await orderNum.isVisible()) {
      return await orderNum.textContent();
    }
    return null;
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

  async isOrderConfirmationVisible() {
    return await this.isElementVisible(this.orderConfirmation);
  }
}

module.exports = CheckoutPage;
