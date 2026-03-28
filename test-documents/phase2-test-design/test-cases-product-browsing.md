# Test Cases — Product Browsing

**Application:** ShopEase  
**Module:** Product Browsing  
**Version:** 1.0  
**Created:** 2026-03-28  

---

## TC_PB_001 — Product Grid Displays Correctly on Desktop (4 Columns)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_001 |
| Module | Product Browsing |
| Description | Verify that the product grid displays products in a 4-column layout on desktop screens |
| Priority | High |
| Test Type | Positive |
| Preconditions | At least 8 products exist in the database; user is on the products page using a desktop browser (viewport ≥ 1024px) |
| Test Steps | 1. Open ShopEase in a desktop browser (1920×1080 resolution)<br>2. Navigate to the "All Products" page<br>3. Observe the product grid layout<br>4. Count the number of columns in the grid |
| Test Data | Viewport: `1920×1080`, Products available: 8+ |
| Expected Result | Products are displayed in a 4-column grid layout with consistent card spacing and alignment |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_002 — Product Grid Displays 2 Columns on Tablet

| Field | Content |
|---|---|
| Test Case ID | TC_PB_002 |
| Module | Product Browsing |
| Description | Verify that the product grid switches to a 2-column layout on tablet-sized screens |
| Priority | High |
| Test Type | Positive |
| Preconditions | At least 4 products exist; user accesses the products page on a tablet or resized browser |
| Test Steps | 1. Open ShopEase in a browser and resize viewport to 768×1024 (tablet)<br>2. Navigate to the "All Products" page<br>3. Observe the product grid layout<br>4. Count the number of columns |
| Test Data | Viewport: `768×1024`, Products available: 4+ |
| Expected Result | Products are displayed in a 2-column grid layout with proper card sizing and spacing |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_003 — Product Grid Displays 1 Column on Mobile

| Field | Content |
|---|---|
| Test Case ID | TC_PB_003 |
| Module | Product Browsing |
| Description | Verify that the product grid switches to a single-column layout on mobile screens |
| Priority | High |
| Test Type | Positive |
| Preconditions | At least 2 products exist; user accesses the products page on a mobile device or resized browser |
| Test Steps | 1. Open ShopEase in a browser and resize viewport to 375×667 (mobile)<br>2. Navigate to the "All Products" page<br>3. Observe the product grid layout<br>4. Count the number of columns |
| Test Data | Viewport: `375×667`, Products available: 2+ |
| Expected Result | Products are displayed in a single-column full-width layout with each card stacked vertically |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_004 — Pagination Shows 10 Products Per Page

| Field | Content |
|---|---|
| Test Case ID | TC_PB_004 |
| Module | Product Browsing |
| Description | Verify that exactly 10 products are displayed per page when more than 10 products exist |
| Priority | High |
| Test Type | Positive |
| Preconditions | At least 25 products exist in the database |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Count the number of product cards displayed on page 1<br>3. Verify pagination controls are visible at the bottom<br>4. Click the "Next" button or page number "2"<br>5. Count products on page 2 |
| Test Data | Total products: `25`, Expected on page 1: `10`, Expected on page 2: `10`, Expected on page 3: `5` |
| Expected Result | Page 1 and page 2 show exactly 10 products each, page 3 shows the remaining 5 products, and pagination controls reflect the correct total pages (3) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_005 — Sort Products by Price Low to High

| Field | Content |
|---|---|
| Test Case ID | TC_PB_005 |
| Module | Product Browsing |
| Description | Verify that products are sorted in ascending order by price when "Price: Low to High" is selected |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products page is loaded with multiple products at varying prices |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the sort dropdown<br>3. Select "Price: Low to High"<br>4. Observe the order of product cards |
| Test Data | Products: Wireless Mouse `₹499`, USB Cable `₹199`, Bluetooth Speaker `₹1,299`, Laptop Stand `₹899` |
| Expected Result | Products are reordered as: USB Cable (₹199) → Wireless Mouse (₹499) → Laptop Stand (₹899) → Bluetooth Speaker (₹1,299) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_006 — Sort Products by Price High to Low

| Field | Content |
|---|---|
| Test Case ID | TC_PB_006 |
| Module | Product Browsing |
| Description | Verify that products are sorted in descending order by price when "Price: High to Low" is selected |
| Priority | Medium |
| Test Type | Positive |
| Preconditions | Products page is loaded with multiple products at varying prices |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the sort dropdown<br>3. Select "Price: High to Low"<br>4. Observe the order of product cards |
| Test Data | Products: Wireless Mouse `₹499`, USB Cable `₹199`, Bluetooth Speaker `₹1,299`, Laptop Stand `₹899` |
| Expected Result | Products are reordered as: Bluetooth Speaker (₹1,299) → Laptop Stand (₹899) → Wireless Mouse (₹499) → USB Cable (₹199) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_007 — Product Card Displays All Required Information

| Field | Content |
|---|---|
| Test Case ID | TC_PB_007 |
| Module | Product Browsing |
| Description | Verify that each product card shows image, name, brand, price, rating, and an Add to Cart button |
| Priority | High |
| Test Type | Positive |
| Preconditions | At least one product exists with complete data |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Locate the product card for "boAt Rockerz 450"<br>3. Verify each element is present on the card |
| Test Data | Product: `boAt Rockerz 450`, Brand: `boAt`, Price: `₹1,499`, Rating: `4.3/5`, Image: product thumbnail present |
| Expected Result | The product card displays: product image (loaded without broken icon), name "boAt Rockerz 450", brand "boAt", price "₹1,499", star rating 4.3, and an "Add to Cart" button |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_008 — Navigate Products by Category

| Field | Content |
|---|---|
| Test Case ID | TC_PB_008 |
| Module | Product Browsing |
| Description | Verify that clicking a category filters the product grid to show only products in that category |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products exist in multiple categories including "Electronics" and "Clothing" |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the "Electronics" category in the navigation/sidebar<br>3. Observe the displayed products<br>4. Verify all shown products belong to the Electronics category |
| Test Data | Category: `Electronics`, Expected products: Bluetooth Speaker, Wireless Mouse, Laptop Stand |
| Expected Result | Only products belonging to the "Electronics" category are displayed, and the category name is highlighted in the navigation |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_009 — Empty State When No Products in Category

| Field | Content |
|---|---|
| Test Case ID | TC_PB_009 |
| Module | Product Browsing |
| Description | Verify that an appropriate empty-state message is shown when a category has no products |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | A category "Gardening" exists with zero products assigned |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the "Gardening" category<br>3. Observe the content area |
| Test Data | Category: `Gardening`, Products in category: `0` |
| Expected Result | The product grid area shows an empty-state illustration with the message "No products found in this category" and the pagination controls are hidden |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_010 — Sort by Name A-Z

| Field | Content |
|---|---|
| Test Case ID | TC_PB_010 |
| Module | Product Browsing |
| Description | Verify that products are sorted alphabetically A-Z when "Name: A-Z" sort is selected |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Products page is loaded with products having varied names |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the sort dropdown<br>3. Select "Name: A-Z"<br>4. Observe the order of product names |
| Test Data | Products: `Wireless Mouse`, `Bluetooth Speaker`, `Laptop Stand`, `Asus Monitor` |
| Expected Result | Products are ordered as: Asus Monitor → Bluetooth Speaker → Laptop Stand → Wireless Mouse |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_011 — Sort by Newest First

| Field | Content |
|---|---|
| Test Case ID | TC_PB_011 |
| Module | Product Browsing |
| Description | Verify that products are sorted by creation date (newest first) when "Newest" sort is selected |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Products were added on different dates |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the sort dropdown<br>3. Select "Newest"<br>4. Observe the order of products |
| Test Data | Product added 2026-03-28: `Smart Watch`, Product added 2026-03-20: `Wireless Earbuds`, Product added 2026-03-10: `USB Hub` |
| Expected Result | Products are ordered by most recently added: Smart Watch → Wireless Earbuds → USB Hub |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_012 — Sort by Top Rated

| Field | Content |
|---|---|
| Test Case ID | TC_PB_012 |
| Module | Product Browsing |
| Description | Verify that products are sorted by rating (highest first) when "Top Rated" sort is selected |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Products page is loaded with products having different ratings |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click on the sort dropdown<br>3. Select "Top Rated"<br>4. Observe the order of products |
| Test Data | Products: Laptop Stand `3.8★`, Bluetooth Speaker `4.5★`, Wireless Mouse `4.1★`, Smart Watch `4.9★` |
| Expected Result | Products are ordered: Smart Watch (4.9★) → Bluetooth Speaker (4.5★) → Wireless Mouse (4.1★) → Laptop Stand (3.8★) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_013 — Pagination Boundary: Exactly 10 Products (Single Page)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_013 |
| Module | Product Browsing |
| Description | Verify that pagination controls are hidden or show only page 1 when there are exactly 10 products |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Exactly 10 products exist in the database |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Count the product cards displayed<br>3. Observe the pagination area |
| Test Data | Total products: `10` |
| Expected Result | All 10 products are displayed on one page and no "Next" or multiple page buttons are shown (or pagination shows only page 1 as active) |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PB_014 — Pagination Boundary: 11 Products (Two Pages)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_014 |
| Module | Product Browsing |
| Description | Verify that pagination activates when product count exceeds 10 (11 products = 2 pages) |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Exactly 11 products exist in the database |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Verify page 1 shows 10 products<br>3. Click the "Next" button or page "2"<br>4. Verify page 2 shows 1 product |
| Test Data | Total products: `11`, Page 1: `10 products`, Page 2: `1 product` |
| Expected Result | Page 1 displays 10 products, page 2 displays 1 product, and pagination shows 2 pages total |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PB_015 — Pagination Boundary: Zero Products

| Field | Content |
|---|---|
| Test Case ID | TC_PB_015 |
| Module | Product Browsing |
| Description | Verify empty-state display when there are zero products in the system |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | No products exist in the database (or all products are removed) |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Observe the content area and pagination area |
| Test Data | Total products: `0` |
| Expected Result | An empty-state message "No products available" is shown with an illustration, and pagination controls are hidden |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PB_016 — Product Card Image Fails to Load (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_016 |
| Module | Product Browsing |
| Description | Verify that a placeholder image is shown when a product image URL is broken or unavailable |
| Priority | Low |
| Test Type | Edge |
| Preconditions | A product exists with an invalid or missing image URL |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Locate the product card for "Generic USB Cable" (which has a broken image URL)<br>3. Observe the image area of the card |
| Test Data | Product: `Generic USB Cable`, Image URL: `https://shopease.com/images/invalid_404.jpg` (broken) |
| Expected Result | A placeholder/fallback image (e.g., a grey box with a camera icon) is displayed instead of a broken image icon |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_PB_017 — Rapid Pagination Navigation (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_017 |
| Module | Product Browsing |
| Description | Verify that rapidly clicking through pages does not cause duplicate or missing products |
| Priority | Low |
| Test Type | Edge |
| Preconditions | At least 50 products exist (5 pages) |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Quickly click page 2, then page 3, then page 4 in rapid succession<br>3. Wait for the final page to fully load<br>4. Verify the product list on page 4 is correct |
| Test Data | Total products: `50`, Target page: `4` (products 31–40) |
| Expected Result | Page 4 displays the correct 10 products (products 31–40 in sequence) without duplicates, stale data, or loading errors |
| Test Design Technique | State Transition |

---

## TC_PB_018 — Switching Sort While on a Subsequent Page (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_018 |
| Module | Product Browsing |
| Description | Verify that changing the sort option while on page 3 resets the view to page 1 with the new sort applied |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | At least 30 products exist; user is currently on page 3 |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Click to go to page 3<br>3. Open the sort dropdown and select "Price: High to Low"<br>4. Observe which page is now active and the product order |
| Test Data | Current page before sort change: `3`, New sort: `Price: High to Low` |
| Expected Result | The user is navigated back to page 1 and products are displayed sorted by price descending from the most expensive |
| Test Design Technique | State Transition |

---

## TC_PB_019 — Product Grid With Only 1 Product (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_PB_019 |
| Module | Product Browsing |
| Description | Verify that the grid renders correctly when only a single product exists in the database |
| Priority | Low |
| Test Type | Edge |
| Preconditions | Exactly 1 product exists in the database |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Observe the grid layout, product card, and pagination |
| Test Data | Total products: `1`, Product: `Organic Green Tea`, Price: `₹349` |
| Expected Result | The single product card is displayed properly (not stretched to fill the entire row), pagination is hidden, and sorting dropdown is still functional |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_PB_020 — Category Navigation Preserves Sort Selection

| Field | Content |
|---|---|
| Test Case ID | TC_PB_020 |
| Module | Product Browsing |
| Description | Verify that the active sort option persists when switching between product categories |
| Priority | Medium |
| Test Type | Positive |
| Preconditions | Products exist in both "Electronics" and "Clothing" categories; user has selected a sort option |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Select "Price: Low to High" sort<br>3. Click the "Clothing" category<br>4. Verify products are shown for Clothing category sorted by price ascending<br>5. Verify the sort dropdown still shows "Price: Low to High" |
| Test Data | Sort: `Price: Low to High`, Category switch: `All Products → Clothing` |
| Expected Result | Products in "Clothing" are displayed sorted by price low to high, and the sort dropdown retains the "Price: Low to High" selection |
| Test Design Technique | State Transition |
