-- ============================================================
-- ShopEase / capstone_shopping – CRUD validation (MySQL)
-- ============================================================
-- Purpose: Exercise INSERT, SELECT, UPDATE, and DELETE on each
-- of the eight tables. Adjust IDs or run after a fresh seed if
-- conflicts occur (unique email, SKU, etc.).
--
-- Safe usage:
--   1) Wrap the whole script in START TRANSACTION; … ROLLBACK;
--      to verify SQL without persisting changes, OR
--   2) Run section by section and DELETE test rows using the
--      predicates shown in each DELETE.
--
-- Database: USE capstone_shopping;
-- ============================================================

USE capstone_shopping;

-- ----------------------------------------------------------------
-- USERS
-- ----------------------------------------------------------------
-- Validates: create account row, read by key, filter, partial update,
--            remove test user (ensure no dependent rows or delete
--            children first in real runs).

-- INSERT – sample row (unique email required by uq_users_email)
INSERT INTO users (
  first_name, last_name, email, password_hash, phone,
  address_line1, city, state, zip_code, role, is_active
) VALUES (
  'CRUD', 'Tester', 'crud_validation_user@example.test',
  '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890123456789012ab',  -- bcrypt-shaped placeholder; not a real hash
  '555-CRUD-0001', '1 Validation Rd', 'Testville', 'TS', '00001',
  'customer', TRUE
);

-- SELECT – single record (use LAST_INSERT_ID() right after INSERT, or known id)
SELECT *
FROM users
WHERE email = 'crud_validation_user@example.test';

-- SELECT – filtered (active customers)
SELECT id, email, first_name, last_name, role
FROM users
WHERE role = 'customer' AND is_active = TRUE
ORDER BY id DESC
LIMIT 10;

-- UPDATE – specific fields
UPDATE users
SET phone = '555-CRUD-9999', updated_at = CURRENT_TIMESTAMP
WHERE email = 'crud_validation_user@example.test';

-- DELETE – conditional (remove only the test user)
-- Note: If FKs reference this user (cart, orders, reviews), delete or reassign those first.
DELETE FROM users
WHERE email = 'crud_validation_user@example.test';


-- ----------------------------------------------------------------
-- CATEGORIES
-- ----------------------------------------------------------------

INSERT INTO categories (name, description, image_url, is_active)
VALUES (
  'CRUD Validation Category',
  'Temporary category for CRUD testing',
  '/images/categories/crud-test.jpg',
  TRUE
);

SELECT *
FROM categories
WHERE name = 'CRUD Validation Category';

SELECT id, name, is_active
FROM categories
WHERE is_active = TRUE
ORDER BY name;

UPDATE categories
SET description = 'Updated description for CRUD validation'
WHERE name = 'CRUD Validation Category';

DELETE FROM categories
WHERE name = 'CRUD Validation Category';


-- ----------------------------------------------------------------
-- PRODUCTS (requires existing category_id)
-- ----------------------------------------------------------------
-- Use an existing category (e.g. id = 1 from seed) or insert category first.

INSERT INTO products (
  category_id, name, description, price, brand, sku,
  stock_quantity, low_stock_threshold, is_active
) VALUES (
  1,
  'CRUD Validation Product',
  'Disposable product row for CRUD testing',
  9.99,
  'CRUDBrand',
  'CRUD-VAL-SKU-001',
  100,
  5,
  TRUE
);

SELECT *
FROM products
WHERE sku = 'CRUD-VAL-SKU-001';

SELECT id, name, price, stock_quantity
FROM products
WHERE category_id = 1 AND is_active = TRUE
ORDER BY price ASC;

UPDATE products
SET stock_quantity = 99, price = 10.49
WHERE sku = 'CRUD-VAL-SKU-001';

DELETE FROM products
WHERE sku = 'CRUD-VAL-SKU-001';


-- ----------------------------------------------------------------
-- CART (requires user_id + product_id; unique user+product)
-- ----------------------------------------------------------------
-- Uses user_id=2, product_id=2 (seed: Alice + Slim-Fit Jeans) so we do not
-- remove rows from the shipped seed cart (Alice’s lines are products 1 and 6).
-- Change IDs if your data differs.

INSERT INTO `cart` (user_id, product_id, quantity)
VALUES (2, 2, 1)
ON DUPLICATE KEY UPDATE quantity = quantity + 1;

SELECT *
FROM `cart`
WHERE user_id = 2 AND product_id = 2;

SELECT c.id, c.quantity, p.name, p.price
FROM `cart` c
JOIN products p ON p.id = c.product_id
WHERE c.user_id = 2;

UPDATE `cart`
SET quantity = 3, updated_at = CURRENT_TIMESTAMP
WHERE user_id = 2 AND product_id = 2;

DELETE FROM `cart`
WHERE user_id = 2 AND product_id = 2;


-- ----------------------------------------------------------------
-- ORDERS
-- ----------------------------------------------------------------

INSERT INTO orders (
  user_id, total_amount,
  shipping_address_line1, shipping_city, shipping_state, shipping_zip,
  payment_method, payment_status, order_notes
) VALUES (
  2, 19.99,
  '201 Maple St', 'Los Angeles', 'CA', '90001',
  'cod', 'pending', 'CRUD validation order'
);

SELECT *
FROM orders
WHERE order_notes = 'CRUD validation order';

SELECT id, total_amount, payment_status, created_at
FROM orders
WHERE user_id = 2
ORDER BY created_at DESC;

UPDATE orders
SET payment_status = 'completed', total_amount = 20.99
WHERE order_notes = 'CRUD validation order';

-- DELETE – remove dependent order_items and order_status first if any were added
SET @crud_order_id := (SELECT id FROM orders WHERE order_notes = 'CRUD validation order' LIMIT 1);
DELETE FROM order_status WHERE order_id = @crud_order_id;
DELETE FROM order_items WHERE order_id = @crud_order_id;
DELETE FROM orders WHERE id = @crud_order_id;


-- ----------------------------------------------------------------
-- ORDER_ITEMS (requires order_id, product_id)
-- ----------------------------------------------------------------

INSERT INTO orders (
  user_id, total_amount,
  shipping_address_line1, shipping_city, shipping_state, shipping_zip,
  payment_method, payment_status, order_notes
) VALUES (
  2, 39.98,
  '201 Maple St', 'Los Angeles', 'CA', '90001',
  'credit_card', 'completed', 'Parent order for order_items CRUD'
);

SET @parent_order_id := LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
VALUES (@parent_order_id, 1, 2, 19.99);

SELECT *
FROM order_items
WHERE order_id = @parent_order_id;

SELECT oi.id, oi.quantity, oi.price_at_purchase, p.name
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = @parent_order_id;

UPDATE order_items
SET quantity = 1, price_at_purchase = 19.99
WHERE order_id = @parent_order_id AND product_id = 1;

DELETE FROM order_items WHERE order_id = @parent_order_id;
DELETE FROM orders WHERE id = @parent_order_id;


-- ----------------------------------------------------------------
-- ORDER_STATUS (requires order_id)
-- ----------------------------------------------------------------

INSERT INTO orders (
  user_id, total_amount,
  shipping_address_line1, shipping_city, shipping_state, shipping_zip,
  payment_method, payment_status, order_notes
) VALUES (
  2, 10.00,
  '201 Maple St', 'Los Angeles', 'CA', '90001',
  'upi', 'pending', 'Order for order_status CRUD'
);

SET @os_order_id := LAST_INSERT_ID();

INSERT INTO order_status (order_id, status, notes)
VALUES (@os_order_id, 'placed', 'CRUD validation – placed');

SELECT *
FROM order_status
WHERE order_id = @os_order_id;

SELECT order_id, status, notes, created_at
FROM order_status
WHERE status IN ('placed', 'confirmed')
ORDER BY created_at DESC
LIMIT 20;

UPDATE order_status
SET notes = 'CRUD validation – updated note'
WHERE order_id = @os_order_id AND status = 'placed';

DELETE FROM order_status WHERE order_id = @os_order_id;
DELETE FROM orders WHERE id = @os_order_id;


-- ----------------------------------------------------------------
-- REVIEWS (unique user_id + product_id; rating 1–5)
-- ----------------------------------------------------------------

INSERT INTO reviews (
  user_id, product_id, rating, title, comment,
  is_verified_purchase, is_approved
) VALUES (
  2, 3, 5, 'CRUD validation review', 'Short test comment', TRUE, TRUE
);

SELECT *
FROM reviews
WHERE user_id = 2 AND product_id = 3;

SELECT id, rating, title, is_verified_purchase
FROM reviews
WHERE product_id = 3 AND is_approved = TRUE;

UPDATE reviews
SET rating = 4, comment = 'Updated CRUD validation comment'
WHERE user_id = 2 AND product_id = 3;

DELETE FROM reviews
WHERE user_id = 2 AND product_id = 3;
