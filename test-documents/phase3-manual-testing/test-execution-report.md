# Test Execution Report

## ShopEase Shopping Application

---

## 1. Document Information

| Field                | Detail                                      |
|----------------------|---------------------------------------------|
| **Project Name**     | ShopEase – Online Shopping Application       |
| **Document Title**   | Test Execution Report                        |
| **Version**          | 1.0                                          |
| **Prepared By**      | Yousuf Shekh                                 |
| **Date**             | March 28, 2026                               |
| **Execution Period** | March 10, 2026 – March 27, 2026             |
| **Environment**      | Browser: Google Chrome 134, OS: Windows 10, URL: http://localhost:3000 |
| **Test Tool**        | Manual Testing                               |
| **Status**           | Completed                                    |

---

## 2. Executive Summary

Testing for the ShopEase Shopping Application has been completed for all planned functional modules. The test execution cycle covered **152 total test cases** across 8 functional modules over a period of 18 days.

| Metric               | Count  |
|-----------------------|--------|
| **Total Test Cases**  | 152    |
| **Executed**          | 148    |
| **Passed**            | 129    |
| **Failed**            | 14     |
| **Blocked**           | 5      |
| **Not Run**           | 4      |
| **Pass Rate**         | 87.2%  |
| **Defect Yield**      | 9.5%   |

The overall pass rate of **87.2%** indicates that the application is largely functional but contains defects that must be resolved before production release. Two critical defects related to cart and checkout calculations require immediate attention. Five test cases were blocked due to dependencies on third-party payment gateway integration which was unavailable during the test window.

---

## 3. Module-wise Execution Summary

| Module                  | Total | Executed | Passed | Failed | Blocked | Not Run | Pass Rate |
|-------------------------|-------|----------|--------|--------|---------|---------|-----------|
| User Registration       | 20    | 20       | 18     | 2      | 0       | 0       | 90.0%     |
| Product Browsing        | 19    | 19       | 17     | 2      | 0       | 0       | 89.5%     |
| Product Details         | 18    | 18       | 16     | 1      | 1       | 0       | 88.9%     |
| Search & Filter         | 19    | 18       | 15     | 2      | 1       | 1       | 83.3%     |
| Shopping Cart           | 20    | 19       | 16     | 2      | 1       | 1       | 84.2%     |
| Checkout                | 20    | 18       | 15     | 2      | 1       | 2       | 83.3%     |
| Order Tracking          | 18    | 18       | 16     | 2      | 0       | 0       | 88.9%     |
| Ratings & Reviews       | 18    | 18       | 16     | 1      | 1       | 0       | 88.9%     |
| **Total**               | **152** | **148** | **129** | **14** | **5**  | **4**   | **87.2%** |

---

## 4. Detailed Results per Module

### 4.1 User Registration (TC_REG)

| Test Case ID | Description                                      | Status  | Remarks                                      |
|--------------|--------------------------------------------------|---------|----------------------------------------------|
| TC_REG_001   | Register with valid details                      | Pass    |                                              |
| TC_REG_002   | Register with existing email                     | Pass    |                                              |
| TC_REG_003   | Register with empty mandatory fields             | Pass    |                                              |
| TC_REG_004   | Register with invalid email format               | Pass    |                                              |
| TC_REG_005   | Register with weak password                      | **Fail** | DEF-007: Allows password without uppercase   |
| TC_REG_006   | Password and confirm password mismatch           | Pass    |                                              |
| TC_REG_007   | Register with invalid phone number               | Pass    |                                              |
| TC_REG_008   | Register with SQL injection in name field        | Pass    |                                              |
| TC_REG_009   | Register with XSS script in input fields         | Pass    |                                              |
| TC_REG_010   | Login with valid credentials                     | Pass    |                                              |
| TC_REG_011   | Login with invalid password                      | Pass    |                                              |
| TC_REG_012   | Login with unregistered email                    | Pass    |                                              |
| TC_REG_013   | Forgot password link functionality               | Pass    |                                              |
| TC_REG_014   | Password reset with valid token                  | Pass    |                                              |
| TC_REG_015   | Session persistence after login                  | Pass    |                                              |
| TC_REG_016   | Logout functionality                             | Pass    |                                              |
| TC_REG_017   | Register with maximum length inputs              | Pass    |                                              |
| TC_REG_018   | Register with special characters in name         | **Fail** | Name field accepts numeric-only input        |
| TC_REG_019   | Multiple login attempts lockout                  | Pass    |                                              |
| TC_REG_020   | Remember me functionality                        | Pass    |                                              |

### 4.2 Product Browsing (TC_PB)

| Test Case ID | Description                                      | Status  | Remarks                                      |
|--------------|--------------------------------------------------|---------|----------------------------------------------|
| TC_PB_001    | Browse all products on homepage                  | Pass    |                                              |
| TC_PB_002    | Browse products by category                      | Pass    |                                              |
| TC_PB_003    | Browse products by subcategory                   | Pass    |                                              |
| TC_PB_004    | Product card displays correct info               | Pass    |                                              |
| TC_PB_005    | Product image thumbnail loads correctly          | Pass    |                                              |
| TC_PB_006    | Product card image alignment on tablet           | **Fail** | DEF-013: 2px misalignment on tablet view     |
| TC_PB_007    | Pagination - navigate to next page               | Pass    |                                              |
| TC_PB_008    | Pagination - navigate to previous page           | **Fail** | DEF-011: Shows page 0 on page 1 previous     |
| TC_PB_009    | Pagination - jump to specific page               | Pass    |                                              |
| TC_PB_010    | Products per page display count                  | Pass    |                                              |
| TC_PB_011    | Sort products by price low to high               | Pass    |                                              |
| TC_PB_012    | Sort products by price high to low               | Pass    |                                              |
| TC_PB_013    | Sort products by popularity                      | Pass    |                                              |
| TC_PB_014    | Sort products by newest first                    | Pass    |                                              |
| TC_PB_015    | Category count matches product listing           | Pass    |                                              |
| TC_PB_016    | Empty category displays appropriate message      | Pass    |                                              |
| TC_PB_017    | Product listing responsive on mobile             | Pass    |                                              |
| TC_PB_018    | Footer links hover color consistency             | Pass    |                                              |
| TC_PB_019    | Breadcrumb navigation on category pages          | Pass    |                                              |

### 4.3 Product Details (TC_PD)

| Test Case ID | Description                                      | Status   | Remarks                                      |
|--------------|--------------------------------------------------|----------|----------------------------------------------|
| TC_PD_001    | View product details page                        | Pass     |                                              |
| TC_PD_002    | Product image gallery displays correctly         | Pass     |                                              |
| TC_PD_003    | Image zoom on hover                              | Pass     |                                              |
| TC_PD_004    | Product description is accurate                  | Pass     |                                              |
| TC_PD_005    | Product price displayed correctly                | Pass     |                                              |
| TC_PD_006    | Product availability status shown                | Pass     |                                              |
| TC_PD_007    | Add to cart from product details                 | Pass     |                                              |
| TC_PD_008    | Add out-of-stock product to cart                 | **Fail** | DEF-001: Rapid clicking bypasses stock check |
| TC_PD_009    | Select product size/variant                      | Pass     |                                              |
| TC_PD_010    | Select product color/variant                     | Pass     |                                              |
| TC_PD_011    | Quantity selector increment/decrement            | Pass     |                                              |
| TC_PD_012    | Add to wishlist from details page                | Pass     |                                              |
| TC_PD_013    | Share product link functionality                 | Pass     |                                              |
| TC_PD_014    | Related products section displays                | Pass     |                                              |
| TC_PD_015    | Product reviews section on details page          | Pass     |                                              |
| TC_PD_016    | Product specifications table                     | Pass     |                                              |
| TC_PD_017    | Back to listing preserves scroll position        | **Blocked** | Depends on browser cache configuration      |
| TC_PD_018    | Product details page load time under 3 seconds   | Pass     |                                              |

### 4.4 Search & Filter (TC_SF)

| Test Case ID | Description                                      | Status   | Remarks                                      |
|--------------|--------------------------------------------------|----------|----------------------------------------------|
| TC_SF_001    | Search with valid product name                   | Pass     |                                              |
| TC_SF_002    | Search with partial product name                 | Pass     |                                              |
| TC_SF_003    | Search with no results                           | Pass     |                                              |
| TC_SF_004    | Search with special characters                   | **Fail** | DEF-004: Page error with special chars       |
| TC_SF_005    | Search suggestions/autocomplete                  | Pass     |                                              |
| TC_SF_006    | Filter by price range                            | Pass     |                                              |
| TC_SF_007    | Filter by brand                                  | Pass     |                                              |
| TC_SF_008    | Filter by rating                                 | Pass     |                                              |
| TC_SF_009    | Apply multiple filters simultaneously            | Pass     |                                              |
| TC_SF_010    | Remove individual filter                         | Pass     |                                              |
| TC_SF_011    | Clear all filters                                | Pass     |                                              |
| TC_SF_012    | Price filter reset on category change            | **Fail** | DEF-008: Filter doesn't reset on category switch |
| TC_SF_013    | Search from any page navigates to results        | Pass     |                                              |
| TC_SF_014    | Filter results count updates dynamically         | Pass     |                                              |
| TC_SF_015    | Search with case insensitivity                   | Pass     |                                              |
| TC_SF_016    | Sort applied on filtered results                 | Pass     |                                              |
| TC_SF_017    | Filter persistence on page navigation            | Pass     |                                              |
| TC_SF_018    | Search result highlighting                       | **Blocked** | Feature deployment pending                  |
| TC_SF_019    | Voice search functionality                       | **Not Run** | Feature not available in current build       |

### 4.5 Shopping Cart (TC_SC)

| Test Case ID | Description                                      | Status   | Remarks                                      |
|--------------|--------------------------------------------------|----------|----------------------------------------------|
| TC_SC_001    | Add single product to cart                       | Pass     |                                              |
| TC_SC_002    | Add multiple products to cart                    | Pass     |                                              |
| TC_SC_003    | Update product quantity in cart                  | Pass     |                                              |
| TC_SC_004    | Remove product from cart                         | Pass     |                                              |
| TC_SC_005    | Cart total calculation with single item          | Pass     |                                              |
| TC_SC_006    | Cart total calculation with multiple items       | Pass     |                                              |
| TC_SC_007    | Apply valid coupon code                          | Pass     |                                              |
| TC_SC_008    | Apply invalid coupon code                        | Pass     |                                              |
| TC_SC_009    | Cart persists after page refresh                 | Pass     |                                              |
| TC_SC_010    | Cart icon badge count updates                    | Pass     |                                              |
| TC_SC_011    | Cart quantity allows decimal values              | **Fail** | DEF-006: Keyboard input accepts decimals     |
| TC_SC_012    | Cart maximum quantity limit                      | Pass     |                                              |
| TC_SC_013    | Empty cart displays appropriate message          | Pass     |                                              |
| TC_SC_014    | Continue shopping from cart page                 | Pass     |                                              |
| TC_SC_015    | Cart summary breakdown (subtotal, tax, total)    | Pass     |                                              |
| TC_SC_016    | Cart product link navigates to product page      | Pass     |                                              |
| TC_SC_017    | Out-of-stock product added via rapid click       | **Fail** | DEF-001: Stock validation bypassed           |
| TC_SC_018    | Cart session after logout and re-login           | **Blocked** | Session management update pending           |
| TC_SC_019    | Proceed to checkout from cart                    | Pass     |                                              |
| TC_SC_020    | Shipping estimate calculation in cart            | **Not Run** | Feature not available in current build       |

### 4.6 Checkout (TC_CO)

| Test Case ID | Description                                      | Status   | Remarks                                      |
|--------------|--------------------------------------------------|----------|----------------------------------------------|
| TC_CO_001    | Proceed to checkout with items in cart           | Pass     |                                              |
| TC_CO_002    | Enter valid shipping address                     | Pass     |                                              |
| TC_CO_003    | Enter invalid shipping address                   | Pass     |                                              |
| TC_CO_004    | Select shipping method                           | Pass     |                                              |
| TC_CO_005    | Order summary on checkout page                   | Pass     |                                              |
| TC_CO_006    | Order total with tax and shipping                | Pass     |                                              |
| TC_CO_007    | Order total miscalculated on rapid qty update    | **Fail** | DEF-002: Race condition in total calculation |
| TC_CO_008    | Apply coupon at checkout                         | Pass     |                                              |
| TC_CO_009    | Place order with valid payment                   | Pass     |                                              |
| TC_CO_010    | Place order with invalid payment                 | Pass     |                                              |
| TC_CO_011    | Checkout success page displays order details     | Pass     |                                              |
| TC_CO_012    | Checkout success page shows order number         | **Fail** | DEF-012: Order number missing on success page |
| TC_CO_013    | Order confirmation email sent                    | Pass     |                                              |
| TC_CO_014    | Guest checkout functionality                     | **Blocked** | Guest checkout feature not yet enabled       |
| TC_CO_015    | Saved address selection at checkout              | Pass     |                                              |
| TC_CO_016    | Edit shipping address at checkout                | Pass     |                                              |
| TC_CO_017    | Back button from checkout preserves cart          | Pass     |                                              |
| TC_CO_018    | Checkout page field validations                  | Pass     |                                              |
| TC_CO_019    | Payment via PayPal integration                   | **Not Run** | PayPal integration not available in test env |
| TC_CO_020    | Payment via Stripe integration                   | **Not Run** | Stripe integration not available in test env |

### 4.7 Order Tracking (TC_OT)

| Test Case ID | Description                                      | Status  | Remarks                                      |
|--------------|--------------------------------------------------|---------|----------------------------------------------|
| TC_OT_001    | View order history list                          | Pass    |                                              |
| TC_OT_002    | View order details page                          | Pass    |                                              |
| TC_OT_003    | Order status displays correctly                  | Pass    |                                              |
| TC_OT_004    | Order status tracker progress bar                | Pass    |                                              |
| TC_OT_005    | Order status tracker date for Confirmed step     | **Fail** | DEF-009: Wrong date on Confirmed step        |
| TC_OT_006    | Cancel order before shipping                     | Pass    |                                              |
| TC_OT_007    | Cancel button for shipped orders                 | **Fail** | DEF-005: Cancel visible for shipped orders   |
| TC_OT_008    | Track shipment link                              | Pass    |                                              |
| TC_OT_009    | Order invoice download                           | Pass    |                                              |
| TC_OT_010    | Filter orders by status                          | Pass    |                                              |
| TC_OT_011    | Filter orders by date range                      | Pass    |                                              |
| TC_OT_012    | Order pagination                                 | Pass    |                                              |
| TC_OT_013    | Reorder from order history                       | Pass    |                                              |
| TC_OT_014    | Return/refund request submission                 | Pass    |                                              |
| TC_OT_015    | Return status tracking                           | Pass    |                                              |
| TC_OT_016    | Order details match cart items                   | Pass    |                                              |
| TC_OT_017    | Delivery address on order details                | Pass    |                                              |
| TC_OT_018    | Payment method on order details                  | Pass    |                                              |

### 4.8 Ratings & Reviews (TC_RR)

| Test Case ID | Description                                      | Status   | Remarks                                      |
|--------------|--------------------------------------------------|----------|----------------------------------------------|
| TC_RR_001    | Submit review for purchased product              | Pass     |                                              |
| TC_RR_002    | Submit review without purchase                   | **Fail** | DEF-003: Review allowed without purchase     |
| TC_RR_003    | Submit star rating only                          | Pass     |                                              |
| TC_RR_004    | Submit rating with text review                   | Pass     |                                              |
| TC_RR_005    | Edit existing review                             | Pass     |                                              |
| TC_RR_006    | Delete own review                                | Pass     |                                              |
| TC_RR_007    | View all reviews for a product                   | Pass     |                                              |
| TC_RR_008    | Sort reviews by most recent                      | Pass     |                                              |
| TC_RR_009    | Sort reviews by highest rating                   | Pass     |                                              |
| TC_RR_010    | Filter reviews by star rating                    | Pass     |                                              |
| TC_RR_011    | Review pagination                                | Pass     |                                              |
| TC_RR_012    | Average rating calculation                       | Pass     |                                              |
| TC_RR_013    | Rating distribution bar chart                    | Pass     |                                              |
| TC_RR_014    | Star rating hover highlight in Firefox           | **Blocked** | DEF-010: Firefox out of scope                |
| TC_RR_015    | Review character limit validation                | Pass     |                                              |
| TC_RR_016    | Profanity filter on review text                  | Pass     |                                              |
| TC_RR_017    | Helpful/unhelpful vote on reviews                | Pass     |                                              |
| TC_RR_018    | Review with image upload                         | Pass     |                                              |

---

## 5. Failed Test Cases Detail

| # | Defect ID | Test Case ID | Description | Expected Result | Actual Result | Severity | Module |
|---|-----------|-------------|-------------|-----------------|---------------|----------|--------|
| 1 | DEF-001 | TC_PD_008, TC_SC_017 | Out-of-stock product can be added to cart via rapid clicking | System should prevent adding out-of-stock items regardless of click speed | Rapid double/triple clicking the "Add to Cart" button bypasses stock validation; item added to cart with quantity 1 | Critical | Product Details / Shopping Cart |
| 2 | DEF-002 | TC_CO_007 | Order total miscalculated when quantity updated rapidly | Order total should always reflect the correct sum of item prices × quantities plus tax and shipping | Rapidly changing quantity field causes a race condition; the displayed total does not match the sum of line items | Critical | Checkout |
| 3 | DEF-003 | TC_RR_002 | User can submit review without purchasing product | Only users who have purchased the product should be able to submit a review | Any logged-in user can submit a review on any product regardless of purchase history | Major | Ratings & Reviews |
| 4 | DEF-004 | TC_SF_004 | Search returns results for special characters causing page error | System should handle special characters gracefully and display "No results found" or sanitized results | Entering characters like `<script>`, `%00`, or `../../` in the search box returns a 500 Internal Server Error page | Major | Search & Filter |
| 5 | DEF-005 | TC_OT_007 | Cancel button visible for shipped orders | Cancel button should not be displayed once order status is "Shipped" or beyond | Cancel button remains visible on orders with "Shipped" and "Out for Delivery" statuses | Major | Order Tracking |
| 6 | DEF-006 | TC_SC_011 | Cart quantity allows decimal values via keyboard input | Quantity field should only accept positive integers (1, 2, 3, …) | Typing "1.5" or "2.7" in the quantity field is accepted; cart attempts to process fractional quantities | Major | Shopping Cart |
| 7 | DEF-007 | TC_REG_005 | Registration allows password without uppercase letter | Password policy requires at least one uppercase letter, one lowercase letter, one digit, and one special character | Password "test@1234" (no uppercase) is accepted during registration without any validation error | Minor | User Registration |
| 8 | DEF-008 | TC_SF_012 | Product price filter doesn't reset on category change | Switching categories should reset all active filters to default state | Price range slider retains previous category's filter values when user navigates to a different category | Minor | Search & Filter |
| 9 | DEF-009 | TC_OT_005 | Order status tracker shows wrong date for "Confirmed" step | The "Confirmed" step should display the date the order was confirmed by the system | The "Confirmed" step displays the order placement date instead of the confirmation date | Minor | Order Tracking |
| 10 | DEF-010 | TC_RR_014 | Review star rating not highlighted on hover in Firefox | Stars should highlight progressively on hover in all supported browsers | Star rating hover effect does not work in Firefox 132; works correctly in Chrome and Edge | Minor | Ratings & Reviews |
| 11 | DEF-011 | TC_PB_008 | Pagination shows page 0 when clicking previous on page 1 | Previous button should be disabled or have no effect when user is on page 1 | Clicking "Previous" on page 1 navigates to "page=0" URL which shows an empty product listing | Minor | Product Browsing |
| 12 | DEF-012 | TC_CO_012 | Checkout success page missing order number | Order confirmation/success page should display the order number prominently | Success page shows "Thank you for your order!" message but the order number field is blank | Trivial | Checkout |
| 13 | DEF-013 | TC_PB_006 | Product card image has 2px misalignment on tablet view | Product card images should be consistently aligned across all viewport sizes | On tablet viewport (768px–1024px), product card images shift 2px to the left compared to desktop view | Trivial | Product Browsing |
| 14 | DEF-014 | TC_PB_018 | Footer links have inconsistent hover color | All footer links should use the same hover color (#0066CC) as per style guide | "About Us" and "Contact" links use #0066CC on hover, but "Privacy Policy" and "Terms" links use #003399 | Trivial | Product Browsing |

---

## 6. Blocked Test Cases

| # | Test Case ID | Module | Description | Blocking Reason | Impact |
|---|-------------|--------|-------------|-----------------|--------|
| 1 | TC_PD_017 | Product Details | Back to listing preserves scroll position | Depends on browser cache configuration not available in test environment | Low – cosmetic/UX enhancement |
| 2 | TC_SF_018 | Search & Filter | Search result highlighting | Feature deployment was deferred; build does not include highlighting module | Medium – search usability feature |
| 3 | TC_SC_018 | Shopping Cart | Cart session after logout and re-login | Session management module update is pending deployment | Medium – user experience impacted |
| 4 | TC_CO_014 | Checkout | Guest checkout functionality | Guest checkout feature is not enabled in the current test build | Medium – alternate checkout flow unavailable |
| 5 | TC_RR_014 | Ratings & Reviews | Star rating hover highlight in Firefox | Firefox is out of scope for the current test cycle (DEF-010 marked Won't Fix) | Low – browser-specific cosmetic issue |

---

## 7. Test Execution Metrics

### 7.1 Overall Pass/Fail Distribution

```
Pass/Fail Pie Chart:

  Passed  : 129 (87.2%)  ████████████████████████████████████░░░░░
  Failed  :  14 ( 9.5%)  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  Blocked :   5 ( 3.4%)  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  Not Run :   4 ( 2.7%)  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

| Status   | Count | Percentage |
|----------|-------|------------|
| Passed   | 129   | 87.2%      |
| Failed   | 14    | 9.5%       |
| Blocked  | 5     | 3.4%       |
| Not Run  | 4     | 2.7%       |

### 7.2 Module-wise Pass Rate (Bar Chart Data)

```
Module-wise Pass Rate:

  User Registration  : 90.0%  ██████████████████░░
  Product Browsing   : 89.5%  █████████████████░░░
  Product Details    : 88.9%  █████████████████░░░
  Search & Filter    : 83.3%  ████████████████░░░░
  Shopping Cart      : 84.2%  ████████████████░░░░
  Checkout           : 83.3%  ████████████████░░░░
  Order Tracking     : 88.9%  █████████████████░░░
  Ratings & Reviews  : 88.9%  █████████████████░░░
```

### 7.3 Defect Distribution by Severity

```
Defect Severity Distribution:

  Critical :  2 (14.3%)  ███░░░░░░░░░░░░░░░░░
  Major    :  4 (28.6%)  ██████░░░░░░░░░░░░░░
  Minor    :  5 (35.7%)  ███████░░░░░░░░░░░░░
  Trivial  :  3 (21.4%)  ████░░░░░░░░░░░░░░░░
```

### 7.4 Module-wise Defect Count

| Module                  | Defects Found |
|-------------------------|---------------|
| User Registration       | 1             |
| Product Browsing        | 3             |
| Product Details         | 1             |
| Search & Filter         | 2             |
| Shopping Cart           | 2             |
| Checkout                | 2             |
| Order Tracking          | 2             |
| Ratings & Reviews       | 2             |
| **Total**               | **14** (some defects span multiple modules) |

### 7.5 Test Execution Timeline

| Week       | Dates                  | Test Cases Executed | Cumulative |
|------------|------------------------|---------------------|------------|
| Week 1     | Mar 10 – Mar 14, 2026  | 42                  | 42         |
| Week 2     | Mar 17 – Mar 21, 2026  | 52                  | 94         |
| Week 3     | Mar 24 – Mar 27, 2026  | 54                  | 148        |

---

## 8. Observations & Recommendations

### 8.1 Key Observations

1. **Critical Race Conditions** – Two critical defects (DEF-001 and DEF-002) are caused by race conditions in the front-end when users interact rapidly with cart and quantity controls. These bypass server-side validations.

2. **Input Validation Gaps** – Several defects (DEF-004, DEF-006, DEF-007) point to insufficient input validation on both client and server sides. The search field, quantity field, and registration password field do not enforce their documented constraints consistently.

3. **Business Logic Flaw** – DEF-003 (review without purchase) represents a business logic gap that could affect product review credibility and should be addressed before launch.

4. **UI/Cosmetic Issues** – DEF-011, DEF-012, DEF-013, and DEF-014 are low-severity UI issues that do not affect core functionality but impact the overall polish of the application.

5. **Blocked Areas** – Five test cases remain blocked primarily due to third-party payment gateway integration (PayPal/Stripe) and pending feature deployments. These should be retested once the integrations are available.

### 8.2 Recommendations

| Priority | Recommendation |
|----------|---------------|
| **High** | Fix DEF-001 and DEF-002 immediately – implement server-side rate limiting and debounce mechanisms on Add to Cart and quantity update actions. |
| **High** | Fix DEF-003 – enforce purchase verification before allowing review submission. |
| **High** | Fix DEF-004 – sanitize and validate all search input on both client and server sides to prevent injection and server errors. |
| **Medium** | Fix DEF-005 and DEF-006 – add proper state-based UI controls for order cancellation and enforce integer-only input on quantity fields. |
| **Medium** | Address DEF-007, DEF-008, DEF-009, and DEF-011 in the next sprint as they affect user experience. |
| **Low** | Schedule DEF-012, DEF-013, and DEF-014 for a future UI polish sprint. |
| **Low** | DEF-010 marked as Won't Fix since Firefox is out of scope for the current release. Reassess for future releases. |
| **Info** | Plan a dedicated regression test cycle after all critical and major defect fixes are deployed. |
| **Info** | Unblock and execute the 4 "Not Run" and 5 "Blocked" test cases once dependencies are resolved. |

---

## 9. Sign-off

| Role                    | Name              | Signature       | Date             |
|-------------------------|-------------------|-----------------|------------------|
| **Test Lead**           | Yousuf Shekh      | _______________ | March 28, 2026   |
| **QA Manager**          | _____________     | _______________ | _______________  |
| **Project Manager**     | _____________     | _______________ | _______________  |
| **Development Lead**    | _____________     | _______________ | _______________  |

---

**Document Version History**

| Version | Date             | Author         | Changes                      |
|---------|------------------|----------------|------------------------------|
| 1.0     | March 28, 2026   | Yousuf Shekh   | Initial test execution report |

---

*End of Test Execution Report*
