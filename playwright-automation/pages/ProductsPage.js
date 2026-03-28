const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productCards = '.product-card, [data-testid="product-card"]';
    this.productCount = '.product-count, [data-testid="product-count"], .results-count';
    this.sortDropdown = 'select[name="sort"], [data-testid="sort-select"], .sort-dropdown select';
    this.categoryFilter = '.category-filter, [data-testid="category-filter"]';
    this.priceMinInput = 'input[name="minPrice"], [data-testid="min-price"]';
    this.priceMaxInput = 'input[name="maxPrice"], [data-testid="max-price"]';
    this.priceFilterApply = '[data-testid="apply-price-filter"], .price-filter button, .apply-filter';
    this.brandFilter = '.brand-filter, [data-testid="brand-filter"]';
    this.ratingFilter = '.rating-filter, [data-testid="rating-filter"]';
    this.clearFiltersButton = '[data-testid="clear-filters"], .clear-filters, button:has-text("Clear")';
    this.paginationButtons = '.pagination button, .pagination a, [data-testid="pagination"] button';
    this.searchInput = 'input[type="search"], input[placeholder*="Search"], [data-testid="search-input"]';
    this.searchButton = 'button[type="submit"], [data-testid="search-button"], .search-btn';
    this.noResults = '.no-results, [data-testid="no-results"]';
    this.productName = '.product-card .product-name, .product-card h3, [data-testid="product-name"]';
    this.productPrice = '.product-card .product-price, .product-card .price, [data-testid="product-price"]';
  }

  async navigate() {
    await super.navigate('/products');
  }

  async getProductCards() {
    return this.page.locator(this.productCards);
  }

  async getProductCount() {
    const countText = await this.page.locator(this.productCount).textContent().catch(() => null);
    if (countText) {
      const match = countText.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return await this.page.locator(this.productCards).count();
  }

  async selectSort(option) {
    await this.page.locator(this.sortDropdown).selectOption(option);
    await this.page.waitForTimeout(1000);
  }

  async filterByCategory(name) {
    const categoryOption = this.page
      .locator(this.categoryFilter)
      .locator(`text=${name}`)
      .first();
    await categoryOption.click();
    await this.page.waitForTimeout(1000);
  }

  async filterByPriceRange(min, max) {
    await this.fillInput(this.priceMinInput, String(min));
    await this.fillInput(this.priceMaxInput, String(max));
    const applyBtn = this.page.locator(this.priceFilterApply);
    if (await applyBtn.isVisible().catch(() => false)) {
      await applyBtn.click();
    }
    await this.page.waitForTimeout(1000);
  }

  async filterByBrand(brand) {
    const brandOption = this.page
      .locator(this.brandFilter)
      .locator(`text=${brand}`)
      .first();
    await brandOption.click();
    await this.page.waitForTimeout(1000);
  }

  async filterByRating(stars) {
    const ratingOption = this.page
      .locator(this.ratingFilter)
      .locator(`[data-rating="${stars}"], :nth-child(${stars})`)
      .first();
    await ratingOption.click();
    await this.page.waitForTimeout(1000);
  }

  async clearFilters() {
    await this.page.locator(this.clearFiltersButton).click();
    await this.page.waitForTimeout(1000);
  }

  async goToPage(num) {
    await this.page
      .locator(this.paginationButtons)
      .filter({ hasText: String(num) })
      .first()
      .click();
    await this.waitForLoad();
  }

  async searchProducts(keyword) {
    await this.fillInput(this.searchInput, keyword);
    const searchBtn = this.page.locator(this.searchButton);
    if (await searchBtn.isVisible().catch(() => false)) {
      await searchBtn.click();
    } else {
      await this.page.locator(this.searchInput).press('Enter');
    }
    await this.page.waitForTimeout(1000);
  }

  async clickProduct(index = 0) {
    await this.page.locator(this.productCards).nth(index).click();
    await this.waitForLoad();
  }

  async isNoResultsVisible() {
    return await this.isElementVisible(this.noResults);
  }

  async getProductNames() {
    const names = [];
    const count = await this.page.locator(this.productName).count();
    for (let i = 0; i < count; i++) {
      names.push(await this.page.locator(this.productName).nth(i).textContent());
    }
    return names;
  }

  async getProductPrices() {
    const prices = [];
    const count = await this.page.locator(this.productPrice).count();
    for (let i = 0; i < count; i++) {
      const text = await this.page.locator(this.productPrice).nth(i).textContent();
      const match = text.match(/[\d,.]+/);
      prices.push(match ? parseFloat(match[0].replace(',', '')) : 0);
    }
    return prices;
  }
}

module.exports = ProductsPage;
