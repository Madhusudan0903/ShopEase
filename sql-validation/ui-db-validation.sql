-- ============================================================
-- ShopEase / capstone_shopping – UI vs database validation (MySQL)
-- ============================================================
-- Purpose: Queries testers run after performing actions in the UI
-- (or API) to confirm persisted state, calculations, and constraints.
--
-- How to use: Replace placeholders (@email, @product_id, :page_size, etc.)
-- with values shown on screen or returned by the last API call. Compare
-- result row counts, hashes, and aggregates to the UI.
-- ============================================================

USE capstone_shopping;

-- ########################################################################
-- REGISTRATION & LOGIN
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Verify new user exists after registration
-- -----------------------------------------------------------------------------
-- Expect: exactly one row when email matches the address just registered.
SET @registered_email := 'alice@example.com';  -- replace with new user email

SELECT id, first_name, last_name, email, role, is_active, created_at
FROM users
WHERE email = @registered_email;


-- -----------------------------------------------------------------------------
-- Verify password is hashed (not plain text)
-- -----------------------------------------------------------------------------
-- Expect: password_hash looks like bcrypt ($2a$/$2b$) or similar; it must NOT
-- equal the plain password string. If your app stores only a hash column,
-- confirm LENGTH and prefix.
SET @registered_email := 'alice@example.com';

SELECT
  email,
  password_hash,
  LENGTH(password_hash) AS hash_length,
  CASE
    WHEN password_hash LIKE '$2b$%' OR password_hash LIKE '$2a$%' THEN 'bcrypt-shaped'
    ELSE 'review hash format'
  END AS hash_hint
FROM users
WHERE email = @registered_email;


-- -----------------------------------------------------------------------------
-- Duplicate email prevention at DB level
-- -----------------------------------------------------------------------------
-- Expect: second INSERT with same email fails with duplicate-key error (1062).
-- Run manually in a transaction; do not commit if testing on production.
-- START TRANSACTION;
-- INSERT INTO users (first_name, last_name, email, password_hash, role)
-- VALUES ('Dup', 'Test', 'alice@example.com', '$2b$10$dummyhashforduplicatetestxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'customer');
-- ROLLBACK;


-- -----------------------------------------------------------------------------
-- Default role is customer
-- -----------------------------------------------------------------------------
-- Expect: role = 'customer' for newly registered users (unless admin flow).
SET @registered_email := 'alice@example.com';

SELECT id, email, role
FROM users
WHERE email = @registered_email;


-- ########################################################################
-- PRODUCT BROWSING
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Product count matches UI “showing N products” / grid
-- -----------------------------------------------------------------------------
-- Expect: COUNT(*) equals the number of product cards displayed for same filters.
SELECT COUNT(*) AS product_count
FROM products
WHERE is_active = TRUE;


-- -----------------------------------------------------------------------------
-- Sort order matches DB ORDER BY (example: price ascending)
-- -----------------------------------------------------------------------------
-- Compare first page of UI to this query with the same ORDER BY as the API.
SELECT id, name, price
FROM products
WHERE is_active = TRUE
ORDER BY price ASC
LIMIT 12;


-- -----------------------------------------------------------------------------
-- Category filter matches WHERE category_id = …
-- -----------------------------------------------------------------------------
SET @category_id := 1;

SELECT id, name, category_id, price
FROM products
WHERE is_active = TRUE AND category_id = @category_id
ORDER BY name;


-- -----------------------------------------------------------------------------
-- Pagination: OFFSET / LIMIT
-- -----------------------------------------------------------------------------
-- Page 2 with page size 12 → OFFSET 12 LIMIT 12. Match UI page to these values.
-- If your client supports it, you may use: SET @ps=12; SET @off=12; ... LIMIT @ps OFFSET @off;
SELECT id, name, price
FROM products
WHERE is_active = TRUE
ORDER BY id
LIMIT 12 OFFSET 12;


-- ########################################################################
-- PRODUCT DETAIL
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Product details match single DB record
-- -----------------------------------------------------------------------------
SET @product_id := 1;

SELECT *
FROM products
WHERE id = @product_id;


-- -----------------------------------------------------------------------------
-- Stock quantity vs UI status (in stock / low stock / out of stock)
-- -----------------------------------------------------------------------------
-- Expect: stock_quantity = 0 → out of stock; 1..low_stock_threshold → low;
--         above threshold → in stock (threshold is per-row low_stock_threshold).
SET @product_id := 1;

SELECT
  id,
  name,
  stock_quantity,
  low_stock_threshold,
  CASE
    WHEN stock_quantity = 0 THEN 'out_of_stock'
    WHEN stock_quantity <= low_stock_threshold THEN 'low_stock'
    ELSE 'in_stock'
  END AS stock_status
FROM products
WHERE id = @product_id;


-- -----------------------------------------------------------------------------
-- Average rating (approved reviews only – align with your API rules)
-- -----------------------------------------------------------------------------
SET @product_id := 1;

SELECT
  ROUND(AVG(rating), 2) AS avg_rating,
  COUNT(*) AS review_count
FROM reviews
WHERE product_id = @product_id AND is_approved = TRUE;


-- ########################################################################
-- SEARCH & FILTER
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Search text matches LIKE pattern (adjust columns to match API)
-- -----------------------------------------------------------------------------
SET @search := '%cotton%';

SELECT id, name, description, brand
FROM products
WHERE is_active = TRUE
  AND (
    name LIKE @search
    OR description LIKE @search
    OR brand LIKE @search
  );


-- -----------------------------------------------------------------------------
-- Price range filter (BETWEEN min AND max)
-- -----------------------------------------------------------------------------
SET @min_price := 10.00;
SET @max_price := 50.00;

SELECT id, name, price
FROM products
WHERE is_active = TRUE
  AND price BETWEEN @min_price AND @max_price
ORDER BY price;


-- -----------------------------------------------------------------------------
-- Brand filter
-- -----------------------------------------------------------------------------
SET @brand := 'UrbanWear';

SELECT id, name, brand, price
FROM products
WHERE is_active = TRUE AND brand = @brand
ORDER BY name;


-- ########################################################################
-- SHOPPING CART
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Cart lines match DB for logged-in user
-- -----------------------------------------------------------------------------
SET @user_id := 2;

SELECT c.id, c.product_id, c.quantity, p.name, p.price
FROM `cart` c
JOIN products p ON p.id = c.product_id
WHERE c.user_id = @user_id
ORDER BY c.id;


-- -----------------------------------------------------------------------------
-- Cart total (sum of quantity * current product price)
-- -----------------------------------------------------------------------------
-- Note: Some apps snapshot price at add-to-cart; compare to your API contract.
SET @user_id := 2;

SELECT SUM(c.quantity * p.price) AS cart_total
FROM `cart` c
JOIN products p ON p.id = c.product_id
WHERE c.user_id = @user_id;


-- -----------------------------------------------------------------------------
-- Quantity update persisted
-- -----------------------------------------------------------------------------
SET @user_id := 2;
SET @product_id := 1;

SELECT quantity, updated_at
FROM `cart`
WHERE user_id = @user_id AND product_id = @product_id;


-- -----------------------------------------------------------------------------
-- Item removed from DB after delete
-- -----------------------------------------------------------------------------
-- Expect: zero rows after UI removed the line.
SET @user_id := 2;
SET @product_id := 1;

SELECT *
FROM `cart`
WHERE user_id = @user_id AND product_id = @product_id;


-- ########################################################################
-- CHECKOUT & ORDERS
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Order row exists after checkout
-- -----------------------------------------------------------------------------
-- Set to the order id from the confirmation page or API response (not LAST_INSERT_ID()
-- unless run in the same session immediately after INSERT).
SET @order_id := 1;

SELECT *
FROM orders
WHERE id = @order_id;


-- -----------------------------------------------------------------------------
-- order_items match what was in cart (post-checkout snapshot)
-- -----------------------------------------------------------------------------
SET @order_id := 1;

SELECT oi.*, p.name
FROM order_items oi
LEFT JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = @order_id;


-- -----------------------------------------------------------------------------
-- Stock decremented after order (compare product row before/after)
-- -----------------------------------------------------------------------------
SET @product_id := 1;

SELECT id, name, stock_quantity, updated_at
FROM products
WHERE id = @product_id;


-- -----------------------------------------------------------------------------
-- Cart cleared for user after successful order
-- -----------------------------------------------------------------------------
-- Expect: no rows for that user if checkout clears cart.
SET @user_id := 2;

SELECT COUNT(*) AS remaining_cart_lines
FROM `cart`
WHERE user_id = @user_id;


-- -----------------------------------------------------------------------------
-- Order total vs sum of line items
-- -----------------------------------------------------------------------------
SET @order_id := 1;

SELECT
  o.total_amount AS order_total,
  SUM(oi.quantity * oi.price_at_purchase) AS sum_line_items
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = @order_id
GROUP BY o.id, o.total_amount;


-- ########################################################################
-- ORDER TRACKING
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Latest status matches UI “current status”
-- -----------------------------------------------------------------------------
SET @order_id := 1;

SELECT os.status, os.notes, os.created_at
FROM order_status os
WHERE os.order_id = @order_id
ORDER BY os.created_at DESC, os.id DESC
LIMIT 1;


-- -----------------------------------------------------------------------------
-- Full status history for timeline UI
-- -----------------------------------------------------------------------------
SET @order_id := 1;

SELECT id, status, notes, created_at
FROM order_status
WHERE order_id = @order_id
ORDER BY created_at ASC, id ASC;


-- -----------------------------------------------------------------------------
-- Cancel restores stock (compare product.stock_quantity to business rules)
-- -----------------------------------------------------------------------------
-- After cancel: re-query products for items in that order; stock should reflect
-- restock logic implemented in app (not automatic in bare schema).
SET @order_id := 4;

SELECT oi.product_id, p.name, p.stock_quantity
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = @order_id;


-- ########################################################################
-- REVIEWS
-- ########################################################################

-- -----------------------------------------------------------------------------
-- Review stored after submit
-- -----------------------------------------------------------------------------
SET @user_id := 2;
SET @product_id := 1;

SELECT *
FROM reviews
WHERE user_id = @user_id AND product_id = @product_id
ORDER BY id DESC
LIMIT 1;


-- -----------------------------------------------------------------------------
-- One review per user per product (UNIQUE uq_reviews_user_product)
-- -----------------------------------------------------------------------------
-- Expect: duplicate INSERT fails with duplicate key (1062) if pair exists.
-- START TRANSACTION;
-- INSERT INTO reviews (user_id, product_id, rating, title, comment, is_verified_purchase, is_approved)
-- VALUES (2, 1, 5, 'dup', 'dup', TRUE, TRUE);
-- ROLLBACK;


-- -----------------------------------------------------------------------------
-- Average rating after new review (approved only if that is your rule)
-- -----------------------------------------------------------------------------
SET @product_id := 1;

SELECT ROUND(AVG(rating), 2) AS avg_rating, COUNT(*) AS cnt
FROM reviews
WHERE product_id = @product_id AND is_approved = TRUE;


-- -----------------------------------------------------------------------------
-- Review deletion removes row
-- -----------------------------------------------------------------------------
-- Expect: no row after delete (use review id from UI if needed).
SET @review_id := 1;

SELECT *
FROM reviews
WHERE id = @review_id;
