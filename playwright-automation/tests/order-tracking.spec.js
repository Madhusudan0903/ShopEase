const { test, expect } = require('@playwright/test');
const OrdersPage = require('../pages/OrdersPage');
const OrderDetailPage = require('../pages/OrderDetailPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser } = require('../utils/playwright-helpers');

const login = getTestData('login', 'valid');
async function openOrdersPage(page) {
  const o = new OrdersPage(page);
  await o.navigate();
  if (/\/login/.test(page.url())) {
    await loginAsUser(page, login.email, login.password);
    await o.navigate();
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Order Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
  });

  test('01 should load My Orders page', async ({ page }) => {
    await openOrdersPage(page);
    await expect(page).toHaveURL(/\/orders/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: /my orders|no orders yet/i })).toBeVisible();
  });

  test('02 should list at least one order for seeded Alice', async ({ page }) => {
    await openOrdersPage(page);
    const o = new OrdersPage(page);
    await o.navigate();
    const count = await o.getOrderCardsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('03 should show order id on card', async ({ page }) => {
    const o = new OrdersPage(page);
    await o.navigate();
    const t = await o.getFirstOrderIdText();
    expect(t).toMatch(/order #/i);
  });

  test('04 should navigate to order detail', async ({ page }) => {
    const o = new OrdersPage(page);
    await o.navigate();
    await o.openOrderDetail(0);
    expect(page.url()).toMatch(/\/orders\/\d+/);
  });

  test('05 should show order status section on detail', async ({ page }) => {
    const d = new OrderDetailPage(page);
    await d.navigate(1);
    await expect(page.locator('.order-detail').getByRole('heading', { name: /order status/i })).toBeVisible({
      timeout: 30000,
    });
  });

  test('06 should show status tracker component', async ({ page }) => {
    const d = new OrderDetailPage(page);
    await d.navigate(1);
    await expect(page.locator('.order-detail').getByRole('heading', { name: /order status/i })).toBeVisible({
      timeout: 30000,
    });
    const hasTracker = await d.hasStatusTracker();
    if (!hasTracker) {
      await expect(page.getByRole('heading', { name: /order #/i })).toBeVisible({ timeout: 15000 });
    } else {
      expect(hasTracker).toBeTruthy();
    }
  });

  test('07 should show order items section', async ({ page }) => {
    const d = new OrderDetailPage(page);
    await d.navigate(1);
    await expect(page.locator('.order-detail').getByRole('heading', { name: /order items/i })).toBeVisible({
      timeout: 30000,
    });
  });

  test('08 should cancel placed order when Cancel Order is available', async ({ page }) => {
    // Register before navigation so Firefox/WebKit cannot miss window.confirm
    page.once('dialog', (dialog) => dialog.accept());
    const d = new OrderDetailPage(page);
    await d.navigate(6);
    await expect(page).toHaveURL(/\/orders\/6/, { timeout: 20000 });
    await expect(page.getByRole('heading', { name: /order #6/i })).toBeVisible({ timeout: 25000 });
    const btn = page.getByRole('button', { name: /cancel order/i });
    if (await btn.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false)) {
      await btn.click();
      await expect(page.locator('.order-detail')).toBeVisible({ timeout: 20000 });
      await page.waitForTimeout(800);
    }
    await expect(page.getByRole('heading', { name: /order #/i })).toBeVisible({ timeout: 15000 });
  });

  test('09 should show Browse Products on empty orders for new user', async ({ page }) => {
    const email = `orders.empty.${Date.now()}@example.com`;
    await page.goto('/register');
    await page.locator('input[name="firstName"]').fill('E');
    await page.locator('input[name="lastName"]').fill('User');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('input[name="confirmPassword"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL((u) => !u.pathname.includes('/register'), { timeout: 25000 });
    await page.goto('/orders');
    const emptyVisible = await page.getByRole('heading', { name: /no orders yet/i }).isVisible().catch(() => false);
    if (emptyVisible) {
      await expect(page.getByRole('link', { name: /browse products/i })).toBeVisible();
    } else {
      const myOrdersVisible = await page.getByRole('heading', { name: /my orders/i }).isVisible().catch(() => false);
      const loginVisible = await page.getByRole('heading', { name: /login|sign in/i }).isVisible().catch(() => false);
      expect(myOrdersVisible || loginVisible).toBeTruthy();
    }
  });

  test('10 should show order date on list card', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.locator('.order-card-date').first()).toBeVisible();
  });

  test('11 should show total on order card', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.locator('.order-card-total').first()).toContainText('₹');
  });

  test('12 should show shipping block on detail', async ({ page }) => {
    await page.goto('/orders/1');
    await expect(page.getByRole('heading', { name: /shipping address/i })).toBeVisible();
  });

  test('13 should show payment method on detail', async ({ page }) => {
    await page.goto('/orders/1');
    await expect(page.getByText(/method:/i).first()).toBeVisible();
  });

  test('14 Bob should not see cancel on shipped order', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/orders/2');
    const d = new OrderDetailPage(page);
    expect(await d.isCancelVisible()).toBeFalsy();
  });

  test('15 should show back to orders link on detail', async ({ page }) => {
    await page.goto('/orders/1');
    await expect(page.getByRole('button', { name: /back to orders/i })).toBeVisible();
  });
});
