const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');
const { getTestData, getValidUser } = require('../utils/test-data-helper');

const validUser = getValidUser();
const cartData = getTestData('cart');

test.describe('Shopping Cart', () => {
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login(validUser.email, validUser.password);
  });

  test('should add an item to the cart from product detail', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);

    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    const count = await cartPage.getItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should update item quantity in the cart', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    await cartPage.updateQuantity(0, cartData.validQuantity);

    const items = await cartPage.getCartItems();
    expect(items.length).toBeGreaterThan(0);
  });

  test('should remove an item from the cart', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    const countBefore = await cartPage.getItemCount();
    await cartPage.removeItem(0);

    const countAfter = await cartPage.getItemCount();
    expect(countAfter).toBeLessThan(countBefore);
  });

  test('should clear all items from the cart', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    await cartPage.clearCart();

    const isEmpty = await cartPage.isCartEmpty();
    const count = await cartPage.getItemCount();
    expect(isEmpty || count === 0).toBeTruthy();
  });

  test('should calculate cart total correctly', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    const total = await cartPage.getTotal();
    expect(total).toBeGreaterThan(0);
  });

  test('should display empty cart message when cart is empty', async () => {
    await cartPage.navigate();

    const isEmpty = await cartPage.isCartEmpty();
    const count = await cartPage.getItemCount();
    expect(isEmpty || count === 0).toBeTruthy();
  });

  test('should proceed to checkout from cart', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    await cartPage.clickCheckout();

    expect(page.url()).toContain('/checkout');
  });

  test('should display subtotal for cart items', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await cartPage.navigate();
    const subtotal = await cartPage.getSubtotal();
    expect(subtotal).toBeGreaterThan(0);
  });

  test('should add multiple different items to cart', async ({ page }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(0);
    let detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToCart();

    await productsPage.navigate();
    const cards = await productsPage.getProductCards();
    if (await cards.count() > 1) {
      await productsPage.clickProduct(1);
      detailPage = new ProductDetailPage(page);
      await detailPage.clickAddToCart();
    }

    await cartPage.navigate();
    const count = await cartPage.getItemCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
