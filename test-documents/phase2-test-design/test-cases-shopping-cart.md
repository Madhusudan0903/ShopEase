# Test Cases — Shopping Cart Module

**Application:** ShopEase  
**Module:** Shopping Cart  
**Version:** 1.0  
**Author:** QA Team  
**Date:** 2026-03-28  

---

## TC_SC_001 — Add a Single Product to Empty Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_001 |
| **Module** | Shopping Cart |
| **Description** | Verify that a logged-in user can add a single in-stock product to an empty cart and the cart reflects the correct item details. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart is empty. Product "Wireless Mouse" (₹599, stock: 25) exists and is in stock. |
| **Test Steps** | 1. Navigate to the product listing page.<br>2. Click on "Wireless Mouse" to open the product detail page.<br>3. Click the "Add to Cart" button.<br>4. Navigate to the Shopping Cart page. |
| **Test Data** | Product: Wireless Mouse, Price: ₹599, Quantity: 1 |
| **Expected Result** | Cart displays 1 item — "Wireless Mouse" with product image, name "Wireless Mouse", price ₹599, quantity 1, and subtotal ₹599. Cart badge shows count "1". |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_002 — Add Multiple Different Products to Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_002 |
| **Module** | Shopping Cart |
| **Description** | Verify that a user can add multiple different products to the cart and each item is listed separately with correct details. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart is empty. Products "Wireless Mouse" (₹599), "USB Keyboard" (₹449), and "Laptop Stand" (₹1299) are in stock. |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page and click "Add to Cart".<br>2. Navigate to "USB Keyboard" product page and click "Add to Cart".<br>3. Navigate to "Laptop Stand" product page and click "Add to Cart".<br>4. Open the Shopping Cart page. |
| **Test Data** | Product 1: Wireless Mouse ₹599, Product 2: USB Keyboard ₹449, Product 3: Laptop Stand ₹1299 |
| **Expected Result** | Cart displays 3 separate line items with correct image, name, price, quantity (1 each), and subtotal for each. Cart badge shows "3". |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_003 — Add Duplicate Product Updates Quantity Instead of Creating New Entry

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_003 |
| **Module** | Shopping Cart |
| **Description** | Verify that adding an already-carted product increments its quantity by 1 instead of creating a duplicate line item. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. "Wireless Mouse" (₹599, stock: 25) is already in the cart with quantity 1. |
| **Test Steps** | 1. Navigate to the "Wireless Mouse" product detail page.<br>2. Click "Add to Cart" again.<br>3. Open the Shopping Cart page. |
| **Test Data** | Product: Wireless Mouse, Price: ₹599, Expected Quantity: 2 |
| **Expected Result** | Cart still shows a single line item for "Wireless Mouse" with quantity updated to 2 and subtotal updated to ₹1198. No duplicate entry is created. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_004 — Remove a Single Item from Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_004 |
| **Module** | Shopping Cart |
| **Description** | Verify that a user can remove a specific item from the cart while other items remain unaffected. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Wireless Mouse" (qty 1, ₹599) and "USB Keyboard" (qty 1, ₹449). |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Click the "Remove" button next to "Wireless Mouse".<br>3. Observe the cart contents. |
| **Test Data** | Item to remove: Wireless Mouse |
| **Expected Result** | "Wireless Mouse" is removed from the cart. "USB Keyboard" remains with correct details. Cart badge updates to "1". Order summary recalculates accordingly. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_005 — Clear Entire Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_005 |
| **Module** | Shopping Cart |
| **Description** | Verify that the "Clear Cart" action removes all items and displays the empty cart message. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains 3 items: Wireless Mouse, USB Keyboard, Laptop Stand. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Click the "Clear Cart" button.<br>3. Confirm the action if a confirmation dialog appears.<br>4. Observe the cart page. |
| **Test Data** | N/A |
| **Expected Result** | All items are removed. Page displays "Your cart is empty" message. Cart badge shows "0" or disappears. Order summary resets to ₹0. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_006 — Order Summary with Free Shipping (Subtotal > ₹500)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_006 |
| **Module** | Shopping Cart |
| **Description** | Verify that order summary calculates subtotal, applies free shipping for orders over ₹500, adds 18% GST, and shows correct total. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Laptop Stand" with quantity 1 at ₹1299. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Review the Order Summary section. |
| **Test Data** | Subtotal: ₹1299, Shipping: ₹0 (free, subtotal > ₹500), Tax (18% GST): ₹233.82, Total: ₹1532.82 |
| **Expected Result** | Order Summary shows Subtotal: ₹1299, Shipping: FREE, Tax (18% GST): ₹233.82, Total: ₹1532.82. Shipping line displays "FREE" label. |
| **Test Design Technique** | Decision Table |

---

## TC_SC_007 — Add Out-of-Stock Product to Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_007 |
| **Module** | Shopping Cart |
| **Description** | Verify that a product with zero stock cannot be added to the cart. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Product "Vintage Headphones" has stock: 0 and is marked as "Out of Stock". |
| **Test Steps** | 1. Navigate to the "Vintage Headphones" product detail page.<br>2. Observe the "Add to Cart" button state.<br>3. Attempt to click "Add to Cart" (if visible). |
| **Test Data** | Product: Vintage Headphones, Stock: 0 |
| **Expected Result** | "Add to Cart" button is disabled or replaced with "Out of Stock" label. No item is added to the cart. No error page is displayed. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_008 — Increase Quantity Beyond Maximum Limit (Max 10)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_008 |
| **Module** | Shopping Cart |
| **Description** | Verify that the quantity cannot exceed the maximum allowed value of 10 using the "+" button. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. "Wireless Mouse" (stock: 25) is in cart with quantity 10. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Locate "Wireless Mouse" with quantity 10.<br>3. Click the "+" button to increase quantity. |
| **Test Data** | Product: Wireless Mouse, Current Quantity: 10, Attempted Quantity: 11 |
| **Expected Result** | Quantity remains at 10. The "+" button is either disabled or an inline message "Maximum quantity (10) reached" is displayed. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_009 — Decrease Quantity Below Minimum (Min 1)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_009 |
| **Module** | Shopping Cart |
| **Description** | Verify that the quantity cannot be decreased below 1 using the "−" button. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. "USB Keyboard" (₹449) is in cart with quantity 1. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Locate "USB Keyboard" with quantity 1.<br>3. Click the "−" button to decrease quantity. |
| **Test Data** | Product: USB Keyboard, Current Quantity: 1, Attempted Quantity: 0 |
| **Expected Result** | Quantity remains at 1. The "−" button is disabled or does not respond. Item is not removed from the cart via the "−" button. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_010 — Increase Quantity Beyond Available Stock

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_010 |
| **Module** | Shopping Cart |
| **Description** | Verify that the cart quantity cannot exceed the product's current stock level, even if the stock is below the max limit of 10. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Product "Limited Edition Mug" has stock: 3 and is in the cart with quantity 3. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Locate "Limited Edition Mug" with quantity 3.<br>3. Click the "+" button to increase quantity to 4. |
| **Test Data** | Product: Limited Edition Mug, Stock: 3, Current Quantity: 3, Attempted Quantity: 4 |
| **Expected Result** | Quantity remains at 3. A message such as "Only 3 items available in stock" is displayed. The "+" button is disabled. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_011 — Order Summary with Paid Shipping (Subtotal < ₹500)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_011 |
| **Module** | Shopping Cart |
| **Description** | Verify that a shipping fee is charged when the cart subtotal is below ₹500. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. Cart contains "Phone Cable" with quantity 1 at ₹199. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Review the Order Summary section. |
| **Test Data** | Subtotal: ₹199, Shipping: ₹50 (standard charge, subtotal < ₹500), Tax (18% GST): ₹35.82, Total: ₹284.82 |
| **Expected Result** | Order Summary shows Subtotal: ₹199, Shipping: ₹50, Tax (18% GST): ₹35.82, Total: ₹284.82. No "FREE" label on shipping. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_012 — Shipping Threshold Boundary — Subtotal Exactly ₹500

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_012 |
| **Module** | Shopping Cart |
| **Description** | Verify the shipping fee behavior when the cart subtotal is exactly ₹500 (the free-shipping threshold). |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. Cart contains "Desk Organizer" priced at ₹500, quantity 1. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Review the Order Summary section for shipping charges. |
| **Test Data** | Subtotal: ₹500, Expected Shipping: ₹0 (free, subtotal ≥ ₹500), Tax (18% GST): ₹90.00, Total: ₹590.00 |
| **Expected Result** | Shipping is displayed as "FREE". Total = ₹500 + ₹0 + ₹90.00 = ₹590.00. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_013 — Shipping Threshold Boundary — Subtotal ₹499

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_013 |
| **Module** | Shopping Cart |
| **Description** | Verify that shipping is charged when the subtotal is ₹499, just below the ₹500 free-shipping threshold. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. Cart contains "Notebook Set" priced at ₹499, quantity 1. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Review the Order Summary section for shipping charges. |
| **Test Data** | Subtotal: ₹499, Expected Shipping: ₹50, Tax (18% GST): ₹89.82, Total: ₹638.82 |
| **Expected Result** | Shipping is ₹50 (not free). Total = ₹499 + ₹50 + ₹89.82 = ₹638.82. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_SC_014 — Cart Persistence Across Sessions (DB Storage)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_014 |
| **Module** | Shopping Cart |
| **Description** | Verify that the cart contents persist after the user logs out and logs back in, since the cart is stored in the database. |
| **Priority** | High |
| **Test Type** | Edge |
| **Preconditions** | User "testuser@shopease.com" is logged in. Cart contains "Wireless Mouse" (qty 2, ₹599 each) and "USB Keyboard" (qty 1, ₹449). |
| **Test Steps** | 1. Open the Shopping Cart page and note the items, quantities, and totals.<br>2. Log out of the application.<br>3. Close the browser completely.<br>4. Reopen the browser and navigate to ShopEase.<br>5. Log in with "testuser@shopease.com" / "Test@1234".<br>6. Open the Shopping Cart page. |
| **Test Data** | User: testuser@shopease.com, Password: Test@1234 |
| **Expected Result** | Cart displays the same items — "Wireless Mouse" (qty 2) and "USB Keyboard" (qty 1) — with identical prices, quantities, and order summary totals as before logout. |
| **Test Design Technique** | State Transition |

---

## TC_SC_015 — Empty Cart Displays Appropriate Message

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_015 |
| **Module** | Shopping Cart |
| **Description** | Verify that navigating to the cart page with no items shows the "Your cart is empty" message and a call-to-action to browse products. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. Cart contains no items (freshly registered account or cart was cleared). |
| **Test Steps** | 1. Log in to the application.<br>2. Navigate directly to the Shopping Cart page via the cart icon or URL. |
| **Test Data** | N/A |
| **Expected Result** | Page displays "Your cart is empty" message. A "Continue Shopping" or "Browse Products" link/button is visible. No order summary or item rows are rendered. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_016 — Update Quantity Using "+" Button (Normal Increment)

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_016 |
| **Module** | Shopping Cart |
| **Description** | Verify that clicking the "+" button increments the quantity by 1 and the subtotal recalculates correctly. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. "Laptop Stand" (₹1299, stock: 15) is in cart with quantity 1. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Locate "Laptop Stand" row.<br>3. Click the "+" button once.<br>4. Observe quantity and subtotal. |
| **Test Data** | Product: Laptop Stand, Price: ₹1299, Initial Quantity: 1, New Quantity: 2 |
| **Expected Result** | Quantity updates from 1 to 2. Subtotal updates from ₹1299 to ₹2598. Order summary total recalculates to reflect the change. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_017 — Cart Line Item Displays All Required Details

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_017 |
| **Module** | Shopping Cart |
| **Description** | Verify that each cart line item displays product image, name, unit price, quantity selector, and line subtotal. |
| **Priority** | Medium |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Wireless Mouse" (qty 1, ₹599). |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Inspect the "Wireless Mouse" row for all required fields. |
| **Test Data** | Product: Wireless Mouse, Price: ₹599, Quantity: 1, Subtotal: ₹599 |
| **Expected Result** | The row shows: a product thumbnail image, product name "Wireless Mouse", unit price ₹599, quantity "1" with +/− controls, and a subtotal of ₹599. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_SC_018 — Rapid Consecutive Clicks on "+" Button

| Field | Content |
|---|---|
| **Test Case ID** | TC_SC_018 |
| **Module** | Shopping Cart |
| **Description** | Verify that rapidly clicking the "+" button multiple times in quick succession correctly updates the quantity without duplication or race conditions. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. "Wireless Mouse" (₹599, stock: 25) is in cart with quantity 1. |
| **Test Steps** | 1. Open the Shopping Cart page.<br>2. Rapidly click the "+" button 5 times in quick succession on "Wireless Mouse". |
| **Test Data** | Product: Wireless Mouse, Initial Quantity: 1, Rapid Clicks: 5 |
| **Expected Result** | Quantity updates to exactly 6 (1 + 5). No duplicate network requests cause over-increment. Subtotal shows ₹3594. No UI flickering or errors. |
| **Test Design Technique** | Equivalence Partitioning |

---
