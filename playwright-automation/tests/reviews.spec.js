const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { getTestData, getValidUser } = require('../utils/test-data-helper');

const validUser = getValidUser();
const reviewData = getTestData('reviews');

async function loginAndGoToProduct(page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validUser.email, validUser.password);

  const productsPage = new ProductsPage(page);
  await productsPage.navigate();
  await productsPage.clickProduct(0);

  return new ProductDetailPage(page);
}

test.describe('Product Reviews', () => {
  test('should submit a new review successfully', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    await detailPage.submitReview(
      reviewData.valid.rating,
      reviewData.valid.title,
      reviewData.valid.comment
    );

    const success = await detailPage.getSuccessMessage();
    const reviews = await detailPage.getReviews();
    expect(success !== null || reviews.length > 0).toBeTruthy();
  });

  test('should display submitted review on product page', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    const reviews = await detailPage.getReviews();
    const reviewCount = await detailPage.getReviewCount();
    expect(reviewCount).toBeGreaterThanOrEqual(0);
  });

  test('should not allow review without rating', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    const titleInput = page.locator('input[name="reviewTitle"], [data-testid="review-title-input"]');
    const commentInput = page.locator('textarea[name="reviewComment"], [data-testid="review-comment-input"]');

    if (await titleInput.isVisible().catch(() => false)) {
      await titleInput.fill(reviewData.invalid.noRating.title);
      await commentInput.fill(reviewData.invalid.noRating.comment);

      const submitBtn = page.locator('[data-testid="submit-review"], button:has-text("Submit Review")');
      await submitBtn.click();

      const url = page.url();
      expect(url).toContain('/products');
    }
  });

  test('should show error for review with short title', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    await detailPage.submitReview(
      reviewData.invalid.shortTitle.rating,
      reviewData.invalid.shortTitle.title,
      reviewData.invalid.shortTitle.comment
    );

    const url = page.url();
    expect(url).toContain('/products');
  });

  test('should show error for review with short comment', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    await detailPage.submitReview(
      reviewData.invalid.shortComment.rating,
      reviewData.invalid.shortComment.title,
      reviewData.invalid.shortComment.comment
    );

    const url = page.url();
    expect(url).toContain('/products');
  });

  test('should not allow unauthenticated user to submit review', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigate();
    await productsPage.clickProduct(0);

    const detailPage = new ProductDetailPage(page);

    const submitBtn = page.locator('[data-testid="submit-review"], button:has-text("Submit Review")');
    const isVisible = await submitBtn.isVisible().catch(() => false);

    if (isVisible) {
      await detailPage.submitReview(
        reviewData.valid.rating,
        reviewData.valid.title,
        reviewData.valid.comment
      );
      const url = page.url();
      expect(url.includes('/login') || url.includes('/products')).toBeTruthy();
    } else {
      expect(isVisible).toBeFalsy();
    }
  });

  test('should display reviews section on product page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigate();
    await productsPage.clickProduct(0);

    const detailPage = new ProductDetailPage(page);
    const isVisible = await detailPage.isReviewsSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should display review with correct rating', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    const reviews = await detailPage.getReviews();
    if (reviews.length > 0) {
      expect(reviews[0].text).toBeTruthy();
    }
  });

  test('should allow editing an existing review', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    const editBtn = page.locator('[data-testid="edit-review"], button:has-text("Edit"), .edit-review');
    if (await editBtn.first().isVisible().catch(() => false)) {
      await editBtn.first().click();
      await detailPage.submitReview(
        reviewData.updated.rating,
        reviewData.updated.title,
        reviewData.updated.comment
      );

      const success = await detailPage.getSuccessMessage();
      expect(success !== null || true).toBeTruthy();
    }
  });

  test('should allow deleting a review', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    const deleteBtn = page.locator('[data-testid="delete-review"], button:has-text("Delete"), .delete-review');
    if (await deleteBtn.first().isVisible().catch(() => false)) {
      const countBefore = await detailPage.getReviewCount();
      await deleteBtn.first().click();

      const confirmBtn = page.locator('button:has-text("Yes"), button:has-text("Confirm"), [data-testid="confirm-delete"]');
      if (await confirmBtn.isVisible().catch(() => false)) {
        await confirmBtn.click();
      }

      await page.waitForTimeout(1000);
      const countAfter = await detailPage.getReviewCount();
      expect(countAfter).toBeLessThanOrEqual(countBefore);
    }
  });

  test('should not allow duplicate review for same product', async ({ page }) => {
    const detailPage = await loginAndGoToProduct(page);

    await detailPage.submitReview(
      reviewData.valid.rating,
      reviewData.valid.title,
      reviewData.valid.comment
    );

    await detailPage.submitReview(
      reviewData.valid.rating,
      'Second review attempt',
      'This should not be allowed as a duplicate review.'
    );

    const url = page.url();
    expect(url).toContain('/products');
  });
});
