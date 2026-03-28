const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heroBanner = '.hero-banner, [data-testid="hero-banner"], .hero';
    this.categoryCards = '.category-card, [data-testid="category-card"]';
    this.trendingProducts = '.trending-products .product-card, [data-testid="trending-product"]';
    this.searchInput = 'input[type="search"], input[placeholder*="Search"], [data-testid="search-input"]';
    this.searchButton = 'button[type="submit"], [data-testid="search-button"], .search-btn';
    this.navLinks = 'nav a, .navbar a';
  }

  async navigate() {
    await super.navigate('/');
  }

  async getHeroBanner() {
    return this.page.locator(this.heroBanner);
  }

  async getCategoryCards() {
    return this.page.locator(this.categoryCards);
  }

  async getTrendingProducts() {
    return this.page.locator(this.trendingProducts);
  }

  async clickCategory(name) {
    await this.page
      .locator(this.categoryCards)
      .filter({ hasText: name })
      .first()
      .click();
    await this.waitForLoad();
  }

  async searchProduct(keyword) {
    await this.fillInput(this.searchInput, keyword);
    const searchBtn = this.page.locator(this.searchButton);
    if (await searchBtn.isVisible().catch(() => false)) {
      await searchBtn.click();
    } else {
      await this.page.locator(this.searchInput).press('Enter');
    }
    await this.waitForLoad();
  }

  async isHeroBannerVisible() {
    return await this.isElementVisible(this.heroBanner);
  }

  async getCategoryCount() {
    return await this.getElementCount(this.categoryCards);
  }

  async getTrendingProductCount() {
    return await this.getElementCount(this.trendingProducts);
  }
}

module.exports = HomePage;
