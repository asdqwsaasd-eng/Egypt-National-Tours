# Egypt National Tours --- Technical Architecture & Technology Stack

## 1. Purpose

This document defines the recommended technical architecture for Egypt
National Tours.

The architecture must balance:

-   Simplicity
-   Low operating cost
-   Performance
-   Security
-   Arabic/English support
-   Real CMS capability
-   Persistent requests
-   Source-code ownership
-   Future API integrations
-   Easy maintenance by a small team

Do not choose technologies merely because they are popular. Choose a
stack that Antigravity can implement reliably and that the company can
maintain or hand to another developer.

------------------------------------------------------------------------

# 2. Architecture Decision

Use a modern full-stack TypeScript architecture.

Recommended:

``` text
Frontend + Server:
Next.js + TypeScript

Styling:
Tailwind CSS

Database:
PostgreSQL

ORM:
Prisma

Authentication:
Secure server-side authentication/session system

Validation:
Zod

Email:
Provider-agnostic transactional email adapter

Media:
Object/file storage through a provider-agnostic storage adapter

Deployment:
Any production platform that supports the selected full-stack application and PostgreSQL
```

The architecture must remain portable.

Do not make the application fundamentally dependent on one hosting
vendor.

------------------------------------------------------------------------

# 3. Why Full-Stack Rather Than Static Only

The required website includes:

-   CMS
-   Admin login
-   Customer requests
-   Persistent database
-   Email notifications
-   Media management
-   SEO-controlled content

Therefore a pure static website is insufficient for the production
system.

A static deployment may be used as a visual prototype, but not presented
as the final production CMS.

------------------------------------------------------------------------

# 4. Frontend

Use:

**Next.js + TypeScript**

Benefits:

-   Server rendering where useful
-   Strong SEO support
-   Good performance
-   API/server integration
-   Easy bilingual routing
-   Component architecture
-   Production deployment flexibility

Do not build unnecessary client-side application state.

Prefer server-rendered content for public pages.

------------------------------------------------------------------------

# 5. Rendering Strategy

Use a mixed strategy.

Public CMS pages:

-   Server-rendered/static where appropriate
-   Revalidate/cache published content

Forms:

-   Client-side interaction where useful
-   Server-side validation and persistence

Admin:

-   Interactive client components where required

Do not turn the entire website into a client-only SPA.

------------------------------------------------------------------------

# 6. TypeScript

Use strict TypeScript.

Recommended:

``` text
strict: true
```

Avoid:

``` text
any
```

unless there is a documented reason.

------------------------------------------------------------------------

# 7. Styling

Use:

**Tailwind CSS**

Create a small internal design system based on:

-   Brand colors
-   Typography
-   Spacing
-   Buttons
-   Cards
-   Forms
-   Navigation
-   Alerts
-   Modals
-   Tables
-   Badges

Do not install a huge UI framework if it is unnecessary.

------------------------------------------------------------------------

# 8. Component Strategy

Organize components by responsibility.

Suggested:

``` text
components/
  ui/
  layout/
  forms/
  cms/
  tours/
  reviews/
  navigation/
```

Keep reusable UI components separate from business-specific components.

------------------------------------------------------------------------

# 9. Server/Client Boundary

Default to server components where supported.

Use client components only for:

-   Interactive forms
-   Menus
-   Carousels
-   Language controls requiring client state
-   Admin interactions

Do not add `"use client"` everywhere.

------------------------------------------------------------------------

# 10. Backend

Use the server-side capabilities of the same full-stack application
unless a separate service becomes necessary.

Suggested logical structure:

``` text
app/
components/
lib/
server/
prisma/
public/
```

The exact framework conventions may vary by current Next.js version.

------------------------------------------------------------------------

# 11. API Architecture

Use clear server endpoints/actions for:

-   Public request submission
-   Admin authentication
-   Admin request management
-   CMS operations
-   Media operations
-   Settings

Do not expose database queries directly to the browser.

------------------------------------------------------------------------

# 12. API Response Principles

Responses should be predictable.

Success:

``` json
{
  "success": true,
  "data": {}
}
```

Error:

``` json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "..."
  }
}
```

Do not expose stack traces or database errors.

------------------------------------------------------------------------

# 13. Validation

Use:

**Zod**

Validate:

-   Public forms
-   Admin forms
-   API payloads
-   Query parameters
-   File metadata
-   Settings

Validation must occur server-side.

------------------------------------------------------------------------

# 14. Database

Use:

**PostgreSQL**

Reasons:

-   Mature
-   Reliable
-   Relational integrity
-   Good CMS/query support
-   Good future scalability
-   Portable
-   Widely supported

------------------------------------------------------------------------

# 15. ORM

Use:

**Prisma**

Requirements:

-   Schema in source control
-   Migrations in source control
-   Seed scripts
-   Typed database access

Do not rely on manually edited production tables.

------------------------------------------------------------------------

# 16. Database Migrations

All schema changes must be migrations.

Development:

``` text
prisma migrate dev
```

Production:

Use appropriate deployment migration command.

Never casually reset production database.

------------------------------------------------------------------------

# 17. Authentication

Use a secure authentication implementation compatible with Next.js.

Requirements:

-   Password hashing
-   Secure session cookies
-   HttpOnly
-   Secure in production
-   SameSite
-   Login rate limiting
-   Logout
-   Session expiration strategy

Do not store admin authentication state in localStorage.

------------------------------------------------------------------------

# 18. Admin Login

Initial version:

-   Email
-   Password

Optional future:

-   Password reset
-   Email verification
-   Two-factor authentication

Do not add complex MFA UI in version 1 unless infrastructure supports it
cleanly.

------------------------------------------------------------------------

# 19. Authorization

Create a server-side authorization layer.

Example:

``` text
requireAdmin()
```

Every admin mutation must pass authorization.

Never trust:

``` text
isAdmin=true
```

from a client request.

------------------------------------------------------------------------

# 20. Email Architecture

Use a provider-agnostic adapter.

Example conceptual interface:

``` text
sendRequestNotification()
sendContactConfirmation()
```

The actual provider can be configured later.

Potential providers:

-   Resend
-   Postmark
-   SendGrid
-   SMTP provider

Do not hardcode one provider into business logic.

------------------------------------------------------------------------

# 21. Email Recipient

Initial notification email:

``` text
egypt_nationaltours@yahoo.com
```

Store it in settings/configuration.

Do not scatter the address through source files.

------------------------------------------------------------------------

# 22. Email Failure Handling

When a request is submitted:

``` text
Database save
      ↓
Success response
      ↓
Email attempt
```

Do not:

``` text
Email attempt
      ↓
Database save
```

The database is the source of truth.

------------------------------------------------------------------------

# 23. WhatsApp Architecture

Initial public contact:

``` text
https://wa.me/201063314240
```

No heavy WhatsApp widget is required.

Future WhatsApp Business API can be added through an adapter.

Do not make the initial request system dependent on WhatsApp API
availability.

------------------------------------------------------------------------

# 24. Media Storage

Do not store large image binaries directly in PostgreSQL.

Use an abstraction:

``` text
StorageAdapter
```

with operations conceptually like:

``` text
upload()
delete()
getPublicUrl()
```

This allows future migration between providers.

------------------------------------------------------------------------

# 25. Storage Options

Possible production providers include:

-   Cloudflare R2
-   AWS S3
-   Supabase Storage
-   Other S3-compatible object storage

The implementation should avoid vendor-specific assumptions wherever
possible.

------------------------------------------------------------------------

# 26. Image Processing

Images should be processed on upload or through an image optimization
pipeline.

Generate optimized delivery variants where appropriate.

Do not repeatedly resize an already optimized image.

------------------------------------------------------------------------

# 27. Environment Variables

Use:

``` text
.env.local
.env.example
```

Never commit real secrets.

Example variables:

``` text
DATABASE_URL=
AUTH_SECRET=
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM=
REQUEST_NOTIFICATION_EMAIL=
STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
```

Only include variables actually required by the selected implementation.

------------------------------------------------------------------------

# 28. Environment Separation

Support:

``` text
development
staging
production
```

At minimum:

-   Local development
-   Production

Use separate database credentials.

------------------------------------------------------------------------

# 29. Folder Structure

Recommended conceptual structure:

``` text
/
├── app/
│   ├── [locale]/
│   ├── admin/
│   ├── api/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   ├── tours/
│   ├── cms/
│   └── admin/
│
├── lib/
│   ├── i18n/
│   ├── validation/
│   ├── seo/
│   ├── storage/
│   ├── email/
│   └── utils/
│
├── server/
│   ├── auth/
│   ├── requests/
│   ├── cms/
│   └── settings/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
│   └── ...
│
├── docs/
│   └── ...
│
├── .env.example
├── package.json
└── README.md
```

The exact directory structure may adapt to the current Next.js routing
conventions.

------------------------------------------------------------------------

# 30. Internationalization

Use a real i18n approach rather than duplicating applications.

Recommended URL structure:

``` text
/ar/...
/en/...
```

Translations should be organized predictably.

CMS content must support:

``` text
title_ar
title_en
content_ar
content_en
```

------------------------------------------------------------------------

# 31. Translation Philosophy

The site should not depend on an external translation API at runtime.

Core UI strings should be maintained in project translation resources.

CMS-managed bilingual content should be stored in the database.

This keeps the site fast and predictable.

------------------------------------------------------------------------

# 32. Arabic RTL

Arabic layout:

``` text
dir="rtl"
lang="ar"
```

English:

``` text
dir="ltr"
lang="en"
```

The layout must be designed for both directions from the beginning.

Do not build English first and patch RTL later.

------------------------------------------------------------------------

# 33. Date Handling

Store dates in a consistent database representation.

Use ISO-compatible values.

Display according to the user's language and appropriate local
conventions.

Do not rely on ambiguous strings such as:

``` text
08/09/26
```

for storage.

------------------------------------------------------------------------

# 34. Time Zone

Use UTC internally where practical.

Display Egypt local time for operational timestamps where appropriate.

The timezone should be configurable rather than scattered through code.

------------------------------------------------------------------------

# 35. Request IDs

Generate request references server-side.

Format:

``` text
ENT-YYYY-000001
```

Do not generate them in the browser.

------------------------------------------------------------------------

# 36. Public Forms

Forms should use reusable components.

Example:

``` text
CustomerFields
NotesField
FlightFields
HotelFields
TourFields
VisaFields
SecurityApprovalFields
TransportationFields
```

Do not duplicate validation logic across forms.

------------------------------------------------------------------------

# 37. Form Submission

Recommended flow:

``` text
Browser
  ↓
Client validation
  ↓
Server endpoint/action
  ↓
Zod validation
  ↓
Business validation
  ↓
Database transaction/save
  ↓
Reference generation
  ↓
Notification attempt
  ↓
Success response
```

------------------------------------------------------------------------

# 38. Database Transactions

Use transactions where multiple related records must be created
together.

Example:

``` text
Customer
+
Request
+
RequestEvent
```

should be created atomically where appropriate.

------------------------------------------------------------------------

# 39. CMS Architecture

CMS should operate through:

``` text
Admin UI
   ↓
Server action/API
   ↓
Validation
   ↓
Authorization
   ↓
Database
```

Never allow the browser to write directly to PostgreSQL.

------------------------------------------------------------------------

# 40. Public CMS Reading

Public pages should query only published records.

Recommended:

``` text
getPublishedTour()
getPublishedServices()
getPublishedReviews()
```

Do not expose generic unrestricted database queries.

------------------------------------------------------------------------

# 41. Caching

Use caching/revalidation for public CMS content where appropriate.

When admin publishes or updates content:

-   Revalidate affected pages/routes.

Do not require a full application rebuild for every CMS edit.

------------------------------------------------------------------------

# 42. Admin Changes

Examples:

When a tour changes:

``` text
update database
↓
revalidate tour page
↓
revalidate tours listing
↓
revalidate homepage if featured
```

------------------------------------------------------------------------

# 43. Search

Version 1:

Use database-backed search for admin requests and CMS lists.

Do not introduce Elasticsearch or another search engine unless there is
a demonstrated need.

------------------------------------------------------------------------

# 44. Pagination

Admin lists should be paginated.

Never load thousands of requests/tours into the browser.

------------------------------------------------------------------------

# 45. Error Boundaries

Provide user-friendly error boundaries for:

-   Public pages
-   Forms
-   Admin pages

Technical error details remain in logs.

------------------------------------------------------------------------

# 46. Logging

Use structured server-side logs.

Log:

-   Request reference
-   Operation
-   Success/failure
-   Error code
-   Timestamp

Avoid logging unnecessary personal data.

------------------------------------------------------------------------

# 47. Monitoring

Production should have:

-   Uptime monitoring
-   Error monitoring
-   Database monitoring appropriate to provider

The exact tools may be chosen after deployment provider selection.

------------------------------------------------------------------------

# 48. Analytics

Analytics is optional.

Do not add Google Analytics or other tracking until there is a clear
requirement.

If added later:

-   Keep it lightweight
-   Respect privacy requirements
-   Do not block core website functionality

------------------------------------------------------------------------

# 49. API Integration Architecture

Future external APIs must use adapters.

Conceptually:

``` text
FlightProvider
HotelProvider
PaymentProvider
WhatsAppProvider
EmailProvider
StorageProvider
```

Business logic should not depend directly on vendor-specific SDK calls.

------------------------------------------------------------------------

# 50. Flight API Future

When a live flight API is introduced:

``` text
Flight Search UI
      ↓
Flight service
      ↓
Provider adapter
      ↓
External API
```

Do not place API credentials in the browser.

------------------------------------------------------------------------

# 51. Hotel API Future

Same principle:

``` text
Hotel Search UI
      ↓
Hotel service
      ↓
Provider adapter
      ↓
External API
```

------------------------------------------------------------------------

# 52. Payment Future

Payment should be introduced as a separate bounded feature.

Never store:

-   Card number
-   CVV
-   Raw card data

Use the payment provider's secure checkout/tokenization.

------------------------------------------------------------------------

# 53. Source Code Ownership

The architecture must allow delivery of:

-   Complete frontend source
-   Complete backend source
-   Prisma schema
-   Migrations
-   Seed scripts
-   Configuration examples
-   Documentation
-   Public assets
-   CMS implementation

No essential business functionality should exist only in a closed hosted
editor.

------------------------------------------------------------------------

# 54. Documentation

The project root must include:

``` text
README.md
```

It should explain:

-   Requirements
-   Installation
-   Environment variables
-   Database setup
-   Migrations
-   Seed
-   Development
-   Build
-   Production deployment
-   Admin creation
-   Backup notes
-   API integration points

------------------------------------------------------------------------

# 55. Setup Scripts

Provide simple commands such as:

``` text
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run db:migrate
npm run db:seed
```

Exact scripts may vary, but common operations must be documented.

------------------------------------------------------------------------

# 56. Code Quality

Use:

-   TypeScript strict mode
-   ESLint
-   Consistent formatting
-   Reusable functions
-   Clear naming
-   No dead code

Avoid premature abstraction.

------------------------------------------------------------------------

# 57. Dependency Policy

Before adding a dependency, ask:

1.  Is it necessary?
2.  Does it materially simplify the implementation?
3.  Is it maintained?
4.  Does it increase bundle size significantly?
5.  Can native/framework functionality do the job?

Avoid dependency bloat.

------------------------------------------------------------------------

# 58. Testing

Minimum recommended:

### Unit

-   Validation schemas
-   Reference generation
-   Business rules

### Integration

-   Request creation
-   Authentication
-   CMS publishing

### End-to-end

-   Public request submission
-   Admin login
-   Admin request handling
-   Language switching

Do not create hundreds of low-value tests.

------------------------------------------------------------------------

# 59. Test Data

Development seed data should include:

-   Services
-   Several example tours
-   Demo reviews marked `is_demo`
-   Countries
-   Transportation options

Do not use fake customer requests as real data.

------------------------------------------------------------------------

# 60. Build Process

Production build must:

-   Type-check
-   Lint
-   Build
-   Fail on critical errors

Do not ignore TypeScript errors simply to make deployment succeed.

------------------------------------------------------------------------

# 61. Deployment

Deployment must support:

-   Next.js/full-stack runtime
-   PostgreSQL connectivity
-   Secure environment variables
-   HTTPS
-   Persistent storage/media
-   Scheduled/automated backups where possible

Possible providers can be evaluated later.

Do not lock the source code to one provider unnecessarily.

------------------------------------------------------------------------

# 62. Free Prototype Deployment

For the user's initial free prototype:

It is acceptable to deploy the public visual experience on a free
static-capable platform.

However, if the platform cannot provide the production backend:

-   Mark CMS/backend as pending production infrastructure.
-   Do not use localStorage as the production database.
-   Do not claim customer requests are safely persisted.
-   Do not expose fake admin functionality.

------------------------------------------------------------------------

# 63. Domain

Initial prototype may use a free platform subdomain.

Later production should support:

-   Custom company domain
-   HTTPS
-   DNS configuration
-   www/non-www canonical decision
-   Redirect configuration

Do not hardcode the temporary domain into business logic.

------------------------------------------------------------------------

# 64. Environment-Aware URLs

Use environment configuration for:

``` text
NEXT_PUBLIC_SITE_URL
```

Examples:

Development:

``` text
http://localhost:3000
```

Production:

``` text
https://example.com
```

The final domain will be configured later.

------------------------------------------------------------------------

# 65. Security Boundary

The architecture must maintain:

``` text
Public browser
    ↓
Public application layer
    ↓
Server-side validation
    ↓
Database/storage/external services
```

Never:

``` text
Browser
    ↓
Direct database
```

------------------------------------------------------------------------

# 66. Acceptance Criteria

Technical architecture is accepted when:

1.  Full-stack framework is clearly defined.
2.  Public site is SEO-friendly.
3.  Arabic/English routing is supported.
4.  PostgreSQL is used for production persistence.
5.  Prisma schema/migrations are included.
6.  Admin authentication is server-side.
7.  Public forms use server-side validation.
8.  Email is provider-agnostic.
9.  Storage is provider-agnostic.
10. Secrets are environment-based.
11. Public CMS content can be cached/revalidated.
12. Admin changes can trigger route revalidation.
13. Future APIs can be added through adapters.
14. Source code remains portable.
15. Free-hosting limitations are clearly separated from production
    capabilities.
16. The application has a documented setup process.
17. The architecture does not rely on localStorage for critical
    production data.
18. The codebase remains understandable to another developer.

------------------------------------------------------------------------

# 67. Instruction to Antigravity

Before coding:

1.  Read documents 01--07.
2.  Read this document completely.
3.  Treat these documents as the project specification.
4.  Do not begin by generating a huge monolithic file.
5.  Build the project in modular stages.
6.  Verify the current environment and its capabilities.
7.  If the environment cannot support a production backend/database,
    build only what is appropriate for the prototype and clearly state
    what remains.
8.  Do not fake unavailable integrations.
9.  Do not hardcode customer/business data that is defined as
    CMS-managed.
10. Keep all secrets server-side.
11. Use TypeScript strict mode.
12. Keep Arabic RTL and English LTR correct from the beginning.
13. Prefer simple maintainable architecture over unnecessary complexity.
14. Before major architectural changes, explain the reason and impact.
