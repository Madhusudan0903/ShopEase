# Test Cases — User Registration & Login

**Application:** ShopEase  
**Module:** User Registration & Login  
**Version:** 1.0  
**Created:** 2026-03-28  

---

## TC_REG_001 — Successful Registration with Valid Data

| Field | Content |
|---|---|
| Test Case ID | TC_REG_001 |
| Module | User Registration & Login |
| Description | Verify that a new user can register successfully when all fields contain valid data |
| Priority | High |
| Test Type | Positive |
| Preconditions | User is on the ShopEase registration page; no account exists with the test email |
| Test Steps | 1. Navigate to the registration page<br>2. Enter full name "Aarav Sharma"<br>3. Enter email "aarav.sharma@gmail.com"<br>4. Enter password "Secure@123"<br>5. Enter phone number "9876543210"<br>6. Click the "Register" button |
| Test Data | Name: `Aarav Sharma`, Email: `aarav.sharma@gmail.com`, Password: `Secure@123`, Phone: `9876543210` |
| Expected Result | Account is created successfully, user receives a confirmation message, and is redirected to the login page |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_002 — Successful Login with Valid Credentials

| Field | Content |
|---|---|
| Test Case ID | TC_REG_002 |
| Module | User Registration & Login |
| Description | Verify that a registered user can log in with correct email and password |
| Priority | High |
| Test Type | Positive |
| Preconditions | User account with email "aarav.sharma@gmail.com" and password "Secure@123" exists and is active |
| Test Steps | 1. Navigate to the login page<br>2. Enter email "aarav.sharma@gmail.com"<br>3. Enter password "Secure@123"<br>4. Click the "Login" button |
| Test Data | Email: `aarav.sharma@gmail.com`, Password: `Secure@123` |
| Expected Result | User is authenticated and redirected to the homepage with their name displayed in the navbar |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_003 — View User Profile After Login

| Field | Content |
|---|---|
| Test Case ID | TC_REG_003 |
| Module | User Registration & Login |
| Description | Verify that a logged-in user can view their profile information |
| Priority | High |
| Test Type | Positive |
| Preconditions | User is logged in with email "aarav.sharma@gmail.com" |
| Test Steps | 1. Click on the user avatar/name in the navbar<br>2. Select "My Profile" from the dropdown<br>3. Observe the profile page content |
| Test Data | Expected display — Name: `Aarav Sharma`, Email: `aarav.sharma@gmail.com`, Phone: `9876543210` |
| Expected Result | Profile page displays the user's full name, email address, and phone number correctly |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_004 — Edit User Profile Successfully

| Field | Content |
|---|---|
| Test Case ID | TC_REG_004 |
| Module | User Registration & Login |
| Description | Verify that a logged-in user can update their profile name and phone number |
| Priority | High |
| Test Type | Positive |
| Preconditions | User is logged in and on the profile page |
| Test Steps | 1. Click the "Edit Profile" button<br>2. Change name from "Aarav Sharma" to "Aarav Kumar Sharma"<br>3. Change phone from "9876543210" to "9123456780"<br>4. Click the "Save Changes" button |
| Test Data | Updated Name: `Aarav Kumar Sharma`, Updated Phone: `9123456780` |
| Expected Result | Profile is updated successfully, a success toast message is shown, and the updated values are reflected on the profile page |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_005 — Successful Logout

| Field | Content |
|---|---|
| Test Case ID | TC_REG_005 |
| Module | User Registration & Login |
| Description | Verify that a logged-in user can log out successfully |
| Priority | High |
| Test Type | Positive |
| Preconditions | User is logged in to ShopEase |
| Test Steps | 1. Click on the user avatar/name in the navbar<br>2. Select "Logout" from the dropdown<br>3. Observe the page state after logout |
| Test Data | N/A |
| Expected Result | User session is terminated, user is redirected to the homepage, and the navbar shows "Login/Register" instead of the user name |
| Test Design Technique | State Transition |

---

## TC_REG_006 — Registration with Duplicate Email

| Field | Content |
|---|---|
| Test Case ID | TC_REG_006 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the email is already associated with an existing account |
| Priority | High |
| Test Type | Negative |
| Preconditions | An account with email "aarav.sharma@gmail.com" already exists in the system |
| Test Steps | 1. Navigate to the registration page<br>2. Enter name "Priya Verma"<br>3. Enter email "aarav.sharma@gmail.com"<br>4. Enter password "NewPass@456"<br>5. Enter phone "9012345678"<br>6. Click the "Register" button |
| Test Data | Name: `Priya Verma`, Email: `aarav.sharma@gmail.com`, Password: `NewPass@456`, Phone: `9012345678` |
| Expected Result | Registration fails with error message "An account with this email already exists" and the user remains on the registration page |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_007 — Login with Incorrect Password

| Field | Content |
|---|---|
| Test Case ID | TC_REG_007 |
| Module | User Registration & Login |
| Description | Verify that login fails when the user enters an incorrect password |
| Priority | High |
| Test Type | Negative |
| Preconditions | User account with email "aarav.sharma@gmail.com" exists |
| Test Steps | 1. Navigate to the login page<br>2. Enter email "aarav.sharma@gmail.com"<br>3. Enter password "WrongPass@999"<br>4. Click the "Login" button |
| Test Data | Email: `aarav.sharma@gmail.com`, Password: `WrongPass@999` |
| Expected Result | Login fails with error message "Invalid email or password" and the user remains on the login page |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_008 — Login with Unregistered Email

| Field | Content |
|---|---|
| Test Case ID | TC_REG_008 |
| Module | User Registration & Login |
| Description | Verify that login fails when the entered email does not exist in the system |
| Priority | High |
| Test Type | Negative |
| Preconditions | No account exists with email "unknown.user@test.com" |
| Test Steps | 1. Navigate to the login page<br>2. Enter email "unknown.user@test.com"<br>3. Enter password "AnyPass@123"<br>4. Click the "Login" button |
| Test Data | Email: `unknown.user@test.com`, Password: `AnyPass@123` |
| Expected Result | Login fails with error message "Invalid email or password" (generic message to prevent email enumeration) |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_009 — Registration with Invalid Email Format

| Field | Content |
|---|---|
| Test Case ID | TC_REG_009 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the email format is invalid |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Ravi Patel"<br>2. Enter email "ravi.patel@"<br>3. Enter password "Valid@1234"<br>4. Enter phone "9876501234"<br>5. Click the "Register" button |
| Test Data | Name: `Ravi Patel`, Email: `ravi.patel@`, Password: `Valid@1234`, Phone: `9876501234` |
| Expected Result | Registration fails with validation error "Please enter a valid email address" displayed under the email field |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_010 — Login with Inactive Account

| Field | Content |
|---|---|
| Test Case ID | TC_REG_010 |
| Module | User Registration & Login |
| Description | Verify that an inactive/deactivated account cannot log in |
| Priority | High |
| Test Type | Negative |
| Preconditions | Account with email "deactivated.user@gmail.com" exists but has been deactivated by admin |
| Test Steps | 1. Navigate to the login page<br>2. Enter email "deactivated.user@gmail.com"<br>3. Enter password "OldPass@123"<br>4. Click the "Login" button |
| Test Data | Email: `deactivated.user@gmail.com`, Password: `OldPass@123` |
| Expected Result | Login fails with error message "Your account has been deactivated. Please contact support." |
| Test Design Technique | State Transition |

---

## TC_REG_011 — Registration with Minimum Name Length (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_011 |
| Module | User Registration & Login |
| Description | Verify that registration succeeds when the name is exactly 2 characters (minimum valid boundary) |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the registration page; no account exists with the test email |
| Test Steps | 1. Enter name "Li"<br>2. Enter email "li.min@gmail.com"<br>3. Enter password "Boundary@1"<br>4. Enter phone "9000000001"<br>5. Click the "Register" button |
| Test Data | Name: `Li` (2 chars), Email: `li.min@gmail.com`, Password: `Boundary@1`, Phone: `9000000001` |
| Expected Result | Registration succeeds as the name meets the minimum 2-character requirement |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_012 — Registration with Name Below Minimum (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_012 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the name is only 1 character (below minimum boundary) |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "A"<br>2. Enter email "a.single@gmail.com"<br>3. Enter password "Boundary@1"<br>4. Enter phone "9000000002"<br>5. Click the "Register" button |
| Test Data | Name: `A` (1 char), Email: `a.single@gmail.com`, Password: `Boundary@1`, Phone: `9000000002` |
| Expected Result | Registration fails with validation error "Name must be between 2 and 50 characters" |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_013 — Registration with Maximum Name Length (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_013 |
| Module | User Registration & Login |
| Description | Verify that registration succeeds when the name is exactly 50 characters (maximum valid boundary) |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the registration page; no account exists with the test email |
| Test Steps | 1. Enter name "Aakashdeep Ramachandran Venkateshwaran Kumarr Nai" (exactly 50 characters)<br>2. Enter email "longname.test@gmail.com"<br>3. Enter password "MaxName@50"<br>4. Enter phone "9000000003"<br>5. Click the "Register" button |
| Test Data | Name: `Aakashdeep Ramachandran Venkateshwaran Kumarr Nai` (50 chars), Email: `longname.test@gmail.com`, Password: `MaxName@50`, Phone: `9000000003` |
| Expected Result | Registration succeeds as the name meets the maximum 50-character limit |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_014 — Registration with Password Missing Uppercase Letter (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_014 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the password does not contain an uppercase letter |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Meera Joshi"<br>2. Enter email "meera.joshi@gmail.com"<br>3. Enter password "alllower1" (no uppercase)<br>4. Enter phone "9111222333"<br>5. Click the "Register" button |
| Test Data | Name: `Meera Joshi`, Email: `meera.joshi@gmail.com`, Password: `alllower1`, Phone: `9111222333` |
| Expected Result | Registration fails with validation error "Password must contain at least one uppercase letter, one lowercase letter, and one number" |
| Test Design Technique | Decision Table |

---

## TC_REG_015 — Registration with Phone Number Not Exactly 10 Digits (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_015 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the phone number has fewer than 10 digits |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Arjun Reddy"<br>2. Enter email "arjun.reddy@gmail.com"<br>3. Enter password "Valid@1234"<br>4. Enter phone "98765" (5 digits)<br>5. Click the "Register" button |
| Test Data | Name: `Arjun Reddy`, Email: `arjun.reddy@gmail.com`, Password: `Valid@1234`, Phone: `98765` |
| Expected Result | Registration fails with validation error "Phone number must be exactly 10 digits" |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_016 — Registration with Password Exactly 8 Characters (Boundary Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_016 |
| Module | User Registration & Login |
| Description | Verify that registration succeeds when the password is exactly 8 characters meeting all complexity rules |
| Priority | Medium |
| Test Type | Edge |
| Preconditions | User is on the registration page; no account exists with the test email |
| Test Steps | 1. Enter name "Neha Gupta"<br>2. Enter email "neha.gupta@gmail.com"<br>3. Enter password "Short@1a" (exactly 8 characters)<br>4. Enter phone "9222333444"<br>5. Click the "Register" button |
| Test Data | Name: `Neha Gupta`, Email: `neha.gupta@gmail.com`, Password: `Short@1a` (8 chars), Phone: `9222333444` |
| Expected Result | Registration succeeds as the password meets the minimum 8-character requirement and contains uppercase, lowercase, and a number |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_017 — Registration with Password Only 7 Characters (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_017 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the password is only 7 characters |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Kiran Das"<br>2. Enter email "kiran.das@gmail.com"<br>3. Enter password "Shor@1a" (7 characters)<br>4. Enter phone "9333444555"<br>5. Click the "Register" button |
| Test Data | Name: `Kiran Das`, Email: `kiran.das@gmail.com`, Password: `Shor@1a` (7 chars), Phone: `9333444555` |
| Expected Result | Registration fails with validation error "Password must be at least 8 characters long" |
| Test Design Technique | Boundary Value Analysis (BVA) |

---

## TC_REG_018 — Registration with Phone Containing Non-Numeric Characters (Edge)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_018 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the phone number contains letters or special characters |
| Priority | Low |
| Test Type | Edge |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Divya Nair"<br>2. Enter email "divya.nair@gmail.com"<br>3. Enter password "Valid@1234"<br>4. Enter phone "98765ABCDE"<br>5. Click the "Register" button |
| Test Data | Name: `Divya Nair`, Email: `divya.nair@gmail.com`, Password: `Valid@1234`, Phone: `98765ABCDE` |
| Expected Result | Registration fails with validation error "Phone number must contain only digits" or the field rejects non-numeric input |
| Test Design Technique | Equivalence Partitioning (EP) |

---

## TC_REG_019 — Registration with All Fields Empty

| Field | Content |
|---|---|
| Test Case ID | TC_REG_019 |
| Module | User Registration & Login |
| Description | Verify that registration fails with appropriate errors when all fields are submitted empty |
| Priority | Medium |
| Test Type | Negative |
| Preconditions | User is on the registration page |
| Test Steps | 1. Leave all fields (name, email, password, phone) empty<br>2. Click the "Register" button |
| Test Data | Name: `` (empty), Email: `` (empty), Password: `` (empty), Phone: `` (empty) |
| Expected Result | Registration fails and validation errors are displayed for each required field: "Name is required", "Email is required", "Password is required", "Phone number is required" |
| Test Design Technique | Decision Table |

---

## TC_REG_020 — Registration with Name Exceeding 50 Characters (Boundary)

| Field | Content |
|---|---|
| Test Case ID | TC_REG_020 |
| Module | User Registration & Login |
| Description | Verify that registration fails when the name exceeds the 50-character maximum |
| Priority | Medium |
| Test Type | Boundary |
| Preconditions | User is on the registration page |
| Test Steps | 1. Enter name "Aakashdeep Ramachandran Venkateshwaran Kumarrr Nai" (51 characters)<br>2. Enter email "overlength.name@gmail.com"<br>3. Enter password "Valid@1234"<br>4. Enter phone "9444555666"<br>5. Click the "Register" button |
| Test Data | Name: `Aakashdeep Ramachandran Venkateshwaran Kumarrr Nai` (51 chars), Email: `overlength.name@gmail.com`, Password: `Valid@1234`, Phone: `9444555666` |
| Expected Result | Registration fails with validation error "Name must be between 2 and 50 characters" |
| Test Design Technique | Boundary Value Analysis (BVA) |
