-- ============================================================
-- Capstone Shopping Project – MySQL Database Schema
-- ============================================================

DROP DATABASE IF EXISTS capstone_shopping;
CREATE DATABASE capstone_shopping
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE capstone_shopping;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name      VARCHAR(50)  NOT NULL,
  last_name       VARCHAR(50)  NOT NULL,
  email           VARCHAR(255) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  phone           VARCHAR(20),
  address_line1   VARCHAR(255),
  address_line2   VARCHAR(255),
  city            VARCHAR(100),
  state           VARCHAR(100),
  zip_code        VARCHAR(20),
  role            ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE INDEX idx_users_role      ON users (role);
CREATE INDEX idx_users_is_active ON users (is_active);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  image_url   VARCHAR(500),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB;

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id         INT UNSIGNED NOT NULL,
  name                VARCHAR(255)   NOT NULL,
  description         TEXT,
  price               DECIMAL(10,2)  NOT NULL,
  compare_at_price    DECIMAL(10,2),
  brand               VARCHAR(100),
  sku                 VARCHAR(100)   NOT NULL,
  stock_quantity      INT UNSIGNED   NOT NULL DEFAULT 0,
  low_stock_threshold INT UNSIGNED   NOT NULL DEFAULT 5,
  image_url           VARCHAR(500),
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_products_sku (sku),

  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_products_category  ON products (category_id);
CREATE INDEX idx_products_brand     ON products (brand);
CREATE INDEX idx_products_price     ON products (price);
CREATE INDEX idx_products_is_active ON products (is_active);
CREATE INDEX idx_products_stock     ON products (stock_quantity);

-- ============================================================
-- CART
-- ============================================================
CREATE TABLE cart (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED NOT NULL,
  product_id  INT UNSIGNED NOT NULL,
  quantity    INT UNSIGNED NOT NULL DEFAULT 1,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_cart_user_product (user_id, product_id),

  CONSTRAINT fk_cart_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_cart_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE orders (
  id                      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id                 INT UNSIGNED,
  total_amount            DECIMAL(10,2) NOT NULL,
  shipping_address_line1  VARCHAR(255)  NOT NULL,
  shipping_address_line2  VARCHAR(255),
  shipping_city           VARCHAR(100)  NOT NULL,
  shipping_state          VARCHAR(100)  NOT NULL,
  shipping_zip            VARCHAR(20)   NOT NULL,
  payment_method          ENUM('credit_card','debit_card','upi','cod') NOT NULL,
  payment_status          ENUM('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  order_notes             TEXT,
  created_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_orders_user           ON orders (user_id);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_orders_created_at     ON orders (created_at);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
CREATE TABLE order_items (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id          INT UNSIGNED NOT NULL,
  product_id        INT UNSIGNED,
  quantity          INT UNSIGNED NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_order_items_order   ON order_items (order_id);
CREATE INDEX idx_order_items_product ON order_items (product_id);

-- ============================================================
-- ORDER STATUS (tracks the lifecycle of each order)
-- ============================================================
CREATE TABLE order_status (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED NOT NULL,
  status     ENUM('placed','confirmed','shipped','out_for_delivery','delivered','cancelled','returned') NOT NULL,
  notes      TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_status_order
    FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_order_status_order  ON order_status (order_id);
CREATE INDEX idx_order_status_status ON order_status (status);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id                    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id               INT UNSIGNED,
  product_id            INT UNSIGNED NOT NULL,
  rating                TINYINT UNSIGNED NOT NULL,
  title                 VARCHAR(255),
  comment               TEXT,
  is_verified_purchase  BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved           BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_reviews_user_product (user_id, product_id),

  CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 5),

  CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

  CONSTRAINT fk_reviews_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_reviews_product    ON reviews (product_id);
CREATE INDEX idx_reviews_rating     ON reviews (rating);
CREATE INDEX idx_reviews_is_approved ON reviews (is_approved);
