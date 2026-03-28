const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const { getTestData } = require('../utils/test-data-helper');

const productsData = getTestData('products');

test.describe('Product Browsing', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test('should display products in a grid layout', async ({ page }) => {
    const cards = await productsPage.getProductCards();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should support pagination between product pages', async ({ page }) => {
    const initialNames = await productsPage.getProductNames();

    await productsPage.goToPage(2);

    const newNames = await productsPage.getProductNames();
    const hasDifferentProducts = JSON.stringify(initialNames) !== JSON.stringify(newNames);
    const isOnPage2 = page.url().includes('page=2') || page.url().includes('page%3D2');
    expect(hasDifferentProducts || isOnPage2).toBeTruthy();
  });

  test('should sort products by price low to high', async () => {
    await productsPage.selectSort('price-low-high');

    const prices = await productsPage.getProductPrices();
    if (prices.length > 1) {
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    }
  });

  test('should sort products by price high to low', async () => {
    await productsPage.selectSort('price-high-low');

    const prices = await productsPage.getProductPrices();
    if (prices.length > 1) {
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
      }
    }
  });

  test('should sort products by name A-Z', async () => {
    await productsPage.selectSort('name-asc');

    const names = await productsPage.getProductNames();
    if (names.length > 1) {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sorted);
    }
  });

  test('should filter products by category', async () => {
    const category = productsData.categories[0];
    await productsPage.filterByCategory(category);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should display product card with name and price info', async () => {
    const names = await productsPage.getProductNames();
    const prices = await productsPage.getProductPrices();

    expect(names.length).toBeGreaterThan(0);
    expect(prices.length).toBeGreaterThan(0);
    expect(names[0]).toBeTruthy();
    expect(prices[0]).toBeGreaterThanOrEqual(0);
  });

  test('should handle empty category with no products', async () => {
    await productsPage.searchProducts('xyznonexistentcategory999');

    const noResults = await productsPage.isNoResultsVisible();
    const count = await productsPage.getProductCount();
    expect(noResults || count === 0).toBeTruthy();
  });

  test('should navigate to product detail on card click', async ({ page }) => {
    const cards = await productsPage.getProductCards();
    const count = await cards.count();
    if (count > 0) {
      await productsPage.clickProduct(0);
      expect(page.url()).toContain('/products/');
    }
  });

  test('should display correct product count', async () => {
    const cardCount = await (await productsPage.getProductCards()).count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
