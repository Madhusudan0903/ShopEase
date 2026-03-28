-- ============================================================
-- ShopEase / capstone_shopping – Data integrity checks (MySQL)
-- ============================================================
-- Purpose: Detect orphaned rows, FK violations, business-rule breaches,
-- and duplicate data. Each section notes what a “clean” result looks like.
--
-- Interpretation:
--   - Rows returned = problems found (unless the query is designed to return
--     zero rows as success; comments state this explicitly).
--   - Empty result set = check passed.
-- ============================================================

USE capstone_shopping;

-- ----------------------------------------------------------------
-- 1. Orphaned order_items (no matching order)
-- ----------------------------------------------------------------
-- Expect: no rows. FK normally prevents this; use after restores/imports.
SELECT oi.id, oi.order_id, oi.product_id
FROM order_items oi
LEFT JOIN orders o ON o.id = oi.order_id
WHERE o.id IS NULL;


-- ----------------------------------------------------------------
-- 2. Referential integrity – all FK relationships
-- ----------------------------------------------------------------
-- Expect: each subquery returns 0 rows. Run all; any row = broken reference.

-- order_items → orders
SELECT oi.id AS bad_order_item, oi.order_id
FROM order_items oi
LEFT JOIN orders o ON o.id = oi.order_id
WHERE o.id IS NULL;

-- order_items → products (nullable product_id)
SELECT oi.id AS bad_order_item, oi.product_id
FROM order_items oi
LEFT JOIN products p ON p.id = oi.product_id
WHERE oi.product_id IS NOT NULL AND p.id IS NULL;

-- orders → users (nullable user_id)
SELECT o.id AS bad_order, o.user_id
FROM orders o
LEFT JOIN users u ON u.id = o.user_id
WHERE o.user_id IS NOT NULL AND u.id IS NULL;

-- cart → users / products
SELECT c.id AS bad_cart, c.user_id, c.product_id
FROM `cart` c
LEFT JOIN users u ON u.id = c.user_id
LEFT JOIN products p ON p.id = c.product_id
WHERE u.id IS NULL OR p.id IS NULL;

-- products → categories
SELECT p.id AS bad_product, p.category_id
FROM products p
LEFT JOIN categories c ON c.id = p.category_id
WHERE c.id IS NULL;

-- order_status → orders
SELECT os.id AS bad_status_row, os.order_id
FROM order_status os
LEFT JOIN orders o ON o.id = os.order_id
WHERE o.id IS NULL;

-- reviews → users (nullable user_id) / products
SELECT r.id AS bad_review, r.user_id, r.product_id
FROM reviews r
LEFT JOIN users u ON u.id = r.user_id
LEFT JOIN products p ON p.id = r.product_id
WHERE (r.user_id IS NOT NULL AND u.id IS NULL)
   OR (p.id IS NULL);


-- ----------------------------------------------------------------
-- 3. Negative stock quantities
-- ----------------------------------------------------------------
-- Expect: no rows (schema uses UNSIGNED; negative values indicate bad import).
SELECT id, name, stock_quantity
FROM products
WHERE stock_quantity < 0;


-- ----------------------------------------------------------------
-- 4. Orders with no order_items
-- ----------------------------------------------------------------
-- Expect: no rows for completed business rules (every order should have lines).
SELECT o.id, o.user_id, o.total_amount, o.created_at
FROM orders o
LEFT JOIN order_items oi ON oi.order_id = o.id
WHERE oi.id IS NULL;


-- ----------------------------------------------------------------
-- 5. Orders missing an initial status row
-- ----------------------------------------------------------------
-- Expect: no rows if every order must have at least one order_status entry.
SELECT o.id
FROM orders o
LEFT JOIN order_status os ON os.order_id = o.id
WHERE os.id IS NULL;


-- ----------------------------------------------------------------
-- 6. Duplicate cart entries (same user + product)
-- ----------------------------------------------------------------
-- Expect: no rows (uq_cart_user_product enforces uniqueness; duplicates = bad data).
SELECT user_id, product_id, COUNT(*) AS cnt
FROM `cart`
GROUP BY user_id, product_id
HAVING cnt > 1;


-- ----------------------------------------------------------------
-- 7. Price consistency: price_at_purchase vs current product price
-- ----------------------------------------------------------------
-- Expect: optional warning rows only if you require snapshot = current price.
-- Historical orders legitimately differ after price changes.
SELECT
  oi.id,
  oi.order_id,
  oi.product_id,
  oi.price_at_purchase,
  p.price AS current_product_price
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.product_id IS NOT NULL
  AND oi.price_at_purchase <> p.price;


-- ----------------------------------------------------------------
-- 8. Rating outside 1–5 (CHECK chk_reviews_rating + UNSIGNED)
-- ----------------------------------------------------------------
-- Expect: no rows in MySQL 8+ with CHECK enforced; still useful after import.
SELECT id, user_id, product_id, rating
FROM reviews
WHERE rating < 1 OR rating > 5;


-- ----------------------------------------------------------------
-- 9. Duplicate emails (should be impossible with UNIQUE on users.email)
-- ----------------------------------------------------------------
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING cnt > 1;


-- ----------------------------------------------------------------
-- 10. Orders with total_amount = 0
-- ----------------------------------------------------------------
-- Expect: no rows unless business allows free orders; flag for investigation.
SELECT id, user_id, total_amount, payment_status, created_at
FROM orders
WHERE total_amount = 0;
