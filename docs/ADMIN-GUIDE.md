# ADMIN PANEL & CMS USER GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Admin Login Route:** `/admin/login`  
> **Dashboard Route:** `/admin`  

---

## 1. Authentication & Access

### Logging In
1. Navigate to `/admin/login`.
2. Enter admin credentials:
   - **Default Admin Email**: `admin@egyptnationaltours.com`
   - **Default Password**: `Admin@ENT2026` *(Change in production database `admin_users` table)*.
3. Upon successful login, an HTTP-Only signed session cookie (`ent_admin_session`) is set, valid for 24 hours.

### Security Controls
- Protected routes (`/admin/*`) are enforced by Edge Middleware (`middleware.ts`).
- Session tokens are signed using HMAC-SHA256 and verified using constant-time comparison.
- Password hashes use PBKDF2 with SHA-512 (100,000 iterations).

---

## 2. Admin Dashboard (`/admin`)

The Operational Dashboard displays real-time key metrics:
- **Total Requests Received**: Overview of all customer requests.
- **New Requests (Pending)**: Highlighted count requiring immediate follow-up.
- **In Progress / Contacted**: Requests actively being processed.
- **Completed Bookings**: Closed/fulfilled service requests.

---

## 3. Customer Requests Management (`/admin/requests`)

### Listing & Filtering
- **Search**: Search by customer full name, email, phone number, or reference number (`ENT-YYYY-XXXXXX`).
- **Status Filter**: Filter by status (`new`, `contacted`, `in_progress`, `completed`, `cancelled`).
- **Type Filter**: Filter by service type (`flight`, `hotel`, `visa`, `security_approval`, `transportation`, `egypt_tour`, `international_tour`, `hajj`, `umrah`, `general`).

### Request Detail View (`/admin/requests/[id]`)
- **Status Updater**: Update request status. Each transition automatically logs an audit entry in `RequestEvent`.
- **Customer Profile & WhatsApp**: Direct WhatsApp link (`https://wa.me/...`) to message customer instantly.
- **Submitted Details Table**: Structured JSON payload table displaying check-in/out dates, traveler counts, flight segments, or hotel preferences.
- **Internal Notes**: Add internal admin notes (`RequestNote`) for team collaboration.
- **Event Audit Log**: Complete timestamped audit history of all status changes.

---

## 4. CMS Content Management

### Tours Management (`/admin/tours`)
- **Create Tour (`/admin/tours/new`)**: Create new domestic or international tour programs with bilingual titles, summaries, duration, URL slug, and `isFeatured` flag.
- **Edit Tour (`/admin/tours/[id]`)**: Update tour details, destinations list, and day-by-day itineraries.
- **Publication Status**: Toggle status (`published`, `draft`, `archived`).

### Services Management (`/admin/services`)
- **Edit Service (`/admin/services/[id]`)**: Update titles (Ar/En), descriptions (Ar/En), display order, and `isFeatured` flag for the 10 service categories.

### Reviews Management (`/admin/reviews`)
- **Create Review (`/admin/reviews/new`)**: Add approved customer reviews with star rating (1 to 5) and bilingual comments.
- **Demo Flag (`isDemo`)**: Setting `isDemo: true` isolates test reviews from the public website to maintain strict truthfulness compliance.
