# Test Cases — Ratings & Reviews Module

**Application:** ShopEase  
**Module:** Ratings & Reviews  
**Version:** 1.0  
**Author:** QA Team  
**Date:** 2026-03-28  

---

## TC_RR_001 — Submit a Valid Review with 5-Star Rating

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_001 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a logged-in user who has purchased and received (delivered) a product can submit a review with a valid star rating, title, and comment. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User "testuser@shopease.com" is logged in. User has a delivered order containing "Wireless Mouse". User has not previously reviewed "Wireless Mouse". |
| **Test Steps** | 1. Navigate to the "Wireless Mouse" product page.<br>2. Scroll to the "Write a Review" section.<br>3. Click the 5th star to select a 5-star rating.<br>4. Enter Title: "Excellent quality mouse".<br>5. Enter Comment: "This mouse is super smooth and responsive. Battery life is great too. Highly recommend for daily use."<br>6. Click "Submit Review". |
| **Test Data** | Rating: 5 stars, Title: "Excellent quality mouse" (23 chars), Comment: "This mouse is super smooth and responsive. Battery life is great too. Highly recommend for daily use." (101 chars) |
| **Expected Result** | Review is submitted successfully. A success message "Review submitted successfully" is displayed. The review appears in the product's review list with user name, 5-star rating, title, comment, date, and a "Verified Purchase" badge. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_002 — Submit a Valid Review with 1-Star Rating

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_002 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user can submit a review with the minimum 1-star rating and valid title/comment. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. User has a delivered order containing "Phone Cable". No prior review for this product. |
| **Test Steps** | 1. Navigate to "Phone Cable" product page.<br>2. Click the 1st star to select a 1-star rating.<br>3. Enter Title: "Broke in a week".<br>4. Enter Comment: "Cable stopped working after just 7 days. Very poor quality material. Would not buy again."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 1 star, Title: "Broke in a week" (15 chars), Comment: "Cable stopped working after just 7 days. Very poor quality material. Would not buy again." (89 chars) |
| **Expected Result** | Review submitted successfully. Review displays with 1-star rating, title, comment, date, and "Verified Purchase" badge. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_003 — Submit Review with 3-Star Rating (Mid-Range)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_003 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user can submit a review with a mid-range 3-star rating. |
| **Priority** | Medium |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. User has a delivered order containing "USB Keyboard". No prior review for this product. |
| **Test Steps** | 1. Navigate to "USB Keyboard" product page.<br>2. Click the 3rd star for a 3-star rating.<br>3. Enter Title: "Average keyboard, decent for price".<br>4. Enter Comment: "It works fine for basic typing. Key feedback could be better but acceptable at this price point."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 3 stars, Title: "Average keyboard, decent for price" (34 chars), Comment: "It works fine for basic typing. Key feedback could be better but acceptable at this price point." (95 chars) |
| **Expected Result** | Review submitted. Displays with 3-star rating, title, comment, date, and "Verified Purchase" badge on the product page. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_004 — Edit Own Review

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_004 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user can edit their previously submitted review, changing the rating, title, and comment. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. User has an existing review for "Wireless Mouse" with 5 stars, title "Excellent quality mouse". |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page.<br>2. Locate own review in the reviews section.<br>3. Click the "Edit" button on the review.<br>4. Change rating to 4 stars.<br>5. Update Title to "Good mouse, minor issue".<br>6. Update Comment to "Still a great mouse overall, but the scroll wheel started squeaking after a month. Downgrading from 5 to 4 stars."<br>7. Click "Save Changes". |
| **Test Data** | Original: 5 stars, "Excellent quality mouse". Updated: 4 stars, Title: "Good mouse, minor issue" (23 chars), Comment: "Still a great mouse overall, but the scroll wheel started squeaking after a month. Downgrading from 5 to 4 stars." (113 chars) |
| **Expected Result** | Review is updated. The review list shows the new 4-star rating, updated title, and updated comment. The average rating for the product is recalculated. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_005 — Delete Own Review

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_005 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user can delete their own review and the product's average rating recalculates. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | User is logged in. User has an existing review for "Phone Cable". Product has 3 reviews with ratings 1, 4, 5 (average: 3.3). |
| **Test Steps** | 1. Navigate to "Phone Cable" product page.<br>2. Locate own review (1-star).<br>3. Click the "Delete" button.<br>4. Confirm deletion in the dialog. |
| **Test Data** | User's review: 1 star. Remaining reviews: 4 stars, 5 stars. |
| **Expected Result** | Review is removed from the list. Total review count decreases by 1 (from 3 to 2). Average rating recalculates to 4.5 (from 3.3). Success message "Review deleted" is shown. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_006 — Submit Review Without Being Logged In

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_006 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a guest (not logged in) user cannot submit a review. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is NOT logged in (guest session). |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page.<br>2. Scroll to the reviews section.<br>3. Attempt to write a review or look for the "Write a Review" form. |
| **Test Data** | N/A |
| **Expected Result** | The "Write a Review" form is hidden or disabled. A message such as "Please log in to write a review" is displayed with a link to the login page. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_007 — Submit Review for a Product Not Purchased

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_007 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a logged-in user who has NOT purchased a product cannot submit a review for it. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User "testuser@shopease.com" is logged in. User has never ordered "Laptop Stand". |
| **Test Steps** | 1. Navigate to "Laptop Stand" product page.<br>2. Scroll to the reviews section.<br>3. Attempt to write a review. |
| **Test Data** | User: testuser@shopease.com, Product: Laptop Stand (not purchased) |
| **Expected Result** | The review form is either hidden or shows a message "You can only review products you have purchased and received." No review submission is possible. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_008 — Submit Review for Product Ordered But Not Yet Delivered

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_008 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user cannot review a product from an order that has not yet reached "Delivered" status. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. User has an order containing "Desk Organizer" with status "Shipped" (not yet delivered). |
| **Test Steps** | 1. Navigate to "Desk Organizer" product page.<br>2. Scroll to the reviews section.<br>3. Attempt to submit a review. |
| **Test Data** | User: testuser@shopease.com, Product: Desk Organizer, Order Status: Shipped |
| **Expected Result** | Review form is unavailable. A message like "You can review this product once it has been delivered" is shown. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_009 — Submit Duplicate Review for Same Product (Prevention)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_009 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a user who has already reviewed a product cannot submit a second review for the same product. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. User has an existing review for "Wireless Mouse". |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page.<br>2. Scroll to the reviews section.<br>3. Look for the "Write a Review" form or button. |
| **Test Data** | User: testuser@shopease.com, Product: Wireless Mouse (already reviewed) |
| **Expected Result** | The "Write a Review" form is replaced with "You have already reviewed this product" message. Edit and Delete options are available instead. No duplicate submission is possible. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_010 — Title Below Minimum Length (2 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_010 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review title shorter than 3 characters is rejected by validation. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. User has a delivered order containing "USB Keyboard". No prior review. |
| **Test Steps** | 1. Navigate to "USB Keyboard" product page.<br>2. Select a 4-star rating.<br>3. Enter Title: "OK" (2 chars).<br>4. Enter Comment: "Good keyboard with nice keys and feel. Comfortable for typing."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 4, Title: "OK" (2 chars — below minimum 3), Comment: "Good keyboard with nice keys and feel. Comfortable for typing." (62 chars) |
| **Expected Result** | Validation error: "Title must be between 3 and 100 characters". Review is not submitted. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_011 — Title at Exact Minimum Length (3 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_011 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review title with exactly 3 characters (minimum valid length) is accepted. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. User has a delivered order containing "USB Keyboard". No prior review. |
| **Test Steps** | 1. Navigate to "USB Keyboard" product page.<br>2. Select a 4-star rating.<br>3. Enter Title: "Meh" (3 chars).<br>4. Enter Comment: "Acceptable quality but nothing special. Gets the job done for basic usage."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 4, Title: "Meh" (3 chars — exact minimum), Comment: "Acceptable quality but nothing special. Gets the job done for basic usage." (73 chars) |
| **Expected Result** | Review is submitted successfully. No validation error for the title. Review appears in the product review list. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_012 — Title at Exact Maximum Length (100 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_012 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review title with exactly 100 characters (maximum valid length) is accepted. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. User has a delivered order containing "Laptop Stand". No prior review. |
| **Test Steps** | 1. Navigate to "Laptop Stand" product page.<br>2. Select a 5-star rating.<br>3. Enter Title: "This is a really wonderful and premium quality laptop stand that I would recommend to everyone I know" (100 chars).<br>4. Enter Comment: "Sturdy build, great height adjustment. Keeps my laptop cool and improves my posture significantly."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 5, Title: "This is a really wonderful and premium quality laptop stand that I would recommend to everyone I know" (100 chars — exact maximum), Comment: 97 chars |
| **Expected Result** | Review is submitted successfully. Title is displayed fully (100 chars). No validation error. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_013 — Title Exceeds Maximum Length (101 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_013 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review title exceeding 100 characters is rejected. |
| **Priority** | Medium |
| **Test Type** | Boundary |
| **Preconditions** | User is logged in. User has a delivered order containing "Laptop Stand". No prior review. |
| **Test Steps** | 1. Navigate to "Laptop Stand" product page.<br>2. Select a 5-star rating.<br>3. Enter Title: "This is a really wonderful and premium quality laptop stand that I would recommend to everyone I know!" (101 chars).<br>4. Enter Comment: "Great product, highly recommended for anyone working from home."<br>5. Click "Submit Review". |
| **Test Data** | Rating: 5, Title: 101 characters (exceeds max 100), Comment: 62 chars |
| **Expected Result** | Validation error: "Title must be between 3 and 100 characters". Review is not submitted. Input may be truncated to 100 characters or prevented from further input. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_014 — Comment Below Minimum Length (9 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_014 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review comment with fewer than 10 characters is rejected. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. User has a delivered order containing "Desk Organizer". No prior review. |
| **Test Steps** | 1. Navigate to "Desk Organizer" product page.<br>2. Select a 3-star rating.<br>3. Enter Title: "It is okay".<br>4. Enter Comment: "Not great" (9 chars).<br>5. Click "Submit Review". |
| **Test Data** | Rating: 3, Title: "It is okay" (10 chars), Comment: "Not great" (9 chars — below minimum 10) |
| **Expected Result** | Validation error: "Comment must be between 10 and 1000 characters". Review is not submitted. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_015 — Comment at Exact Maximum Length (1000 Characters)

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_015 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that a review comment with exactly 1000 characters is accepted. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User is logged in. User has a delivered order containing "Desk Organizer". No prior review. |
| **Test Steps** | 1. Navigate to "Desk Organizer" product page.<br>2. Select a 4-star rating.<br>3. Enter Title: "Detailed review of the desk organizer".<br>4. Enter Comment: (a 1000-character detailed review text).<br>5. Click "Submit Review". |
| **Test Data** | Rating: 4, Title: 36 chars, Comment: exactly 1000 characters (a detailed paragraph about the organizer's build quality, compartments, material, color, durability, value for money, comparison with competitors, and final recommendation — padded to exactly 1000 characters) |
| **Expected Result** | Review is submitted successfully. The full 1000-character comment is saved and displayed correctly on the product page. No truncation occurs. |
| **Test Design Technique** | Boundary Value Analysis |

---

## TC_RR_016 — Submit Review Without Selecting Star Rating

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_016 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that the review form requires a star rating and rejects submission without one. |
| **Priority** | High |
| **Test Type** | Negative |
| **Preconditions** | User is logged in. User has a delivered order containing "Wireless Mouse". No prior review. |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page.<br>2. Do NOT click any star (rating = 0 or unselected).<br>3. Enter Title: "Great product".<br>4. Enter Comment: "Really liked it, works perfectly for everyday usage."<br>5. Click "Submit Review". |
| **Test Data** | Rating: (none selected), Title: "Great product" (13 chars), Comment: 52 chars |
| **Expected Result** | Validation error: "Please select a star rating". Review is not submitted. Star selector may highlight or display a warning. |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_017 — Average Rating Calculation on Product Page

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_017 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that the average rating displayed on the product page is correctly calculated from all approved reviews. |
| **Priority** | High |
| **Test Type** | Positive |
| **Preconditions** | Product "USB Keyboard" has 4 approved reviews with ratings: 5, 4, 3, 4. |
| **Test Steps** | 1. Navigate to the "USB Keyboard" product page.<br>2. Observe the average rating displayed near the product title.<br>3. Observe the total review count. |
| **Test Data** | Reviews: 5, 4, 3, 4. Expected Average: (5+4+3+4)/4 = 4.0. Total reviews: 4. |
| **Expected Result** | Average rating displayed as 4.0 (or 4.0/5). Star visual shows 4 out of 5 stars filled. Review count shows "(4 reviews)". |
| **Test Design Technique** | Equivalence Partitioning |

---

## TC_RR_018 — Review Displays Verified Purchase Badge

| Field | Content |
|---|---|
| **Test Case ID** | TC_RR_018 |
| **Module** | Ratings & Reviews |
| **Description** | Verify that reviews from users who purchased and received the product display a "Verified Purchase" badge. |
| **Priority** | Medium |
| **Test Type** | Edge |
| **Preconditions** | User "testuser@shopease.com" submitted a review for "Wireless Mouse" after a delivered order. |
| **Test Steps** | 1. Navigate to "Wireless Mouse" product page.<br>2. Scroll to the reviews section.<br>3. Locate the review by "testuser@shopease.com". |
| **Test Data** | Reviewer: testuser@shopease.com, Product: Wireless Mouse, Order Status: Delivered |
| **Expected Result** | The review card shows: user name/display name, star rating, title, comment, date of review, and a "Verified Purchase" badge (checkmark icon or label). |
| **Test Design Technique** | Equivalence Partitioning |

---
