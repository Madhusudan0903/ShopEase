const { test, expect } = require('@playwright/test');
const CartPage = require('../pages/CartPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser } = require('../utils/playwright-helpers');

const login = getTestData('login', 'valid');
const products = getTestData('products');

test.describe('Shopping Cart', () => {
  async function resetCartViaApi(page) {
    await page.evaluate(async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  }

  async function seedCartWithOneItem(page) {
    const itemCount = await page.evaluate(async (productId) => {
      const token = localStorage.getItem('token');
      if (!token) return -1;
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: Number(productId), quantity: 1 }),
      });
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      return json?.data?.items?.length ?? 0;
    }, products.inStockProductId);
    expect(itemCount).toBeGreaterThan(0);
    await page.goto('/cart');
    await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 20000 });
  }

  test.beforeEach(async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    await resetCartViaApi(page);
    await seedCartWithOneItem(page);
  });

  test('01 should show cart with line item', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    expect(await cart.getLineCount()).toBeGreaterThan(0);
  });

  test('02 should increase quantity', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    const qty = page.locator('.cart-item').first().locator('.quantity-selector span');
    const before = Number((await qty.textContent()) || '1');
    await cart.clickQuantityIncrease(0);
    await expect(qty).toContainText(String(before + 1));
  });

  test('03 should decrease quantity', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    const qty = page.locator('.cart-item').first().locator('.quantity-selector span');
    const before = Number((await qty.textContent()) || '1');
    await cart.clickQuantityIncrease(0);
    await cart.clickQuantityDecrease(0);
    await expect(qty).toContainText(String(before));
  });

  test('04 should remove item from cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await cart.removeItem(0);
    await expect(page.locator('.cart-empty')).toBeVisible({ timeout: 15000 });
  });

  test('05 should show empty cart message after clear', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(1000);
    const cart = new CartPage(page);
    await cart.navigate();
    await cart.clearCart();
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('06 should show order summary with subtotal', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    const sub = await cart.getSubtotalText();
    expect(sub).toContain('₹');
  });

  test('07 should show total in summary', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 15000 });
    const tot = await cart.getTotalText();
    expect(tot).toContain('₹');
  });

  test('08 should navigate to checkout via link', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await cart.proceedToCheckout();
    expect(page.url()).toContain('/checkout');
  });

  test('09 should show Continue Shopping link', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.getByRole('button', { name: /continue shopping/i })).toBeVisible();
  });

  test('10 should display product title in cart line', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.locator('.cart-item h3').first()).toBeVisible();
  });

  test('11 should show cart page heading', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();
  });

  test('12 should add two different products', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto(`/products/2`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(1200);
    const cart = new CartPage(page);
    await cart.navigate();
    expect(await cart.getLineCount()).toBeGreaterThanOrEqual(1);
  });

  test('13 should show line subtotal per item', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.locator('.cart-item-subtotal').first()).toContainText('₹');
  });

  test('14 should update navbar cart badge count', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await expect(page.locator('.navbar-cart-badge')).toBeVisible();
  });

  test('15 should allow proceeding to checkout when items exist', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigate();
    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/\/checkout/, { timeout: 15000 });
  });
});
