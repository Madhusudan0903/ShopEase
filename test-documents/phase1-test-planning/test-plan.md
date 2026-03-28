# Test Plan Document

## ShopEase — E-Commerce Shopping Platform

---

## 1. Document Information

| Field               | Details                                      |
|---------------------|----------------------------------------------|
| **Project Name**    | ShopEase — E-Commerce Shopping Platform       |
| **Document Title**  | Test Plan Document                            |
| **Version**         | 1.0                                           |
| **Prepared By**     | Yusuf Shekh (QA Lead)                         |
| **Date**            | March 28, 2026                                |
| **Reviewed By**     | Project Manager / Tech Lead                   |
| **Approved By**     | QA Manager / Delivery Manager                 |
| **Reference**       | ShopEase Test Strategy Document v1.0          |
| **Status**          | Draft                                         |

### Revision History

| Version | Date           | Author       | Description                      |
|---------|----------------|--------------|----------------------------------|
| 0.1     | March 28, 2026 | Yusuf Shekh  | Initial draft                     |
| 1.0     | March 28, 2026 | Yusuf Shekh  | Reviewed and finalized            |

---

## 2. Introduction

### 2.1 Purpose

This Test Plan document provides a detailed blueprint for the testing activities of the **ShopEase** e-commerce web application. It defines the scope, approach, schedule, resources, test data requirements, and criteria for testing all 8 modules of the application. This document translates the high-level Test Strategy into actionable, module-specific testing plans.

### 2.2 Objectives

1. Define a clear, module-by-module testing approach with specific functional areas, test techniques, and case counts.
2. Establish a realistic test schedule aligned with the project development timeline.
3. Specify test data requirements ensuring comprehensive coverage of positive, negative, and boundary scenarios.
4. Define measurable entry and exit criteria for each testing phase.
5. Outline resource allocation, roles, communication protocols, and escalation paths.
6. Provide suspension and resumption criteria to handle blocking situations.
7. Ensure traceability from requirements to test cases to defects.

### 2.3 Project Overview

ShopEase is a full-stack e-commerce web application designed to simulate the user experience of platforms like Myntra and Flipkart. It provides a complete online shopping workflow including user account management, product discovery, cart management, checkout, order tracking, and customer feedback.

**Tech Stack:**

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React.js 18.x (Vite)       |
| Backend    | Node.js 18.x + Express 4.x |
| Database   | MySQL 8.0                   |
| Automation | Playwright (JavaScript)     |

---

## 3. Test Scope

### 3.1 Modules in Scope — Detailed Breakdown

#### Module 1: User Registration & Login

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | New user registration, login with valid credentials, logout, session persistence, "Remember Me" functionality, form field validations, duplicate email check, password strength indicator |
| **Will Test**      | Positive registration flow, login/logout cycle, input validation (email format, password rules, required fields), error messages for invalid inputs, session timeout behavior, database record creation |
| **Will NOT Test**  | OAuth/social login (Google, Facebook), two-factor authentication, forgot password via email (if not implemented) |

#### Module 2: Product Browsing & Search

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Homepage product grid/list display, category-based navigation, product card rendering (image, name, price, rating), pagination or infinite scroll, sorting options (price, popularity, newest) |
| **Will Test**      | Product listing loads correctly, category navigation works, product cards display complete information, sorting changes order correctly, empty state handling, database query returns correct products |
| **Will NOT Test**  | Personalized product recommendations, AI-based product suggestions |

#### Module 3: Product Detail View

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Product detail page display, product images (gallery/carousel), product name, description, price, size/color selectors, availability status, "Add to Cart" button, breadcrumb navigation |
| **Will Test**      | All product details render correctly, image gallery navigation, size/color selection updates, add-to-cart from detail page, unavailable product handling, database product record accuracy |
| **Will NOT Test**  | 360-degree product views, video content on product pages, AR try-on |

#### Module 4: Search & Filtering

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Search bar functionality, search suggestions/autocomplete, filter by category, filter by price range, filter by brand, filter by rating, filter by size, multiple filter combination, clear/reset filters |
| **Will Test**      | Search returns relevant results, filters narrow down products correctly, multiple filters work in combination, no-results state displays properly, filter counts update dynamically, search with special characters handled |
| **Will NOT Test**  | Voice search, image-based search, AI-powered search ranking |

#### Module 5: Shopping Cart

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Add item to cart, remove item from cart, update item quantity, cart item count badge, cart total calculation, cart persistence across sessions, empty cart state, proceed to checkout button |
| **Will Test**      | Items add/remove correctly, quantity updates reflect in total, cart persists after page refresh, price calculations are accurate, maximum quantity limits, cart-to-database synchronization |
| **Will NOT Test**  | Wishlist/save for later, cart sharing functionality |

#### Module 6: Checkout & Payment

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Shipping address form, address validation, payment method selection (COD, card mock), order summary display, place order functionality, order confirmation page, order confirmation details |
| **Will Test**      | Address form validation, payment method selection works, order total matches cart total, order placed successfully, order record created in database, confirmation page displays correct details, empty cart after order |
| **Will NOT Test**  | Live payment gateway integration, real credit card processing, coupon/promo codes (if not implemented) |

#### Module 7: Order Tracking

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Order history list, order detail view, order status display (Placed, Confirmed, Shipped, Delivered), order date and timestamps, order items and quantities |
| **Will Test**      | Order history shows all past orders, order details are accurate, status transitions display correctly, order data matches database records, empty order history for new users |
| **Will NOT Test**  | Real-time shipment tracking with carrier API, delivery notifications, estimated delivery date calculation |

#### Module 8: Ratings & Reviews

| Aspect             | Details                                                                   |
|--------------------|---------------------------------------------------------------------------|
| **Features to Test** | Submit star rating (1–5), write text review, view average rating on product page, view individual reviews list, rating/review validation, edit/delete own review |
| **Will Test**      | Rating submission saves correctly, review text saves and displays, average rating calculates correctly, reviews display in correct order, validation for empty/invalid ratings, database record accuracy |
| **Will NOT Test**  | Image/video upload in reviews, review moderation/admin panel, review helpfulness voting |

### 3.2 Testing Types in Scope

- Functional Testing
- UI/UX Testing
- Database Validation Testing
- Negative / Error Handling Testing
- Boundary Value Testing
- Smoke Testing
- Sanity Testing
- Regression Testing
- End-to-End Automation (Playwright)

### 3.3 Out of Scope

- Performance / Load Testing
- Security / Penetration Testing
- Standalone API Testing
- Mobile App Testing
- Accessibility (WCAG) Testing
- Localization Testing

---

## 4. Test Schedule

### 4.1 Sprint-wise Breakdown

| Sprint / Week | Duration             | Activities                                                      | Modules Covered                          |
|---------------|----------------------|-----------------------------------------------------------------|------------------------------------------|
| **Week 1**    | Day 1 – Day 5       | Test planning, test strategy finalization, environment setup     | All (planning)                           |
| **Week 2**    | Day 6 – Day 10      | Test case design — Modules 1, 2, 3                               | Registration & Login, Browsing, Product Detail |
| **Week 3**    | Day 11 – Day 15     | Test case design — Modules 4, 5, 6                               | Search & Filtering, Cart, Checkout       |
| **Week 4**    | Day 16 – Day 20     | Test case design — Modules 7, 8; Test data preparation           | Order Tracking, Ratings & Reviews        |
| **Week 5**    | Day 21 – Day 25     | Test Execution Cycle 1 — Modules 1, 2, 3, 4                     | Registration, Browsing, Detail, Search   |
| **Week 6**    | Day 26 – Day 30     | Test Execution Cycle 1 — Modules 5, 6, 7, 8                     | Cart, Checkout, Order Tracking, Reviews  |
| **Week 7**    | Day 31 – Day 35     | Defect retesting, Test Execution Cycle 2, Automation development | All modules                              |
| **Week 8**    | Day 36 – Day 40     | Regression testing, automation execution, test closure           | All modules                              |

### 4.2 Key Milestones

| Milestone                          | Target Date      | Status  |
|------------------------------------|------------------|---------|
| Test Strategy & Plan approved       | End of Week 1    | Pending |
| Test case design complete           | End of Week 4    | Pending |
| Test environment verified           | End of Week 1    | Pending |
| Test Execution Cycle 1 complete     | End of Week 6    | Pending |
| Automation scripts ready            | End of Week 7    | Pending |
| Test Execution Cycle 2 complete     | Mid Week 8       | Pending |
| Regression testing complete         | End of Week 8    | Pending |
| Test Summary Report delivered       | End of Week 8    | Pending |

---

## 5. Test Approach per Module

### 5.1 Module 1: User Registration & Login

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Registration form, login form, logout, session management, field validations, error handling |
| **Test Techniques**     | Equivalence Partitioning (valid/invalid email formats, password strengths), Boundary Value Analysis (min/max field lengths), Decision Table (login combinations: valid/invalid email × valid/invalid password), State Transition (logged-out → logged-in → session-expired → logged-out) |
| **Planned Test Cases**  | **18** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 5     | Successful registration, successful login, successful logout, session persistence, remember me |
| Negative Functional| 5     | Invalid email format, wrong password, empty fields, duplicate email, SQL injection attempt |
| Boundary Value     | 4     | Min username length, max username length, min password (8 chars), max password (50 chars) |
| UI/UX Validation   | 2     | Form layout, error message styling, password visibility toggle    |
| Database Validation| 2     | User record created in DB, password hashed in DB                  |

---

### 5.2 Module 2: Product Browsing & Search

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Product listing page, category navigation, product cards, pagination, sorting |
| **Test Techniques**     | Equivalence Partitioning (product categories, sorting options), Boundary Value Analysis (pagination limits — first page, last page, page 0), Decision Table (sort by × category filter combinations) |
| **Planned Test Cases**  | **15** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 5     | Products load on homepage, category filter works, sort by price ascending, sort by newest, pagination navigates correctly |
| Negative Functional| 3     | Invalid category URL, accessing page beyond max, empty category   |
| Boundary Value     | 3     | First page products, last page products, single product category  |
| UI/UX Validation   | 2     | Product card layout, responsive grid on resize                    |
| Database Validation| 2     | Product count matches DB, category products match DB query        |

---

### 5.3 Module 3: Product Detail View

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Product information display, image gallery, size/color selection, add to cart, breadcrumb |
| **Test Techniques**     | Equivalence Partitioning (product types — with/without variants), Decision Table (size selected × color selected × add-to-cart), State Transition (no selection → size selected → color selected → add-to-cart enabled) |
| **Planned Test Cases**  | **15** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 5     | Product details display correctly, image gallery navigates, size selection works, add to cart from detail page, breadcrumb navigation |
| Negative Functional| 3     | Invalid product ID URL, out-of-stock product handling, add to cart without selecting size |
| Boundary Value     | 2     | Product with single image, product with maximum images            |
| UI/UX Validation   | 3     | Image zoom/carousel, price formatting, layout consistency         |
| Database Validation| 2     | Product details match DB record, variant options match DB         |

---

### 5.4 Module 4: Search & Filtering

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Search bar, autocomplete, price filter, brand filter, rating filter, category filter, multi-filter, clear filters |
| **Test Techniques**     | Equivalence Partitioning (search terms — exact match, partial match, no match, special characters), Boundary Value Analysis (price range min/max, rating 1–5 boundaries), Decision Table (filter combination matrix) |
| **Planned Test Cases**  | **18** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 6     | Exact search returns results, partial search works, price filter narrows results, brand filter works, multiple filters combine, clear filters resets |
| Negative Functional| 4     | Search with no results, special character search, empty search submission, invalid price range |
| Boundary Value     | 4     | Price range min (0), price range max, rating = 1, rating = 5     |
| UI/UX Validation   | 2     | Filter panel layout, search suggestions dropdown styling          |
| Database Validation| 2     | Filtered results match DB query, search results match DB LIKE query |

---

### 5.5 Module 5: Shopping Cart

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Add to cart, remove from cart, quantity update, price calculation, cart badge, cart persistence, empty cart, proceed to checkout |
| **Test Techniques**     | Equivalence Partitioning (quantity values — valid range, zero, negative, string), Boundary Value Analysis (quantity min = 1, max limit, total price bounds), State Transition (empty cart → items added → quantity updated → item removed → empty cart), Decision Table (add item × quantity × variant combinations) |
| **Planned Test Cases**  | **18** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 6     | Add single item, add multiple items, update quantity, remove item, cart total updates, proceed to checkout |
| Negative Functional| 4     | Add quantity 0, add negative quantity, remove non-existent item, add beyond stock limit |
| Boundary Value     | 3     | Quantity = 1 (min), quantity = max allowed, add same item twice   |
| UI/UX Validation   | 2     | Cart badge count, empty cart message and UI                       |
| Database Validation| 3     | Cart items saved in DB, quantity update reflects in DB, removal deletes DB record |

---

### 5.6 Module 6: Checkout & Payment

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Address form, address validation, payment method selection, order summary, place order, order confirmation |
| **Test Techniques**     | Equivalence Partitioning (address fields — valid/invalid formats, payment methods), Boundary Value Analysis (address field lengths, phone number lengths, pin code boundaries), Decision Table (payment method × address valid × cart non-empty → order success/failure), State Transition (cart → address → payment → confirmation) |
| **Planned Test Cases**  | **20** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 6     | Complete checkout with COD, complete checkout with card mock, address saved, order summary matches cart, order confirmation displayed, cart emptied after order |
| Negative Functional| 5     | Empty address fields, invalid phone number, checkout with empty cart, invalid pin code, payment failure simulation |
| Boundary Value     | 3     | Phone number min/max digits, pin code boundaries, address line max length |
| UI/UX Validation   | 3     | Checkout stepper UI, payment form layout, confirmation page design |
| Database Validation| 3     | Order record created in DB, order items stored, payment record saved |

---

### 5.7 Module 7: Order Tracking

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Order history list, order detail view, order status display, order timestamps |
| **Test Techniques**     | Equivalence Partitioning (orders with different statuses), State Transition (Placed → Confirmed → Shipped → Delivered), Boundary Value Analysis (user with 0 orders, user with many orders) |
| **Planned Test Cases**  | **15** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 5     | Order history displays all orders, order detail shows items, status shows correctly, most recent order first, click order navigates to detail |
| Negative Functional| 3     | Access other user's order, invalid order ID in URL, order history when not logged in |
| Boundary Value     | 2     | New user with 0 orders, user with maximum orders                  |
| UI/UX Validation   | 3     | Order status timeline UI, order card layout, responsive design    |
| Database Validation| 2     | Order list matches DB records, order status matches DB            |

---

### 5.8 Module 8: Ratings & Reviews

| Attribute               | Details                                                            |
|-------------------------|--------------------------------------------------------------------|
| **Functional Areas**    | Star rating submission, text review, average rating display, reviews list, review validation |
| **Test Techniques**     | Equivalence Partitioning (rating values 1–5, review text lengths), Boundary Value Analysis (rating = 0, 1, 5, 6; review text min/max length), Decision Table (rating provided × review text provided → submission success/failure) |
| **Planned Test Cases**  | **16** |

**Test Case Distribution:**

| Category           | Count | Examples                                                         |
|--------------------|:-----:|------------------------------------------------------------------|
| Positive Functional| 5     | Submit rating with review, submit rating without review, view average rating, view reviews list, edit own review |
| Negative Functional| 4     | Submit without rating, submit review for unpurchased product, rating = 0, review with only whitespace |
| Boundary Value     | 3     | Rating = 1 (min), rating = 5 (max), review text at max length    |
| UI/UX Validation   | 2     | Star rating component interaction, review display formatting      |
| Database Validation| 2     | Rating saved in DB, average recalculated correctly in DB          |

---

### 5.9 Test Case Summary

| Module                       | Planned Test Cases |
|------------------------------|:------------------:|
| User Registration & Login    | 18                 |
| Product Browsing & Search    | 15                 |
| Product Detail View          | 15                 |
| Search & Filtering           | 18                 |
| Shopping Cart                | 18                 |
| Checkout & Payment           | 20                 |
| Order Tracking               | 15                 |
| Ratings & Reviews            | 16                 |
| **Grand Total**              | **135**            |

---

## 6. Resource Allocation

| Resource            | Role               | Allocation | Responsibilities                                           |
|---------------------|--------------------|-----------:|-------------------------------------------------------------|
| Yusuf Shekh         | QA Lead            | 100%       | Test planning, test case review, defect triage, reporting   |
| QA Engineer 1       | Manual Tester      | 100%       | Test case design & execution — Modules 1, 2, 3, 4          |
| QA Engineer 2       | Manual Tester      | 100%       | Test case design & execution — Modules 5, 6, 7, 8          |
| Automation Engineer | Automation Tester  | 80%        | Playwright script development, regression suite maintenance |
| Developer 1         | Frontend Dev       | 20%        | Bug fixes, environment support, unit test support           |
| Developer 2         | Backend Dev        | 20%        | Bug fixes, DB support, API debugging assistance             |

---

## 7. Test Environment Setup Instructions

### 7.1 Prerequisites

1. **Node.js** — Install Node.js 18.x LTS from [https://nodejs.org](https://nodejs.org)
2. **MySQL** — Install MySQL 8.0 from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
3. **Git** — Install Git from [https://git-scm.com](https://git-scm.com)
4. **VS Code** — Install from [https://code.visualstudio.com](https://code.visualstudio.com)
5. **Chrome** — Ensure latest stable version of Google Chrome is installed

### 7.2 Application Setup

```
Step 1: Clone the repository
    git clone <repository-url>
    cd Capstone-Shopping

Step 2: Install frontend dependencies
    cd frontend
    npm install

Step 3: Install backend dependencies
    cd ../backend
    npm install

Step 4: Configure the database
    - Open MySQL Workbench
    - Create database: CREATE DATABASE shopease_db;
    - Import schema: source db/schema.sql;
    - Seed test data: source db/seed.sql;

Step 5: Configure environment variables
    - Copy .env.example to .env in the backend folder
    - Set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT

Step 6: Start the backend server
    cd backend
    npm start
    (Server runs on http://localhost:3000)

Step 7: Start the frontend application
    cd frontend
    npm run dev
    (App runs on http://localhost:5173)
```

### 7.3 Automation Setup

```
Step 1: Navigate to test automation directory
    cd test-automation

Step 2: Install Playwright
    npm init playwright@latest

Step 3: Install browsers
    npx playwright install

Step 4: Verify installation
    npx playwright test --ui
```

### 7.4 Environment Verification Checklist

- [ ] Frontend loads at `http://localhost:5173` without errors
- [ ] Backend API responds at `http://localhost:3000`
- [ ] MySQL database is accessible and seeded with test data
- [ ] Playwright browsers are installed and test runner launches
- [ ] Chrome DevTools can inspect the running application
- [ ] MySQL Workbench can connect and query the database

---

## 8. Test Data Requirements

### 8.1 Module-wise Test Data

#### Module 1: User Registration & Login

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Valid User           | `testuser1@gmail.com` / `Test@1234`, Full Name: "Test User One"            |
| Invalid Email        | `testuser`, `test@`, `@gmail.com`, `test user@gmail.com`                   |
| Invalid Password     | `123`, `abcdefgh` (no special char), `TEST@1234` (no lowercase)            |
| Boundary Data        | Username: 3 chars (min), 50 chars (max); Password: 8 chars (min), 50 chars (max) |
| Duplicate User       | Pre-existing email `existing@gmail.com`                                     |
| SQL Injection        | `' OR '1'='1`, `admin'--`, `'; DROP TABLE users;--`                         |

#### Module 2: Product Browsing & Search

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Product Categories   | Men, Women, Kids, Electronics, Footwear                                    |
| Sort Options         | Price: Low to High, Price: High to Low, Newest First, Popularity           |
| Products in DB       | Minimum 50 products across 5+ categories with images, prices, ratings      |
| Pagination Data      | 12 products per page; test with 50+ products for multiple pages            |

#### Module 3: Product Detail View

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Product with Variants| Product with sizes (S, M, L, XL) and colors (Red, Blue, Black)             |
| Product without Variants | Simple product with no size/color options                              |
| Out-of-Stock Product | Product with `stock_quantity = 0`                                          |
| Product Images       | Product with 1 image, product with 5 images                               |

#### Module 4: Search & Filtering

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Search Terms         | "shirt", "blue shoe", "Nike", "xyz123nonexistent"                          |
| Price Ranges         | ₹0–₹500, ₹500–₹1000, ₹1000–₹5000, ₹5000+                               |
| Brands               | Nike, Adidas, Puma, Levis, H&M                                            |
| Rating Values        | 1 star, 2 stars, 3 stars, 4 stars, 5 stars                                |
| Special Characters   | `<script>alert('xss')</script>`, `%`, `_`, `'`, `""`                       |

#### Module 5: Shopping Cart

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Quantities           | 1, 2, 5, 10 (valid); 0, -1, 999999 (invalid/boundary)                     |
| Cart Scenarios       | Empty cart, single item cart, multi-item cart (5+ items)                    |
| Price Data           | Items at ₹99, ₹999, ₹9999 for calculation verification                    |

#### Module 6: Checkout & Payment

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Valid Address        | "123 Main Street, Mumbai, Maharashtra, 400001"                             |
| Invalid Address      | Empty fields, pin code "00000", phone "123", address > 200 chars           |
| Payment Methods      | Cash on Delivery, Credit Card (mock: 4111111111111111)                     |
| Phone Numbers        | Valid: "9876543210"; Invalid: "123", "abcdefghij", "+91 12345"             |

#### Module 7: Order Tracking

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Order Statuses       | Placed, Confirmed, Shipped, Out for Delivery, Delivered, Cancelled         |
| User Scenarios       | User with 0 orders, user with 1 order, user with 10+ orders               |
| Order IDs            | Valid: "SE-ORD-001"; Invalid: "INVALID-ID", non-existent ID               |

#### Module 8: Ratings & Reviews

| Data Category        | Test Data Examples                                                         |
|----------------------|----------------------------------------------------------------------------|
| Rating Values        | 1, 2, 3, 4, 5 (valid); 0, 6, -1, 3.5 (invalid/boundary)                  |
| Review Text          | Valid: "Great product, highly recommend!" (20 chars+); Empty; Whitespace only; 1000+ chars (max boundary) |
| Review Scenarios     | First review on product, product with 50+ reviews                          |

### 8.2 Test Data Management

- **Data Seeding:** SQL scripts (`seed.sql`) to populate the database with initial test data before each test cycle.
- **Data Reset:** Script to truncate and reseed test data between test cycles to ensure a clean state.
- **Data Independence:** Each test case should specify its own preconditions and not depend on the execution order of other test cases.

---

## 9. Entry Criteria

Testing will commence **only when** ALL of the following conditions are met:

| #  | Entry Criterion                                                                    | Verified By     |
|----|------------------------------------------------------------------------------------|-----------------|
| 1  | Application build is deployed to the QA environment successfully                   | DevOps / Dev    |
| 2  | Smoke test passed on the deployed build (core flows are functional)                | QA Lead         |
| 3  | Test environment is stable and accessible (frontend, backend, database)             | QA Lead         |
| 4  | Test cases are designed, reviewed, and approved                                    | QA Lead / PM    |
| 5  | Test data is prepared and seeded in the database                                   | QA Engineer     |
| 6  | Requirements Traceability Matrix (RTM) is completed                                | QA Lead         |
| 7  | All necessary tools are installed and configured (Playwright, MySQL Workbench, etc.)| QA Engineer     |
| 8  | Access credentials for all environments and databases are available                | DevOps          |
| 9  | Known open defects from previous cycles are documented                              | QA Lead         |

---

## 10. Exit Criteria

Testing will be considered **complete** when ALL of the following conditions are met:

| #  | Exit Criterion                                                                       | Target          |
|----|--------------------------------------------------------------------------------------|-----------------|
| 1  | **Test case execution rate** — Percentage of planned test cases executed              | ≥ 95%           |
| 2  | **Test case pass rate** — Percentage of executed test cases that passed               | ≥ 90%           |
| 3  | **Critical defects open** — Number of Critical (S1) severity defects still unresolved | **0**           |
| 4  | **Major defects open** — Number of Major (S2) severity defects still unresolved       | ≤ 2             |
| 5  | **Regression test pass rate** — Automated regression suite pass rate                  | ≥ 95%           |
| 6  | **All high-priority (P1, P2) defects** resolved and retested                          | 100% closed     |
| 7  | **Test Summary Report** prepared and reviewed                                         | Delivered       |
| 8  | **RTM updated** with final execution status and defect mapping                        | Completed       |
| 9  | **Stakeholder sign-off** obtained on test completion                                  | Approved        |

---

## 11. Suspension and Resumption Criteria

### 11.1 Suspension Criteria

Testing will be **suspended** if any of the following conditions occur:

| # | Suspension Condition                                                               | Action Required                        |
|---|------------------------------------------------------------------------------------|----------------------------------------|
| 1 | **Critical defect blocks testing** — A S1/P1 defect prevents execution of 30%+ test cases | Pause execution; escalate to dev team |
| 2 | **Environment outage** — QA environment is down for more than 2 hours              | Pause execution; notify DevOps         |
| 3 | **Build instability** — Multiple crashes or data corruption issues in the build    | Pause execution; request new stable build |
| 4 | **Test data corruption** — Database is corrupted or test data is inconsistent      | Pause execution; reseed database       |
| 5 | **Requirement change** — Major requirement change invalidates 20%+ of test cases   | Pause execution; revise test cases     |

### 11.2 Resumption Criteria

Testing will **resume** when:

| # | Resumption Condition                                                              |
|---|-----------------------------------------------------------------------------------|
| 1 | Blocking defect is fixed and verified in a new build deployed to QA               |
| 2 | QA environment is restored, stable, and verified with a smoke test                |
| 3 | New stable build is deployed with the identified instabilities resolved           |
| 4 | Database is reseeded with clean, verified test data                               |
| 5 | Revised test cases are reviewed and approved for the updated requirements          |

---

## 12. Defect Management Process

### 12.1 Defect Workflow

```
Tester finds defect → Log in Jira/GitHub Issues → Assign to Dev → Dev fixes →
Deploy to QA → QA retests → Pass: Close defect / Fail: Reopen defect
```

### 12.2 Defect Logging Standards

Every defect must include:

1. **Defect ID** — Auto-generated (e.g., SE-DEF-001)
2. **Title** — Clear, concise summary of the issue
3. **Module** — Which of the 8 modules is affected
4. **Severity** — Critical / Major / Minor / Trivial
5. **Priority** — P1 / P2 / P3 / P4
6. **Environment** — Browser version, OS, environment URL
7. **Preconditions** — State required before reproducing
8. **Steps to Reproduce** — Numbered, detailed steps
9. **Expected Result** — What should happen per requirements
10. **Actual Result** — What actually happened
11. **Attachments** — Screenshots, screen recordings, console logs
12. **Reported By** — QA engineer name and date

### 12.3 Defect Triage

- **Frequency:** Daily during active test execution; every other day during test design phase.
- **Participants:** QA Lead, Dev Lead, Project Manager.
- **Agenda:** Review new defects, assign priority, reassign if needed, review aging defects, discuss blockers.

### 12.4 Severity-Priority Matrix

|                | P1 (Immediate) | P2 (High) | P3 (Medium) | P4 (Low)  |
|----------------|:---------------:|:---------:|:-----------:|:---------:|
| **S1 Critical**| Fix now         | Fix today | —           | —         |
| **S2 Major**   | Fix today       | This sprint| Next sprint | —        |
| **S3 Minor**   | —               | This sprint| Next sprint | Backlog  |
| **S4 Trivial** | —               | —         | Backlog     | Backlog   |

---

## 13. Communication Plan

### 13.1 Regular Communication

| Communication Type        | Frequency        | Participants                     | Medium          |
|---------------------------|------------------|----------------------------------|-----------------|
| Daily Standup             | Daily (15 min)   | QA Team, Dev Lead                | Teams / In-person |
| Defect Triage Meeting     | Daily (30 min)   | QA Lead, Dev Lead, PM            | Teams / Zoom     |
| Weekly Test Status Report | Weekly (Friday)  | QA Lead → PM, Stakeholders       | Email / Report   |
| Sprint Review / Demo      | End of sprint    | All team members + stakeholders  | Teams / In-person |
| Escalation                | As needed        | QA Lead → PM → Delivery Manager  | Email + Call     |

### 13.2 Status Reporting

Weekly status reports will include:

1. **Test execution progress** — Planned vs. executed vs. passed vs. failed
2. **Defect summary** — New, open, fixed, closed, reopened counts by severity
3. **Blocker / risk updates** — Current blocking issues and mitigation status
4. **Automation progress** — Scripts developed, executed, pass rate
5. **Schedule adherence** — On track / at risk / delayed with reasons
6. **Next week's plan** — Planned activities and focus areas

### 13.3 Escalation Path

```
Level 1: QA Engineer → QA Lead (within team)
Level 2: QA Lead → Project Manager (cross-team)
Level 3: Project Manager → Delivery Manager (management)
```

**Escalation Triggers:**
- Critical defect unresolved for > 4 hours
- Environment down for > 2 hours
- Test execution blocked for > 1 day
- Schedule slippage > 2 days

---

## 14. Assumptions and Dependencies

### 14.1 Assumptions

| # | Assumption                                                                                     |
|---|-----------------------------------------------------------------------------------------------|
| 1 | Requirements are finalized and approved before test case design begins                         |
| 2 | The development team will deliver builds to QA on schedule per the agreed sprint timeline       |
| 3 | The QA environment will be stable and available during test execution phases                    |
| 4 | Test data can be created and managed by the QA team without external dependencies               |
| 5 | All team members have the necessary access and permissions to the application and tools          |
| 6 | Defects will be triaged and prioritized within 24 hours of logging                              |
| 7 | Payment processing is simulated/mocked and does not involve real financial transactions          |
| 8 | The application will be tested on Chrome only; cross-browser testing is excluded from this phase |
| 9 | Unit testing is the responsibility of the development team                                      |
| 10| Automation will cover critical path and regression scenarios, not 100% of test cases             |

### 14.2 Dependencies

| # | Dependency                                                          | Dependent On       |
|---|---------------------------------------------------------------------|---------------------|
| 1 | Build availability in QA environment                                | Development Team    |
| 2 | Database schema and seed data scripts                               | Backend Developer   |
| 3 | API endpoints functional and documented                             | Backend Developer   |
| 4 | UI wireframes and design specifications                             | UI/UX Designer      |
| 5 | Environment infrastructure (server, database, network)              | DevOps / IT Support |
| 6 | Requirements clarification and change notifications                 | Business Analyst    |
| 7 | Defect fixes deployed to QA within agreed SLA                       | Development Team    |
| 8 | Stakeholder availability for test case review and sign-off          | Project Manager     |

---

## 15. Approval and Sign-off

This Test Plan is submitted for review and approval. Testing will commence upon receiving sign-off from all required approvers.

### Approval

| Role              | Name         | Signature | Date | Status   |
|-------------------|--------------|-----------|------|----------|
| QA Lead           | Yusuf Shekh  |           |      | Pending  |
| Project Manager   |              |           |      | Pending  |
| Tech Lead         |              |           |      | Pending  |
| Business Analyst  |              |           |      | Pending  |
| Delivery Manager  |              |           |      | Pending  |

### Sign-off Statement

> *By signing this document, the approver confirms that the Test Plan has been reviewed and is approved for execution. Any deviations from this plan must be communicated to and approved by the QA Lead and Project Manager.*

---

*This document is a living artifact and will be updated as the project evolves. All changes must go through the formal review and approval process. Version history will be maintained for traceability.*

---

**Document End — ShopEase Test Plan v1.0**
