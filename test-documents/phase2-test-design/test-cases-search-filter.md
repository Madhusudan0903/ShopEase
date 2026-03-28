# Test Cases — Search & Filtering

**Application:** ShopEase  
**Module:** Search & Filtering  
**Version:** 1.0  
**Created:** 2026-03-28  

---

## TC_SF_001 — Search for a Product by Full Name

| Field | Content |
|---|---|
| Test Case ID | TC_SF_001 |
| Module | Search & Filtering |
| Description | Verify that searching for a product by its full name returns the correct product in the results |
| Priority | High |
| Test Type | Positive |
| Preconditions | Product "Sony WH-1000XM5" exists in the database; user is on any page with the search bar visible in the navbar |
| Test Steps | 1. Click on the search bar in the navbar<br>2. Type "Sony WH-1000XM5"<br>3. Press Enter or click the search icon<br>4. Observe the search results page |
| Test Data | Search query: `Sony WH-1000XM5` |
| Expected Result | The search results page displays the product "Sony WH-1000XM5" as the top result, with the result count showing at least 1 match |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_002 — Search by Partial Keyword

| Field | Content |
|---|---|
| Test Case ID | TC_SF_002 |
| Module | Search & Filtering |
| Description | Verify that searching with a partial keyword returns all matching products |
| Priority | High |
| Test Type | Positive |
| Preconditions | Multiple products containing the word "wireless" exist (e.g., Wireless Mouse, Wireless Earbuds, Wireless Charger) |
| Test Steps | 1. Click on the search bar<br>2. Type "wireless"<br>3. Press Enter<br>4. Observe the search results |
| Test Data | Search query: `wireless` |
| Expected Result | Search results show all products containing "wireless" in their name or description, and the result count reflects the total matches (e.g., "3 products found") |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_003 — Filter Products by Category Checkbox

| Field | Content |
|---|---|
| Test Case ID | TC_SF_003 |
| Module | Search & Filtering |
| Description | Verify that selecting a category checkbox in the filter sidebar shows only products from that category |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products exist in categories "Electronics", "Clothing", and "Home & Kitchen"; filter sidebar is visible |
| Test Steps | 1. Navigate to the "All Products" page<br>2. In the filter sidebar, check the "Electronics" checkbox<br>3. Observe the product grid and result count |
| Test Data | Category filter: `Electronics`, Expected products: Sony WH-1000XM5, Wireless Mouse, boAt Rockerz 450, Samsung Galaxy Buds2 Pro |
| Expected Result | Only products in the "Electronics" category are displayed, the result count updates (e.g., "4 products found"), and the "Electronics" checkbox remains checked |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_004 — Filter Products by Price Range

| Field | Content |
|---|---|
| Test Case ID | TC_SF_004 |
| Module | Search & Filtering |
| Description | Verify that entering min and max price values filters products to only those within the specified range |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products exist with various prices; filter sidebar is visible |
| Test Steps | 1. Navigate to the "All Products" page<br>2. In the filter sidebar, enter `500` in the Min Price input<br>3. Enter `2000` in the Max Price input<br>4. Click "Apply" or wait for auto-filtering<br>5. Observe the filtered product grid |
| Test Data | Min Price: `500`, Max Price: `2000`, Expected products: boAt Rockerz 450 (₹1,499), Wireless Mouse (₹899), Laptop Stand (₹1,299) |
| Expected Result | Only products with prices between ₹500 and ₹2,000 (inclusive) are shown, and the result count updates accordingly |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_005 — Filter Products by Brand

| Field | Content |
|---|---|
| Test Case ID | TC_SF_005 |
| Module | Search & Filtering |
| Description | Verify that selecting a brand filter displays only products from the chosen brand |
| Priority | High |
| Test Type | Positive |
| Preconditions | Multiple brands exist in the system; brand filter options are listed in the sidebar |
| Test Steps | 1. Navigate to the "All Products" page<br>2. In the filter sidebar, select the brand "Sony"<br>3. Observe the filtered product grid |
| Test Data | Brand filter: `Sony`, Expected products: Sony WH-1000XM5 (₹24,990), Sony SRS-XB13 (₹3,990) |
| Expected Result | Only Sony-branded products are displayed in the grid, and the result count updates to show 2 products |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_006 — Filter Products by Star Rating

| Field | Content |
|---|---|
| Test Case ID | TC_SF_006 |
| Module | Search & Filtering |
| Description | Verify that selecting a minimum star rating filters products to only those at or above the selected rating |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products have various ratings from 2.0 to 5.0 |
| Test Steps | 1. Navigate to the "All Products" page<br>2. In the filter sidebar, click the 4-star rating filter option<br>3. Observe the filtered product grid |
| Test Data | Rating filter: `4★ & above`, Products: Sony WH-1000XM5 (4.8★), boAt Rockerz 450 (4.3★), USB Hub (3.5★), Basic Cable (2.9★) |
| Expected Result | Only products rated 4.0 and above are shown: Sony WH-1000XM5 and boAt Rockerz 450. Products below 4★ (USB Hub, Basic Cable) are excluded |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_007 — Combined Filters: Category + Price Range

| Field | Content |
|---|---|
| Test Case ID | TC_SF_007 |
| Module | Search & Filtering |
| Description | Verify that multiple filters (category and price range) work together to narrow down results |
| Priority | High |
| Test Type | Positive |
| Preconditions | Products span multiple categories and price points |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Check the "Electronics" category checkbox<br>3. Set Min Price to `1000` and Max Price to `5000`<br>4. Observe the filtered results |
| Test Data | Category: `Electronics`, Min Price: `1000`, Max Price: `5000`, Expected: boAt Rockerz 450 (₹1,499), Laptop Stand (₹1,299), Sony SRS-XB13 (₹3,990) |
| Expected Result | Only Electronics products priced between ₹1,000 and ₹5,000 are displayed; both filter selections remain active and visible |
| Test Design Technique | Decision Table |

---

## TC_SF_008 — Clear All Filters Button Resets Everything

| Field | Content |
|---|---|
| Test Case ID | TC_SF_008 |
| Module | Search & Filtering |
| Description | Verify that clicking "Clear All Filters" removes all active filters and shows all products |
| Priority | High |
| Test Type | Positive |
| Preconditions | Multiple filters are currently active (category, price range, brand) |
| Test Steps | 1. Apply category filter "Clothing"<br>2. Set price range ₹500–₹3,000<br>3. Select brand "Nike"<br>4. Verify filtered results are displayed<br>5. Click the "Clear All Filters" button<br>6. Observe the product grid and filter sidebar |
| Test Data | Active filters before clear: Category `Clothing`, Price `₹500–₹3,000`, Brand `Nike` |
| Expected Result | All filters are removed, all checkboxes are unchecked, price inputs are cleared, and the full unfiltered product list is displayed with the total product count |
| Test Design Technique | State Transition |

---

## TC_SF_009 — URL Parameters Update When Filters Are Applied

| Field | Content |
|---|---|
| Test Case ID | TC_SF_009 |
| Module | Search & Filtering |
| Description | Verify that the URL query parameters update when filters are applied to allow shareable/bookmarkable filtered views |
| Priority | Medium |
| Test Type | Positive |
| Preconditions | User is on the products page |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Select category "Electronics"<br>3. Set Min Price to `1000`<br>4. Select brand "Sony"<br>5. Observe the browser URL bar |
| Test Data | Category: `Electronics`, Min Price: `1000`, Brand: `Sony` |
| Expected Result | The URL updates to include query parameters like `?category=electronics&min_price=1000&brand=sony`, and copying/pasting this URL in a new tab reproduces the same filtered view |
| Test Design Technique | State Transition |

---

## TC_SF_010 — No Products Found Message When Filters Match Nothing

| Field | Content |
|---|---|
| Test Case ID | TC_SF_010 |
| Module | Search & Filtering |
| Description | Verify that a "No products found" message is displayed when the applied filters yield zero results |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | Products exist but no product matches the specific filter combination |
| Test Steps | 1. Navigate to the "All Products" page<br>2. Select category "Electronics"<br>3. Set Min Price to `100000` and Max Price to `200000`<br>4. Observe the product grid area |
| Test Data | Category: `Electronics`, Min Price: `100000`, Max Price: `200000` |
| Expected Result | The product grid shows "No products found" with a suggestion like "Try adjusting your filters" and the result count shows "0 products found" |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_011 — Search with No Matching Results

| Field | Content |
|---|---|
| Test Case ID | TC_SF_011 |
| Module | Search & Filtering |
| Description | Verify that searching for a non-existent product shows an appropriate empty state |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | No product with the search term exists in the database |
| Test Steps | 1. Click on the search bar<br>2. Type "xyznonexistentproduct123"<br>3. Press Enter<br>4. Observe the search results page |
| Test Data | Search query: `xyznonexistentproduct123` |
| Expected Result | The search results page displays "No products found for 'xyznonexistentproduct123'" with the result count showing 0 |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_012 — Search with Empty Query

| Field | Content |
|---|---|
| Test Case ID | TC_SF_012 |
| Module | Search & Filtering |
| Description | Verify behavior when the user submits a search with an empty input |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | User is on any page with the search bar visible |
| Test Steps | 1. Click on the search bar<br>2. Leave the input empty<br>3. Press Enter or click the search icon |
| Test Data | Search query: `` (empty string) |
| Expected Result | Either the search is not submitted (button disabled / no action), or the user is shown all products without filtering, or a validation message "Please enter a search term" is displayed |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_013 — Search with Special Characters

| Field | Content |
|---|---|
| Test Case ID | TC_SF_013 |
| Module | Search & Filtering |
| Description | Verify that the search handles special characters without errors or security issues |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | User is on any page with the search bar visible |
| Test Steps | 1. Click on the search bar<br>2. Type `<script>alert('xss')</script>`<br>3. Press Enter<br>4. Observe the results page |
| Test Data | Search query: `<script>alert('xss')</script>` |
| Expected Result | The search processes safely without executing any scripts, returns "No products found", and the query is properly sanitized/escaped in the displayed results |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_014 — Price Range Filter: Min Price Greater Than Max Price (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_014 |
| Module | Search & Filtering |
| Description | Verify behavior when the minimum price is set higher than the maximum price |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the products page with the filter sidebar visible |
| Test Steps | 1. In the filter sidebar, enter `5000` in the Min Price input<br>2. Enter `1000` in the Max Price input<br>3. Observe the behavior |
| Test Data | Min Price: `5000`, Max Price: `1000` |
| Expected Result | The system either shows a validation error "Min price cannot be greater than max price", auto-corrects by swapping the values, or returns zero results with a clear indication |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_SF_015 — Price Range Filter: Min Price at Zero (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_015 |
| Module | Search & Filtering |
| Description | Verify that the price filter works correctly when minimum price is set to 0 |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | Products exist with various prices including very low-priced items |
| Test Steps | 1. In the filter sidebar, enter `0` in the Min Price input<br>2. Enter `500` in the Max Price input<br>3. Observe the filtered results |
| Test Data | Min Price: `0`, Max Price: `500`, Expected products: USB Cable (₹199), Basic Pen Drive (₹349), Screen Cleaner (₹149) |
| Expected Result | All products priced from ₹0 to ₹500 are displayed correctly, and the result count updates to reflect the matches |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_SF_016 — Price Range Filter: Negative Value Input (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_016 |
| Module | Search & Filtering |
| Description | Verify that the price filter rejects or handles negative price values |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the products page with the filter sidebar visible |
| Test Steps | 1. In the filter sidebar, enter `-100` in the Min Price input<br>2. Enter `1000` in the Max Price input<br>3. Observe the behavior |
| Test Data | Min Price: `-100`, Max Price: `1000` |
| Expected Result | The system either rejects the negative value with a validation error "Price must be a positive number", treats it as 0, or the input field does not accept negative numbers |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_SF_017 — Result Count Display Updates Dynamically

| Field | Content |
|---|---|
| Test Case ID | TC_SF_017 |
| Module | Search & Filtering |
| Description | Verify that the product result count updates in real-time as filters are applied and removed |
| Priority | Medium |
| Test Type | Positive |
| Preconditions | At least 20 products exist in the database |
| Test Steps | 1. Navigate to the "All Products" page and note the total count (e.g., "20 products found")<br>2. Check the "Clothing" category checkbox and note the updated count<br>3. Additionally select brand "Nike" and note the count<br>4. Uncheck the "Clothing" checkbox and note the count changes |
| Test Data | Total: `20`, After Clothing filter: `8`, After Clothing + Nike: `3`, After Nike only: `5` |
| Expected Result | The result count label updates at each step: 20 → 8 → 3 → 5, accurately reflecting the number of visible products |
| Test Design Technique | State Transition |

---

## TC_SF_018 — Combined Search and Filters Work Together (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_018 |
| Module | Search & Filtering |
| Description | Verify that a search query combined with sidebar filters narrows results correctly |
| Priority | High |
| Test Type | Edge |
| Preconditions | Products exist that match partial criteria; search bar and filters are available |
| Test Steps | 1. Search for "headphones" in the search bar<br>2. On the results page, select category "Electronics"<br>3. Set price range Min: `1000`, Max: `30000`<br>4. Select rating "4★ & above"<br>5. Observe the final filtered results |
| Test Data | Search: `headphones`, Category: `Electronics`, Price: `₹1,000–₹30,000`, Rating: `4★+`, Expected: Sony WH-1000XM5 (₹24,990, 4.8★) |
| Expected Result | Only products matching all criteria (name contains "headphones", in Electronics, price ₹1,000–₹30,000, rated 4★+) are displayed |
| Test Design Technique | Decision Table |

---

## TC_SF_019 — Filter Sidebar Persists After Page Refresh (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_019 |
| Module | Search & Filtering |
| Description | Verify that applied filters are preserved when the page is refreshed (via URL params) |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | Filters are applied and reflected in the URL query parameters |
| Test Steps | 1. Apply category filter "Electronics" and brand "Sony"<br>2. Note the current URL (e.g., `?category=electronics&brand=sony`)<br>3. Press F5 or click the browser refresh button<br>4. Observe the filter sidebar state and product grid |
| Test Data | URL: `?category=electronics&brand=sony` |
| Expected Result | After refresh, the "Electronics" category and "Sony" brand checkboxes are still checked, and the product grid shows the same filtered results as before the refresh |
| Test Design Technique | State Transition |

---

## TC_SF_020 — Search Query with Leading and Trailing Spaces (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_020 |
| Module | Search & Filtering |
| Description | Verify that the search trims whitespace and still returns correct results |
| Priority | Low |
| Test Type | Edge |
| Preconditions | Product "Bluetooth Speaker" exists in the database |
| Test Steps | 1. Click on the search bar<br>2. Type "   Bluetooth Speaker   " (with leading and trailing spaces)<br>3. Press Enter<br>4. Observe the search results |
| Test Data | Search query: `   Bluetooth Speaker   ` (padded with spaces) |
| Expected Result | The search trims the whitespace and returns results for "Bluetooth Speaker" normally, displaying the matching product(s) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_SF_021 — Price Filter with Non-Numeric Input (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_SF_021 |
| Module | Search & Filtering |
| Description | Verify that the price range inputs reject non-numeric characters |
| Priority | Low |
| Test Type | Edge |
| Preconditions | User is on the products page with the filter sidebar visible |
| Test Steps | 1. In the filter sidebar, type "abc" in the Min Price input<br>2. Type "!@#" in the Max Price input<br>3. Observe the input fields and any filter behavior |
| Test Data | Min Price input: `abc`, Max Price input: `!@#` |
| Expected Result | The input fields either reject non-numeric characters (preventing them from being typed), show a validation error "Please enter a valid number", or the filter ignores the invalid input and does not apply |
| Test Design Technique | Equivalence Partitioning (EP) |
