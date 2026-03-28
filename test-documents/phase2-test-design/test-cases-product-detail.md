# Test Cases — Product Detail View

**Application:** ShopEase  
**Module:** Product Detail View  
**Version:** 1.0  
**Created:** 2026-03-28  

---

## TC_PD_001 — Display Complete Product Details

| Field | Content |
|---|---|
| Test Case ID | TC_PD_001 |
| Module | Product Detail View |
| Description | Verify that all product information is displayed correctly on the product detail page |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product "Sony WH-1000XM5" exists with complete data in the database |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the product card for "Sony WH-1000XM5"<br>3. Observe all displayed product information on the detail page |
| Test Data | Product: `Sony WH-1000XM5`, Brand: `Sony`, Price: `₹24,990`, Description: `Industry-leading noise cancellation headphones with 30-hour battery life`, Stock: `15 units` |
| Expected Result | The product detail page displays the product image, name "Sony WH-1000XM5", brand "Sony", full description, price "₹24,990" with ₹ symbol, and stock status |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_002 — Price Displayed with Rupee Symbol

| Field | Content |
|---|---|
| Test Case ID | TC_PD_002 |
| Module | Product Detail View |
| Description | Verify that the product price is displayed with the ₹ symbol and correct formatting |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product detail page is loaded for a product with a known price |
| Test Steps | 1. Navigate to the product detail page for "boAt Rockerz 450"<br>2. Locate the price section<br>3. Verify the ₹ symbol is present and the amount is correctly formatted |
| Test Data | Product: `boAt Rockerz 450`, Price: `₹1,499` |
| Expected Result | Price is displayed as "₹1,499" with the rupee symbol (₹) prefix and comma-separated thousands formatting |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_003 — Compare-at-Price Shown with Strikethrough

| Field | Content |
|---|---|
| Test Case ID | TC_PD_003 |
| Module | Product Detail View |
| Description | Verify that the compare-at price is displayed with strikethrough styling next to the current price |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product has both a current price and a higher compare_at_price set |
| Test Steps | 1. Navigate to the product detail page for "Noise ColorFit Pro 4"<br>2. Observe the price area<br>3. Verify both current price and compare-at price are shown<br>4. Verify the compare-at price has a strikethrough style |
| Test Data | Product: `Noise ColorFit Pro 4`, Current Price: `₹2,999`, Compare-at Price: `₹5,999` |
| Expected Result | Current price "₹2,999" is displayed prominently, and the compare-at price "₹5,999" appears beside it with strikethrough text styling (line-through) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_004 — In Stock Status Displayed in Green

| Field | Content |
|---|---|
| Test Case ID | TC_PD_004 |
| Module | Product Detail View |
| Description | Verify that "In Stock" status is shown in green when the product has sufficient stock |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product has stock quantity greater than a low-stock threshold (e.g., > 5 units) |
| Test Steps | 1. Navigate to the product detail page for "Samsung Galaxy Buds2 Pro"<br>2. Locate the stock status indicator<br>3. Verify the text and color of the status |
| Test Data | Product: `Samsung Galaxy Buds2 Pro`, Stock: `25 units`, Low-stock threshold: `5` |
| Expected Result | Stock status displays "In Stock" with green-colored text or badge |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_005 — Add to Cart Successfully

| Field | Content |
|---|---|
| Test Case ID | TC_PD_005 |
| Module | Product Detail View |
| Description | Verify that clicking "Add to Cart" adds the product with the selected quantity to the cart |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product "Sony WH-1000XM5" is in stock; user is on the product detail page |
| Test Steps | 1. Set quantity to 2 using the quantity selector<br>2. Click the "Add to Cart" button<br>3. Observe confirmation feedback<br>4. Check the cart icon in the navbar for updated count |
| Test Data | Product: `Sony WH-1000XM5`, Quantity: `2`, Price: `₹24,990` |
| Expected Result | A success toast "Added to cart" appears, the cart icon badge updates to show 2, and the product with quantity 2 is added to the cart |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_006 — Low Stock Status Displayed in Orange

| Field | Content |
|---|---|
| Test Case ID | TC_PD_006 |
| Module | Product Detail View |
| Description | Verify that "Low Stock" status is shown in orange when product stock is at or below the threshold |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product has stock quantity at or below the low-stock threshold |
| Test Steps | 1. Navigate to the product detail page for "Apple AirPods Pro 2"<br>2. Locate the stock status indicator<br>3. Verify the text and color of the status |
| Test Data | Product: `Apple AirPods Pro 2`, Stock: `3 units`, Low-stock threshold: `5` |
| Expected Result | Stock status displays "Low Stock" (or "Only 3 left") with orange-colored text or badge |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_007 — Out of Stock Status Displayed in Red

| Field | Content |
|---|---|
| Test Case ID | TC_PD_007 |
| Module | Product Detail View |
| Description | Verify that "Out of Stock" status is shown in red and the Add to Cart button is disabled |
| Priority | High |
| Test Type | Negative |
| Preconditions | Product has zero stock |
| Test Steps | 1. Navigate to the product detail page for "OnePlus Nord Buds CE"<br>2. Locate the stock status indicator<br>3. Verify the text and color<br>4. Attempt to click the "Add to Cart" button |
| Test Data | Product: `OnePlus Nord Buds CE`, Stock: `0 units` |
| Expected Result | Stock status displays "Out of Stock" in red, the "Add to Cart" button is greyed out and disabled (not clickable), and the quantity selector is also disabled |
| Test Design Technique | State Transition |

---

## TC_PD_008 — Add to Cart Button Disabled When Out of Stock

| Field | Content |
|---|---|
| Test Case ID | TC_PD_008 |
| Module | Product Detail View |
| Description | Verify that the Add to Cart button cannot be interacted with when the product is out of stock |
| Priority | High |
| Test Type | Negative |
| Preconditions | Product "Vintage Vinyl Player" has 0 stock |
| Test Steps | 1. Navigate to the product detail page for "Vintage Vinyl Player"<br>2. Verify the "Add to Cart" button is visually disabled<br>3. Click on the disabled "Add to Cart" button<br>4. Verify no product is added to the cart |
| Test Data | Product: `Vintage Vinyl Player`, Stock: `0`, Cart count before: `0` |
| Expected Result | The button appears disabled (greyed out / cursor not-allowed), clicking it produces no effect, and the cart count remains at 0 |
| Test Design Technique | Decision Table |

---

## TC_PD_009 — Quantity Selector Cannot Exceed Available Stock

| Field | Content |
|---|---|
| Test Case ID | TC_PD_009 |
| Module | Product Detail View |
| Description | Verify that the quantity selector does not allow selection beyond the available stock |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Product has limited stock less than the maximum quantity limit |
| Test Steps | 1. Navigate to the product detail page for "Handmade Ceramic Mug"<br>2. Note the available stock (4 units)<br>3. Increase the quantity selector by clicking "+" repeatedly<br>4. Attempt to go beyond 4 |
| Test Data | Product: `Handmade Ceramic Mug`, Stock: `4 units`, Max selectable: `4` |
| Expected Result | The quantity selector stops incrementing at 4, the "+" button becomes disabled, and a tooltip or message indicates "Maximum available quantity reached" |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_010 — Quantity Selector Cannot Go Below 1

| Field | Content |
|---|---|
| Test Case ID | TC_PD_010 |
| Module | Product Detail View |
| Description | Verify that the quantity selector does not allow values below 1 |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Product detail page is loaded for an in-stock product; default quantity is 1 |
| Test Steps | 1. Navigate to the product detail page for "Sony WH-1000XM5"<br>2. Observe that the default quantity is 1<br>3. Click the "−" (minus) button to try to decrease below 1 |
| Test Data | Product: `Sony WH-1000XM5`, Default quantity: `1`, Minimum: `1` |
| Expected Result | The quantity remains at 1, the "−" button is disabled or unresponsive, and no negative or zero quantity can be set |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_011 — Quantity Selector Maximum is 10 (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_011 |
| Module | Product Detail View |
| Description | Verify that the quantity selector caps at 10 even when stock exceeds 10 |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Product has more than 10 units in stock |
| Test Steps | 1. Navigate to the product detail page for "Organic Cotton T-Shirt"<br>2. Note the stock (50 units available)<br>3. Increase the quantity selector by clicking "+" repeatedly<br>4. Attempt to go beyond 10 |
| Test Data | Product: `Organic Cotton T-Shirt`, Stock: `50 units`, Max selectable: `10` |
| Expected Result | The quantity selector stops at 10, the "+" button becomes disabled at 10, even though 50 units are available |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_012 — Quantity Selector at Exactly Max Stock When Stock < 10 (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_012 |
| Module | Product Detail View |
| Description | Verify that the quantity selector maximum equals the stock count when stock is less than 10 |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Product has fewer than 10 units in stock |
| Test Steps | 1. Navigate to the product detail page for "Artisan Leather Wallet"<br>2. Note the stock (7 units available)<br>3. Increase the quantity selector by clicking "+" repeatedly<br>4. Attempt to go beyond 7 |
| Test Data | Product: `Artisan Leather Wallet`, Stock: `7 units`, Expected max selectable: `7` |
| Expected Result | The quantity selector allows values from 1 to 7, and the "+" button is disabled at 7 |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_013 — Quantity Selector at 1 When Stock is 1 (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_013 |
| Module | Product Detail View |
| Description | Verify the quantity selector only allows 1 when only 1 unit is in stock |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Product has exactly 1 unit in stock |
| Test Steps | 1. Navigate to the product detail page for "Limited Edition Art Print"<br>2. Note the stock (1 unit available)<br>3. Observe the quantity selector state<br>4. Attempt to click "+" to increase quantity |
| Test Data | Product: `Limited Edition Art Print`, Stock: `1 unit`, Default quantity: `1` |
| Expected Result | Quantity is fixed at 1, both "+" and "−" buttons are disabled, and the selector is non-interactive or shows only the value 1 |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_014 — Reviews Section Displayed Below Product Info

| Field | Content |
|---|---|
| Test Case ID | TC_PD_014 |
| Module | Product Detail View |
| Description | Verify that the reviews section is rendered below the product information area |
| Priority | Medium |
| Test Type | Positive |
| Preconditions | Product has at least 2 reviews in the database |
| Test Steps | 1. Navigate to the product detail page for "Sony WH-1000XM5"<br>2. Scroll down below the product image, name, price, and description area<br>3. Locate the reviews section<br>4. Verify reviews are visible with reviewer name, rating, and comment |
| Test Data | Product: `Sony WH-1000XM5`, Review 1: `Rahul M. — 5★ — "Best headphones I've ever owned!"`, Review 2: `Sneha K. — 4★ — "Great sound, slightly heavy."` |
| Expected Result | The "Reviews" section appears below the product details, showing each review with the reviewer name, star rating, and comment text |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_015 — Product Image Loads and Displays Correctly

| Field | Content |
|---|---|
| Test Case ID | TC_PD_015 |
| Module | Product Detail View |
| Description | Verify that the product image loads at high resolution on the detail page |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product has a valid image URL |
| Test Steps | 1. Navigate to the product detail page for "Nike Air Max 270"<br>2. Observe the product image area<br>3. Verify the image is fully loaded (no broken icon or spinner stuck) |
| Test Data | Product: `Nike Air Max 270`, Image URL: valid high-resolution image |
| Expected Result | The product image is displayed fully loaded, at high resolution, properly scaled to fit the image container without distortion |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_016 — Product Without Compare-at Price Shows Only Current Price (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_016 |
| Module | Product Detail View |
| Description | Verify that when a product has no compare-at price, only the current price is shown without any strikethrough element |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | Product has a price but no compare_at_price value (null or 0) |
| Test Steps | 1. Navigate to the product detail page for "Basic USB-C Cable"<br>2. Observe the price area<br>3. Check that no strikethrough price is displayed |
| Test Data | Product: `Basic USB-C Cable`, Price: `₹299`, Compare-at Price: `null` |
| Expected Result | Only the current price "₹299" is displayed; no strikethrough text or discount indication appears |
| Test Design Technique | Decision Table |

---

## TC_PD_017 — Product with No Reviews Shows Empty Reviews State (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_017 |
| Module | Product Detail View |
| Description | Verify that the reviews section handles a product with zero reviews gracefully |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | Product has no reviews in the database |
| Test Steps | 1. Navigate to the product detail page for "New Launch Smartwatch"<br>2. Scroll down to the reviews section<br>3. Observe the content |
| Test Data | Product: `New Launch Smartwatch`, Reviews count: `0` |
| Expected Result | The reviews section shows a message like "No reviews yet. Be the first to review this product!" instead of an empty blank area |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PD_018 — Product Detail Page for Product with Very Long Description (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_018 |
| Module | Product Detail View |
| Description | Verify that a product with a very long description is rendered without layout breakage |
| Priority | Low |
| Test Type | Edge |
| Preconditions | Product exists with a description exceeding 2000 characters |
| Test Steps | 1. Navigate to the product detail page for "Professional DSLR Camera Kit"<br>2. Observe the description area<br>3. Verify the text is fully readable and does not overflow the container<br>4. Check that the overall page layout remains intact |
| Test Data | Product: `Professional DSLR Camera Kit`, Description: 2500-character detailed specification text |
| Expected Result | The full description is rendered within its container with proper text wrapping, the layout does not break, and a "Read more" toggle or scrollable area may appear for very long text |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PD_019 — Stock Transitions from Low Stock to Out of Stock (State Transition)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_019 |
| Module | Product Detail View |
| Description | Verify that the product detail page correctly reflects the transition from Low Stock to Out of Stock when the last units are purchased |
| Priority | High |
| Test Type | Negative |
| Preconditions | Product "Handmade Candle Set" has 2 units in stock (Low Stock state) |
| Test Steps | 1. Navigate to the product detail page for "Handmade Candle Set"<br>2. Verify stock shows "Low Stock" in orange<br>3. Set quantity to 2 and click "Add to Cart"<br>4. Complete the purchase (or simulate stock reaching 0)<br>5. Refresh the product detail page<br>6. Observe the new stock status and Add to Cart button state |
| Test Data | Product: `Handmade Candle Set`, Initial Stock: `2`, Final Stock: `0` |
| Expected Result | After stock reaches 0, the status changes to "Out of Stock" in red, the "Add to Cart" button becomes disabled, and the quantity selector is also disabled |
| Test Design Technique | State Transition |

---

## TC_PD_020 — Product Image Fails to Load Shows Placeholder (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PD_020 |
| Module | Product Detail View |
| Description | Verify that a fallback placeholder image is shown on the detail page when the product image URL is broken |
| Priority | Low |
| Test Type | Edge |
| Preconditions | Product exists with an invalid/broken image URL |
| Test Steps | 1. Navigate to the product detail page for "Discontinued Widget"<br>2. Observe the main product image area<br>3. Verify no broken image icon is displayed |
| Test Data | Product: `Discontinued Widget`, Image URL: `https://shopease.com/images/removed_product.jpg` (404) |
| Expected Result | A placeholder image (e.g., a grey container with a "No Image Available" label) is displayed in place of the broken image, maintaining proper dimensions |
| Test Design Technique | Equivalence Partitioning (EP) |
