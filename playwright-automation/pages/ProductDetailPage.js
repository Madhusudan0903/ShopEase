const BasePage = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigate(id) {
    await super.navigate(`/products/${id}`);
    await this.page.locator('.product-detail').waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async getTitle() {
    return (await this.page.locator('.product-detail-info h1').textContent())?.trim() || '';
  }

  async getPriceText() {
    return (await this.page.locator('.product-detail-price .current-price').first().textContent())?.trim() || '';
  }

  async getStockText() {
    return (await this.page.locator('.product-detail-stock').textContent())?.trim() || '';
  }

  async clickAddToCart() {
    await this.page.getByRole('button', { name: /add to cart/i }).click();
    await this.page.waitForTimeout(800);
  }

  async quantityIncrease() {
    await this.page.locator('.product-detail-quantity .quantity-selector button').nth(1).click();
    await this.page.waitForTimeout(400);
  }

  async isAddToCartDisabled() {
    return this.page.getByRole('button', { name: /add to cart/i }).isDisabled();
  }

  async hasReviewsHeading() {
    return this.page.getByRole('heading', { name: /reviews/i }).first().isVisible().catch(() => false);
  }

  async setStarRating(starIndex1To5) {
    await this.page.locator('.review-form .star-rating svg').nth(starIndex1To5 - 1).click();
  }

  async fillReview(title, comment) {
    await this.page.locator('.review-form input.form-input').fill(title);
    await this.page.locator('.review-form textarea.form-textarea').fill(comment);
  }

  async submitReview() {
    await this.page.locator('.review-form button[type="submit"]').click();
    await this.page.waitForTimeout(1200);
  }
}

module.exports = ProductDetailPage;
