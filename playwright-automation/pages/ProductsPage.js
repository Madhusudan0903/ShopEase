const BasePage = require('./BasePage');

/** Matches frontend/src/pages/ProductsPage.jsx + ProductFilters.jsx */
class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productCards = '.product-card';
    this.resultsCount = '.results-count';
    this.sortSelect = '.products-sort select';
    this.filtersSidebar = '.filters-sidebar';
    this.clearFiltersBtn = 'button.filters-clear-btn:has-text("Clear All")';
    this.productsEmpty = '.products-empty';
    this.productsGrid = '.products-grid';
  }

  async navigate() {
    await super.navigate('/products');
    await this.page
      .locator('.products-grid, .products-empty')
      .first()
      .waitFor({ state: 'visible', timeout: 20000 });
  }

  async getProductCardCount() {
    return this.page.locator(this.productCards).count();
  }

  async getResultsCountText() {
    return (await this.page.locator(this.resultsCount).textContent())?.trim() || '';
  }

  async selectSort(value) {
    await this.page.locator(this.sortSelect).selectOption(value);
    await this.page.waitForTimeout(800);
  }

  /** Check category by label text (e.g. "Electronics", "Clothing") */
  async checkCategoryByName(name) {
    const label = this.page.locator('.filters-sidebar label.filter-checkbox', { hasText: name }).first();
    await label.click();
    await this.page.waitForTimeout(800);
  }

  async uncheckCategoryByName(name) {
    const cb = this.page.locator('.filters-sidebar label.filter-checkbox', { hasText: name }).locator('input[type="checkbox"]');
    if (await cb.isChecked()) await cb.locator('..').click();
    await this.page.waitForTimeout(500);
  }

  async fillPriceRange(min, max) {
    const minInput = this.page.locator('.filter-price-range input').first();
    const maxInput = this.page.locator('.filter-price-range input').nth(1);
    await minInput.fill(String(min));
    await maxInput.fill(String(max));
    await this.page.waitForTimeout(800);
  }

  async fillBrandFilter(text) {
    await this.page.locator('.filters-sidebar input[placeholder="Filter by brand..."]').fill(text);
    await this.page.waitForTimeout(800);
  }

  /** stars: 4, 3, 2, or 1 — matches filter rows in order */
  async clickMinRating(stars) {
    const order = [4, 3, 2, 1];
    const idx = order.indexOf(stars);
    if (idx < 0) return;
    const section = this.page.locator('.filters-sidebar .filter-section', { hasText: 'Minimum Rating' });
    await section.locator('.filter-rating-option').nth(idx).click();
    await this.page.waitForTimeout(800);
  }

  async clearAllFilters() {
    await this.page.locator(this.clearFiltersBtn).first().click();
    await this.page.waitForTimeout(800);
  }

  async searchFromNavbar(query) {
    const input = this.page.locator('form.navbar-search input').first();
    await input.fill(query);
    await input.press('Enter');
    await this.page.waitForURL(new RegExp(`search=${encodeURIComponent(query)}`), { timeout: 20000 });
  }

  async clickProductCard(index = 0) {
    await this.page.locator(this.productCards).nth(index).click();
    await this.waitForLoad();
  }

  async goToPaginationPage(num) {
    await this.page.locator('.pagination button').filter({ hasText: new RegExp(`^${num}$`) }).click();
    await this.page.waitForTimeout(800);
  }
}

module.exports = ProductsPage;
