# Defect Report

## ShopEase Shopping Application

---

## 1. Document Information

| Field                | Detail                                          |
|----------------------|-------------------------------------------------|
| **Project Name**     | ShopEase – Online Shopping Application           |
| **Document Title**   | Defect Report                                    |
| **Version**          | 1.0                                              |
| **Prepared By**      | Yousuf Shekh                                     |
| **Date**             | March 28, 2026                                   |
| **Test Period**      | March 10, 2026 – March 27, 2026                 |
| **Environment**      | Browser: Google Chrome 134, OS: Windows 10, URL: http://localhost:3000 |
| **Defect Tracking**  | Manual Tracking (Spreadsheet-based)              |

---

## 2. Defect Summary

| Metric                  | Count |
|-------------------------|-------|
| **Total Defects**       | 14    |
| **Critical**            | 2     |
| **Major**               | 4     |
| **Minor**               | 5     |
| **Trivial**             | 3     |
| **Open**                | 3     |
| **Closed**              | 8     |
| **Won't Fix**           | 1     |
| **In Progress / Retest**| 2     |

Out of 14 defects identified, **2 are critical** and require immediate resolution before the application can be considered release-ready. The defect density across the 8 modules averages **1.75 defects per module**, with the Product Browsing and Checkout modules showing the highest defect concentrations.

---

## 3. Defect Log

| Defect ID | Title | Module | Severity | Priority | Status | Reporter | Assigned To | Date Found |
|-----------|-------|--------|----------|----------|--------|----------|-------------|------------|
| DEF-001 | Out-of-stock product can still be added to cart via rapid clicking | Product Details / Cart | Critical | P1 | Closed | Yousuf Shekh | Ahmed R. | Mar 11, 2026 |
| DEF-002 | Order total miscalculated when quantity updated rapidly | Checkout | Critical | P1 | Retest | Yousuf Shekh | Priya M. | Mar 12, 2026 |
| DEF-003 | User can submit review without purchasing product | Ratings & Reviews | Major | P2 | In Progress | Yousuf Shekh | Ahmed R. | Mar 13, 2026 |
| DEF-004 | Search returns results for special characters causing page error | Search & Filter | Major | P2 | Closed | Yousuf Shekh | Rahul K. | Mar 14, 2026 |
| DEF-005 | Cancel button visible for shipped orders | Order Tracking | Major | P2 | Closed | Yousuf Shekh | Priya M. | Mar 17, 2026 |
| DEF-006 | Cart quantity allows decimal values via keyboard input | Shopping Cart | Major | P2 | Closed | Yousuf Shekh | Rahul K. | Mar 17, 2026 |
| DEF-007 | Registration allows password without uppercase letter | User Registration | Minor | P3 | Closed | Yousuf Shekh | Ahmed R. | Mar 18, 2026 |
| DEF-008 | Product price filter doesn't reset on category change | Search & Filter | Minor | P3 | Closed | Yousuf Shekh | Priya M. | Mar 19, 2026 |
| DEF-009 | Order status tracker shows wrong date for "Confirmed" step | Order Tracking | Minor | P3 | In Progress | Yousuf Shekh | Rahul K. | Mar 20, 2026 |
| DEF-010 | Review star rating not highlighted on hover in Firefox | Ratings & Reviews | Minor | P3 | Won't Fix | Yousuf Shekh | — | Mar 20, 2026 |
| DEF-011 | Pagination shows page 0 when clicking previous on page 1 | Product Browsing | Minor | P3 | Closed | Yousuf Shekh | Ahmed R. | Mar 21, 2026 |
| DEF-012 | Checkout success page missing order number | Checkout | Trivial | P4 | Retest | Yousuf Shekh | Priya M. | Mar 24, 2026 |
| DEF-013 | Product card image has 2px misalignment on tablet view | Product Browsing | Trivial | P4 | Open | Yousuf Shekh | Rahul K. | Mar 25, 2026 |
| DEF-014 | Footer links have inconsistent hover color | Product Browsing | Trivial | P4 | Open | Yousuf Shekh | Rahul K. | Mar 26, 2026 |

---

## 4. Detailed Defect Descriptions

---

### DEF-001: Out-of-stock product can still be added to cart via rapid clicking

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-001                                             |
| **Title**        | Out-of-stock product can still be added to cart via rapid clicking |
| **Module**       | Product Details / Shopping Cart                      |
| **Severity**     | Critical                                            |
| **Priority**     | P1 – Immediate                                      |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Navigate to the ShopEase homepage at `http://localhost:3000`.
2. Browse to any product category (e.g., Electronics).
3. Select a product that is marked as "Out of Stock" (e.g., "Wireless Bluetooth Speaker – Black").
4. Observe that the "Add to Cart" button appears greyed out.
5. Rapidly double-click or triple-click the "Add to Cart" button within 200ms.
6. Navigate to the Shopping Cart page.

**Expected Result:**
The system should prevent adding out-of-stock items to the cart regardless of the speed or frequency of clicks. The "Add to Cart" button should be fully disabled (both visually and functionally) for out-of-stock products.

**Actual Result:**
Rapid clicking (2–3 clicks within 200ms) on the "Add to Cart" button for an out-of-stock product successfully adds the item to the cart with a quantity of 1. The cart page displays the item with the correct price and no stock warning.

**Screenshot:** *[Screenshot: Cart page showing out-of-stock "Wireless Bluetooth Speaker" with Qty: 1]*

**Resolution Notes:**
Fixed in build v1.0.3. Developer implemented server-side stock validation on the add-to-cart API endpoint and added a debounce mechanism (300ms) on the front-end button click handler. Verified and closed on Mar 22, 2026.

---

### DEF-002: Order total miscalculated when quantity updated rapidly

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-002                                             |
| **Title**        | Order total miscalculated when quantity updated rapidly |
| **Module**       | Checkout                                            |
| **Severity**     | Critical                                            |
| **Priority**     | P1 – Immediate                                      |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Retest                                              |

**Steps to Reproduce:**

1. Log in with valid credentials (e.g., testuser@shopease.com / Test@1234).
2. Add any product to the cart (e.g., "Running Shoes – Size 10" priced at $89.99).
3. Navigate to the Shopping Cart page.
4. In the quantity field, rapidly change the value from 1 → 2 → 3 → 5 by clicking the increment button quickly (within 1 second).
5. Proceed to the Checkout page.
6. Observe the order total on the checkout summary.

**Expected Result:**
The order total should correctly reflect: $89.99 × 5 = $449.95, plus applicable tax and shipping. The total should always be mathematically consistent with the displayed line items.

**Actual Result:**
The order total displays $269.97 (which equals $89.99 × 3), even though the quantity shows 5. The front-end appears to calculate the total based on an intermediate quantity value rather than the final value due to a race condition in the state update.

**Screenshot:** *[Screenshot: Checkout page showing Qty: 5, but total reflecting Qty: 3]*

**Resolution Notes:**
Fix deployed in build v1.0.4. Developer refactored the quantity update handler to use a debounced state update with a final server-side recalculation. Currently in retest phase – awaiting verification.

---

### DEF-003: User can submit review without purchasing product

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-003                                             |
| **Title**        | User can submit review without purchasing product    |
| **Module**       | Ratings & Reviews                                   |
| **Severity**     | Major                                               |
| **Priority**     | P2 – High                                           |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | In Progress                                         |

**Steps to Reproduce:**

1. Register a new user account (e.g., newuser@test.com).
2. Log in with the new account.
3. Navigate to any product detail page (e.g., "Stainless Steel Water Bottle").
4. Scroll down to the "Ratings & Reviews" section.
5. Click "Write a Review".
6. Select a 4-star rating and enter review text: "Great product, love the design!"
7. Click "Submit Review".

**Expected Result:**
The system should validate the user's purchase history and display an error message: "You must purchase this product before submitting a review." The review form should not be submitted.

**Actual Result:**
The review is submitted successfully and appears in the product's review section. No purchase validation check is performed. The review displays with the user's name and the submitted rating.

**Screenshot:** *[Screenshot: Review section showing submitted review from user with no purchase history]*

**Resolution Notes:**
Development team is implementing a purchase verification middleware that checks the user's order history before allowing review submission. Fix estimated for build v1.0.5.

---

### DEF-004: Search returns results for special characters causing page error

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-004                                             |
| **Title**        | Search returns results for special characters causing page error |
| **Module**       | Search & Filter                                     |
| **Severity**     | Major                                               |
| **Priority**     | P2 – High                                           |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Navigate to the ShopEase homepage.
2. Click on the search bar in the header.
3. Enter the following search terms one at a time and press Enter:
   - `<script>alert('xss')</script>`
   - `%00%00`
   - `../../etc/passwd`
   - `'; DROP TABLE products; --`
4. Observe the search results page after each query.

**Expected Result:**
The system should sanitize all search inputs and either display "No results found for your search" or display sanitized/escaped results. No server error should occur.

**Actual Result:**
- `<script>alert('xss')</script>` – Returns a 500 Internal Server Error page with a stack trace visible.
- `%00%00` – Returns a blank page with no error message.
- `../../etc/passwd` – Returns a 500 Internal Server Error.
- SQL injection string – Returns a 500 Internal Server Error.

**Screenshot:** *[Screenshot: 500 error page with partial stack trace after script tag search]*

**Resolution Notes:**
Fixed in build v1.0.3. Developer implemented input sanitization using DOMPurify on the client side and parameterized queries with input validation on the server side. All test strings now return "No results found" gracefully. Verified and closed on Mar 23, 2026.

---

### DEF-005: Cancel button visible for shipped orders

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-005                                             |
| **Title**        | Cancel button visible for shipped orders             |
| **Module**       | Order Tracking                                      |
| **Severity**     | Major                                               |
| **Priority**     | P2 – High                                           |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Log in with a test account that has existing orders in various statuses.
2. Navigate to "My Orders" page.
3. Locate an order with status "Shipped" (e.g., Order #ORD-20260315-0042).
4. Click on the order to view order details.
5. Observe the action buttons at the bottom of the order details page.

**Expected Result:**
For orders with status "Shipped", "Out for Delivery", or "Delivered", the "Cancel Order" button should not be displayed. Only "Track Shipment" and "Return/Refund" (for delivered orders) should be available.

**Actual Result:**
The "Cancel Order" button is visible and clickable for orders with "Shipped" status. Clicking it opens a cancellation confirmation dialog. If confirmed, the system attempts to cancel the order and returns an error from the backend, but the frontend still shows a "Cancellation Requested" message briefly.

**Screenshot:** *[Screenshot: Order details page for shipped order showing "Cancel Order" button]*

**Resolution Notes:**
Fixed in build v1.0.3. Developer added status-based conditional rendering for the Cancel button. Button is now hidden for orders with status "Shipped", "Out for Delivery", and "Delivered". Verified and closed on Mar 24, 2026.

---

### DEF-006: Cart quantity allows decimal values via keyboard input

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-006                                             |
| **Title**        | Cart quantity allows decimal values via keyboard input |
| **Module**       | Shopping Cart                                       |
| **Severity**     | Major                                               |
| **Priority**     | P2 – High                                           |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Log in and add any product to the cart.
2. Navigate to the Shopping Cart page.
3. Click on the quantity input field for any cart item.
4. Clear the existing value and type "1.5" using the keyboard.
5. Press Tab or click outside the input field to trigger the update.
6. Observe the quantity field and the cart total.

**Expected Result:**
The quantity field should only accept positive whole numbers (integers). Decimal input should be rejected or automatically rounded to the nearest integer. An appropriate validation message should be displayed.

**Actual Result:**
The quantity field accepts "1.5" as a valid input. The cart total recalculates based on 1.5 × item price, resulting in a fractional total. The increment/decrement buttons correctly enforce integers, but direct keyboard input does not.

**Screenshot:** *[Screenshot: Cart showing quantity "1.5" with calculated total of $134.99 for $89.99 item]*

**Resolution Notes:**
Fixed in build v1.0.4. Developer added `type="number"` with `step="1"` and `min="1"` attributes to the input field, along with a JavaScript handler that rounds any non-integer input to the nearest whole number on blur. Verified and closed on Mar 25, 2026.

---

### DEF-007: Registration allows password without uppercase letter

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-007                                             |
| **Title**        | Registration allows password without uppercase letter |
| **Module**       | User Registration                                   |
| **Severity**     | Minor                                               |
| **Priority**     | P3 – Medium                                         |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Navigate to the Registration page (`http://localhost:3000/register`).
2. Fill in all required fields:
   - Name: "Test User"
   - Email: "testpwd@shopease.com"
   - Phone: "555-0123"
   - Password: "test@1234" (no uppercase letter)
   - Confirm Password: "test@1234"
3. Click "Register".

**Expected Result:**
The system should display a validation error: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." Registration should not proceed.

**Actual Result:**
Registration completes successfully. User is redirected to the login page with a "Registration successful" message. The password "test@1234" was accepted despite missing an uppercase letter.

**Screenshot:** *[Screenshot: Registration success message after submitting password without uppercase]*

**Resolution Notes:**
Fixed in build v1.0.3. Developer updated the password validation regex from `/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/` to `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/` on both front-end and back-end. Verified and closed on Mar 22, 2026.

---

### DEF-008: Product price filter doesn't reset on category change

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-008                                             |
| **Title**        | Product price filter doesn't reset on category change |
| **Module**       | Search & Filter                                     |
| **Severity**     | Minor                                               |
| **Priority**     | P3 – Medium                                         |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Navigate to the "Electronics" category page.
2. Apply a price filter range of $50 – $200 using the price range slider.
3. Observe the filtered product listing (shows products within $50–$200 in Electronics).
4. Click on a different category from the sidebar (e.g., "Clothing").
5. Observe the price filter slider and the product listing.

**Expected Result:**
When switching to a new category, all filters should reset to their default state. The price range slider should return to the full range for the new category, and all products in the new category should be displayed.

**Actual Result:**
After switching to "Clothing", the price filter retains the $50–$200 range from the Electronics category. Products in Clothing outside this price range are not displayed. The user must manually clear the price filter.

**Screenshot:** *[Screenshot: Clothing category page still showing $50-$200 price filter from Electronics]*

**Resolution Notes:**
Fixed in build v1.0.4. Developer added a `useEffect` hook that resets all filter states when the category route parameter changes. Verified and closed on Mar 25, 2026.

---

### DEF-009: Order status tracker shows wrong date for "Confirmed" step

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-009                                             |
| **Title**        | Order status tracker shows wrong date for "Confirmed" step |
| **Module**       | Order Tracking                                      |
| **Severity**     | Minor                                               |
| **Priority**     | P3 – Medium                                         |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | In Progress                                         |

**Steps to Reproduce:**

1. Log in with a test account.
2. Navigate to "My Orders" page.
3. Click on any order that has progressed past the "Confirmed" status (e.g., Order #ORD-20260318-0056).
4. View the order status tracker/progress bar.
5. Hover over or click the "Confirmed" step to view the date.
6. Compare the displayed date with the order placement date.

**Expected Result:**
The "Confirmed" step should display the date when the order was confirmed by the system (typically 1–2 hours after placement for orders requiring verification). For Order #ORD-20260318-0056, order placed on Mar 18 at 2:15 PM and confirmed on Mar 18 at 3:42 PM.

**Actual Result:**
The "Confirmed" step displays the same date and time as the "Order Placed" step (Mar 18 at 2:15 PM). The confirmation timestamp from the backend is not being used; instead, the order creation timestamp is displayed for both steps.

**Screenshot:** *[Screenshot: Order tracker showing identical timestamps for "Order Placed" and "Confirmed" steps]*

**Resolution Notes:**
Development team has identified the issue in the order status mapper component. The `confirmed_at` field from the API response is being ignored in favor of `created_at`. Fix is in progress for build v1.0.5.

---

### DEF-010: Review star rating not highlighted on hover in Firefox

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-010                                             |
| **Title**        | Review star rating not highlighted on hover in Firefox |
| **Module**       | Ratings & Reviews                                   |
| **Severity**     | Minor                                               |
| **Priority**     | P3 – Medium                                         |
| **Environment**  | Firefox 132, Windows 10, http://localhost:3000       |
| **Status**       | Won't Fix                                           |

**Steps to Reproduce:**

1. Open Firefox browser (version 132).
2. Navigate to any product detail page.
3. Scroll to the "Ratings & Reviews" section.
4. Click "Write a Review".
5. Hover the mouse over the star rating icons (1 through 5).
6. Observe the visual feedback on hover.

**Expected Result:**
As the mouse hovers over each star, all stars from 1 up to the hovered star should highlight in gold/yellow color with a smooth transition, providing clear visual feedback of the rating being selected.

**Actual Result:**
In Firefox 132, hovering over the stars produces no visual change. The stars remain in their default grey state until clicked. Once clicked, the correct number of stars highlights. The hover effect works correctly in Chrome 134 and Edge 133.

**Screenshot:** *[Screenshot: Side-by-side comparison of star hover effect in Chrome (working) vs Firefox (not working)]*

**Resolution Notes:**
After review, the QA and development teams agreed that Firefox is **out of scope** for the current release (v1.0). The application's supported browsers are Chrome and Edge as documented in the project requirements. This defect is marked as **Won't Fix** for v1.0 and will be reassessed for v1.1 if Firefox support is added to the scope.

---

### DEF-011: Pagination shows page 0 when clicking previous on page 1

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-011                                             |
| **Title**        | Pagination shows page 0 when clicking previous on page 1 |
| **Module**       | Product Browsing                                    |
| **Severity**     | Minor                                               |
| **Priority**     | P3 – Medium                                         |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Closed                                              |

**Steps to Reproduce:**

1. Navigate to any product category with multiple pages of products (e.g., "Electronics" with 45 products at 12 per page).
2. Confirm you are on page 1 (URL shows `?page=1` or no page parameter).
3. Click the "Previous" button (left arrow) in the pagination controls.
4. Observe the URL and the product listing.

**Expected Result:**
The "Previous" button should be disabled or hidden when the user is on page 1. Clicking it should have no effect, and the user should remain on page 1.

**Actual Result:**
Clicking "Previous" on page 1 changes the URL to `?page=0`. The page displays an empty product listing with no products shown and no "No products found" message. The pagination controls still show, and clicking "Next" returns the user to page 1.

**Screenshot:** *[Screenshot: Empty product listing page with URL showing ?page=0]*

**Resolution Notes:**
Fixed in build v1.0.4. Developer added a boundary check: `Math.max(1, currentPage - 1)` and added a `disabled` attribute to the Previous button when on page 1. Verified and closed on Mar 26, 2026.

---

### DEF-012: Checkout success page missing order number

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-012                                             |
| **Title**        | Checkout success page missing order number           |
| **Module**       | Checkout                                            |
| **Severity**     | Trivial                                             |
| **Priority**     | P4 – Low                                            |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Retest                                              |

**Steps to Reproduce:**

1. Log in and add a product to the cart.
2. Proceed to checkout and fill in all required shipping and payment details.
3. Click "Place Order".
4. Wait for the order to be processed.
5. Observe the order confirmation/success page.

**Expected Result:**
The success page should display: "Thank you for your order!" along with the order number (e.g., "Order #ORD-20260325-0078"), estimated delivery date, and a link to track the order.

**Actual Result:**
The success page displays "Thank you for your order!" and the estimated delivery date, but the order number field shows blank/empty. The "Track Order" link is present and functions correctly when clicked.

**Screenshot:** *[Screenshot: Success page with blank space where order number should appear]*

**Resolution Notes:**
Fix deployed in build v1.0.5. Developer identified that the order creation API response includes the order ID, but the success page component was not reading the `order_number` field from the response payload. Currently in retest phase.

---

### DEF-013: Product card image has 2px misalignment on tablet view

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-013                                             |
| **Title**        | Product card image has 2px misalignment on tablet view |
| **Module**       | Product Browsing                                    |
| **Severity**     | Trivial                                             |
| **Priority**     | P4 – Low                                            |
| **Environment**  | Chrome 134 (Device Toolbar – iPad), Windows 10, http://localhost:3000 |
| **Status**       | Open                                                |

**Steps to Reproduce:**

1. Open Chrome DevTools (F12) and enable the Device Toolbar.
2. Select "iPad" or set a custom viewport of 768px × 1024px.
3. Navigate to any product category page (e.g., "Electronics").
4. Observe the product cards in the grid layout.
5. Compare the image alignment of product cards on tablet view versus desktop view (1920px width).

**Expected Result:**
Product card images should be consistently centered and aligned within their card containers across all viewport sizes, with no visible shift or offset.

**Actual Result:**
On tablet viewport (768px–1024px), all product card images shift approximately 2px to the left compared to their position on desktop. The misalignment is subtle but noticeable when switching between viewports. The issue appears to be related to the CSS grid gap calculation at the tablet breakpoint.

**Screenshot:** *[Screenshot: Overlay comparison showing 2px left shift of product images on tablet vs desktop]*

**Resolution Notes:**
Defect is open. Scheduled for the UI polish sprint in v1.1. Low impact on functionality and user experience.

---

### DEF-014: Footer links have inconsistent hover color

| Field            | Detail                                              |
|------------------|-----------------------------------------------------|
| **Defect ID**    | DEF-014                                             |
| **Title**        | Footer links have inconsistent hover color           |
| **Module**       | Product Browsing (Global Footer)                    |
| **Severity**     | Trivial                                             |
| **Priority**     | P4 – Low                                            |
| **Environment**  | Chrome 134, Windows 10, http://localhost:3000        |
| **Status**       | Open                                                |

**Steps to Reproduce:**

1. Navigate to the ShopEase homepage.
2. Scroll down to the footer section.
3. Hover the mouse over the "About Us" link and note the hover color.
4. Hover over the "Contact" link and note the hover color.
5. Hover over the "Privacy Policy" link and note the hover color.
6. Hover over the "Terms & Conditions" link and note the hover color.
7. Compare the hover colors using the browser's DevTools color picker.

**Expected Result:**
All footer links should use the same hover color as defined in the UI style guide: `#0066CC` (ShopEase brand blue).

**Actual Result:**
- "About Us" hover color: `#0066CC` (correct)
- "Contact" hover color: `#0066CC` (correct)
- "Privacy Policy" hover color: `#003399` (incorrect – darker blue)
- "Terms & Conditions" hover color: `#003399` (incorrect – darker blue)

The "Privacy Policy" and "Terms & Conditions" links appear to be using a different CSS class or an inline style that overrides the standard footer link styling.

**Screenshot:** *[Screenshot: DevTools showing different computed hover colors for footer links]*

**Resolution Notes:**
Defect is open. Root cause identified as the legal page links using a separate `.legal-links` CSS class with its own hover color. Scheduled for the UI polish sprint in v1.1.

---

## 5. Defect Lifecycle Tracker

The following table shows the status transitions for each defect from discovery through resolution:

| Defect ID | Lifecycle Transitions |
|-----------|-----------------------|
| DEF-001 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-002 | New → Open → In Progress → Fixed → **Retest** |
| DEF-003 | New → Open → **In Progress** |
| DEF-004 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-005 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-006 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-007 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-008 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-009 | New → Open → **In Progress** |
| DEF-010 | New → Open → **Won't Fix** (Out of Scope) |
| DEF-011 | New → Open → In Progress → Fixed → Retest → **Closed** |
| DEF-012 | New → Open → In Progress → Fixed → **Retest** |
| DEF-013 | New → **Open** |
| DEF-014 | New → **Open** |

**Summary:**
- 8 defects have completed the full lifecycle and are **Closed**.
- 2 defects are in **Retest** phase awaiting verification.
- 2 defects are **In Progress** with fixes being developed.
- 1 defect is marked **Won't Fix** (out of scope).
- 2 defects are **Open** and scheduled for a future sprint.

---

## 6. Defect Metrics

### 6.1 Severity Distribution

| Severity  | Count | Percentage |
|-----------|-------|------------|
| Critical  | 2     | 14.3%      |
| Major     | 4     | 28.6%      |
| Minor     | 5     | 35.7%      |
| Trivial   | 3     | 21.4%      |
| **Total** | **14** | **100%**  |

### 6.2 Priority Distribution

| Priority          | Count | Percentage |
|-------------------|-------|------------|
| P1 – Immediate    | 2     | 14.3%      |
| P2 – High         | 4     | 28.6%      |
| P3 – Medium       | 5     | 35.7%      |
| P4 – Low          | 3     | 21.4%      |
| **Total**         | **14** | **100%**  |

### 6.3 Module-wise Defect Count

| Module                  | Critical | Major | Minor | Trivial | Total |
|-------------------------|----------|-------|-------|---------|-------|
| User Registration       | 0        | 0     | 1     | 0       | 1     |
| Product Browsing        | 0        | 0     | 1     | 2       | 3     |
| Product Details         | 1        | 0     | 0     | 0       | 1     |
| Search & Filter         | 0        | 1     | 1     | 0       | 2     |
| Shopping Cart           | 1        | 1     | 0     | 0       | 2     |
| Checkout                | 1        | 0     | 0     | 1       | 2     |
| Order Tracking          | 0        | 1     | 1     | 0       | 2     |
| Ratings & Reviews       | 0        | 1     | 1     | 0       | 2     |
| **Total**               | **2**    | **4** | **5** | **3**   | **14** |

> **Note:** DEF-001 spans Product Details and Shopping Cart modules. It is counted once per primary module (Product Details) in the total but referenced in both modules for traceability.

### 6.4 Defect Status Summary

| Status        | Count | Percentage |
|---------------|-------|------------|
| Closed        | 8     | 57.1%      |
| In Progress   | 2     | 14.3%      |
| Retest        | 2     | 14.3%      |
| Open          | 2     | 14.3%      |
| Won't Fix     | 1     | —          |
| **Total**     | **14** (excl. Won't Fix: **13** active) | |

### 6.5 Defect Density

| Module                  | Test Cases | Defects | Defect Density (Defects/Test Cases) |
|-------------------------|------------|---------|-------------------------------------|
| User Registration       | 20         | 1       | 0.05                                |
| Product Browsing        | 19         | 3       | 0.16                                |
| Product Details         | 18         | 1       | 0.06                                |
| Search & Filter         | 19         | 2       | 0.11                                |
| Shopping Cart           | 20         | 2       | 0.10                                |
| Checkout                | 20         | 2       | 0.10                                |
| Order Tracking          | 18         | 2       | 0.11                                |
| Ratings & Reviews       | 18         | 2       | 0.11                                |
| **Overall**             | **152**    | **14**  | **0.09**                            |

---

## 7. Defect Trend

### Weekly Defect Discovery and Closure Trend

| Week   | Dates                  | New Defects | Closed Defects | Cumulative Open |
|--------|------------------------|-------------|----------------|-----------------|
| Week 1 | Mar 10 – Mar 14, 2026  | 8           | 0              | 8               |
| Week 2 | Mar 17 – Mar 21, 2026  | 4           | 5              | 7               |
| Week 3 | Mar 24 – Mar 27, 2026  | 2           | 6              | 3               |
| Week 4 | Mar 28 – Mar 28, 2026  | 0           | 3              | 0*              |

> *Note: 3 defects remaining (2 Open + 1 Won't Fix) are excluded from the "Cumulative Open" count as they are either deferred or out of scope. 2 defects in Retest are counted as closed upon successful verification.

```
Defect Trend Chart (New vs Closed):

  Week 1:  New ████████ (8)   Closed             (0)
  Week 2:  New ████     (4)   Closed █████        (5)
  Week 3:  New ██       (2)   Closed ██████       (6)
  Week 4:  New          (0)   Closed ███          (3)
```

**Trend Analysis:**
The defect discovery rate shows a clear downward trend, indicating improving software stability. Week 1 saw the highest number of new defects (8) as the initial test execution uncovered most issues. By Week 3, new defect discovery dropped to 2 (trivial issues only). The closure rate increased steadily from Week 2 onwards, demonstrating responsive development support. The overall trend is positive and indicates the application is approaching release readiness, pending resolution of the remaining open and in-progress defects.

---

## 8. Document Version History

| Version | Date             | Author         | Changes                       |
|---------|------------------|----------------|-------------------------------|
| 1.0     | March 28, 2026   | Yousuf Shekh   | Initial defect report          |

---

*End of Defect Report*
