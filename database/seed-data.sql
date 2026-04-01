-- ============================================================
-- Capstone Shopping Project – Seed Data
-- ============================================================

USE capstone_shopping;

-- ============================================================
-- USERS  (password = "Password123!" for all placeholder hashes)
-- ============================================================
-- password_hash: bcrypt for plain text "Password123!" (see playwright e2e fixtures)
INSERT INTO users (first_name, last_name, email, password_hash, phone, address_line1, address_line2, city, state, zip_code, role, is_active)
VALUES
  ('Admin',   'User',     'admin@capstone.com',     '$2a$10$9CVfxPtdagVttQlSY5YVDO0UyNCPVq9PTmiqlZYn2mEgukAzUWPSW', '5551000001', '100 Admin Blvd',    NULL,         'New York',    'NY', '10001', 'admin',    TRUE),
  ('Alice',   'Johnson',  'alice@example.com',      '$2a$10$9CVfxPtdagVttQlSY5YVDO0UyNCPVq9PTmiqlZYn2mEgukAzUWPSW', '5552000002', '201 Maple St',      'Apt 4B',     'Los Angeles', 'CA', '90001', 'customer', TRUE),
  ('Bob',     'Williams', 'bob@example.com',        '$2a$10$9CVfxPtdagVttQlSY5YVDO0UyNCPVq9PTmiqlZYn2mEgukAzUWPSW', '5553000003', '302 Oak Ave',       NULL,         'Chicago',     'IL', '60601', 'customer', TRUE),
  ('Carol',   'Martinez', 'carol@example.com',      '$2a$10$9CVfxPtdagVttQlSY5YVDO0UyNCPVq9PTmiqlZYn2mEgukAzUWPSW', '5554000004', '403 Pine Rd',       'Suite 200',  'Houston',     'TX', '77001', 'customer', TRUE),
  ('David',   'Brown',    'david@example.com',      '$2a$10$9CVfxPtdagVttQlSY5YVDO0UyNCPVq9PTmiqlZYn2mEgukAzUWPSW', '5555000005', '504 Cedar Ln',      NULL,         'Phoenix',     'AZ', '85001', 'customer', FALSE);

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, description, image_url) VALUES
  ('Clothing',        'Apparel for men and women',                     '/images/categories/clothing.jpg'),
  ('Electronics',     'Gadgets, devices, and accessories',             '/images/categories/electronics.jpg'),
  ('Footwear',        'Shoes, sneakers, boots, and sandals',           '/images/categories/footwear.jpg'),
  ('Accessories',     'Watches, bags, wallets, and jewelry',           '/images/categories/accessories.jpg'),
  ('Home & Kitchen',  'Furniture, cookware, and home essentials',      '/images/categories/home-kitchen.jpg'),
  ('Books',           'Fiction, non-fiction, and academic textbooks',   '/images/categories/books.jpg');

-- ============================================================
-- PRODUCTS  (30+ items across all categories)
-- stock_quantity = 0  → out-of-stock testing
-- stock_quantity <= 5 → low-stock testing
-- compare_at_price    → strike-through / sale testing
-- ============================================================
INSERT INTO products (category_id, name, description, price, compare_at_price, brand, sku, stock_quantity, low_stock_threshold, image_url) VALUES
-- Clothing (category 1)
(1, 'Classic Cotton T-Shirt',          'Comfortable 100% cotton crew-neck tee',                  19.99,  29.99,  'UrbanWear',    'CLT-TEE-001',   120, 10, '/images/products/tshirt-classic.jpg'),
(1, 'Slim-Fit Denim Jeans',            'Stretch denim with a modern slim fit',                   49.99,  69.99,  'DenimCo',      'CLT-JNS-002',    60,  5, '/images/products/jeans-slim.jpg'),
(1, 'Fleece Zip-Up Hoodie',            'Warm fleece hoodie with front zip and kangaroo pocket',   39.99,  NULL,   'UrbanWear',    'CLT-HDI-003',    45,  5, '/images/products/hoodie-fleece.jpg'),
(1, 'Formal Dress Shirt',              'Wrinkle-free cotton dress shirt',                        34.99,  44.99,  'EliteStitch',  'CLT-SHR-004',     3,  5, '/images/products/shirt-formal.jpg'),
(1, 'Lightweight Summer Dress',        'Floral print A-line dress for summer',                   29.99,  NULL,   'UrbanWear',    'CLT-DRS-005',     0,  5, '/images/products/dress-summer.jpg'),

-- Electronics (category 2)
(2, 'Wireless Bluetooth Earbuds',      'True wireless with 24-hour battery & ANC',               79.99,  99.99,  'SoundPulse',   'ELC-EBD-001',    85, 10, '/images/products/earbuds-wireless.jpg'),
(2, 'Portable Power Bank 20000mAh',    'Fast-charge power bank with dual USB-C ports',           34.99,  NULL,   'ChargeTech',   'ELC-PWB-002',   200, 15, '/images/products/powerbank-20k.jpg'),
(2, '4K Webcam with Ring Light',       'Ultra-HD streaming webcam with built-in light',          59.99,  79.99,  'VisCam',       'ELC-WCM-003',    30,  5, '/images/products/webcam-4k.jpg'),
(2, 'Mechanical Gaming Keyboard',      'RGB mechanical keyboard with Cherry MX switches',        89.99,  NULL,   'KeyForce',     'ELC-KBD-004',     2,  5, '/images/products/keyboard-mech.jpg'),
(2, 'Smart Fitness Tracker',           'Heart-rate, SpO2, sleep tracking, 7-day battery',        49.99,  64.99,  'FitWave',      'ELC-FIT-005',     0,  5, '/images/products/fitness-tracker.jpg'),
(2, 'USB-C Docking Station',           '12-in-1 hub: HDMI, Ethernet, SD, USB-A, PD 100W',       54.99,  NULL,   'DockMaster',   'ELC-DOC-006',    40,  5, '/images/products/dock-usbc.jpg'),

-- Footwear (category 3)
(3, 'Running Shoes – Ultralight',      'Breathable mesh upper with responsive cushioning',       89.99, 119.99,  'StridePro',    'FTW-RUN-001',    70, 10, '/images/products/shoes-running.jpg'),
(3, 'Leather Chelsea Boots',           'Premium pull-on boots with elastic side panels',        129.99, 159.99,  'CraftWalk',    'FTW-CHB-002',    25,  5, '/images/products/boots-chelsea.jpg'),
(3, 'Casual Canvas Sneakers',          'Low-top canvas sneakers with vulcanized sole',           39.99,  NULL,   'StreetKick',   'FTW-CNV-003',    90,  5, '/images/products/sneakers-canvas.jpg'),
(3, 'Orthopedic Comfort Sandals',      'Arch-support sandals for all-day wear',                  44.99,  NULL,   'ComfortStep',  'FTW-SND-004',     4,  5, '/images/products/sandals-ortho.jpg'),
(3, 'High-Top Basketball Shoes',       'Ankle support with non-slip rubber outsole',             99.99, 129.99,  'CourtEdge',    'FTW-BSK-005',     0,  5, '/images/products/shoes-basketball.jpg'),

-- Accessories (category 4)
(4, 'Stainless Steel Chronograph Watch','Water-resistant 50m with date display',                 149.99, 199.99, 'TimeCraft',    'ACC-WCH-001',    35,  5, '/images/products/watch-chrono.jpg'),
(4, 'Genuine Leather Wallet',          'RFID-blocking bifold wallet with 8 card slots',          29.99,  NULL,   'HideGear',     'ACC-WLT-002',    60,  5, '/images/products/wallet-leather.jpg'),
(4, 'Polarized Aviator Sunglasses',    'UV400 protection with spring hinges',                    24.99,  34.99,  'ShadeVault',   'ACC-SNG-003',   100, 10, '/images/products/sunglasses-aviator.jpg'),
(4, 'Canvas Laptop Backpack',          'Fits 15.6" laptops, USB charging port, waterproof',      44.99,  59.99,  'PackTrail',    'ACC-BPK-004',    50,  5, '/images/products/backpack-canvas.jpg'),
(4, 'Sterling Silver Pendant Necklace','925 silver chain with gemstone pendant',                  59.99,  NULL,   'Silverine',    'ACC-NKL-005',     1,  5, '/images/products/necklace-pendant.jpg'),

-- Home & Kitchen (category 5)
(5, 'Non-Stick Cookware Set (10-pc)',  'PFOA-free ceramic coating, dishwasher safe',             89.99, 119.99,  'ChefLine',     'HMK-CKW-001',    40,  5, '/images/products/cookware-set.jpg'),
(5, 'Memory Foam Pillow (2-Pack)',     'Cooling gel-infused memory foam, queen size',            34.99,  NULL,   'DreamRest',    'HMK-PLW-002',    75,  5, '/images/products/pillow-memory.jpg'),
(5, 'Robot Vacuum Cleaner',            'Smart mapping, auto-charge, 150-min runtime',           199.99, 249.99,  'CleanBot',     'HMK-VAC-003',    15,  5, '/images/products/vacuum-robot.jpg'),
(5, 'Bamboo Cutting Board Set',        'Set of 3 with juice grooves, antimicrobial',             22.99,  NULL,   'EcoChef',      'HMK-CTB-004',     0,  5, '/images/products/cutting-board.jpg'),
(5, 'Essential Oil Diffuser',          'Ultrasonic 500ml with 7 LED color modes',                27.99,  34.99,  'AromaZen',     'HMK-DIF-005',    55,  5, '/images/products/diffuser-oil.jpg'),

-- Books (category 6)
(6, 'Clean Code – Robert C. Martin',   'A handbook of agile software craftsmanship',             32.99,  NULL,   'Pearson',      'BKS-DEV-001',    50,  5, '/images/products/book-clean-code.jpg'),
(6, 'Atomic Habits – James Clear',     'Tiny changes, remarkable results',                       16.99,  NULL,   'Penguin',      'BKS-SEL-002',   150, 10, '/images/products/book-atomic-habits.jpg'),
(6, 'The Great Gatsby – F. Scott Fitzgerald', 'Classic American novel set in the Jazz Age',       9.99,  14.99,  'Scribner',     'BKS-FIC-003',    80,  5, '/images/products/book-gatsby.jpg'),
(6, 'Intro to Algorithms – CLRS',      'Comprehensive text on algorithm design & analysis',      74.99,  89.99,  'MIT Press',    'BKS-ACA-004',     3,  5, '/images/products/book-clrs.jpg'),
(6, 'Sapiens – Yuval Noah Harari',     'A brief history of humankind',                           18.99,  NULL,   'Harper',       'BKS-NFC-005',    95,  5, '/images/products/book-sapiens.jpg');

-- ============================================================
-- CART  (active items for 3 customers)
-- ============================================================
INSERT INTO cart (user_id, product_id, quantity) VALUES
  (2, 1,  2),   -- Alice: 2x Classic Cotton T-Shirt
  (2, 6,  1),   -- Alice: 1x Wireless Bluetooth Earbuds
  (3, 12, 1),   -- Bob:   1x Running Shoes
  (3, 21, 1),   -- Bob:   1x Canvas Laptop Backpack
  (3, 27, 1),   -- Bob:   1x Atomic Habits
  (4, 18, 1),   -- Carol: 1x Stainless Steel Watch
  (4, 23, 1);   -- Carol: 1x Non-Stick Cookware Set

-- ============================================================
-- ORDERS
-- ============================================================

-- Order 1 – Alice – Delivered, credit card, completed
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (2, 129.97, '201 Maple St', 'Apt 4B', 'Los Angeles', 'CA', '90001', 'credit_card', 'completed', NULL);

-- Order 2 – Bob – Shipped, debit card, completed
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (3, 89.99, '302 Oak Ave', NULL, 'Chicago', 'IL', '60601', 'debit_card', 'completed', 'Please leave at the door');

-- Order 3 – Carol – Placed, UPI, pending
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (4, 239.98, '403 Pine Rd', 'Suite 200', 'Houston', 'TX', '77001', 'upi', 'pending', NULL);

-- Order 4 – Alice – Cancelled, COD, failed
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (2, 49.99, '201 Maple St', 'Apt 4B', 'Los Angeles', 'CA', '90001', 'cod', 'failed', 'Customer requested cancellation');

-- Order 5 – Bob – Out for delivery, credit card, completed
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (3, 54.98, '302 Oak Ave', NULL, 'Chicago', 'IL', '60601', 'credit_card', 'completed', NULL);

-- Order 6 – Alice – Placed only (cancellable; product 4 not yet reviewed by Alice)
INSERT INTO orders (user_id, total_amount, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_zip, payment_method, payment_status, order_notes)
VALUES (2, 34.99, '201 Maple St', NULL, 'Los Angeles', 'CA', '90001', 'cod', 'completed', NULL);

-- ============================================================
-- ORDER ITEMS
-- ============================================================

-- Order 1 items (Alice)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (1, 1, 2, 19.99),   -- 2x Classic Cotton T-Shirt
  (1, 6, 1, 79.99);   -- 1x Wireless Bluetooth Earbuds

-- Order 2 items (Bob)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (2, 12, 1, 89.99);  -- 1x Running Shoes

-- Order 3 items (Carol)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (3, 18, 1, 149.99), -- 1x Watch
  (3, 23, 1, 89.99);  -- 1x Cookware Set

-- Order 4 items (Alice – cancelled)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (4, 2, 1, 49.99);   -- 1x Slim-Fit Jeans

-- Order 5 items (Bob)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (5, 19, 1, 29.99),  -- 1x Leather Wallet
  (5, 20, 1, 24.99);  -- 1x Aviator Sunglasses

-- Order 6 items (Alice – placed, cancellable)
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (6, 4, 1, 34.99);   -- 1x Formal Dress Shirt

-- ============================================================
-- ORDER STATUS  (multiple entries per order to show lifecycle)
-- ============================================================

-- Order 1 lifecycle → delivered
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (1, 'placed',           'Order received',                   '2026-03-01 10:00:00'),
  (1, 'confirmed',        'Payment verified',                 '2026-03-01 10:15:00'),
  (1, 'shipped',          'Dispatched via FedEx #FX123456',   '2026-03-02 09:00:00'),
  (1, 'out_for_delivery', 'With local courier',               '2026-03-04 07:30:00'),
  (1, 'delivered',        'Left at front door',               '2026-03-04 14:20:00');

-- Order 2 lifecycle → shipped
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (2, 'placed',    'Order received',                 '2026-03-10 12:00:00'),
  (2, 'confirmed', 'Payment verified',               '2026-03-10 12:30:00'),
  (2, 'shipped',   'Dispatched via UPS #UP789012',   '2026-03-11 11:00:00');

-- Order 3 lifecycle → placed only
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (3, 'placed', 'Order received, awaiting payment confirmation', '2026-03-25 18:00:00');

-- Order 4 lifecycle → cancelled
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (4, 'placed',    'Order received',               '2026-03-15 09:00:00'),
  (4, 'cancelled', 'Cancelled by customer request', '2026-03-15 09:45:00');

-- Order 5 lifecycle → out for delivery
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (5, 'placed',           'Order received',                 '2026-03-20 14:00:00'),
  (5, 'confirmed',        'Payment verified',               '2026-03-20 14:10:00'),
  (5, 'shipped',          'Dispatched via USPS #US345678',  '2026-03-21 10:00:00'),
  (5, 'out_for_delivery', 'With local courier',             '2026-03-23 08:00:00');

-- Order 6 lifecycle → placed only (Alice can cancel)
INSERT INTO order_status (order_id, status, notes, created_at) VALUES
  (6, 'placed', 'Order received', '2026-03-28 10:00:00');

-- ============================================================
-- REVIEWS
-- ============================================================
INSERT INTO reviews (user_id, product_id, rating, title, comment, is_verified_purchase, is_approved) VALUES
  (2, 1,  5, 'Super comfortable!',            'Best t-shirt I have owned. Fabric is soft and breathable.',      TRUE,  TRUE),
  (2, 6,  4, 'Great sound, minor fit issue',   'ANC is excellent. Ear tips could be more comfortable.',         TRUE,  TRUE),
  (3, 12, 5, 'Perfect running shoe',           'Lightweight and responsive. Ran a half-marathon in these!',     TRUE,  TRUE),
  (3, 27, 4, 'Life-changing book',             'Practical advice you can start applying immediately.',          TRUE,  TRUE),
  (4, 18, 3, 'Looks good but ticks loud',      'Beautiful watch but the ticking is noticeable at night.',       FALSE, TRUE),
  (4, 23, 5, 'Amazing cookware set',           'Non-stick works perfectly even after months of use.',           TRUE,  TRUE),
  (2, 28, 5, 'Must-read for developers',       'Clean Code changed how I write software.',                     FALSE, TRUE),
  (3, 7,  2, 'Stopped charging after a week',  'Power bank died after 7 days. Returning it.',                  TRUE,  FALSE),
  (4, 14, 4, 'Stylish and comfortable boots',  'Great quality leather. Takes a few days to break in.',         TRUE,  TRUE),
  (3, 19, 5, 'Excellent slim wallet',           'Fits all my cards, RFID blocking is a nice bonus.',           TRUE,  TRUE),
  (2, 25, 4, 'Works great on carpet',          'Robot vacuum handles carpet and hardwood well.',                TRUE,  FALSE),
  (4, 30, 5, 'Fascinating read',               'Sapiens makes you rethink everything about humanity.',         TRUE,  TRUE);
