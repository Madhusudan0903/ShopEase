# ShopEase Playwright Automation Framework

## Framework Architecture

```
playwright-automation/
├── config/                         → Environment configuration
│   └── env.config.js               → Base URL, credentials, timeouts, API config
├── fixtures/                       → Test data (JSON)
│   ├── test-data.json              → Module-wise test data (valid & invalid sets)
│   └── users.json                  → User accounts for multi-user testing
├── pages/                          → Page Object Model classes
│   ├── BasePage.js                 → Abstract base class with shared methods
│   ├── HomePage.js                 → Home page (hero, categories, search)
│   ├── LoginPage.js                → Login page (auth, error handling)
│   ├── RegisterPage.js             → Registration page (form, validation)
│   ├── ProductsPage.js             → Product listing (grid, sort, filter, paginate)
│   ├── ProductDetailPage.js        → Product detail (info, stock, cart, reviews)
│   ├── CartPage.js                 → Shopping cart (items, qty, totals, checkout)
│   ├── CheckoutPage.js             → Checkout (address, payment, place order)
│   ├── OrdersPage.js               → My Orders list (order rows, status)
│   └── OrderDetailPage.js          → Order detail (tracker, items, cancel)
├── tests/                          → Test spec files (one per module)
│   ├── registration.spec.js        → 11 registration tests
│   ├── login.spec.js               → 7 login tests
│   ├── product-browsing.spec.js    → 10 product browsing tests
│   ├── product-detail.spec.js      → 10 product detail tests
│   ├── search-filter.spec.js       → 11 search and filter tests
│   ├── shopping-cart.spec.js       → 9 shopping cart tests
│   ├── checkout.spec.js            → 9 checkout flow tests
│   ├── order-tracking.spec.js      → 10 order tracking tests
│   └── reviews.spec.js             → 11 review tests
├── utils/                          → Helper utilities
│   ├── helpers.js                  → Random data generators, formatters, screenshot
│   ├── screenshot-helper.js        → Failure & step screenshot capture
│   └── test-data-helper.js         → Test data access (by module, type, role)
├── reports/                        → HTML reports & screenshots (auto-generated)
├── playwright.config.js            → Playwright configuration
├── package.json                    → Dependencies and npm scripts
└── framework-architecture.md       → This document
```

## Design Patterns

### Page Object Model (POM)

Every page of the ShopEase application is represented by a dedicated class that extends `BasePage`. This pattern:

- **Encapsulates selectors** — All element locators are defined as class properties, making selector changes a single-point update.
- **Exposes page actions** — Methods like `login(email, password)` or `fillShippingAddress(data)` abstract DOM interactions into readable operations.
- **Promotes reuse** — Common actions (`navigate`, `waitForLoad`, `fillInput`, `getText`) live in `BasePage` and are inherited by all pages.
- **Keeps tests clean** — Spec files read as business scenarios, not DOM manipulation scripts.

### Data-Driven Testing

Test data lives in JSON fixture files, accessed through `test-data-helper.js`:

- **Module-scoped data** — `getTestData('login', 'valid')` returns the valid login credentials; `getTestData('registration', 'invalid')` returns all invalid registration variants.
- **Valid and invalid sets** — Every module has both positive and negative test data for comprehensive coverage.
- **Random data generation** — `helpers.js` provides `generateRandomEmail()` and `generateRandomPhone()` so registration tests never collide.

### Separation of Concerns

| Layer       | Responsibility                                 |
|-------------|------------------------------------------------|
| `tests/`    | Test scenarios and assertions                  |
| `pages/`    | Page interactions and locators                 |
| `fixtures/` | Static test data                               |
| `utils/`    | Cross-cutting helpers (screenshots, data, etc) |
| `config/`   | Environment-specific settings                  |

## Configuration

### Playwright Config Highlights

| Setting     | Value                  | Rationale                                     |
|-------------|------------------------|-----------------------------------------------|
| Browser     | Chrome (channel)       | Tests target the real Chrome browser           |
| Workers     | 2                      | Parallel execution for speed                   |
| Retries     | 1                      | Catches flaky failures without over-retrying   |
| Timeout     | 30 seconds             | Generous for network-dependent pages           |
| Screenshots | On failure             | Automatic visual evidence for debugging        |
| Video       | On first retry         | Captures replay of flaky test on retry         |
| Reporter    | HTML + List            | Rich HTML report plus real-time console output |

### NPM Scripts

| Command             | Description                              |
|---------------------|------------------------------------------|
| `npm test`          | Run all tests (headless)                 |
| `npm run test:headed` | Run all tests with browser visible     |
| `npm run test:chrome` | Run only the Chrome project            |
| `npm run test:report` | Open the HTML report in a browser      |

## Reporting Strategy

1. **HTML Report** — Generated in `reports/html-report/` after every run. Contains test results, failure screenshots, and video attachments. Open with `npm run test:report`.
2. **List Reporter** — Prints real-time pass/fail status to the console during execution.
3. **Failure Screenshots** — Captured automatically by Playwright config (`screenshot: 'only-on-failure'`). Also available via `screenshot-helper.js` for custom step captures.
4. **Video on Retry** — When a test fails and is retried, the retry attempt is recorded as a video for debugging.

## Test Coverage Summary

| Module           | Test Count | Key Scenarios                                              |
|------------------|------------|------------------------------------------------------------|
| Registration     | 11         | Valid signup, duplicates, validation, post-register login   |
| Login            | 7          | Valid login, wrong creds, empty fields, session, logout     |
| Product Browsing | 10         | Grid display, pagination, sort, filter, card info           |
| Product Detail   | 10         | Info display, stock, quantity, add-to-cart, reviews section  |
| Search & Filter  | 11         | Keyword search, category/price/brand/rating filters, clear  |
| Shopping Cart    | 9          | Add/update/remove items, totals, empty cart, checkout       |
| Checkout         | 9          | Full flow, payment methods, validation, confirmation        |
| Order Tracking   | 10         | Order list, detail, tracker, cancel, shipped restriction    |
| Reviews          | 11         | Submit, edit, delete, duplicates, invalid data, auth check  |
| **Total**        | **88**     |                                                            |

## Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# View HTML report
npm run test:report
```
