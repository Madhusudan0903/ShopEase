# ShopEase - Full Stack E-Commerce Capstone Project

`v1.0` | `Node.js` | `React` | `MySQL` | `Playwright`

> A full-stack e-commerce web application with comprehensive Quality Engineering deliverables including test planning, test design, manual/automated testing, SQL validation, and professional reporting.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Application Features](#application-features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Quality Engineering](#quality-engineering)
- [Running Tests](#running-tests)
- [Screenshots](#screenshots)
- [Constraints](#constraints)
- [Author](#author)
- [License](#license)

---

## Project Overview

ShopEase is a capstone project that demonstrates full-stack web development paired with professional Quality Engineering practices. The application is a fully functional e-commerce platform where users can browse products, manage a shopping cart, complete checkout, track orders, and leave reviews.

The project encompasses:

- **Frontend** — A responsive React SPA with product catalog, cart, checkout, and order management
- **Backend** — A RESTful API built with Express.js handling authentication, products, cart, orders, and reviews
- **Database** — A normalized MySQL schema with seed data covering all application entities
- **Automation** — 88 Playwright test scripts using the Page Object Model pattern
- **QE Documentation** — Complete test lifecycle artifacts from strategy through final reporting

---

## Tech Stack

| Layer          | Technology                  | Version  |
|----------------|-----------------------------|----------|
| **Frontend**   | React (Vite)                | 18.x     |
| **Styling**    | CSS                         | —        |
| **Backend**    | Node.js / Express.js        | 18.x / 4.x |
| **Database**   | MySQL                       | 8.0      |
| **ORM/Driver** | mysql2                      | 3.x      |
| **Auth**       | JSON Web Tokens (JWT)       | —        |
| **Automation** | Playwright                  | Latest   |
| **Language**   | JavaScript (ES6+)           | —        |
| **Browser**    | Chromium (headless/headed)  | —        |

---

## Project Structure

```
Capstone-Shopping/
│
├── frontend/                        # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   └── axios.js             # Axios instance & interceptors
│       ├── context/
│       │   ├── AuthContext.jsx       # Authentication state
│       │   └── CartContext.jsx       # Cart state management
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── StarRating.jsx
│       │   ├── Loading.jsx
│       │   ├── Pagination.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ProductCard.jsx
│       │   ├── ProductFilters.jsx
│       │   ├── CartItem.jsx
│       │   ├── OrderStatusTracker.jsx
│       │   ├── ReviewCard.jsx
│       │   └── ReviewForm.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── ProductsPage.jsx
│           ├── ProductDetailPage.jsx
│           ├── CartPage.jsx
│           ├── CheckoutPage.jsx
│           ├── OrdersPage.jsx
│           ├── OrderDetailPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           ├── ProfilePage.jsx
│           └── NotFoundPage.jsx
│
├── backend/                         # Express.js REST API
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── API-DOCUMENTATION.md
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js          # MySQL connection pool
│       ├── middleware/
│       │   ├── auth.js              # JWT authentication
│       │   ├── errorHandler.js
│       │   └── validate.js          # Request validation
│       ├── models/
│       │   ├── userModel.js
│       │   ├── productModel.js
│       │   ├── categoryModel.js
│       │   ├── cartModel.js
│       │   ├── orderModel.js
│       │   ├── orderStatusModel.js
│       │   └── reviewModel.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── productController.js
│       │   ├── categoryController.js
│       │   ├── cartController.js
│       │   ├── orderController.js
│       │   └── reviewController.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── productRoutes.js
│       │   ├── categoryRoutes.js
│       │   ├── cartRoutes.js
│       │   ├── orderRoutes.js
│       │   └── reviewRoutes.js
│       ├── validators/
│       │   ├── authValidator.js
│       │   ├── productValidator.js
│       │   ├── cartValidator.js
│       │   ├── orderValidator.js
│       │   └── reviewValidator.js
│       └── utils/
│           └── helpers.js
│
├── database/                        # MySQL schema & seed data
│   ├── schema.sql                   # Database DDL (7 tables)
│   ├── seed-data.sql                # Sample data
│   └── queries.sql                  # Utility queries
│
├── playwright-automation/           # Playwright test framework
│   ├── package.json
│   ├── playwright.config.js
│   ├── framework-architecture.md
│   ├── config/
│   │   └── env.config.js
│   ├── fixtures/
│   │   ├── test-data.json
│   │   └── users.json
│   ├── pages/                       # Page Object Model classes
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProductsPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── OrdersPage.js
│   │   └── OrderDetailPage.js
│   ├── tests/                       # Test spec files (88 scripts)
│   │   ├── registration.spec.js
│   │   ├── login.spec.js
│   │   ├── product-browsing.spec.js
│   │   ├── product-detail.spec.js
│   │   ├── search-filter.spec.js
│   │   ├── shopping-cart.spec.js
│   │   ├── checkout.spec.js
│   │   ├── order-tracking.spec.js
│   │   └── reviews.spec.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── screenshot-helper.js
│   │   └── test-data-helper.js
│   └── reports/
│
├── sql-validation/                  # Database validation queries
│   ├── crud-validation.sql          # CRUD operation tests
│   ├── join-queries.sql             # Multi-table JOIN queries
│   ├── data-integrity-queries.sql   # Constraint & integrity checks
│   └── ui-db-validation.sql         # UI vs DB comparisons
│
├── test-documents/                  # QE documentation
│   ├── phase1-test-planning/
│   │   ├── test-strategy.md
│   │   └── test-plan.md
│   ├── phase2-test-design/
│   │   ├── test-scenarios.md
│   │   ├── test-cases-registration-login.md
│   │   ├── test-cases-product-browsing.md
│   │   ├── test-cases-product-detail.md
│   │   ├── test-cases-search-filter.md
│   │   ├── test-cases-shopping-cart.md
│   │   ├── test-cases-checkout-payment.md
│   │   ├── test-cases-order-tracking.md
│   │   ├── test-cases-ratings-reviews.md
│   │   └── test-data-sheet.md
│   ├── phase3-manual-testing/
│   │   ├── test-execution-report.md
│   │   └── defect-report.md
│   └── phase4-reporting/
│       ├── test-summary-report.md
│       └── test-metrics-dashboard.md
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure the following are installed:

| Requirement       | Version   | Download                                      |
|-------------------|-----------|-----------------------------------------------|
| **Node.js**       | v18+      | [nodejs.org](https://nodejs.org/)             |
| **npm**           | v9+       | Included with Node.js                         |
| **MySQL**         | 8.0       | [mysql.com](https://dev.mysql.com/downloads/) |
| **Chrome**        | Latest    | [google.com/chrome](https://www.google.com/chrome/) |
| **Git** (optional)| Latest   | [git-scm.com](https://git-scm.com/)          |

---

## Setup Instructions

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd Capstone-Shopping
```

### 2. Database Setup

Create the database schema and load seed data:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p capstone_shopping < database/seed-data.sql
```

This creates the `capstone_shopping` database with 7 tables and populates them with sample data.

### 3. Backend Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=capstone_shopping
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`.

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Playwright Automation Setup

```bash
cd playwright-automation
npm install
npx playwright install
```

Run the test suite:

```bash
npm test
```

---

## Application Features

| # | Module                  | Description                                                                                       |
|---|-------------------------|---------------------------------------------------------------------------------------------------|
| 1 | **User Registration**   | New user sign-up with form validation (name, email, password, phone, address)                    |
| 2 | **Login/Authentication**| Secure login with JWT tokens, protected routes, and session management                           |
| 3 | **Product Browsing**    | Browse product catalog with grid layout, category navigation, and pagination                     |
| 4 | **Product Detail**      | View full product information including images, pricing, stock status, and customer reviews       |
| 5 | **Search & Filter**     | Search by keyword, filter by category/price/brand/rating, and sort by multiple criteria          |
| 6 | **Shopping Cart**       | Add/remove items, update quantities, view running total, and persistent cart per user             |
| 7 | **Checkout & Payment**  | Shipping address entry, payment method selection (credit/debit/UPI/COD), and order placement     |
| 8 | **Order Tracking**      | View order history, track order status lifecycle (placed → confirmed → shipped → delivered)       |
| 9 | **Ratings & Reviews**   | Submit product reviews with 1-5 star ratings, view verified purchase badges                      |

---

## API Endpoints

**Base URL:** `http://localhost:5000/api`

### Authentication

| Method | Endpoint             | Auth | Description                |
|--------|----------------------|------|----------------------------|
| POST   | `/api/auth/register` | No   | Register a new user        |
| POST   | `/api/auth/login`    | No   | Login and receive JWT      |
| GET    | `/api/auth/profile`  | Yes  | Get current user profile   |
| PUT    | `/api/auth/profile`  | Yes  | Update user profile        |

### Products

| Method | Endpoint              | Auth      | Description                        |
|--------|-----------------------|-----------|------------------------------------|
| GET    | `/api/products`       | No        | List products (filter/sort/page)   |
| GET    | `/api/products/:id`   | No        | Get single product details         |
| POST   | `/api/products`       | Admin     | Create a new product               |
| PUT    | `/api/products/:id`   | Admin     | Update a product                   |
| DELETE | `/api/products/:id`   | Admin     | Delete a product                   |

### Categories

| Method | Endpoint              | Auth      | Description                |
|--------|-----------------------|-----------|----------------------------|
| GET    | `/api/categories`     | No        | List all categories        |
| GET    | `/api/categories/:id` | No        | Get category with products |
| POST   | `/api/categories`     | Admin     | Create a category          |

### Cart

| Method | Endpoint              | Auth | Description                    |
|--------|-----------------------|------|--------------------------------|
| GET    | `/api/cart`           | Yes  | Get user's cart                |
| POST   | `/api/cart`           | Yes  | Add item to cart               |
| PUT    | `/api/cart/:id`       | Yes  | Update cart item quantity      |
| DELETE | `/api/cart/:id`       | Yes  | Remove item from cart          |
| DELETE | `/api/cart`           | Yes  | Clear entire cart              |

### Orders

| Method | Endpoint                     | Auth  | Description                   |
|--------|------------------------------|-------|-------------------------------|
| POST   | `/api/orders`                | Yes   | Place a new order             |
| GET    | `/api/orders`                | Yes   | Get user's order history      |
| GET    | `/api/orders/:id`            | Yes   | Get order details             |
| PUT    | `/api/orders/:id/status`     | Admin | Update order status           |
| PUT    | `/api/orders/:id/cancel`     | Yes   | Cancel an order               |

### Reviews

| Method | Endpoint                        | Auth  | Description                |
|--------|---------------------------------|-------|----------------------------|
| GET    | `/api/products/:id/reviews`     | No    | Get reviews for a product  |
| POST   | `/api/products/:id/reviews`     | Yes   | Submit a review            |
| PUT    | `/api/reviews/:id`              | Yes   | Update own review          |
| DELETE | `/api/reviews/:id`              | Yes   | Delete own review          |

> Full API documentation with request/response examples is available at `backend/API-DOCUMENTATION.md`.

---

## Database Schema

The `capstone_shopping` database contains 7 normalized tables:

```
┌──────────────┐       ┌──────────────────┐
│   users      │       │   categories     │
│──────────────│       │──────────────────│
│ id (PK)      │       │ id (PK)          │
│ first_name   │       │ name (UNIQUE)    │
│ last_name    │       │ description      │
│ email (UQ)   │       │ image_url        │
│ password_hash│       │ is_active        │
│ phone        │       └────────┬─────────┘
│ address_*    │                │
│ role         │                │ 1:N
│ is_active    │       ┌────────┴─────────┐
└──────┬───────┘       │    products      │
       │               │──────────────────│
       │               │ id (PK)          │
       │ 1:N           │ category_id (FK) │
       │               │ name             │
       ├───────────┐   │ price            │
       │           │   │ sku (UNIQUE)     │
       │           │   │ stock_quantity   │
┌──────┴───────┐   │   │ brand            │
│    cart      │   │   └──────┬───────────┘
│──────────────│   │          │
│ id (PK)      │   │          │ 1:N
│ user_id (FK) │   │   ┌──────┴───────────┐
│ product_id(FK)│   │   │    reviews       │
│ quantity     │   │   │──────────────────│
│ (UQ: user+   │   │   │ id (PK)          │
│  product)    │   │   │ user_id (FK)     │
└──────────────┘   │   │ product_id (FK)  │
                   │   │ rating (1-5)     │
       ┌───────────┘   │ title            │
       │               │ comment          │
       │               └──────────────────┘
┌──────┴───────┐
│   orders     │       ┌──────────────────┐
│──────────────│       │  order_items     │
│ id (PK)      │ 1:N   │──────────────────│
│ user_id (FK) │──────>│ id (PK)          │
│ total_amount │       │ order_id (FK)    │
│ shipping_*   │       │ product_id (FK)  │
│ payment_*    │       │ quantity         │
│ order_notes  │       │ price_at_purchase│
└──────┬───────┘       └──────────────────┘
       │
       │ 1:N
┌──────┴───────────┐
│  order_status    │
│──────────────────│
│ id (PK)          │
│ order_id (FK)    │
│ status (ENUM)    │
│ notes            │
└──────────────────┘
```

**Key Relationships:**
- `users` → `cart` (1:N) — Each user has their own cart items
- `users` → `orders` (1:N) — Each user can place multiple orders
- `users` → `reviews` (1:N) — Each user can write reviews (one per product)
- `categories` → `products` (1:N) — Products belong to a category
- `products` → `reviews` (1:N) — Products can have multiple reviews
- `orders` → `order_items` (1:N) — Each order contains line items
- `orders` → `order_status` (1:N) — Order lifecycle tracking

---

## Quality Engineering

This project includes a complete QE lifecycle with the following deliverables:

### Phase 1: Test Planning

| Document                | Path                                              | Description                              |
|-------------------------|---------------------------------------------------|------------------------------------------|
| Test Strategy           | `test-documents/phase1-test-planning/test-strategy.md` | Approach, scope, tools, environments |
| Test Plan               | `test-documents/phase1-test-planning/test-plan.md`     | Schedule, resources, entry/exit criteria |

### Phase 2: Test Design

| Document                | Path                                              | Description                              |
|-------------------------|---------------------------------------------------|------------------------------------------|
| Test Scenarios          | `test-documents/phase2-test-design/test-scenarios.md`  | 168 test scenarios across all modules |
| Test Cases (8 files)    | `test-documents/phase2-test-design/test-cases-*.md`    | 152 detailed test cases, 15+ per module |
| Test Data Sheet         | `test-documents/phase2-test-design/test-data-sheet.md` | Valid, invalid, and boundary test data |

### Phase 3: Test Execution

| Document                | Path                                              | Description                              |
|-------------------------|---------------------------------------------------|------------------------------------------|
| Execution Report        | `test-documents/phase3-manual-testing/test-execution-report.md` | Results for all 148 executed TCs |
| Defect Report           | `test-documents/phase3-manual-testing/defect-report.md`         | 14 defects with severity & status |

### Phase 4: Reporting

| Document                | Path                                              | Description                              |
|-------------------------|---------------------------------------------------|------------------------------------------|
| Test Summary Report     | `test-documents/phase4-reporting/test-summary-report.md`   | Final summary with metrics & sign-off |
| Metrics Dashboard       | `test-documents/phase4-reporting/test-metrics-dashboard.md`| Visual KPI dashboard                  |

### Automation & SQL Validation

| Document                | Path                                              | Description                              |
|-------------------------|---------------------------------------------------|------------------------------------------|
| Playwright Tests        | `playwright-automation/tests/*.spec.js`           | 88 automated test scripts (POM pattern)  |
| Framework Architecture  | `playwright-automation/framework-architecture.md` | Automation design documentation          |
| CRUD Validation         | `sql-validation/crud-validation.sql`              | 32 CRUD operation queries                |
| JOIN Queries            | `sql-validation/join-queries.sql`                 | 10 multi-table join validations          |
| UI-DB Validation        | `sql-validation/ui-db-validation.sql`             | 30 UI vs database comparisons            |
| Data Integrity          | `sql-validation/data-integrity-queries.sql`       | 10 constraint & integrity checks         |

---

## Running Tests

### Manual Testing

Follow the test cases documented in `test-documents/phase2-test-design/`. Each file contains step-by-step instructions with expected results.

### Automated Testing (Playwright)

```bash
cd playwright-automation
npm test                    # Run all tests
npx playwright test --ui    # Run with Playwright UI
npx playwright show-report  # View HTML report
```

### Database Validation

Run the SQL validation queries against your MySQL instance:

```bash
mysql -u root -p capstone_shopping < sql-validation/crud-validation.sql
mysql -u root -p capstone_shopping < sql-validation/join-queries.sql
mysql -u root -p capstone_shopping < sql-validation/data-integrity-queries.sql
mysql -u root -p capstone_shopping < sql-validation/ui-db-validation.sql
```

---

## Screenshots

> Screenshots of the running application can be added here.

| Screen              | Description                          |
|---------------------|--------------------------------------|
| Home Page           | Landing page with featured products  |
| Product Catalog     | Browse all products with filters     |
| Product Detail      | Single product with reviews          |
| Shopping Cart       | Cart with item management            |
| Checkout            | Shipping & payment form              |
| Order Tracking      | Order status timeline                |
| Login / Register    | Authentication pages                 |

---

## Constraints

This project was built within the following scope constraints:

- **Web application only** — No mobile app or desktop client
- **Chrome browser only** — Testing limited to Chromium-based browsers
- **No performance testing** — Load and stress testing are out of scope
- **No security testing** — Penetration testing and vulnerability scanning not included
- **No API-level testing** — Testing focuses on UI functional flows
- **No CI/CD pipeline** — Automation is run locally, not integrated into a build pipeline
- **Single environment** — Development/test environment only; no staging or production

---

## Author

**Yusuf Shekh**

Capstone Project — Full Stack E-Commerce with Quality Engineering

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Yusuf Shekh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
