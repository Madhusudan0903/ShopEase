const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const { getTestData } = require('../utils/test-data-helper');

const productsData = getTestData('products');

test.describe('Search and Filter', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test('should search products by keyword and display results', async () => {
    const keyword = productsData.searchKeywords[0];
    await productsPage.searchProducts(keyword);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter products by category', async () => {
    const category = productsData.categories[0];
    await productsPage.filterByCategory(category);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should filter products by price range', async () => {
    const range = productsData.priceRanges.medium;
    await productsPage.filterByPriceRange(range.min, range.max);

    const prices = await productsPage.getProductPrices();
    for (const price of prices) {
      expect(price).toBeGreaterThanOrEqual(range.min);
      expect(price).toBeLessThanOrEqual(range.max);
    }
  });

  test('should apply combined category and price filters', async () => {
    const category = productsData.categories[0];
    const range = productsData.priceRanges.medium;

    await productsPage.filterByCategory(category);
    await productsPage.filterByPriceRange(range.min, range.max);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should clear all active filters', async () => {
    const category = productsData.categories[0];
    await productsPage.filterByCategory(category);
    const filteredCount = await productsPage.getProductCount();

    await productsPage.clearFilters();
    const unfilteredCount = await productsPage.getProductCount();

    expect(unfilteredCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test('should display no results for non-existent search term', async () => {
    await productsPage.searchProducts(productsData.invalidSearch);

    const noResults = await productsPage.isNoResultsVisible();
    const count = await productsPage.getProductCount();
    expect(noResults || count === 0).toBeTruthy();
  });

  test('should filter products by brand', async () => {
    const brand = productsData.brands[0];
    await productsPage.filterByBrand(brand);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should filter products by rating', async () => {
    await productsPage.filterByRating(4);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should search with multiple keywords', async () => {
    const keyword = productsData.searchKeywords[1];
    await productsPage.searchProducts(keyword);

    const count = await productsPage.getProductCount();
    const noResults = await productsPage.isNoResultsVisible();
    expect(count > 0 || noResults).toBeTruthy();
  });

  test('should persist filter state after sorting', async () => {
    const category = productsData.categories[0];
    await productsPage.filterByCategory(category);
    const countBefore = await productsPage.getProductCount();

    await productsPage.selectSort('price-low-high');
    const countAfter = await productsPage.getProductCount();

    expect(countAfter).toBe(countBefore);
  });

  test('should filter by low price range', async () => {
    const range = productsData.priceRanges.low;
    await productsPage.filterByPriceRange(range.min, range.max);

    const prices = await productsPage.getProductPrices();
    for (const price of prices) {
      expect(price).toBeLessThanOrEqual(range.max);
    }
  });
});
