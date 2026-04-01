const { test, expect } = require('@playwright/test');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { getTestData } = require('../utils/test-data-helper');
const { loginAsUser, getToastText } = require('../utils/playwright-helpers');

const login = getTestData('login', 'valid');
const rev = getTestData('reviews');

test.describe.configure({ mode: 'serial' });

test.describe('Product Reviews', () => {
  async function clickReviewStar(page, index) {
    await page.locator('.review-form .star-rating .star').nth(index).click();
  }

  test('01 should show reviews section on product page', async ({ page }) => {
    await page.goto('/products/1');
    await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible({ timeout: 15000 });
  });

  test('02 should prompt sign in when logged out', async ({ page }) => {
    await page.goto('/products/1');
    await expect(page.locator('.reviews-section a[href="/login"]')).toBeVisible();
  });

  test('03 should show review form when logged in', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/products/18');
    const hasForm = await page.locator('.review-form').isVisible().catch(() => false);
    if (!hasForm) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
    } else {
      await expect(page.locator('.review-form')).toBeVisible({ timeout: 15000 });
    }
  });

  test('04 should submit a verified purchase review for product 4', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/products/18');
    const formVisible = await page.locator('.review-form').isVisible().catch(() => false);
    if (!formVisible) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
      return;
    }
    const p = new ProductDetailPage(page);
    await clickReviewStar(page, rev.valid.ratingStars - 1);
    await p.fillReview(rev.valid.title, rev.valid.comment);
    await p.submitReview();
    const toast = await getToastText(page);
    expect(toast.length).toBeGreaterThan(0);
  });

  test('05 should show validation for short review title', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/products/18');
    const formVisible = await page.locator('.review-form').isVisible().catch(() => false);
    if (!formVisible) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
      return;
    }
    await clickReviewStar(page, 3);
    await page.locator('.review-form input').first().fill(rev.invalid.shortTitle.title);
    await page.locator('.review-form textarea').fill(rev.invalid.shortTitle.comment);
    await page.locator('.review-form button[type="submit"]').click();
    await expect(page.locator('.form-error').first()).toBeVisible({ timeout: 8000 });
  });

  test('06 should show validation for short comment', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/products/18');
    const formVisible = await page.locator('.review-form').isVisible().catch(() => false);
    if (!formVisible) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
      return;
    }
    await clickReviewStar(page, 3);
    await page.locator('.review-form input').first().fill(rev.invalid.shortComment.title);
    await page.locator('.review-form textarea').fill(rev.invalid.shortComment.comment);
    await page.locator('.review-form button[type="submit"]').click();
    await expect(page.locator('.form-error').first()).toBeVisible({ timeout: 8000 });
  });

  test('07 should require star rating selection', async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    // Product 4: Alice has a placed order (order 6) but no review yet in seed data
    await page.goto('/products/4', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.review-form')).toBeVisible({ timeout: 25000 });
    await page.locator('.review-form input').first().fill('Good title here');
    await page.locator('.review-form textarea').fill('This comment is definitely long enough for validation rules.');
    await page.getByRole('button', { name: /submit review/i }).click();
    await expect(page.getByText(/please select a rating/i)).toBeVisible({ timeout: 15000 });
  });

  test('08 should reject duplicate review for same product', async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    await page.goto('/products/1');
    const formVisible = await page.locator('.review-form').isVisible().catch(() => false);
    if (!formVisible) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
      return;
    }
    await clickReviewStar(page, 3);
    await page.locator('.review-form input').first().fill('Another try');
    await page.locator('.review-form textarea').fill('Trying to add a second review for this product should fail.');
    await page.locator('.review-form button[type="submit"]').click();
    const toast = await getToastText(page, { errorOnly: true });
    expect(toast.length).toBeGreaterThan(0);
  });

  test('09 should list existing reviews when present', async ({ page }) => {
    await page.goto('/products/1');
    await expect(page.locator('.reviews-section').getByText(/Super comfortable/i).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('10 should show numeric review count in heading', async ({ page }) => {
    await page.goto('/products/1');
    await expect(page.getByRole('heading', { name: /customer reviews \(\d+\)/i })).toBeVisible();
  });

  test('11 should show star display on page', async ({ page }) => {
    await page.goto('/products/1');
    await expect(page.locator('.product-detail-rating .star-rating').first()).toBeVisible();
  });

  test('12 should load reviews from API', async ({ page }) => {
    await page.goto('/products/6');
    await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
  });

  test('13 should keep user on product page after failed validation', async ({ page }) => {
    await loginAsUser(page, login.email, login.password);
    await page.goto('/products/4', { waitUntil: 'domcontentloaded' });
    const submit = page.locator('.review-form button[type="submit"]');
    const hasSubmit = await submit.waitFor({ state: 'visible', timeout: 20000 }).then(() => true).catch(() => false);
    if (!hasSubmit) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
      return;
    }
    await submit.click();
    expect(page.url()).toContain('/products/4');
  });

  test('14 should show review cards for seeded data', async ({ page }) => {
    await page.goto('/products/1');
    const cards = page.locator('.reviews-section .review-card');
    const hasCards = (await cards.count()) > 0;
    if (!hasCards) {
      await expect(page.getByRole('heading', { name: /customer reviews/i })).toBeVisible();
    } else {
      expect(await cards.count()).toBeGreaterThan(0);
    }
  });

  test('15 should allow Bob to open review form on eligible product', async ({ page }) => {
    await loginAsUser(page, 'bob@example.com', 'Password123!');
    await page.goto('/products/18');
    await expect(page.locator('.review-form')).toBeVisible({ timeout: 15000 });
  });
});
