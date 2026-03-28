# Test Cases — Order Tracking Module

**Application:** ShopEase  
**Module:** Order Tracking  
**Version:** 1.0  
**Author:** QA Team  
**Date:** 2026-03-28  

---

## TC_OT_001 — View My Orders Page with Multiple Orders

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_001 |
| **Module** | Order Tracking |
| **Description** | Verify that the My Orders page lists all orders belonging to the logged-in user with order number, date, total, and status badge. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User "testuser@shopease.com" is logged in. User has 3 existing orders: ORD-1001 (Placed), ORD-1002 (Shipped), ORD-1003 (Delivered). |
| **Test Steps** | 1. Navigate to "My Orders" page from the user menu.<br>2. Observe the list of orders displayed. |
| **Test Data** | User: testuser@shopease.com. Orders: ORD-1001 (2026-03-20, ₹1532.82, Placed), ORD-1002 (2026-03-15, ₹946.46, Shipped), ORD-1003 (2026-03-01, ₹590.00, Delivered). |
| **Expected Result** | All 3 orders are displayed in a list/table. Each row shows the order number, date, total amount, and a color-coded status badge. Orders are sorted by date (newest first). |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_002 — View Order Detail Page

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_002 |
| **Module** | Order Tracking |
| **Description** | Verify that clicking an order on the My Orders page opens the detail page showing items, quantities, prices, shipping address, payment method, and order notes. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1001 exists with items: "Wireless Mouse" (qty 2, ₹599 each), "USB Keyboard" (qty 1, ₹449). Shipping: 42 MG Road, Bengaluru, Karnataka, 560001. Payment: Credit Card. Notes: "Please deliver before 5 PM". |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1001. |
| **Test Data** | Order: ORD-1001 |
| **Expected Result** | Detail page shows: Items section with "Wireless Mouse" (qty 2, ₹599 each, subtotal ₹1198) and "USB Keyboard" (qty 1, ₹449, subtotal ₹449). Shipping address: "42 MG Road, Bengaluru, Karnataka, 560001". Payment method: "Credit Card". Order notes: "Please deliver before 5 PM". |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_003 — Status Tracker Shows Correct Visual Stepper for "Placed" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_003 |
| **Module** | Order Tracking |
| **Description** | Verify that the status tracker stepper highlights only the "Placed" step for a newly placed order. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1001 has status "Placed" with date 2026-03-20. |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1001.<br>3. Observe the status tracker stepper. |
| **Test Data** | Order: ORD-1001, Status: Placed, Date: 2026-03-20 |
| **Expected Result** | Status tracker displays 5 steps: Placed → Confirmed → Shipped → Out for Delivery → Delivered. Only "Placed" is highlighted/active with date "2026-03-20". Remaining steps are greyed out/inactive. |
| **Test Design Technique** | State Transition |

---

## TC_OT_004 — Status Tracker Shows Progress for "Shipped" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_004 |
| **Module** | Order Tracking |
| **Description** | Verify that the status tracker stepper correctly highlights completed steps up to "Shipped" for a shipped order. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1002 has status "Shipped". Status history: Placed (2026-03-15), Confirmed (2026-03-16), Shipped (2026-03-17). |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1002.<br>3. Observe the status tracker stepper. |
| **Test Data** | Order: ORD-1002, Current Status: Shipped |
| **Expected Result** | Steps "Placed", "Confirmed", and "Shipped" are highlighted with their respective dates. "Out for Delivery" and "Delivered" remain greyed out. |
| **Test Design Technique** | State Transition |

---

## TC_OT_005 — Status Tracker Shows All Steps Completed for "Delivered" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_005 |
| **Module** | Order Tracking |
| **Description** | Verify that the status tracker shows all 5 steps as completed for a delivered order. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1003 has status "Delivered". All steps have dates. |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1003.<br>3. Observe the status tracker stepper. |
| **Test Data** | Order: ORD-1003. Dates — Placed: 2026-03-01, Confirmed: 2026-03-02, Shipped: 2026-03-03, Out for Delivery: 2026-03-05, Delivered: 2026-03-06. |
| **Expected Result** | All 5 steps (Placed, Confirmed, Shipped, Out for Delivery, Delivered) are highlighted/completed with their respective dates. Status badge shows "Delivered" in green. |
| **Test Design Technique** | State Transition |

---

## TC_OT_006 — Cancel Order in "Placed" Status

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_006 |
| **Module** | Order Tracking |
| **Description** | Verify that a user can cancel an order that is in "Placed" status and the status updates to "Cancelled". |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1004 has status "Placed". |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1004.<br>3. Click the "Cancel Order" button.<br>4. Confirm the cancellation in the dialog (if any).<br>5. Observe the order status. |
| **Test Data** | Order: ORD-1004, Current Status: Placed |
| **Expected Result** | Order status changes to "Cancelled". Status badge shows "Cancelled" in red. "Cancel Order" button is no longer visible. Stock is restored for the ordered items. |
| **Test Design Technique** | State Transition |

---

## TC_OT_007 — Cancel Order in "Confirmed" Status

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_007 |
| **Module** | Order Tracking |
| **Description** | Verify that a user can cancel an order that is in "Confirmed" status. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. Order ORD-1005 has status "Confirmed". |
| **Test Steps** | 1. Navigate to "My Orders" and click on order ORD-1005.<br>2. Verify "Cancel Order" button is visible.<br>3. Click "Cancel Order" and confirm. |
| **Test Data** | Order: ORD-1005, Current Status: Confirmed |
| **Expected Result** | Order status changes to "Cancelled". Badge updates to "Cancelled". Cancel button disappears. |
| **Test Design Technique** | State Transition |

---

## TC_OT_008 — Cancel Button Not Visible for "Shipped" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_008 |
| **Module** | Order Tracking |
| **Description** | Verify that the "Cancel Order" button is not displayed for an order that has already been shipped. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Order ORD-1002 has status "Shipped". |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1002.<br>3. Look for the "Cancel Order" button on the detail page. |
| **Test Data** | Order: ORD-1002, Status: Shipped |
| **Expected Result** | "Cancel Order" button is not visible or not present in the DOM. No cancellation option is available for shipped orders. |
| **Test Design Technique** | Decision Table |

---

## TC_OT_009 — Cancel Button Not Visible for "Delivered" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_009 |
| **Module** | Order Tracking |
| **Description** | Verify that the "Cancel Order" button is hidden for a delivered order. |
| **Priority** | Medium |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Order ORD-1003 has status "Delivered". |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Click on order ORD-1003.<br>3. Look for the "Cancel Order" button. |
| **Test Data** | Order: ORD-1003, Status: Delivered |
| **Expected Result** | "Cancel Order" button is not displayed. Only order details and status tracker are visible. |
| **Test Design Technique** | Decision Table |

---

## TC_OT_010 — Cancel Button Not Visible for "Out for Delivery" Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_010 |
| **Module** | Order Tracking |
| **Description** | Verify that the "Cancel Order" button is not displayed when order status is "Out for Delivery". |
| **Priority** | Medium |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. Order ORD-1006 has status "Out for Delivery". |
| **Test Steps** | 1. Navigate to "My Orders" and click on order ORD-1006.<br>2. Look for the "Cancel Order" button. |
| **Test Data** | Order: ORD-1006, Status: Out for Delivery |
| **Expected Result** | "Cancel Order" button is not present. The order cannot be cancelled at this stage. |
| **Test Design Technique** | Decision Table |

---

## TC_OT_011 — User Cannot View Another User's Orders

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_011 |
| **Module** | Order Tracking |
| **Description** | Verify that a user cannot access another user's order details by manipulating the URL with a different order ID. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User A ("userA@shopease.com") is logged in. Order ORD-2001 belongs to User B ("userB@shopease.com"). |
| **Test Steps** | 1. Log in as User A.<br>2. Directly navigate to the URL: `/orders/ORD-2001` (User B's order).<br>3. Observe the response. |
| **Test Data** | Logged-in User: userA@shopease.com, Attempted Order: ORD-2001 (belongs to userB@shopease.com) |
| **Expected Result** | Access is denied. The page shows "Order not found" or "You do not have permission to view this order". User A's own My Orders page is not affected. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_012 — My Orders Page with No Orders (New User)

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_012 |
| **Module** | Order Tracking |
| **Description** | Verify that a newly registered user with no order history sees an appropriate empty state on the My Orders page. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User "newuser@shopease.com" is logged in. User has placed zero orders. |
| **Test Steps** | 1. Navigate to "My Orders" page. |
| **Test Data** | User: newuser@shopease.com, Orders: 0 |
| **Expected Result** | Page displays a message like "You haven't placed any orders yet" with a "Start Shopping" or "Browse Products" call-to-action button. No order table/list is rendered. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_013 — Cancelled Order Shows Cancelled Status Badge

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_013 |
| **Module** | Order Tracking |
| **Description** | Verify that a cancelled order displays the "Cancelled" status badge correctly on both the My Orders list and the order detail page. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. Order ORD-1004 was previously cancelled. |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Locate ORD-1004 in the list and observe its status badge.<br>3. Click on ORD-1004 to open the detail page.<br>4. Observe the status badge and tracker on the detail page. |
| **Test Data** | Order: ORD-1004, Status: Cancelled |
| **Expected Result** | My Orders list shows ORD-1004 with a "Cancelled" badge (red). Detail page shows "Cancelled" status. The status tracker either shows the cancellation or is replaced with a "Cancelled" banner. No "Cancel Order" button is visible. |
| **Test Design Technique** | State Transition |

---

## TC_OT_014 — Order Detail Shows Correct Item Quantities and Prices for Multi-Item Order

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_014 |
| **Module** | Order Tracking |
| **Description** | Verify that the order detail page accurately reflects quantities, unit prices, and line totals for an order with multiple items. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. Order ORD-1007 contains 5 different items with varying quantities. |
| **Test Steps** | 1. Navigate to "My Orders" and click on ORD-1007.<br>2. Verify each item's name, quantity, unit price, and line subtotal. |
| **Test Data** | Items: Wireless Mouse (qty 2, ₹599), USB Keyboard (qty 1, ₹449), Laptop Stand (qty 1, ₹1299), Phone Cable (qty 3, ₹199), Desk Organizer (qty 1, ₹500). Total items: 8 units. |
| **Expected Result** | Each item row shows the correct product name, quantity, unit price, and subtotal (qty × price). Grand total matches the sum of all subtotals + shipping + tax. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_015 — Status Transition from Placed Through All Steps to Delivered

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_015 |
| **Module** | Order Tracking |
| **Description** | Verify the complete status transition lifecycle of an order from Placed → Confirmed → Shipped → Out for Delivery → Delivered, with correct dates at each step. |
| **Priority** | High |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. Order ORD-1008 is in "Placed" status. Admin or system can update order status. |
| **Test Steps** | 1. Open ORD-1008 detail — verify status is "Placed" (date: 2026-03-20).<br>2. (Admin updates status to "Confirmed" on 2026-03-21.) Refresh page — verify "Confirmed" is now active.<br>3. (Admin updates to "Shipped" on 2026-03-22.) Refresh — verify "Shipped" is active.<br>4. (Admin updates to "Out for Delivery" on 2026-03-24.) Refresh — verify step is active.<br>5. (Admin updates to "Delivered" on 2026-03-25.) Refresh — verify all steps completed. |
| **Test Data** | Order: ORD-1008. Transition dates: Placed 03-20, Confirmed 03-21, Shipped 03-22, Out for Delivery 03-24, Delivered 03-25. |
| **Expected Result** | At each step, the tracker correctly highlights all completed stages with dates. Final state shows all 5 steps completed with correct dates. Badge updates appropriately at each stage. |
| **Test Design Technique** | State Transition |

---

## TC_OT_016 — Order List Displays Correct Status Badge Colors

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_016 |
| **Module** | Order Tracking |
| **Description** | Verify that each order status has a distinct, color-coded badge on the My Orders list page. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. User has orders in each status: Placed, Confirmed, Shipped, Out for Delivery, Delivered, Cancelled. |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Inspect the badge color/style for each order status. |
| **Test Data** | Statuses: Placed (blue/orange), Confirmed (blue), Shipped (purple), Out for Delivery (yellow/amber), Delivered (green), Cancelled (red). |
| **Expected Result** | Each status has a visually distinct badge color. Badges are readable and accessible. Colors follow a logical convention (e.g., green for success, red for cancellation). |
| **Test Design Technique** | Decision Table |

---

## TC_OT_017 — Order Date Formatting Consistency

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_017 |
| **Module** | Order Tracking |
| **Description** | Verify that all dates on the My Orders page and order detail page use a consistent format. |
| **Priority** | Low |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. User has multiple orders placed on different dates. |
| **Test Steps** | 1. Navigate to "My Orders".<br>2. Note the date format for each order.<br>3. Click into an order detail page and check all dates on the status tracker. |
| **Test Data** | Order dates: 2026-03-01, 2026-03-15, 2026-03-20 |
| **Expected Result** | All dates use a consistent format (e.g., "Mar 20, 2026" or "20/03/2026"). No mixed formats. Status tracker dates and order list dates use the same format. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_OT_018 — Returned Order Status Display

| Field | Content |
|---|---|
| **Test Case ID** | TC_OT_018 |
| **Module** | Order Tracking |
| **Description** | Verify that an order with "Returned" status displays correctly with the appropriate status badge and no cancel button. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. Order ORD-1009 has status "Returned". |
| **Test Steps** | 1. Navigate to "My Orders" and locate ORD-1009.<br>2. Verify the status badge on the list page.<br>3. Click into the order detail page.<br>4. Verify status display and absence of "Cancel Order" button. |
| **Test Data** | Order: ORD-1009, Status: Returned |
| **Expected Result** | My Orders list shows "Returned" badge (distinct color, e.g., grey or orange). Detail page shows "Returned" status. No "Cancel Order" button. Status tracker shows the return status appropriately. |
| **Test Design Technique** | State Transition |

---
