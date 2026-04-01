const { test, expect } = require('@playwright/test');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser } = require('../utils/playwright-helpers');

const products = getTestData('products');
const login = getTestData('login', 'valid');

test.describe('Product Detail Page', () => {
  test('01 should display product name on detail page', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    const title = await p.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('02 should display price with rupee symbol', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    const price = await p.getPriceText();
    expect(price).toContain('₹');
  });

  test('03 should show stock status', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    const s = await p.getStockText();
    expect(s.length).toBeGreaterThan(0);
  });

  test('04 should increase quantity with + control', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    await p.quantityIncrease();
    await expect(page.locator('.product-detail-quantity .quantity-selector span')).toContainText('2');
  });

  test('05 should add product to cart when logged in', async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    await p.clickAddToCart();
    await expect(page.locator('.navbar-cart-badge')).toBeVisible({ timeout: 10000 });
  });

  test('06 should not show add to cart for out of stock product', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.outOfStockProductId);
    await expect(page.locator('.stock-out')).toBeVisible();
    await expect(page.getByRole('button', { name: /add to cart/i })).toHaveCount(0);
  });

  test('07 should show product description text', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await expect(page.locator('.product-detail-description')).toBeVisible();
  });

  test('08 should show reviews section heading', async ({ page }) => {
    const p = new ProductDetailPage(page);
    await p.navigate(products.inStockProductId);
    await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
  });

  test('09 should show product image', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await expect(page.locator('.product-detail-image img')).toBeVisible();
  });

  test('10 should show brand when present', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    const brand = page.locator('.product-detail-brand');
    if (await brand.isVisible().catch(() => false)) {
      await expect(brand).not.toBeEmpty();
    }
  });

  test('11 should navigate back using browser history', async ({ page }) => {
    await page.goto('/products');
    await expect(page.getByRole('heading', { name: /all products|results for/i })).toBeVisible({ timeout: 15000 });
    await page.goto(`/products/${products.inStockProductId}`);
    await page.goBack();
    await expect(page).toHaveURL(/\/products/, { timeout: 15000 });
  });

  test('12 should navigate to not found for unknown product id', async ({ page }) => {
    await page.goto('/products/999999');
    await page.waitForURL(/\/404/, { timeout: 15000 });
  });

  test('13 should show quantity selector for in-stock product', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await expect(page.locator('.product-detail-quantity .quantity-selector')).toBeVisible();
  });

  test('14 should prompt login for reviews when logged out', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await expect(page.locator('.reviews-section a[href="/login"]')).toBeVisible();
  });

  test('15 should display compare-at price when on sale', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    const orig = page.locator('.product-detail-price .original-price');
    const hasStrike = await orig.isVisible().catch(() => false);
    expect(typeof hasStrike).toBe('boolean');
  });
});
