const { test, expect } = require('@playwright/test');
const CheckoutPage = require('../pages/CheckoutPage');
const CartPage = require('../pages/CartPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser } = require('../utils/playwright-helpers');

const login = getTestData('login', 'valid');
const checkoutCfg = getTestData('checkout');
const ship = checkoutCfg.shippingAddress;
const pay = checkoutCfg.paymentMethods;
const products = getTestData('products');

async function fillValidShipping(co) {
  await co.fillShipping(ship.valid);
}

async function ensureCheckoutReady(page) {
  await page.evaluate(async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await fetch('/api/cart/clear', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: Number(productId), quantity: 1 }),
    });
  }, products.inStockProductId);
  await page.goto('/checkout');
}

test.describe.configure({ mode: 'serial' });

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    await ensureCheckoutReady(page);
    await page.waitForTimeout(800);
  });

  test('01 should show checkout steps', async ({ page }) => {
    await expect(page.getByText(/shipping/i).first()).toBeVisible();
  });

  test('02 should validate empty address fields', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('capstone_saved_shipping_v1'));
    await page.reload();
    await page.waitForTimeout(1200);
    const co = new CheckoutPage(page);
    await page.locator('input[placeholder*="Street address"]').waitFor({ state: 'visible', timeout: 20000 });
    await co.clearShippingFields();
    await co.clickContinue();
    await expect(page.locator('.form-error').first()).toBeVisible();
  });

  test('03 should advance to payment after valid shipping', async ({ page }) => {
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await expect(page.getByRole('heading', { name: /payment method/i })).toBeVisible();
  });

  test('04 should complete order with Cash on Delivery', async ({ page }) => {
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('Cash on Delivery');
    await co.clickContinue();
    await expect(page.getByRole('heading', { name: /order review/i })).toBeVisible();
    await co.placeOrder();
    await page.waitForURL(/\/orders/, { timeout: 25000 });
  });

  test('05 should complete order with UPI and valid UPI id', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto('/checkout');
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('UPI');
    await co.fillUpiId(pay.upi.upiId);
    await co.clickContinue();
    await co.placeOrder();
    await page.waitForURL(/\/orders/, { timeout: 25000 });
  });

  test('06 should complete order with credit card details', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto('/checkout');
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('Credit Card');
    await co.fillCardFields(pay.creditCard);
    await co.clickContinue();
    await co.placeOrder();
    await page.waitForURL(/\/orders/, { timeout: 25000 });
  });

  test('07 should redirect away from checkout when cart empty', async ({ page }) => {
    await page.evaluate(async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    });
    await page.goto('/cart');
    await expect(page.locator('.cart-item')).toHaveCount(0);
    await page.goto('/checkout');
    await expect(page).toHaveURL(/\/cart/, { timeout: 60000 });
  });

  test('08 should show review step with item list', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto('/checkout');
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('Cash on Delivery');
    await co.clickContinue();
    await expect(page.getByText(/items/i).first()).toBeVisible();
  });

  test('09 should validate UPI when UPI selected', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto('/checkout');
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('UPI');
    await co.clickContinue();
    await expect(page.locator('.form-error').first()).toBeVisible();
  });

  test('10 should allow going back from payment to shipping', async ({ page }) => {
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.clickBack();
    await expect(page.getByPlaceholder(/Street address/i)).toBeVisible();
  });

  test('11 should show tax and shipping in review', async ({ page }) => {
    await page.goto(`/products/${products.inStockProductId}`);
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.waitForTimeout(800);
    await page.goto('/checkout');
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await co.selectPaymentLabel('Cash on Delivery');
    await co.clickContinue();
    await expect(page.getByText(/tax/i).first()).toBeVisible();
  });

  test('12 should show invalid zip client error', async ({ page }) => {
    const co = new CheckoutPage(page);
    await co.fillShipping({
      line1: '123 Street',
      line2: '',
      city: 'City',
      state: 'ST',
      zip: 'abc',
    });
    await co.clickContinue();
    await expect(page.locator('.form-error').first()).toBeVisible();
  });

  test('13 should have remember shipping checkbox', async ({ page }) => {
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('14 should show payment options including Debit Card', async ({ page }) => {
    const co = new CheckoutPage(page);
    await fillValidShipping(co);
    await co.clickContinue();
    await expect(page.locator('.payment-option', { hasText: 'Debit Card' })).toBeVisible();
  });

  test('15 should load checkout only when authenticated', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/checkout');
    await page.waitForURL(/\/login/, { timeout: 15000 });
  });
});
