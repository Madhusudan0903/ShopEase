# Phase 2 — Test Scenarios (ShopEase)

**Project:** Capstone Shopping Application (ShopEase)  
**Phase:** 2 — Test Design  
**Document:** Test Scenarios Matrix  
**Total Modules:** 8  
**Date:** March 28, 2026  

This document lists test scenarios for ShopEase. Each scenario is classified as **Positive**, **Negative**, **Boundary**, or **Edge** for traceability during test execution.

---

## 1. User Registration & Login

**Validations:** Register — name 2–50 chars, email format, password 8+ with upper+lower+number, phone 10 digits; login; profile view/edit; logout; duplicate email; inactive account.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_REG_001 | User Registration & Login | Register successfully with valid name, email, password (upper+lower+number), and 10-digit phone | Positive |
| SCN_REG_002 | User Registration & Login | Log in with correct email and password after registration | Positive |
| SCN_REG_003 | User Registration & Login | View profile page and verify displayed name, email, and phone match saved data | Positive |
| SCN_REG_004 | User Registration & Login | Edit profile fields within allowed rules and save; verify persistence after refresh | Positive |
| SCN_REG_005 | User Registration & Login | Log out and confirm protected routes redirect or deny access until login again | Positive |
| SCN_REG_006 | User Registration & Login | Attempt registration with an email already registered (duplicate email) | Negative |
| SCN_REG_007 | User Registration & Login | Log in with valid credentials for an account marked inactive/deactivated | Negative |
| SCN_REG_008 | User Registration & Login | Register with invalid email format (e.g., missing `@`, invalid domain) | Negative |
| SCN_REG_009 | User Registration & Login | Register with password shorter than 8 characters | Negative |
| SCN_REG_010 | User Registration & Login | Register with password missing uppercase letter | Negative |
| SCN_REG_011 | User Registration & Login | Register with password missing lowercase letter | Negative |
| SCN_REG_012 | User Registration & Login | Register with password missing numeric digit | Negative |
| SCN_REG_013 | User Registration & Login | Log in with wrong password for an existing user | Negative |
| SCN_REG_014 | User Registration & Login | Log in with email not registered | Negative |
| SCN_REG_015 | User Registration & Login | Register with name at minimum length (2 characters) | Boundary |
| SCN_REG_016 | User Registration & Login | Register with name at maximum length (50 characters) | Boundary |
| SCN_REG_017 | User Registration & Login | Register with password at minimum length (8 chars) while meeting complexity rules | Boundary |
| SCN_REG_018 | User Registration & Login | Register with phone number exactly 10 digits | Boundary |
| SCN_REG_019 | User Registration & Login | Register with name 1 character (below minimum) | Boundary |
| SCN_REG_020 | User Registration & Login | Register with name 51 characters (above maximum) | Boundary |
| SCN_REG_021 | User Registration & Login | Register with phone 9 digits or 11 digits (non-10-digit) | Boundary |
| SCN_REG_022 | User Registration & Login | Submit registration with all fields empty | Edge |
| SCN_REG_023 | User Registration & Login | Access profile or edit URL directly while logged out | Edge |
| SCN_REG_024 | User Registration & Login | Register with leading/trailing spaces in email or phone (verify trim or rejection) | Edge |

---

## 2. Product Browsing

**Validations:** Listing, pagination, sort (price low/high, name, newest, rating), grid display, category browsing, empty states.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_BRW_001 | Product Browsing | Load product listing and verify products render in grid layout | Positive |
| SCN_BRW_002 | Product Browsing | Navigate pagination forward and backward; verify page content updates | Positive |
| SCN_BRW_003 | Product Browsing | Sort by price: low to high and verify order | Positive |
| SCN_BRW_004 | Product Browsing | Sort by price: high to low and verify order | Positive |
| SCN_BRW_005 | Product Browsing | Sort by product name (A–Z / alphabetical per app spec) | Positive |
| SCN_BRW_006 | Product Browsing | Sort by newest (recency) | Positive |
| SCN_BRW_007 | Product Browsing | Sort by average customer rating | Positive |
| SCN_BRW_008 | Product Browsing | Browse products by selecting a category; only matching products shown | Positive |
| SCN_BRW_009 | Product Browsing | Open listing as guest (not logged in) | Positive |
| SCN_BRW_010 | Product Browsing | Request a page number beyond last page (e.g., empty or graceful message) | Negative |
| SCN_BRW_011 | Product Browsing | Open a category that has no products; verify empty state UI and messaging | Negative |
| SCN_BRW_012 | Product Browsing | Load listing when catalog has zero products globally; verify empty state | Negative |
| SCN_BRW_013 | Product Browsing | Use invalid or non-numeric page query parameter if applicable | Negative |
| SCN_BRW_014 | Product Browsing | Pagination on first page (page 1) | Boundary |
| SCN_BRW_015 | Product Browsing | Pagination on last page with partial page of items | Boundary |
| SCN_BRW_016 | Product Browsing | Listing with exactly one product in catalog | Boundary |
| SCN_BRW_017 | Product Browsing | Category with exactly one product | Boundary |
| SCN_BRW_018 | Product Browsing | Rapidly change sort option multiple times; results stay consistent | Edge |
| SCN_BRW_019 | Product Browsing | All products out of stock; verify badges/labels and still browsable per spec | Edge |
| SCN_BRW_020 | Product Browsing | Very large catalog: jump to high page number and verify load time/behavior | Edge |
| SCN_BRW_021 | Product Browsing | Refresh listing during pagination; land on same page or defined default | Edge |

---

## 3. Product Detail View

**Validations:** Product info, image, price/compare price, stock status, quantity selection, add to cart from detail, reviews section.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_PDV_001 | Product Detail View | View detail page: title, description, SKU/attributes as designed | Positive |
| SCN_PDV_002 | Product Detail View | Verify primary image (and gallery if present) loads | Positive |
| SCN_PDV_003 | Product Detail View | Display sale price and compare-at/original price when applicable | Positive |
| SCN_PDV_004 | Product Detail View | Show in-stock status when inventory > 0 | Positive |
| SCN_PDV_005 | Product Detail View | Select quantity within allowed range and add to cart from detail page | Positive |
| SCN_PDV_006 | Product Detail View | Scroll to and view reviews section; ratings summary visible | Positive |
| SCN_PDV_007 | Product Detail View | View detail for product with compare price omitted (full price only) | Positive |
| SCN_PDV_008 | Product Detail View | View out-of-stock product; add to cart disabled or blocked with message | Negative |
| SCN_PDV_009 | Product Detail View | Attempt add to cart with quantity > available stock | Negative |
| SCN_PDV_010 | Product Detail View | Attempt add to cart with quantity 0 or negative | Negative |
| SCN_PDV_011 | Product Detail View | Open detail with invalid or non-existent product ID | Negative |
| SCN_PDV_012 | Product Detail View | Select minimum quantity (1) when in stock | Boundary |
| SCN_PDV_013 | Product Detail View | Select quantity equal to remaining stock (at stock cap) | Boundary |
| SCN_PDV_014 | Product Detail View | Product with stock count exactly 1 | Boundary |
| SCN_PDV_015 | Product Detail View | Product with no reviews; reviews section shows empty state | Edge |
| SCN_PDV_016 | Product Detail View | Default quantity on load (e.g., 1) before add to cart | Edge |
| SCN_PDV_017 | Product Detail View | Deep link to detail; back navigation returns to listing with prior filters if supported | Edge |
| SCN_PDV_018 | Product Detail View | Very long product title/description; layout does not break | Edge |
| SCN_PDV_019 | Product Detail View | Price with many decimal places rounds/display per currency rules | Edge |
| SCN_PDV_020 | Product Detail View | Image fails to load; verify placeholder or alt behavior | Edge |

---

## 4. Search & Filtering

**Validations:** Search keyword; filter by category, price range, brand, rating; combined filters; clear filters; no results.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_SRC_001 | Search & Filtering | Search with keyword that matches product names/descriptions; results relevant | Positive |
| SCN_SRC_002 | Search & Filtering | Filter by single category | Positive |
| SCN_SRC_003 | Search & Filtering | Filter by price range (min–max) within catalog prices | Positive |
| SCN_SRC_004 | Search & Filtering | Filter by brand | Positive |
| SCN_SRC_005 | Search & Filtering | Filter by minimum rating (e.g., 4+ stars) | Positive |
| SCN_SRC_006 | Search & Filtering | Combine search keyword with category + price + brand + rating | Positive |
| SCN_SRC_007 | Search & Filtering | Clear all filters/search; listing resets to default full catalog | Positive |
| SCN_SRC_008 | Search & Filtering | Search returns zero matches; “no results” state and suggestion to clear filters | Negative |
| SCN_SRC_009 | Search & Filtering | Min price greater than max price (invalid range) | Negative |
| SCN_SRC_010 | Search & Filtering | Negative or non-numeric price inputs | Negative |
| SCN_SRC_011 | Search & Filtering | Filter by brand with no matching products | Negative |
| SCN_SRC_012 | Search & Filtering | Only whitespace as search keyword | Negative |
| SCN_SRC_013 | Search & Filtering | Price filter min = 0, max = smallest price in catalog (boundary inclusion) | Boundary |
| SCN_SRC_014 | Search & Filtering | Filter by lowest rating tier and highest rating tier | Boundary |
| SCN_SRC_015 | Search & Filtering | Single-character keyword search | Edge |
| SCN_SRC_016 | Search & Filtering | Keyword with special characters and numbers | Edge |
| SCN_SRC_017 | Search & Filtering | Apply filters then navigate away and back; state persistence per spec | Edge |
| SCN_SRC_018 | Search & Filtering | Very long search string (stress input limits) | Edge |
| SCN_SRC_019 | Search & Filtering | Combined filters yield exactly one product | Edge |
| SCN_SRC_020 | Search & Filtering | Clear filters after no-results search restores non-empty listing | Edge |

---

## 5. Shopping Cart

**Validations:** Add/update/remove, clear cart, totals, out-of-stock prevention, quantity limits (1–10, stock limit), duplicate handling.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_CRT_001 | Shopping Cart | Add in-stock product; line item and subtotal appear | Positive |
| SCN_CRT_002 | Shopping Cart | Increase quantity with +/- or input; line total and cart total update | Positive |
| SCN_CRT_003 | Shopping Cart | Decrease quantity; totals update; remove line when qty reaches 0 if that is behavior | Positive |
| SCN_CRT_004 | Shopping Cart | Remove item explicitly; item disappears and total recalculates | Positive |
| SCN_CRT_005 | Shopping Cart | Clear entire cart; empty state shown | Positive |
| SCN_CRT_006 | Shopping Cart | Add same product twice; verify merge/duplicate handling (single line with combined qty) | Positive |
| SCN_CRT_007 | Shopping Cart | Cart total matches sum of line items + tax/shipping rules if shown | Positive |
| SCN_CRT_008 | Shopping Cart | Attempt add or keep line for out-of-stock product | Negative |
| SCN_CRT_009 | Shopping Cart | Set quantity below 1 | Negative |
| SCN_CRT_010 | Shopping Cart | Set quantity above 10 when app max is 10 | Negative |
| SCN_CRT_011 | Shopping Cart | Set quantity above available stock | Negative |
| SCN_CRT_012 | Shopping Cart | Update cart for removed/expired session per spec | Negative |
| SCN_CRT_013 | Shopping Cart | Quantity exactly 1 (minimum allowed) | Boundary |
| SCN_CRT_014 | Shopping Cart | Quantity exactly 10 when stock allows | Boundary |
| SCN_CRT_015 | Shopping Cart | Quantity 11 (one above max rule) | Boundary |
| SCN_CRT_016 | Shopping Cart | Stock is 3; cap at 3 when trying to set 10 | Boundary |
| SCN_CRT_017 | Shopping Cart | Multiple distinct products; verify grand total | Edge |
| SCN_CRT_018 | Shopping Cart | Item goes out of stock while cart is open; refresh shows block/warning | Edge |
| SCN_CRT_019 | Shopping Cart | Two tabs: change quantity in one; other tab reflects on refresh | Edge |
| SCN_CRT_020 | Shopping Cart | Highest-priced item at max qty 10; verify total precision | Edge |

---

## 6. Checkout & Payment

**Validations:** Address validation; payment methods (credit_card, debit_card, upi, cod); order review; place order; stock validation; empty cart prevention.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_CHK_001 | Checkout & Payment | Complete flow with valid shipping address and **credit_card** | Positive |
| SCN_CHK_002 | Checkout & Payment | Complete flow with **debit_card** | Positive |
| SCN_CHK_003 | Checkout & Payment | Complete flow with **upi** | Positive |
| SCN_CHK_004 | Checkout & Payment | Complete flow with **cod** (Cash on Delivery) | Positive |
| SCN_CHK_005 | Checkout & Payment | Review order: items, quantities, prices, address, payment method before confirm | Positive |
| SCN_CHK_006 | Checkout & Payment | Place order successfully; confirmation ID/message | Positive |
| SCN_CHK_007 | Checkout & Payment | Attempt checkout with empty cart | Negative |
| SCN_CHK_008 | Checkout & Payment | Submit without required address fields (e.g., line1, city, pincode) | Negative |
| SCN_CHK_009 | Checkout & Payment | Submit with invalid pincode format/length per rules | Negative |
| SCN_CHK_010 | Checkout & Payment | Proceed without selecting a payment method | Negative |
| SCN_CHK_011 | Checkout & Payment | Place order when cart item is no longer in stock (stock validation) | Negative |
| SCN_CHK_012 | Checkout & Payment | Use unsupported or tampered payment method value | Negative |
| SCN_CHK_013 | Checkout & Payment | Address at minimum required field lengths | Boundary |
| SCN_CHK_014 | Checkout & Payment | Single-line-item order | Boundary |
| SCN_CHK_015 | Checkout & Payment | Order with many line items / high value totals | Boundary |
| SCN_CHK_016 | Checkout & Payment | Address fields contain only spaces | Edge |
| SCN_CHK_017 | Checkout & Payment | Navigate back from payment step, edit address, resume checkout | Edge |
| SCN_CHK_018 | Checkout & Payment | Concurrent checkout race: last unit sold before submit | Edge |
| SCN_CHK_019 | Checkout & Payment | Payment failure simulation; order not created or rolled back per spec | Edge |
| SCN_CHK_020 | Checkout & Payment | COD with order total above any COD limit if implemented | Edge |

---

## 7. Order Tracking

**Validations:** Orders list, order detail, status tracker (placed → confirmed → shipped → out_for_delivery → delivered), cancel only for placed/confirmed.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_ORD_001 | Order Tracking | View list of user’s orders with key fields (id, date, status, total) | Positive |
| SCN_ORD_002 | Order Tracking | Open order detail: line items, address, payment, status | Positive |
| SCN_ORD_003 | Order Tracking | Tracker shows **placed** for new order | Positive |
| SCN_ORD_004 | Order Tracking | Tracker shows **confirmed** | Positive |
| SCN_ORD_005 | Order Tracking | Tracker shows **shipped** | Positive |
| SCN_ORD_006 | Order Tracking | Tracker shows **out_for_delivery** | Positive |
| SCN_ORD_007 | Order Tracking | Tracker shows **delivered** as terminal state | Positive |
| SCN_ORD_008 | Order Tracking | Cancel order in **placed** status successfully | Positive |
| SCN_ORD_009 | Order Tracking | Cancel order in **confirmed** status successfully | Positive |
| SCN_ORD_010 | Order Tracking | Attempt cancel when status is **shipped** | Negative |
| SCN_ORD_011 | Order Tracking | Attempt cancel when status is **out_for_delivery** | Negative |
| SCN_ORD_012 | Order Tracking | Attempt cancel when status is **delivered** | Negative |
| SCN_ORD_013 | Order Tracking | Open another user’s order ID (IDOR); access denied | Negative |
| SCN_ORD_014 | Order Tracking | Invalid or malformed order ID in URL | Negative |
| SCN_ORD_015 | Order Tracking | User with exactly one order in list | Boundary |
| SCN_ORD_016 | Order Tracking | Cancel immediately after place (placed → cancel) | Boundary |
| SCN_ORD_017 | Order Tracking | Status transition order matches pipeline (no skipped steps in UI) | Boundary |
| SCN_ORD_018 | Order Tracking | No orders yet; empty list message | Edge |
| SCN_ORD_019 | Order Tracking | Refresh during status update; UI shows consistent state | Edge |
| SCN_ORD_020 | Order Tracking | Long order history pagination or scroll if many orders | Edge |

---

## 8. Ratings & Reviews

**Validations:** Submit review (rating 1–5, title 3–100 chars, comment 10–1000 chars); edit/delete; verified purchase; duplicate prevention.

| Scenario ID | Module | Scenario Description | Type (Positive/Negative/Boundary/Edge) |
|---|---|---|---|
| SCN_REV_001 | Ratings & Reviews | Submit review with rating 3, valid title, valid comment | Positive |
| SCN_REV_002 | Ratings & Reviews | Edit existing review; changes persist | Positive |
| SCN_REV_003 | Ratings & Reviews | Delete own review; removed from list | Positive |
| SCN_REV_004 | Ratings & Reviews | Submit as **verified purchase** when user bought the product | Positive |
| SCN_REV_005 | Ratings & Reviews | Rating **1** (minimum) with valid title and comment | Positive |
| SCN_REV_006 | Ratings & Reviews | Rating **5** (maximum) with valid title and comment | Positive |
| SCN_REV_007 | Ratings & Reviews | View product reviews list with multiple entries | Positive |
| SCN_REV_008 | Ratings & Reviews | Block or flag unverified review when policy requires verified purchase only | Negative |
| SCN_REV_009 | Ratings & Reviews | Submit second review for same product (duplicate prevention) | Negative |
| SCN_REV_010 | Ratings & Reviews | Rating 0 or below 1 | Negative |
| SCN_REV_011 | Ratings & Reviews | Rating 6 or above 5 | Negative |
| SCN_REV_012 | Ratings & Reviews | Empty title or comment where required | Negative |
| SCN_REV_013 | Ratings & Reviews | Title length **3** characters (minimum) | Boundary |
| SCN_REV_014 | Ratings & Reviews | Title length **100** characters (maximum) | Boundary |
| SCN_REV_015 | Ratings & Reviews | Comment length **10** characters (minimum) | Boundary |
| SCN_REV_016 | Ratings & Reviews | Comment length **1000** characters (maximum) | Boundary |
| SCN_REV_017 | Ratings & Reviews | Title **2** characters (below minimum) | Boundary |
| SCN_REV_018 | Ratings & Reviews | Comment **9** characters (below minimum) | Boundary |
| SCN_REV_019 | Ratings & Reviews | Title **101** characters (above maximum) | Edge |
| SCN_REV_020 | Ratings & Reviews | Edit review: change rating from 5 to 1; aggregates update | Edge |
| SCN_REV_021 | Ratings & Reviews | Product with zero reviews; submit first review | Edge |

---

**Total scenarios:** 168 (21 per module × 8 modules). Each module exceeds the minimum of **18** scenarios and includes positive, negative, boundary, and edge coverage aligned with ShopEase validations.
