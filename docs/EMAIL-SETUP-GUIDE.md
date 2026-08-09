# EMAIL NOTIFICATION SETUP GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Adapter Location:** `lib/email/adapter.ts` & `lib/email/service.ts`  
> **Default Recipient:** `egypt_nationaltours@yahoo.com`  

---

## 1. Architecture Overview

When a customer submits any request on the public website, `submitRequestAction()` triggers `emailNotificationService.sendRequestNotification()` asynchronously to send an instant alert email to the official company inbox (`egypt_nationaltours@yahoo.com`).

The email contains:
- **Reference Number**: `ENT-YYYY-XXXXXX`
- **Request Category**: (Flight, Hotel, Visa, Security Approval, Transportation, Tour, Pilgrimage, General)
- **Customer Info**: Full Name, Email, Phone/WhatsApp
- **Timestamp**: Date and time of submission
- **Escaped Payload Details Table**: Full JSON payload key/value pairs safely formatted in HTML.

---

## 2. Environment Variables Configuration

In `.env.local` or hosting provider settings:

```env
# Email Provider Selection
EMAIL_PROVIDER="resend"

# Resend API Secret Key
EMAIL_PROVIDER_API_KEY="re_123456789_YourActualResendApiKey"

# Official Company Notification Recipient
EMAIL_NOTIFICATION_RECIPIENT="egypt_nationaltours@yahoo.com"
```

---

## 3. Supported Email Delivery Statuses

`lib/email/adapter.ts` tracks four distinct delivery states recorded in PostgreSQL `requests.notification_status`:

1. `sent`: Email successfully accepted by Resend HTTP API (HTTP 200/201).
2. `failed`: Resend API returned an error or network timeout occurred.
3. `skipped_no_credentials`: `EMAIL_PROVIDER_API_KEY` is missing or empty. Submissions proceed cleanly without throwing runtime errors.
4. `pending`: Initial status before dispatch attempt.

---

## 4. Security & Sanitization

- **HTML Injection Protection**: All customer inputs (`customerName`, `customerEmail`, `customerPhone`, `details` key/values) pass through `escapeHtml()` in `lib/email/service.ts` before building the HTML string.
- **Credential Protection**: `EMAIL_PROVIDER_API_KEY` is server-side only and is never exposed in client bundles or public API routes.

---

## 5. How to Test Real Email Delivery

1. Obtain a valid Resend API Key from [resend.com](https://resend.com).
2. Add `EMAIL_PROVIDER_API_KEY="re_..."` to `.env.local`.
3. Submit a test request on `http://localhost:3000/ar/request`.
4. Verify the inbox at `egypt_nationaltours@yahoo.com` for the incoming notification email.
