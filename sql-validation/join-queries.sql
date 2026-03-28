-- ============================================================
-- ShopEase / capstone_shopping – Complex JOIN validation (MySQL)
-- ============================================================
-- Purpose: Multi-table queries to validate relationships and reporting
-- logic. Replace bind parameters (e.g. @user_id) with values from UI
-- or seed data before running.
--
-- Interpretation: Empty result sets usually mean no matching data for
-- the chosen filters; compare row counts and sums to API/UI output.
-- ============================================================

USE capstone_shopping;

-- ----------------------------------------------------------------
-- 1. Cart items with product details and category name (one user)
-- ----------------------------------------------------------------
-- Set to a real user id (seed: Alice = 2, Bob = 3, Carol = 4).
SET @user_id := 2;

SELECT
  c.id            AS cart_id,
  c.quantity,
  p.id            AS product_id,
  p.name          AS product_name,
  p.price         AS unit_price,
  (c.quantity * p.price) AS line_subtotal,
  cat.name        AS category_name
FROM `cart` c
INNER JOIN products p   ON p.id = c.product_id
INNER JOIN categories cat ON cat.id = p.category_id
WHERE c.user_id = @user_id
ORDER BY c.id;


-- ----------------------------------------------------------------
-- 2. Order details with all items, product names, and prices
-- ----------------------------------------------------------------
SET @order_id := 1;

SELECT
  o.id              AS order_id,
  o.user_id,
  o.total_amount    AS order_total,
  o.payment_status,
  oi.id             AS order_item_id,
  oi.quantity,
  oi.price_at_purchase,
  p.name            AS product_name,
  p.sku,
  (oi.quantity * oi.price_at_purchase) AS line_total
FROM orders o
INNER JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN products p      ON p.id = oi.product_id
WHERE o.id = @order_id
ORDER BY oi.id;


-- ----------------------------------------------------------------
-- 3. All reviews for a product: reviewer name + “verified” purchase
-- ----------------------------------------------------------------
SET @product_id := 1;

SELECT
  r.id,
  r.rating,
  r.title,
  r.comment,
  r.is_verified_purchase,
  r.created_at,
  u.first_name,
  u.last_name,
  u.email
FROM reviews r
LEFT JOIN users u ON u.id = r.user_id
WHERE r.product_id = @product_id
ORDER BY r.created_at DESC;


-- ----------------------------------------------------------------
-- 4. User order history: latest status per order + item count
-- ----------------------------------------------------------------
SET @history_user_id := 2;

SELECT
  o.id,
  o.total_amount,
  o.created_at,
  os_latest.status AS latest_status,
  os_latest.created_at AS status_at,
  cnt.item_count
FROM orders o
LEFT JOIN (
  SELECT t.order_id, t.status, t.created_at
  FROM order_status t
  INNER JOIN (
    SELECT order_id, MAX(created_at) AS max_created
    FROM order_status
    GROUP BY order_id
  ) m ON m.order_id = t.order_id AND m.max_created = t.created_at
) os_latest ON os_latest.order_id = o.id
LEFT JOIN (
  SELECT order_id, COUNT(*) AS item_count
  FROM order_items
  GROUP BY order_id
) cnt ON cnt.order_id = o.id
WHERE o.user_id = @history_user_id
ORDER BY o.created_at DESC;


-- ----------------------------------------------------------------
-- 5. Product listing: category name, average rating, review count
-- ----------------------------------------------------------------
SELECT
  p.id,
  p.name,
  p.price,
  c.name AS category_name,
  ROUND(AVG(r.rating), 2) AS avg_rating,
  COUNT(r.id) AS review_count
FROM products p
INNER JOIN categories c ON c.id = p.category_id
LEFT JOIN reviews r ON r.product_id = p.id AND r.is_approved = TRUE
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.price, c.name
ORDER BY p.name;


-- ----------------------------------------------------------------
-- 6. Top-selling products by total quantity sold (order_items)
-- ----------------------------------------------------------------
SELECT
  p.id,
  p.name,
  SUM(oi.quantity) AS units_sold,
  COUNT(DISTINCT oi.order_id) AS order_count
FROM order_items oi
INNER JOIN products p ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY units_sold DESC
LIMIT 20;


-- ----------------------------------------------------------------
-- 7. Revenue report by category
-- ----------------------------------------------------------------
SELECT
  c.id   AS category_id,
  c.name AS category_name,
  SUM(oi.quantity * oi.price_at_purchase) AS revenue,
  SUM(oi.quantity) AS units_sold
FROM order_items oi
INNER JOIN products p ON p.id = oi.product_id
INNER JOIN categories c ON c.id = p.category_id
INNER JOIN orders o ON o.id = oi.order_id
WHERE o.payment_status = 'completed'
GROUP BY c.id, c.name
ORDER BY revenue DESC;


-- ----------------------------------------------------------------
-- 8. Users who placed orders but have not reviewed any product
-- ----------------------------------------------------------------
SELECT DISTINCT u.id, u.email, u.first_name, u.last_name
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE NOT EXISTS (
  SELECT 1 FROM reviews r WHERE r.user_id = u.id
);


-- ----------------------------------------------------------------
-- 9. Complete status timeline for one order
-- ----------------------------------------------------------------
SET @timeline_order_id := 1;

SELECT
  os.id,
  os.status,
  os.notes,
  os.created_at
FROM order_status os
WHERE os.order_id = @timeline_order_id
ORDER BY os.created_at ASC, os.id ASC;


-- ----------------------------------------------------------------
-- 10. Products in cart that are now out of stock (stock_quantity = 0)
-- ----------------------------------------------------------------
SELECT
  c.user_id,
  u.email,
  c.product_id,
  p.name,
  p.stock_quantity,
  c.quantity AS cart_quantity
FROM `cart` c
INNER JOIN products p ON p.id = c.product_id
INNER JOIN users u ON u.id = c.user_id
WHERE p.stock_quantity = 0
ORDER BY c.user_id, c.product_id;
