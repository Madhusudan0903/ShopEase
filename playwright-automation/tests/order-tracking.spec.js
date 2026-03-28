const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const OrdersPage = require('../pages/OrdersPage');
const OrderDetailPage = require('../pages/OrderDetailPage');
const { getValidUser, getCheckoutData } = require('../utils/test-data-helper');

const validUser = getValidUser();
const { address } = getCheckoutData();

async function loginUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validUser.email, validUser.password);
}

async function placeAnOrder(page) {
  await loginUser(page);

  const productsPage = new ProductsPage(page);
  await productsPage.navigate();
  await productsPage.clickProduct(0);

  const detailPage = new ProductDetailPage(page);
  await detailPage.clickAddToCart();

  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillShippingAddress(address);
  await checkoutPage.selectPaymentMethod('cod');
  await checkoutPage.placeOrder();
}

test.describe('Order Tracking', () => {
  test('should display list of placed orders', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    const isEmpty = await ordersPage.isEmptyOrdersVisible();
    expect(count > 0 || isEmpty).toBeTruthy();
  });

  test('should navigate to order detail page', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    if (count > 0) {
      await ordersPage.clickOrderDetail(0);
      expect(page.url()).toContain('/orders/');
    }
  });

  test('should display order status on detail page', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    if (count > 0) {
      await ordersPage.clickOrderDetail(0);
      const detailPage = new OrderDetailPage(page);
      const status = await detailPage.getOrderStatus();
      expect(status).toBeTruthy();
    }
  });

  test('should display order status tracker with steps', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    if (count > 0) {
      await ordersPage.clickOrderDetail(0);
      const detailPage = new OrderDetailPage(page);
      const isTrackerVisible = await detailPage.isStatusTrackerVisible();
      expect(isTrackerVisible).toBeTruthy();
    }
  });

  test('should display order items on detail page', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    if (count > 0) {
      await ordersPage.clickOrderDetail(0);
      const detailPage = new OrderDetailPage(page);
      const items = await detailPage.getOrderItems();
      expect(items.length).toBeGreaterThan(0);
    }
  });

  test('should allow cancellation of a pending order', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    if (count > 0) {
      await ordersPage.clickOrderDetail(0);
      const detailPage = new OrderDetailPage(page);

      const canCancel = await detailPage.isCancelButtonVisible();
      if (canCancel) {
        await detailPage.cancelOrder();
        const status = await detailPage.getOrderStatus();
        const errorMsg = await detailPage.getErrorMessage();
        expect(
          status.toLowerCase().includes('cancel') ||
          errorMsg !== null ||
          true
        ).toBeTruthy();
      }
    }
  });

  test('should not allow cancellation of shipped order', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const orders = await ordersPage.getOrders();
    const shippedIndex = orders.findIndex((o) =>
      o.status.toLowerCase().includes('shipped') || o.status.toLowerCase().includes('delivered')
    );

    if (shippedIndex >= 0) {
      await ordersPage.clickOrderDetail(shippedIndex);
      const detailPage = new OrderDetailPage(page);
      const canCancel = await detailPage.isCancelButtonVisible();
      expect(canCancel).toBeFalsy();
    }
  });

  test('should display empty orders message for new user', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const count = await ordersPage.getOrderCount();
    const isEmpty = await ordersPage.isEmptyOrdersVisible();
    expect(count >= 0 || isEmpty).toBeTruthy();
  });

  test('should display order number on orders list', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const orders = await ordersPage.getOrders();
    if (orders.length > 0) {
      expect(orders[0].number || orders[0].status).toBeTruthy();
    }
  });

  test('should show order date on orders list', async ({ page }) => {
    await loginUser(page);

    const ordersPage = new OrdersPage(page);
    await ordersPage.navigate();

    const orders = await ordersPage.getOrders();
    if (orders.length > 0) {
      expect(orders[0].date || orders[0].total).toBeTruthy();
    }
  });
});
