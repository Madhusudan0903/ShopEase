# Test Cases — Checkout & Payment Module

**Application:** ShopEase  
**Module:** Checkout & Payment  
**Version:** 1.0  
**Author:** QA Team  
**Date:** 2026-03-28  

---

## TC_CO_001 — Complete Checkout with Valid Shipping, Credit Card, and Place Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_001 |
| **Module** | Checkout & Payment |
| **Description** | Verify the complete 3-step checkout flow (Shipping → Payment → Review & Place Order) with valid data, credit card payment, and successful order placement. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Wireless Mouse" (qty 1, ₹599) and "USB Keyboard" (qty 1, ₹449). Total: ₹1048 + tax. Both products are in stock. |
| **Test Steps** | 1. Navigate to the Shopping Cart and click "Proceed to Checkout".<br>2. **Step 1 — Shipping:** Enter Address Line 1: "42 MG Road", City: "Bengaluru", State: "Karnataka", Zip: "560001".<br>3. Click "Continue to Payment".<br>4. **Step 2 — Payment:** Select "Credit Card". Enter Card Number: "4111111111111111", Expiry: "12/28", CVV: "123".<br>5. Click "Continue to Review".<br>6. **Step 3 — Review:** Verify items, address, payment method, and total are displayed correctly.<br>7. Click "Place Order". |
| **Test Data** | Address: 42 MG Road, Bengaluru, Karnataka, 560001. Card: 4111111111111111, Exp: 12/28, CVV: 123. Payment Method: credit_card. |
| **Expected Result** | Order is placed successfully. Order confirmation page displays order number, items, total. Stock is decremented for both products. Cart is cleared. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_002 — Checkout with UPI Payment Method

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_002 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a user can complete checkout by selecting UPI as the payment method. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Laptop Stand" (qty 1, ₹1299). Product is in stock. |
| **Test Steps** | 1. Click "Proceed to Checkout" from the cart.<br>2. Enter shipping address — Line 1: "15 Park Street", City: "Kolkata", State: "West Bengal", Zip: "700016".<br>3. Click "Continue to Payment".<br>4. Select "UPI" as the payment method.<br>5. Click "Continue to Review".<br>6. Review order details and click "Place Order". |
| **Test Data** | Address: 15 Park Street, Kolkata, West Bengal, 700016. Payment Method: upi. |
| **Expected Result** | Order is placed successfully. Confirmation page shows payment method as "UPI". Cart is cleared. Stock decremented by 1. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_003 — Checkout with Cash on Delivery (COD)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_003 |
| **Module** | Checkout & Payment |
| **Description** | Verify checkout completion using Cash on Delivery payment method, which should not require card details. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Phone Cable" (qty 2, ₹199 each). Products are in stock. |
| **Test Steps** | 1. Click "Proceed to Checkout".<br>2. Enter shipping — Line 1: "88 Linking Road", City: "Mumbai", State: "Maharashtra", Zip: "400050".<br>3. Click "Continue to Payment".<br>4. Select "Cash on Delivery" (COD).<br>5. Verify that no card form fields are displayed.<br>6. Click "Continue to Review".<br>7. Verify order details and click "Place Order". |
| **Test Data** | Address: 88 Linking Road, Mumbai, Maharashtra, 400050. Payment Method: cod. |
| **Expected Result** | Order is placed. No card fields were shown for COD. Confirmation shows payment method as "Cash on Delivery". Cart is cleared. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_004 — Checkout with Debit Card Payment

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_004 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a user can successfully check out using a debit card with valid card details. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart contains "Desk Organizer" (qty 1, ₹500). Product is in stock. |
| **Test Steps** | 1. Click "Proceed to Checkout".<br>2. Enter shipping — Line 1: "7 Anna Salai", City: "Chennai", State: "Tamil Nadu", Zip: "600002".<br>3. Click "Continue to Payment".<br>4. Select "Debit Card". Enter Card Number: "5500000000000004", Expiry: "06/27", CVV: "456".<br>5. Click "Continue to Review".<br>6. Verify order details and click "Place Order". |
| **Test Data** | Address: 7 Anna Salai, Chennai, Tamil Nadu, 600002. Card: 5500000000000004, Exp: 06/27, CVV: 456. Payment Method: debit_card. |
| **Expected Result** | Order placed successfully. Confirmation shows payment method as "Debit Card". Cart is cleared. Stock is decremented. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_005 — Review Step Displays Correct Order Summary

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_005 |
| **Module** | Checkout & Payment |
| **Description** | Verify that the Review & Place Order step accurately displays all items, shipping address, selected payment method, and total amount. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User has completed Step 1 (Shipping) and Step 2 (Payment) with valid data. Cart has "Wireless Mouse" (qty 2, ₹599 each) and "Laptop Stand" (qty 1, ₹1299). |
| **Test Steps** | 1. On the Review step, verify the items list shows both products with correct quantities and prices.<br>2. Verify shipping address shows "42 MG Road, Bengaluru, Karnataka, 560001".<br>3. Verify payment method shows "Credit Card".<br>4. Verify the total calculation: Subtotal ₹2497 + Shipping ₹0 + Tax ₹449.46 = ₹2946.46. |
| **Test Data** | Items: Wireless Mouse (2 × ₹599), Laptop Stand (1 × ₹1299). Address: 42 MG Road, Bengaluru, Karnataka, 560001. Payment: Credit Card. |
| **Expected Result** | Review page displays all items with correct details, the full shipping address, "Credit Card" as payment method, and total ₹2946.46. |
| **Test Design Technique** | Decision Table |

---

## TC_CO_006 — Submit Shipping Form with Address Line 1 Empty

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_006 |
| **Module** | Checkout & Payment |
| **Description** | Verify that the shipping step rejects submission when the required Address Line 1 field is left empty. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Cart has items. User is on Step 1 (Shipping). |
| **Test Steps** | 1. Leave "Address Line 1" field empty.<br>2. Enter City: "Delhi", State: "Delhi", Zip: "110001".<br>3. Click "Continue to Payment". |
| **Test Data** | Address Line 1: (empty), City: Delhi, State: Delhi, Zip: 110001 |
| **Expected Result** | Form does not proceed to Step 2. Validation error "Address Line 1 is required" is displayed below the field. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_007 — Submit Shipping Form with Missing City

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_007 |
| **Module** | Checkout & Payment |
| **Description** | Verify that the shipping step rejects submission when the City field is empty. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Cart has items. User is on Step 1 (Shipping). |
| **Test Steps** | 1. Enter Address Line 1: "10 Rajpath".<br>2. Leave City field empty.<br>3. Enter State: "Delhi", Zip: "110001".<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 10 Rajpath, City: (empty), State: Delhi, Zip: 110001 |
| **Expected Result** | Form does not proceed. Validation error "City is required" is displayed. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_008 — Submit Shipping Form with Invalid Zip Code (Non-Numeric)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_008 |
| **Module** | Checkout & Payment |
| **Description** | Verify that the zip code field rejects non-numeric input. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Enter Address Line 1: "22 Connaught Place".<br>2. Enter City: "Delhi", State: "Delhi".<br>3. Enter Zip: "ABCDE".<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 22 Connaught Place, City: Delhi, State: Delhi, Zip: ABCDE |
| **Expected Result** | Validation error "Zip code must be 5-6 digits" is displayed. Form does not proceed. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_009 — Submit Shipping Form with Zip Code Too Short (4 Digits)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_009 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a zip code with fewer than 5 digits is rejected. |
| **Priority** | Medium |
| **Test Type** | Negative |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Enter Address Line 1: "5 Brigade Road".<br>2. Enter City: "Bengaluru", State: "Karnataka".<br>3. Enter Zip: "5600" (4 digits).<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 5 Brigade Road, City: Bengaluru, State: Karnataka, Zip: 5600 |
| **Expected Result** | Validation error "Zip code must be 5-6 digits" is displayed. Form does not advance. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_CO_010 — Zip Code Boundary — Exactly 5 Digits (Valid Minimum)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_010 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a 5-digit zip code is accepted as a valid minimum-length zip code. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Enter Address Line 1: "12 Lal Bagh Road".<br>2. Enter City: "Bengaluru", State: "Karnataka".<br>3. Enter Zip: "56001".<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 12 Lal Bagh Road, City: Bengaluru, State: Karnataka, Zip: 56001 |
| **Expected Result** | Shipping form is accepted. User proceeds to Step 2 (Payment). No validation errors shown. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_CO_011 — Zip Code Boundary — Exactly 6 Digits (Valid Maximum)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_011 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a 6-digit zip code is accepted as a valid maximum-length zip code. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Enter Address Line 1: "99 Carter Road".<br>2. Enter City: "Mumbai", State: "Maharashtra".<br>3. Enter Zip: "400050".<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 99 Carter Road, City: Mumbai, State: Maharashtra, Zip: 400050 |
| **Expected Result** | Shipping form is accepted. User advances to Step 2. No validation errors. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_CO_012 — Zip Code Boundary — 7 Digits (Exceeds Maximum)

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_012 |
| **Module** | Checkout & Payment |
| **Description** | Verify that a zip code with more than 6 digits is rejected. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Enter Address Line 1: "33 Hill Road".<br>2. Enter City: "Mumbai", State: "Maharashtra".<br>3. Enter Zip: "4000501" (7 digits).<br>4. Click "Continue to Payment". |
| **Test Data** | Address Line 1: 33 Hill Road, City: Mumbai, State: Maharashtra, Zip: 4000501 |
| **Expected Result** | Validation error "Zip code must be 5-6 digits" is displayed. Form does not advance. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_CO_013 — Attempt Checkout with Empty Cart

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_013 |
| **Module** | Checkout & Payment |
| **Description** | Verify that users cannot initiate checkout when the cart is empty. |
| **Priority** | High |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. Cart contains no items. |
| **Test Steps** | 1. Navigate to the Shopping Cart page (empty).<br>2. Attempt to click "Proceed to Checkout" (if visible).<br>3. Alternatively, navigate directly to the checkout URL. |
| **Test Data** | Cart items: 0 |
| **Expected Result** | "Proceed to Checkout" button is disabled or hidden. If the user navigates to the checkout URL directly, they are redirected back to the cart with a message "Your cart is empty. Add items before checkout." |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_014 — Place Order When Product Goes Out of Stock During Checkout

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_014 |
| **Module** | Checkout & Payment |
| **Description** | Verify that stock availability is validated at the time of placing the order, and an appropriate error is shown if stock is insufficient. |
| **Priority** | High |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. Cart contains "Limited Edition Mug" (qty 2, ₹350 each). Current stock of "Limited Edition Mug" is 2. Another user purchases the last 2 mugs while this user is on the Review step. |
| **Test Steps** | 1. Complete Step 1 (Shipping) and Step 2 (Payment) with valid data.<br>2. On Step 3 (Review), simulate the stock being depleted (stock becomes 0 via concurrent purchase).<br>3. Click "Place Order". |
| **Test Data** | Product: Limited Edition Mug, Cart Qty: 2, Available Stock at Place Order: 0 |
| **Expected Result** | Order is NOT placed. An error message such as "Limited Edition Mug is no longer available in the requested quantity" is displayed. User is prompted to update their cart. |
| **Test Design Technique** | State Transition |

---

## TC_CO_015 — Place Order Clears Cart and Decrements Stock

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_015 |
| **Module** | Checkout & Payment |
| **Description** | Verify that after a successful order placement, the cart is emptied and the product stock in the database is decremented by the ordered quantities. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Cart has "Wireless Mouse" (qty 2, stock before: 25) and "USB Keyboard" (qty 1, stock before: 30). Checkout steps 1-2 completed with valid data. |
| **Test Steps** | 1. On Step 3 (Review), click "Place Order".<br>2. Verify order confirmation is displayed.<br>3. Navigate to the Shopping Cart page.<br>4. Check the product stock for "Wireless Mouse" and "USB Keyboard" (via product page or admin). |
| **Test Data** | Wireless Mouse: ordered 2, stock before: 25. USB Keyboard: ordered 1, stock before: 30. |
| **Expected Result** | Order confirmation displayed. Cart is now empty ("Your cart is empty"). Wireless Mouse stock: 23. USB Keyboard stock: 29. |
| **Test Design Technique** | State Transition |

---

## TC_CO_016 — Navigate Back from Payment Step to Shipping Step

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_016 |
| **Module** | Checkout & Payment |
| **Description** | Verify that the user can navigate back from Step 2 (Payment) to Step 1 (Shipping) and the previously entered shipping data is preserved. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User completed Step 1 with valid shipping data and is currently on Step 2 (Payment). |
| **Test Steps** | 1. On the Payment step, click the "Back" button or the Shipping step indicator.<br>2. Observe the Shipping form fields. |
| **Test Data** | Previously entered — Line 1: "42 MG Road", City: "Bengaluru", State: "Karnataka", Zip: "560001" |
| **Expected Result** | User returns to Step 1. All previously entered shipping fields retain their values: Line 1 "42 MG Road", City "Bengaluru", State "Karnataka", Zip "560001". |
| **Test Design Technique** | State Transition |

---

## TC_CO_017 — Submit Shipping Form with All Fields Empty

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_017 |
| **Module** | Checkout & Payment |
| **Description** | Verify that submitting the shipping form with all required fields empty shows validation errors for every field. |
| **Priority** | Medium |
| **Test Type** | Negative |
| **Preconditions** | User is on Step 1 (Shipping). Cart has items. |
| **Test Steps** | 1. Leave Address Line 1, City, State, and Zip all empty.<br>2. Click "Continue to Payment". |
| **Test Data** | Address Line 1: (empty), City: (empty), State: (empty), Zip: (empty) |
| **Expected Result** | Form does not advance. Validation errors displayed for each field: "Address Line 1 is required", "City is required", "State is required", "Zip code is required". |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_CO_018 — Payment Method Selection Shows Correct Form Fields

| Field | Content |
|---|---|
| **Test Case ID** | TC_CO_018 |
| **Module** | Checkout & Payment |
| **Description** | Verify that selecting different payment methods displays the appropriate form fields — card details for credit/debit card and no additional fields for UPI/COD. |
| **Priority** | Medium |
| **Test Type** | Positive |
| **Preconditions** | User is on Step 2 (Payment). |
| **Test Steps** | 1. Select "Credit Card" — observe form fields.<br>2. Select "Debit Card" — observe form fields.<br>3. Select "UPI" — observe form fields.<br>4. Select "Cash on Delivery" — observe form fields. |
| **Test Data** | Payment methods: credit_card, debit_card, upi, cod |
| **Expected Result** | Credit Card & Debit Card: fields for Card Number, Expiry, CVV are displayed. UPI: no card form fields (or a UPI ID field). COD: no additional payment fields. |
| **Test Design Technique** | Decision Table |

---
