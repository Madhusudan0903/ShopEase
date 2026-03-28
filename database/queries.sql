-- ============================================================
-- Capstone Shopping Project – CRUD Query Reference
-- ============================================================

USE capstone_shopping;

-- ************************************************************
-- 1. USERS
-- ************************************************************

-- CREATE: Register a new customer
INSERT INTO users (first_name, last_name, email, password_hash, phone, address_line1, city, state, zip_code)
VALUES ('Eve', 'Taylor', 'eve@example.com', '$2b$10$placeholderHashHere', '555-600-0006', '605 Birch St', 'Miami', 'FL', '33101');

-- READ: Get user by email (login lookup)
SELECT id, first_name, last_name, email, password_hash, role, is_active
FROM users
WHERE email = 'alice@example.com';

-- READ: List all active customers
SELECT id, first_name, last_name, email, phone, city, state, created_at
FROM users
WHERE role = 'customer' AND is_active = TRUE
ORDER BY created_at DESC;

-- UPDATE: Update user profile
UPDATE users
SET phone = '555-200-9999', address_line1 = '999 New Maple St', city = 'San Francisco', state = 'CA', zip_code = '94101'
WHERE id = 2;

-- UPDATE: Deactivate a user (soft delete)
UPDATE users SET is_active = FALSE WHERE id = 5;

-- UPDATE: Promote user to admin
UPDATE users SET role = 'admin' WHERE id = 3;

-- DELETE: Permanently remove a user (cascades to cart, nullifies orders/reviews)
DELETE FROM users WHERE id = 5;


-- ************************************************************
-- 2. CATEGORIES
-- ************************************************************

-- CREATE
INSERT INTO categories (name, description, image_url)
VALUES ('Sports & Outdoors', 'Equipment and gear for outdoor activities', '/images/categories/sports.jpg');

-- READ: All active categories
SELECT id, name, description, image_url
FROM categories
WHERE is_active = TRUE
ORDER BY name;

-- READ: Category with product count
SELECT c.id, c.name, COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON p.category_id = c.id AND p.is_active = TRUE
WHERE c.is_active = TRUE
GROUP BY c.id, c.name
ORDER BY product_count DESC;

-- UPDATE
UPDATE categories SET description = 'Updated description for clothing' WHERE id = 1;

-- UPDATE: Soft-deactivate a category
UPDATE categories SET is_active = FALSE WHERE id = 6;

-- DELETE
DELETE FROM categories WHERE id = 7;


-- ************************************************************
-- 3. PRODUCTS
-- ************************************************************

-- CREATE
INSERT INTO products (category_id, name, description, price, compare_at_price, brand, sku, stock_quantity, image_url)
VALUES (2, 'Noise-Cancelling Headphones', 'Over-ear with 40hr battery', 149.99, 199.99, 'SoundPulse', 'ELC-HDP-007', 50, '/images/products/headphones-anc.jpg');

-- READ: All active products with category name
SELECT p.id, p.name, p.price, p.compare_at_price, p.brand, p.stock_quantity, c.name AS category
FROM products p
JOIN categories c ON c.id = p.category_id
WHERE p.is_active = TRUE
ORDER BY p.created_at DESC;

-- READ: Products by category
SELECT id, name, price, brand, stock_quantity, image_url
FROM products
WHERE category_id = 2 AND is_active = TRUE
ORDER BY price ASC;

-- READ: Search products by keyword
SELECT id, name, price, brand
FROM products
WHERE is_active = TRUE AND (name LIKE '%shoe%' OR description LIKE '%shoe%')
ORDER BY price;

-- READ: Out-of-stock products
SELECT id, name, sku, brand, category_id
FROM products
WHERE stock_quantity = 0 AND is_active = TRUE;

-- READ: Low-stock products (at or below threshold)
SELECT id, name, sku, stock_quantity, low_stock_threshold
FROM products
WHERE stock_quantity <= low_stock_threshold AND stock_quantity > 0 AND is_active = TRUE;

-- READ: Product detail with average rating
SELECT p.*, ROUND(AVG(r.rating), 1) AS avg_rating, COUNT(r.id) AS review_count
FROM products p
LEFT JOIN reviews r ON r.product_id = p.id AND r.is_approved = TRUE
WHERE p.id = 1
GROUP BY p.id;

-- UPDATE: Change price (simulates price change for order history comparison)
UPDATE products SET price = 17.99, compare_at_price = 29.99 WHERE id = 1;

-- UPDATE: Restock product
UPDATE products SET stock_quantity = stock_quantity + 50 WHERE id = 5;

-- UPDATE: Decrement stock after purchase
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 6 AND stock_quantity > 0;

-- UPDATE: Soft-deactivate a product
UPDATE products SET is_active = FALSE WHERE id = 10;

-- DELETE
DELETE FROM products WHERE id = 31;


-- ************************************************************
-- 4. CART
-- ************************************************************

-- CREATE: Add item to cart (or update quantity if duplicate – handled by app logic)
INSERT INTO cart (user_id, product_id, quantity)
VALUES (2, 12, 1)
ON DUPLICATE KEY UPDATE quantity = quantity + 1;

-- READ: Get full cart for a user
SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS line_total, p.stock_quantity, p.image_url
FROM cart c
JOIN products p ON p.id = c.product_id
WHERE c.user_id = 2
ORDER BY c.created_at;

-- READ: Cart summary (total items + total price)
SELECT COUNT(*) AS total_items, SUM(p.price * c.quantity) AS cart_total
FROM cart c
JOIN products p ON p.id = c.product_id
WHERE c.user_id = 2;

-- UPDATE: Change quantity
UPDATE cart SET quantity = 3 WHERE user_id = 2 AND product_id = 1;

-- DELETE: Remove single item
DELETE FROM cart WHERE user_id = 2 AND product_id = 6;

-- DELETE: Clear entire cart after checkout
DELETE FROM cart WHERE user_id = 2;


-- ************************************************************
-- 5. ORDERS
-- ************************************************************

-- CREATE: Place a new order
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_city, shipping_state, shipping_zip, payment_method, payment_status)
VALUES (2, 119.98, '201 Maple St', 'Los Angeles', 'CA', '90001', 'credit_card', 'pending');

-- READ: Get all orders for a user
SELECT id, total_amount, payment_method, payment_status, created_at
FROM orders
WHERE user_id = 2
ORDER BY created_at DESC;

-- READ: Order detail with items
SELECT o.id AS order_id, o.total_amount, o.payment_status,
       oi.quantity, oi.price_at_purchase, p.name AS product_name
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN products p ON p.id = oi.product_id
WHERE o.id = 1;

-- READ: Orders by payment status (admin dashboard)
SELECT payment_status, COUNT(*) AS order_count, SUM(total_amount) AS revenue
FROM orders
GROUP BY payment_status;

-- READ: Recent orders (admin)
SELECT o.id, u.first_name, u.last_name, o.total_amount, o.payment_method, o.payment_status, o.created_at
FROM orders o
LEFT JOIN users u ON u.id = o.user_id
ORDER BY o.created_at DESC
LIMIT 20;

-- UPDATE: Mark payment as completed
UPDATE orders SET payment_status = 'completed' WHERE id = 3;

-- UPDATE: Refund an order
UPDATE orders SET payment_status = 'refunded' WHERE id = 4;

-- DELETE: Remove an order (cascades to order_items and order_status)
DELETE FROM orders WHERE id = 4;


-- ************************************************************
-- 6. ORDER ITEMS
-- ************************************************************

-- CREATE: Add items when placing an order
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
VALUES (6, 1, 2, 19.99),
       (6, 14, 1, 129.99);

-- READ: Items for a specific order
SELECT oi.id, p.name, oi.quantity, oi.price_at_purchase, (oi.quantity * oi.price_at_purchase) AS line_total
FROM order_items oi
LEFT JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 1;

-- READ: Best-selling products
SELECT p.id, p.name, SUM(oi.quantity) AS total_sold
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_sold DESC
LIMIT 10;

-- UPDATE: Adjust quantity (e.g. partial cancellation)
UPDATE order_items SET quantity = 1 WHERE id = 1;

-- DELETE: Remove a line item
DELETE FROM order_items WHERE id = 1;


-- ************************************************************
-- 7. ORDER STATUS
-- ************************************************************

-- CREATE: Add a new status entry
INSERT INTO order_status (order_id, status, notes)
VALUES (3, 'confirmed', 'Payment verified via UPI');

-- READ: Full status timeline for an order
SELECT status, notes, created_at
FROM order_status
WHERE order_id = 1
ORDER BY created_at ASC;

-- READ: Latest status per order (subquery approach)
SELECT os.order_id, os.status, os.notes, os.created_at
FROM order_status os
INNER JOIN (
  SELECT order_id, MAX(created_at) AS latest
  FROM order_status
  GROUP BY order_id
) latest_os ON os.order_id = latest_os.order_id AND os.created_at = latest_os.latest;

-- READ: All orders with a specific status
SELECT o.id, u.first_name, u.last_name, o.total_amount, os.status, os.created_at
FROM order_status os
JOIN orders o ON o.id = os.order_id
LEFT JOIN users u ON u.id = o.user_id
WHERE os.status = 'shipped';

-- UPDATE: Edit a status note
UPDATE order_status SET notes = 'Updated tracking: FedEx #FX999999' WHERE id = 3;

-- DELETE: Remove erroneous status entry
DELETE FROM order_status WHERE id = 10;


-- ************************************************************
-- 8. REVIEWS
-- ************************************************************

-- CREATE: Submit a review
INSERT INTO reviews (user_id, product_id, rating, title, comment, is_verified_purchase)
VALUES (3, 1, 4, 'Good quality tee', 'Nice fabric, runs a bit large.', TRUE);

-- READ: Approved reviews for a product
SELECT r.rating, r.title, r.comment, r.is_verified_purchase, r.created_at,
       u.first_name
FROM reviews r
LEFT JOIN users u ON u.id = r.user_id
WHERE r.product_id = 1 AND r.is_approved = TRUE
ORDER BY r.created_at DESC;

-- READ: Average rating & count per product
SELECT product_id, ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS review_count
FROM reviews
WHERE is_approved = TRUE
GROUP BY product_id;

-- READ: Pending reviews awaiting approval (admin)
SELECT r.id, p.name AS product, u.first_name AS reviewer, r.rating, r.title, r.comment, r.created_at
FROM reviews r
JOIN products p ON p.id = r.product_id
LEFT JOIN users u ON u.id = r.user_id
WHERE r.is_approved = FALSE
ORDER BY r.created_at ASC;

-- READ: Check if user already reviewed a product (duplicate prevention)
SELECT EXISTS(
  SELECT 1 FROM reviews WHERE user_id = 2 AND product_id = 1
) AS already_reviewed;

-- UPDATE: Approve a review
UPDATE reviews SET is_approved = TRUE WHERE id = 8;

-- UPDATE: Edit a review
UPDATE reviews SET rating = 3, comment = 'Updated: replaced under warranty, works now.', title = 'Replaced – works fine' WHERE id = 8;

-- DELETE: Remove a review
DELETE FROM reviews WHERE id = 8;


-- ************************************************************
-- BONUS: Useful Aggregate / Reporting Queries
-- ************************************************************

-- Revenue by month
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_amount) AS revenue, COUNT(*) AS order_count
FROM orders
WHERE payment_status = 'completed'
GROUP BY month
ORDER BY month DESC;

-- Top customers by spend
SELECT u.id, u.first_name, u.last_name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.payment_status = 'completed'
GROUP BY u.id
ORDER BY total_spent DESC
LIMIT 5;

-- Products never ordered
SELECT p.id, p.name, p.sku
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.id IS NULL;

-- Full inventory report (stock status)
SELECT p.id, p.name, p.sku, p.stock_quantity, p.low_stock_threshold,
  CASE
    WHEN p.stock_quantity = 0 THEN 'OUT_OF_STOCK'
    WHEN p.stock_quantity <= p.low_stock_threshold THEN 'LOW_STOCK'
    ELSE 'IN_STOCK'
  END AS stock_status
FROM products p
WHERE p.is_active = TRUE
ORDER BY p.stock_quantity ASC;
