# Capstone Shopping API Documentation

**Base URL:** `http://localhost:5000/api`

**Response Format:** All endpoints return responses in the following format:
```json
{
  "success": true | false,
  "message": "Description of the result",
  "data": { ... } | null
}
```

**Authentication:** Protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### POST /api/auth/register
Register a new user account.

- **Auth Required:** No
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zip_code": "62701"
}
```
- **Validation Rules:**
  - `name`: Required, 2-50 characters
  - `email`: Required, valid email format
  - `password`: Required, min 8 characters, must contain uppercase + lowercase + number
  - `phone`: Required, exactly 10 digits
  - `address`, `city`, `state`, `zip_code`: Optional
- **Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "customer" },
    "token": "jwt_token_here"
  }
}
```
- **Error Responses:** 409 (email exists), 422 (validation failed)

---

### POST /api/auth/login
Login with email and password.

- **Auth Required:** No
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```
- **Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "customer" },
    "token": "jwt_token_here"
  }
}
```
- **Error Responses:** 401 (invalid credentials), 403 (account deactivated)

---

### GET /api/auth/profile
Get the authenticated user's profile.

- **Auth Required:** Yes
- **Success Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": 1, "name": "John Doe", "email": "john@example.com",
      "phone": "1234567890", "role": "customer", "address": "123 Main St",
      "city": "Springfield", "state": "IL", "zip_code": "62701",
      "is_active": 1, "created_at": "...", "updated_at": "..."
    }
  }
}
```

---

### PUT /api/auth/profile
Update the authenticated user's profile.

- **Auth Required:** Yes
- **Request Body:** (all fields optional)
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": "456 Oak Ave",
  "city": "Chicago",
  "state": "IL",
  "zip_code": "60601"
}
```
- **Success Response (200):** Updated user object
- **Error Responses:** 400 (no fields to update), 422 (validation failed)

---

## Product Endpoints

### GET /api/products
Get all products with filtering, sorting, and pagination.

- **Auth Required:** No
- **Query Parameters:**
  - `category` (integer) - Filter by category ID
  - `minPrice` (number) - Minimum price
  - `maxPrice` (number) - Maximum price
  - `brand` (string) - Filter by brand
  - `minRating` (number) - Minimum rating
  - `search` (string) - Search in name and description
  - `sort` (string) - Sort option: `price_asc`, `price_desc`, `name_asc`, `name_desc`, `newest`, `oldest`, `rating`, `popularity`
  - `page` (integer, default: 1)
  - `limit` (integer, default: 10)
- **Success Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [...],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### GET /api/products/:id
Get a single product by ID.

- **Auth Required:** No
- **Success Response (200):** Product object with category_name
- **Error Responses:** 404 (not found)

---

### POST /api/products
Create a new product (admin only).

- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description here (min 10 chars)",
  "price": 29.99,
  "category_id": 1,
  "stock": 100,
  "sku": "PROD-001",
  "brand": "BrandName",
  "image_url": "https://example.com/image.jpg"
}
```
- **Validation Rules:**
  - `name`: Required, 2-200 characters
  - `description`: Required, 10-2000 characters
  - `price`: Required, must be > 0
  - `category_id`: Required, positive integer
  - `stock`: Optional, non-negative integer
  - `sku`: Optional, alphanumeric with hyphens
- **Success Response (201):** Created product object
- **Error Responses:** 403 (not admin), 404 (category not found), 422 (validation failed)

---

### PUT /api/products/:id
Update a product (admin only).

- **Auth Required:** Yes (Admin)
- **Request Body:** Same fields as create (all optional)
- **Success Response (200):** Updated product object
- **Error Responses:** 403 (not admin), 404 (not found)

---

### DELETE /api/products/:id
Soft-delete a product (admin only).

- **Auth Required:** Yes (Admin)
- **Success Response (200):** Confirmation message
- **Error Responses:** 403 (not admin), 404 (not found)

---

## Category Endpoints

### GET /api/categories
Get all categories with product counts.

- **Auth Required:** No
- **Success Response (200):** Array of category objects with `product_count`

---

### GET /api/categories/:id
Get a single category.

- **Auth Required:** No
- **Success Response (200):** Category object
- **Error Responses:** 404 (not found)

---

### POST /api/categories
Create a new category (admin only).

- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic devices and gadgets",
  "image_url": "https://example.com/electronics.jpg"
}
```
- **Success Response (201):** Created category object

---

### PUT /api/categories/:id
Update a category (admin only).

- **Auth Required:** Yes (Admin)
- **Request Body:** Same fields as create (all optional)
- **Success Response (200):** Updated category object

---

### DELETE /api/categories/:id
Delete a category (admin only). Fails if category has active products.

- **Auth Required:** Yes (Admin)
- **Success Response (200):** Confirmation message
- **Error Responses:** 400 (has active products), 404 (not found)

---

## Cart Endpoints

All cart endpoints require authentication.

### GET /api/cart
Get the current user's cart.

- **Auth Required:** Yes
- **Success Response (200):**
```json
{
  "success": true,
  "message": "Cart retrieved successfully",
  "data": {
    "items": [
      {
        "id": 1, "product_id": 5, "quantity": 2,
        "name": "Product Name", "price": 29.99,
        "image_url": "...", "stock": 50, "is_active": 1
      }
    ],
    "total": 59.98,
    "itemCount": 2
  }
}
```

---

### POST /api/cart
Add an item to the cart.

- **Auth Required:** Yes
- **Request Body:**
```json
{
  "product_id": 5,
  "quantity": 2
}
```
- **Validation Rules:**
  - `product_id`: Required, positive integer
  - `quantity`: Required, 1-10
- **Business Rules:**
  - Product must exist and be active
  - Product must be in stock
  - Quantity cannot exceed available stock
  - Maximum 10 items per product in cart
- **Success Response (200):** Updated cart items and total
- **Error Responses:** 400 (out of stock, exceeds stock, inactive), 404 (product not found)

---

### PUT /api/cart/:id
Update cart item quantity.

- **Auth Required:** Yes
- **Request Body:**
```json
{
  "quantity": 3
}
```
- **Success Response (200):** Updated cart items and total
- **Error Responses:** 400 (exceeds stock), 404 (cart item not found)

---

### DELETE /api/cart/:id
Remove an item from the cart.

- **Auth Required:** Yes
- **Success Response (200):** Updated cart items and total
- **Error Responses:** 404 (cart item not found)

---

### DELETE /api/cart/clear
Clear all items from the cart.

- **Auth Required:** Yes
- **Success Response (200):** Empty cart
- **Error Responses:** 400 (cart already empty)

---

## Order Endpoints

### POST /api/orders
Create a new order from the current cart.

- **Auth Required:** Yes
- **Request Body:**
```json
{
  "shipping_address": "123 Main St",
  "shipping_city": "Springfield",
  "shipping_state": "IL",
  "shipping_zip": "62701",
  "payment_method": "credit_card"
}
```
- **Validation Rules:**
  - `shipping_address`: Required, 5-255 characters
  - `shipping_city`: Required, 2-100 characters
  - `shipping_state`: Required, 2-100 characters
  - `shipping_zip`: Required, 5-6 digits
  - `payment_method`: Required, one of: `credit_card`, `debit_card`, `upi`, `net_banking`, `cod`
- **Business Rules:**
  - Cart must not be empty
  - All products must be active and in stock
  - Uses DB transaction (inserts order, order items, status history, decrements stock, clears cart)
- **Success Response (201):** Created order with items and status history
- **Error Responses:** 400 (empty cart, insufficient stock, inactive product)

---

### GET /api/orders/my-orders
Get the authenticated user's orders.

- **Auth Required:** Yes
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 10)
- **Success Response (200):** Paginated list of orders with item counts

---

### GET /api/orders/:id
Get a specific order by ID.

- **Auth Required:** Yes
- **Business Rules:** Users can only view their own orders (admins can view any)
- **Success Response (200):** Full order with items, customer info, and status history
- **Error Responses:** 403 (not owner), 404 (not found)

---

### GET /api/orders/admin/all
Get all orders (admin only).

- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 10)
  - `status` (string) - Filter by status
- **Success Response (200):** Paginated list of all orders with customer info

---

### PUT /api/orders/:id/status
Update order status (admin only).

- **Auth Required:** Yes (Admin)
- **Request Body:**
```json
{
  "status": "confirmed"
}
```
- **Valid Status Values:** `placed`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`
- **Status Transition Rules:**
  - `placed` -> `confirmed` or `cancelled`
  - `confirmed` -> `processing` or `cancelled`
  - `processing` -> `shipped`
  - `shipped` -> `delivered`
  - `delivered` -> (no further transitions)
  - `cancelled` -> (no further transitions)
- **Success Response (200):** Updated order
- **Error Responses:** 400 (invalid transition), 404 (not found)

---

### PUT /api/orders/:id/cancel
Cancel an order.

- **Auth Required:** Yes
- **Business Rules:**
  - Users can only cancel their own orders
  - Can only cancel orders with status `placed` or `confirmed`
  - Restores product stock on cancellation
- **Success Response (200):** Cancelled order
- **Error Responses:** 400 (cannot cancel at this stage), 403 (not owner), 404 (not found)

---

## Review Endpoints

### GET /api/reviews/product/:productId
Get all reviews for a product.

- **Auth Required:** No
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 10)
- **Success Response (200):**
```json
{
  "success": true,
  "message": "Product reviews retrieved successfully",
  "data": {
    "reviews": [
      {
        "id": 1, "user_id": 2, "product_id": 5,
        "rating": 4, "title": "Great product",
        "comment": "Really enjoyed using this product...",
        "user_name": "John Doe",
        "created_at": "...", "updated_at": "..."
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "averageRating": "4.2",
    "totalReviews": 15
  }
}
```

---

### POST /api/reviews
Create a review for a product.

- **Auth Required:** Yes
- **Request Body:**
```json
{
  "product_id": 5,
  "rating": 4,
  "title": "Great product",
  "comment": "Really enjoyed using this product. Would recommend to others."
}
```
- **Validation Rules:**
  - `product_id`: Required, positive integer
  - `rating`: Required, integer 1-5
  - `title`: Required, 3-100 characters
  - `comment`: Required, 10-1000 characters
- **Business Rules:**
  - User must have purchased and received (delivered) the product
  - One review per user per product (no duplicates)
  - Automatically updates product's average rating
- **Success Response (201):** Created review object
- **Error Responses:** 403 (not purchased), 404 (product not found), 409 (already reviewed)

---

### PUT /api/reviews/:id
Update a review (owner only).

- **Auth Required:** Yes
- **Request Body:** (all optional)
```json
{
  "rating": 5,
  "title": "Updated title",
  "comment": "Updated comment that is at least 10 characters"
}
```
- **Success Response (200):** Updated review object
- **Error Responses:** 403 (not owner), 404 (not found)

---

### DELETE /api/reviews/:id
Delete a review (owner or admin).

- **Auth Required:** Yes
- **Success Response (200):** Confirmation message
- **Error Responses:** 403 (not owner and not admin), 404 (not found)

---

### GET /api/reviews/my-reviews
Get the authenticated user's reviews.

- **Auth Required:** Yes
- **Query Parameters:**
  - `page` (integer, default: 1)
  - `limit` (integer, default: 10)
- **Success Response (200):** Paginated list of reviews with product info

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (business logic error) |
| 401  | Unauthorized (missing/invalid token) |
| 403  | Forbidden (insufficient permissions) |
| 404  | Not Found |
| 409  | Conflict (duplicate entry) |
| 422  | Unprocessable Entity (validation error) |
| 500  | Internal Server Error |
