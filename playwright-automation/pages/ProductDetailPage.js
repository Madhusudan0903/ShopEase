const BasePage = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = '.product-name, h1, [data-testid="product-name"]';
    this.productPrice = '.product-price, .price, [data-testid="product-price"]';
    this.stockStatus = '.stock-status, [data-testid="stock-status"]';
    this.quantityInput = 'input[name="quantity"], input[type="number"], [data-testid="quantity-input"]';
    this.quantityIncrease = '[data-testid="quantity-increase"], .qty-increase, button:has-text("+")';
    this.quantityDecrease = '[data-testid="quantity-decrease"], .qty-decrease, button:has-text("-")';
    this.addToCartButton = '[data-testid="add-to-cart"], .add-to-cart, button:has-text("Add to Cart")';
    this.reviewsSection = '.reviews-section, [data-testid="reviews-section"], .reviews';
    this.reviewCards = '.review-card, [data-testid="review-card"], .review-item';
    this.ratingInput = '[data-testid="rating-input"], .rating-input, .star-rating';
    this.reviewTitleInput = 'input[name="reviewTitle"], [data-testid="review-title-input"]';
    this.reviewCommentInput = 'textarea[name="reviewComment"], [data-testid="review-comment-input"]';
    this.submitReviewButton = '[data-testid="submit-review"], button:has-text("Submit Review")';
    this.productImage = '.product-image, [data-testid="product-image"] img';
    this.productDescription = '.product-description, [data-testid="product-description"]';
    this.successMessage = '.success-message, [data-testid="success-message"], .alert-success';
  }

  async navigate(id) {
    await super.navigate(`/products/${id}`);
  }

  async getProductName() {
    return await this.getText(this.productName);
  }

  async getProductPrice() {
    const priceText = await this.getText(this.productPrice);
    const match = priceText.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  }

  async getStockStatus() {
    return await this.getText(this.stockStatus);
  }

  async isInStock() {
    const status = await this.getStockStatus();
    return status.toLowerCase().includes('in stock');
  }

  async setQuantity(qty) {
    const input = this.page.locator(this.quantityInput);
    if (await input.isVisible().catch(() => false)) {
      await input.clear();
      await input.fill(String(qty));
    } else {
      for (let i = 1; i < qty; i++) {
        await this.page.locator(this.quantityIncrease).click();
      }
    }
  }

  async clickAddToCart() {
    await this.page.locator(this.addToCartButton).click();
    await this.page.waitForTimeout(500);
  }

  async isAddToCartEnabled() {
    return await this.page.locator(this.addToCartButton).isEnabled();
  }

  async getReviews() {
    const reviews = [];
    const count = await this.page.locator(this.reviewCards).count();
    for (let i = 0; i < count; i++) {
      const card = this.page.locator(this.reviewCards).nth(i);
      reviews.push({
        text: await card.textContent(),
      });
    }
    return reviews;
  }

  async submitReview(rating, title, comment) {
    const starSelector = `.star-rating [data-value="${rating}"], .rating-input star:nth-child(${rating}), [data-testid="star-${rating}"]`;
    await this.page.locator(starSelector).click().catch(async () => {
      const ratingLocator = this.page.locator(this.ratingInput);
      if (await ratingLocator.isVisible()) {
        await ratingLocator.fill(String(rating));
      }
    });

    await this.fillInput(this.reviewTitleInput, title);
    await this.fillInput(this.reviewCommentInput, comment);
    await this.page.locator(this.submitReviewButton).click();
    await this.page.waitForTimeout(1000);
  }

  async getReviewCount() {
    return await this.page.locator(this.reviewCards).count();
  }

  async isReviewsSectionVisible() {
    return await this.isElementVisible(this.reviewsSection);
  }

  async getSuccessMessage() {
    const msg = this.page.locator(this.successMessage);
    await msg.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await msg.isVisible()) {
      return await msg.textContent();
    }
    return null;
  }
}

module.exports = ProductDetailPage;
