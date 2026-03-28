# ShopEase — Phase 2 Test Data Sheet

**Application:** ShopEase (Capstone Shopping)  
**Document type:** Centralized test data reference  
**Purpose:** Traceable, reusable values for manual and automated testing across eight functional modules.  
**Convention:** Each row includes a **Data Set ID** for mapping to test cases, defects, and automation fixtures.

---

## How to use this document

| Column | Meaning |
|--------|---------|
| **Data Set ID** | Stable identifier (e.g., `UR-VAL-001`). Use in TC IDs and bug reports. |
| **Category** | Valid, Invalid, or Boundary (per equivalence partitioning and boundary analysis). |
| **Expected** | Intended system behavior when not stated elsewhere in test specs. |

---

## Module 1: User Registration & Login

### Valid test data

| Data Set ID | First Name | Last Name | Email | Password | Phone | Notes |
|-------------|------------|-----------|-------|----------|-------|-------|
| UR-VAL-001 | Priya | Sharma | priya.sharma@example.com | SecurePass1 | 9876543210 | Alphanumeric password with upper + digit |
| UR-VAL-002 | James | O'Brien | james.obrien.work@mail.co.uk | MyShop2024! | 9123456789 | Hyphen/apostrophe in name; mixed-case password |
| UR-VAL-003 | Maria | Gonzalez-Lopez | maria.gonzalez@shopdemo.com | Retail9Xk | 9988776655 | Compound last name |
| UR-VAL-004 | Wei | Chen | wei.chen+shopease@inbox.dev | Checkout#7 | 9001234567 | Plus-address email; symbol in password |
| UR-VAL-005 | Aisha | Khan | aisha.khan99@outlook.com | BrowseMe1A | 8765432109 | Numeric suffix in email |

### Invalid test data

| Data Set ID | Field | Value | Reason |
|-------------|-------|-------|--------|
| UR-INV-001 | Email | priya.sharmaexample.com | Missing `@` |
| UR-INV-002 | Email | `user name@test.com` | Contains spaces |
| UR-INV-003 | Password | `short1` | Fewer than 8 characters |
| UR-INV-004 | Password | `alllowercase1` | No uppercase letter |
| UR-INV-005 | Password | `NoDigitsHere` | No digit |
| UR-INV-006 | Phone | 987654321 | 9 digits |
| UR-INV-007 | Phone | 98765432101 | 11 digits |
| UR-INV-008 | Phone | 98765abcde | Contains letters |
| UR-INV-009 | Email | *(empty)* | Empty email |
| UR-INV-010 | Password | *(empty)* | Empty password |
| UR-INV-011 | First Name | A | Single character (below minimum if min = 2) |
| UR-INV-012 | Last Name | `ThisNameIsWayTooLongForTheAllowedFieldLengthInShopEase` | 51+ characters |

### Boundary test data

| Data Set ID | Field | Value | Boundary |
|-------------|-------|-------|----------|
| UR-BND-001 | First Name | Li | Exactly 2 characters |
| UR-BND-002 | Last Name | `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Exactly 50 characters |
| UR-BND-003 | Password | `Passw0rd` | Exactly 8 characters (meets complexity if required) |
| UR-BND-004 | Phone | 0000000000 | Exactly 10 digits (format boundary) |

---

## Module 2: Product Browsing

**Assumptions for examples:** Total catalog yields **last page = 47** when `limit=20`; adjust `LAST_PAGE` in automation when catalog size changes.

### Valid test data

| Data Set ID | Page | Limit | Sort | Notes |
|-------------|------|-------|------|-------|
| PB-VAL-001 | 1 | 10 | price_asc | First page, smallest page size |
| PB-VAL-002 | 2 | 20 | price_desc | Mid page |
| PB-VAL-003 | 3 | 50 | name_asc | Large page size |
| PB-VAL-004 | 4 | 10 | newest | |
| PB-VAL-005 | 5 | 20 | rating | |

### Invalid test data

| Data Set ID | Page | Limit | Sort | Reason |
|-------------|------|-------|------|--------|
| PB-INV-001 | 0 | 20 | price_asc | Page must be ≥ 1 |
| PB-INV-002 | -1 | 20 | price_asc | Negative page |
| PB-INV-003 | 1 | 0 | price_asc | Limit must be positive |
| PB-INV-004 | 1 | 20 | price_invalid | Not in allowed enum |

### Boundary test data

| Data Set ID | Page | Limit | Sort | Boundary |
|-------------|------|-------|------|----------|
| PB-BND-001 | 1 | 20 | price_asc | First page |
| PB-BND-002 | 47 | 20 | price_asc | Last page (example; sync with API total) |
| PB-BND-003 | 1 | 1 | name_asc | Minimum limit |
| PB-BND-004 | 1 | 100 | rating | Maximum limit (if API max = 100) |

---

## Module 3: Product Detail View

**Sample product IDs** (replace with real IDs from your seed DB): `PROD-1001`, `PROD-2048`, `PROD-3005`.

### Valid test data

| Data Set ID | Product ID | Quantity | Notes |
|-------------|------------|----------|-------|
| PD-VAL-001 | PROD-1001 | 1 | Existing product |
| PD-VAL-002 | PROD-2048 | 2 | |
| PD-VAL-003 | PROD-3005 | 3 | |
| PD-VAL-004 | PROD-1001 | 4 | |
| PD-VAL-005 | PROD-2048 | 5 | |

### Invalid test data

| Data Set ID | Product ID | Quantity | Reason |
|-------------|------------|----------|--------|
| PD-INV-001 | PROD-999999 | 1 | Non-existent ID |
| PD-INV-002 | `"not-a-number"` | 1 | Non-numeric ID (string) |
| PD-INV-003 | PROD-1001 | 0 | Quantity must be positive |
| PD-INV-004 | PROD-1001 | -1 | Negative quantity |

### Boundary test data

| Data Set ID | Product ID | Quantity / Stock | Boundary |
|-------------|------------|------------------|----------|
| PD-BND-001 | PROD-1001 | Qty 1 | Minimum purchase quantity |
| PD-BND-002 | PROD-2048 | Qty 10 | Maximum per-line quantity (if cap = 10) |
| PD-BND-003 | PROD-STOCK0 | *(n/a)* | Product with `stock = 0` |
| PD-BND-004 | PROD-STOCK1 | *(n/a)* | Product with `stock = 1` |

---

## Module 4: Search & Filtering

### Valid test data

| Data Set ID | Keyword | Min Price | Max Price | Category | Brand | Min Rating | Notes |
|-------------|---------|-----------|-----------|----------|-------|------------|-------|
| SF-VAL-001 | shirt | 100 | 5000 | Apparel | — | 3 | Full-text + price + category + rating |
| SF-VAL-002 | Samsung | 500 | 3000 | Electronics | Samsung | 4 | Brand alignment |
| SF-VAL-003 | laptop | 1000 | 5000 | Electronics | — | 5 | High rating floor |
| SF-VAL-004 | — | 100 | 5000 | — | — | 3 | Browse-by-filters only |
| SF-VAL-005 | shirt | 100 | 5000 | Apparel | GenericBrand | 4 | Combined filters |

### Invalid test data

| Data Set ID | Input | Value | Reason |
|-------------|-------|-------|--------|
| SF-INV-001 | Keyword | *(empty)* | Empty search where keyword required |
| SF-INV-002 | Keyword | `<script>alert(1)</script>` | XSS / special characters |
| SF-INV-003 | Keyword | `'; DROP TABLE products;--` | SQL injection pattern |
| SF-INV-004 | Prices | min `5000`, max `100` | Min price greater than max |
| SF-INV-005 | Min Price | `-10` | Negative price |

### Boundary test data

| Data Set ID | Field | Value | Boundary |
|-------------|-------|-------|----------|
| SF-BND-001 | Min Price | 0 | Zero lower bound |
| SF-BND-002 | Price | 0.01 | Smallest positive currency step |
| SF-BND-003 | Max Price | 99999.99 | Upper catalog ceiling (example) |
| SF-BND-004 | Min Rating | 1 | Lowest discrete star |
| SF-BND-005 | Min Rating | 5 | Highest discrete star |

---

## Module 5: Shopping Cart

**Sample IDs:** `CART-PROD-A` (in stock), `CART-PROD-OOS` (out of stock), `CART-PROD-999` (non-existent).

### Valid test data

| Data Set ID | Action | Product ID | Quantity | Notes |
|-------------|--------|------------|----------|-------|
| SC-VAL-001 | Add | CART-PROD-A | 1 | Add lower bound |
| SC-VAL-002 | Add | CART-PROD-A | 3 | Mid range |
| SC-VAL-003 | Add | CART-PROD-A | 5 | Add upper bound (1–5) |
| SC-VAL-004 | Update | CART-PROD-A | 7 | Update within 1–10 |
| SC-VAL-005 | Update | CART-PROD-A | 10 | Update upper bound |

### Invalid test data

| Data Set ID | Action | Product ID | Quantity | Reason |
|-------------|--------|------------|----------|--------|
| SC-INV-001 | Add | CART-PROD-A | 0 | Invalid quantity |
| SC-INV-002 | Update | CART-PROD-A | -1 | Negative |
| SC-INV-003 | Update | CART-PROD-A | 11 | Exceeds max (10) |
| SC-INV-004 | Add | CART-PROD-999 | 1 | Non-existent product |
| SC-INV-005 | Add | CART-PROD-OOS | 1 | Out of stock |

### Boundary test data

| Data Set ID | Product ID | Stock | Quantity | Boundary |
|-------------|------------|-------|----------|----------|
| SC-BND-001 | CART-PROD-A | ≥10 | 1 | Minimum cart quantity |
| SC-BND-002 | CART-PROD-A | ≥10 | 10 | Maximum cart quantity |
| SC-BND-003 | CART-PROD-ONE | 1 | 1 | Last unit available |
| SC-BND-004 | CART-PROD-OOS | 0 | *(any)* | Cannot add when stock = 0 |

---

## Module 6: Checkout & Payment

### Valid test data — shipping addresses (5 sets)

| Data Set ID | Line 1 | Line 2 | City | State | ZIP | Country | Notes |
|-------------|--------|--------|------|-------|-----|---------|-------|
| CP-VAL-A1 | 221B Baker Street | Suite 2 | London | Greater London | SW1A1AA | UK | Alphanumeric postcode style |
| CP-VAL-A2 | 1600 Amphitheatre Parkway | Bldg 42 | Mountain View | CA | 94043 | USA | 5-digit ZIP |
| CP-VAL-A3 | 1 MG Road | Near Metro | Bengaluru | KA | 560001 | India | 6-digit PIN |
| CP-VAL-A4 | 99 Rue de Rivoli | — | Paris | Île-de-France | 75001 | France | European format |
| CP-VAL-A5 | PO Box 100 | — | Austin | TX | 78701 | USA | PO Box |

### Valid test data — payment methods

| Data Set ID | Payment Method | Notes |
|-------------|------------------|-------|
| CP-VAL-P1 | credit_card | Primary card flow |
| CP-VAL-P2 | debit_card | Debit routing |
| CP-VAL-P3 | upi | UPI / wallet-style |
| CP-VAL-P4 | cod | Cash on delivery |

### Invalid test data

| Data Set ID | Field | Value | Reason |
|-------------|-------|-------|--------|
| CP-INV-001 | Address Line 1 | *(empty)* | Required field |
| CP-INV-002 | City | *(empty)* | Required field |
| CP-INV-003 | State | *(empty)* | Required field |
| CP-INV-004 | ZIP | `ABCDE` | Contains letters (where digits only) |
| CP-INV-005 | ZIP | `1234` | Only 4 digits (US 5 expected) |
| CP-INV-006 | Payment Method | *(empty)* | Must select method |
| CP-INV-007 | Payment Method | `bitcoin` | Not in allowed list |

### Boundary test data

| Data Set ID | Field | Value | Boundary |
|-------------|-------|-------|----------|
| CP-BND-001 | ZIP | 12345 | Exactly 5 digits (US) |
| CP-BND-002 | ZIP | 560001 | Exactly 6 digits (India example) |
| CP-BND-003 | Address Line 1 | X | Single character |
| CP-BND-004 | Address Line 1 | *(string of length = app max, e.g. 200)* | Maximum allowed length |

---

## Module 7: Order Tracking

**Sample order IDs:** `ORD-2026-00001`, `ORD-2026-00442` (other user).

### Valid test data

| Data Set ID | Order ID | Context | Notes |
|-------------|----------|---------|-------|
| OT-VAL-001 | ORD-2026-00001 | Logged-in owner | Existing order for current user |
| OT-VAL-002 | ORD-2026-00002 | Logged-in owner | Second valid order |

**Valid status transitions** (example lifecycle)

| Data Set ID | From Status | To Status | Notes |
|-------------|-------------|-----------|-------|
| OT-VAL-T1 | placed | confirmed | Normal forward |
| OT-VAL-T2 | confirmed | shipped | |
| OT-VAL-T3 | shipped | out_for_delivery | |
| OT-VAL-T4 | out_for_delivery | delivered | Terminal success |

### Invalid test data

| Data Set ID | Order ID / Action | Reason |
|-------------|---------------------|--------|
| OT-INV-001 | ORD-2026-99999 | Non-existent order |
| OT-INV-002 | ORD-2026-00442 | Belongs to another user |
| OT-INV-003 | Cancel on `delivered` | Cannot cancel after delivered |

### Boundary test data

| Data Set ID | Order | Characteristic | Boundary |
|-------------|-------|----------------|----------|
| OT-BND-001 | ORD-SINGLE-ITEM | 1 line item | Minimum complexity |
| OT-BND-002 | ORD-MAX-ITEMS | Max allowed line items | Upper bound (set per business rule) |
| OT-BND-003 | — | Status `placed` | First status in pipeline |
| OT-BND-004 | — | Status `delivered` | Last status |

---

## Module 8: Ratings & Reviews

### Valid test data

| Data Set ID | Product ID | Rating | Title (length) | Comment (length) | Notes |
|-------------|------------|--------|----------------|------------------|-------|
| RR-VAL-001 | PROD-1001 | 4 | Great quality (13 chars) | This shirt fits well and the fabric feels durable for daily wear. (72 chars) | Mid rating |
| RR-VAL-002 | PROD-2048 | 5 | Excellent buy (13 chars) | Fast delivery, packaging was intact, product matches description on the site. (88 chars) | |
| RR-VAL-003 | PROD-3005 | 2 | Could be better (17 chars) | Color was slightly different from photos but acceptable for the price paid. (77 chars) | |
| RR-VAL-004 | PROD-1001 | 1 | Disappointed (12 chars) | Arrived late and support took two days to respond to my ticket about the issue. (82 chars) | |
| RR-VAL-005 | PROD-2048 | 3 | Average product (16 chars) | Does the job. Nothing exceptional but I might buy again if there is a good discount. (85 chars) | |

### Invalid test data

| Data Set ID | Field | Value | Reason |
|-------------|-------|-------|--------|
| RR-INV-001 | Rating | 0 | Below minimum |
| RR-INV-002 | Rating | 6 | Above maximum |
| RR-INV-003 | Rating | `"five"` | Non-numeric |
| RR-INV-004 | Title | `AB` (2 chars) | Below minimum length |
| RR-INV-005 | Title | `T` × 101 (101 chars) | Exceeds maximum |
| RR-INV-006 | Comment | `123456789` | Exactly 9 characters (below 10 minimum) |
| RR-INV-007 | Comment | `C` × 1001 | Exceeds 1000 |
| RR-INV-008 | Title / Comment / Rating | *(empty)* | Required fields |

### Boundary test data

| Data Set ID | Field | Value | Boundary |
|-------------|-------|-------|----------|
| RR-BND-001 | Title | `Buy` | Exactly 3 characters |
| RR-BND-002 | Title | `T` × 100 | Exactly 100 characters |
| RR-BND-003 | Comment | `1234567890` | Exactly 10 characters |
| RR-BND-004 | Comment | `C` × 1000 | Exactly 1000 characters |
| RR-BND-005 | Rating | 1 | Minimum star |
| RR-BND-006 | Rating | 5 | Maximum star |

---

## Cross-reference index (Data Set ID prefixes)

| Prefix | Module |
|--------|--------|
| UR- | User Registration & Login |
| PB- | Product Browsing |
| PD- | Product Detail View |
| SF- | Search & Filtering |
| SC- | Shopping Cart |
| CP- | Checkout & Payment |
| OT- | Order Tracking |
| RR- | Ratings & Reviews |

---

## Document control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-03-28 | Initial consolidated test data sheet for Phase 2 |

*Replace placeholder product/order IDs and “last page” with values from your deployed or seeded environment before execution.*
