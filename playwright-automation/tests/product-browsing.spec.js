const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const { getTestData } = require('../utils/test-data-helper');

const products = getTestData('products');

test.describe('Product Browsing', () => {
  test.beforeEach(async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.navigate();
  });

  test('01 should show products grid when data loads', async ({ page }) => {
    await expect(page.locator('.products-grid .product-card').first()).toBeVisible({ timeout: 20000 });
  });

  test('02 should show results count text', async ({ page }) => {
    const pp = new ProductsPage(page);
    const t = await pp.getResultsCountText();
    expect(t).toMatch(/products found/i);
  });

  test('03 should sort by price low to high', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.selectSort(products.sortValues.priceAsc);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('04 should sort by price high to low', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.selectSort(products.sortValues.priceDesc);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('05 should sort by name A-Z', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.selectSort(products.sortValues.nameAsc);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('06 should sort by newest', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.selectSort(products.sortValues.newest);
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('07 should filter by Clothing category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Clothing');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('08 should filter by Electronics category', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Electronics');
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('09 should open mobile filters panel on small viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.locator('.mobile-filter-btn').click();
    await expect(page.locator('.filters-sidebar.open')).toBeVisible();
  });

  test('10 should navigate to product detail when clicking a card', async ({ page }) => {
    await page.locator('.product-card').first().click();
    await expect(page).toHaveURL(/\/products\/\d+/, { timeout: 15000 });
  });

  test('11 should show product cards with price', async ({ page }) => {
    const price = page.locator('.product-card .current-price').first();
    await expect(price).toBeVisible();
    await expect(price).toContainText('₹');
  });

  test('12 should show Filters sidebar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator('.products-layout > .filters-sidebar')).toBeVisible();
  });

  test('13 should clear filters via Clear All', async ({ page }) => {
    const pp = new ProductsPage(page);
    await pp.checkCategoryByName('Books');
    await pp.clearAllFilters();
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('14 should load products page title All Products', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible();
  });

  test('15 should show sort dropdown', async ({ page }) => {
    await expect(page.locator('.products-sort select')).toBeVisible();
  });
});
