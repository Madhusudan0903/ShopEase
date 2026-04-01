const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const { getTestData } = require('../utils/test-data-helper');

const products = getTestData('products');

test.describe('Search and Filter', () => {
  test.beforeEach(async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.navigate();
  });

  test('01 should search via navbar and show results heading', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.searchFromNavbar(products.searchKeywords[0]);
    await expect(page.getByRole('heading', { name: /results for/i })).toBeVisible({ timeout: 15000 });
  });

  test('02 should filter by Footwear category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Footwear');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('03 should filter by price range min max', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.fillPriceRange(10, 100);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('04 should combine category and brand text filter', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Clothing');
    await pp.fillBrandFilter(products.brandSample);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('05 should clear all filters', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Electronics');
    await pp.clearAllFilters();
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('06 should show empty state for nonsense search', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.searchFromNavbar(products.invalidSearch);
    await expect(page.locator('.results-count')).toContainText(/0\s+products found/i, { timeout: 20000 });
    const emptyVisible = await page.locator('.products-empty').isVisible().catch(() => false);
    const cardCount = await page.locator('.product-card').count();
    expect(emptyVisible || cardCount === 0).toBeTruthy();
  });

  test('07 should filter by minimum rating 4 stars', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.clickMinRating(4);
    await expect(page.locator('.products-page')).toBeVisible();
  });

  test('08 should filter by Accessories category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Accessories');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('09 should filter Home and Kitchen category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Home & Kitchen');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('10 should persist search in URL query', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.searchFromNavbar('book');
    await expect(page).toHaveURL(/search=/);
  });

  test('11 should filter by Books category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Books');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('12 should allow typing brand partial match', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.fillBrandFilter('Stride');
    await expect(page.locator('.products-page')).toBeVisible();
  });

  test('13 should set high price floor and may show empty', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.fillPriceRange(50000, 100000);
    await page.waitForTimeout(1000);
    const empty = await page.locator('.products-empty').isVisible().catch(() => false);
    const card = await page.locator('.product-card').first().isVisible().catch(() => false);
    expect(empty || card).toBeTruthy();
  });

  test('14 should toggle same category off when clicked again', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Clothing');
    await pp.uncheckCategoryByName('Clothing');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('15 should sort by top rated', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.selectSort(products.sortValues.rating);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });
});
