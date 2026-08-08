# Egypt National Tours --- CMS & Admin Panel Specification

## 1. Purpose

This document defines the Content Management System (CMS) and internal
Admin Panel for Egypt National Tours.

The administrator is expected to be a non-technical company user, most
likely one primary administrator.

The CMS must therefore prioritize:

-   Simplicity
-   Arabic-first usability
-   Clear labels
-   Minimal configuration
-   Safe editing
-   Easy publishing
-   Easy request management
-   No unnecessary enterprise complexity

The Admin Panel is an operational tool, not a second public website.

------------------------------------------------------------------------

# 2. Admin URL

Use a dedicated protected route.

Recommended:

`/admin`

The public website must never expose the admin interface through the
main navigation.

------------------------------------------------------------------------

# 3. Authentication

The first release requires:

-   Email/username
-   Password
-   Secure login
-   Logout
-   Protected admin routes
-   Server-side authorization

Do not build public user accounts.

Do not allow customers to register.

------------------------------------------------------------------------

# 4. Administrator Role

Initial version:

**Administrator**

One role is sufficient.

The architecture should remain extendable to additional roles later, but
do not build unnecessary role-management UI in version 1.

Administrator permissions:

-   View requests
-   Edit request status
-   Add internal notes
-   Manage pages
-   Manage services
-   Manage Egypt tours
-   Manage international tours
-   Manage Hajj
-   Manage Umrah
-   Manage visa destinations
-   Manage security-related country options
-   Manage transportation options
-   Manage reviews
-   Manage media
-   Manage contact settings
-   Manage SEO settings
-   Publish/unpublish content

------------------------------------------------------------------------

# 5. Dashboard

After login, show a simple dashboard.

## Dashboard cards

Display:

-   New Requests
-   In Progress
-   Completed
-   Total Requests
-   Published Tours
-   Draft Content

Do not overload the dashboard with analytics.

------------------------------------------------------------------------

# 6. Dashboard Recent Requests

Show the latest requests.

Columns:

-   Reference
-   Date
-   Service
-   Customer
-   Phone
-   Status

Clicking a request opens its full details.

------------------------------------------------------------------------

# 7. Request Management

Main admin navigation:

**Requests**

This is one of the most important sections.

------------------------------------------------------------------------

# 8. Request List

Features:

-   Search
-   Filter by service
-   Filter by status
-   Filter by date
-   Sort newest/oldest
-   Pagination

Search fields:

-   Reference
-   Customer name
-   Phone
-   Email

------------------------------------------------------------------------

# 9. Request Status

Allowed values:

``` text
New
Contacted
In Progress
Completed
Cancelled
```

Default:

`New`

The administrator can change status.

Status changes should store `updated_at`.

------------------------------------------------------------------------

# 10. Request Detail

Display:

## Header

-   Request reference
-   Service
-   Status
-   Created date/time
-   Language

## Customer

-   Name
-   Phone
-   WhatsApp action
-   Email
-   Email action

## Request Details

Render fields according to the service.

Examples:

Flight:

-   One Way / Round Trip
-   From
-   To
-   Departure
-   Return
-   Adults
-   Children
-   Infants
-   Notes

Hotel:

-   Destination
-   Hotel
-   Check-in
-   Check-out
-   Rooms
-   Adults
-   Children
-   Children ages
-   Meal plan
-   Notes

Tour:

-   Program
-   Travel date
-   Adults
-   Children
-   Infants
-   Notes

------------------------------------------------------------------------

# 11. Internal Notes

Each request should support internal notes.

Internal notes are:

-   Visible only to administrators
-   Never included in public pages
-   Never sent to customers automatically

Display notes chronologically if practical.

------------------------------------------------------------------------

# 12. Request Actions

Administrator can:

-   Change status
-   Add internal note
-   Open WhatsApp
-   Call
-   Email
-   Copy reference
-   Copy phone
-   Copy email

Do not add delete as the primary action.

Prefer:

**Archive**

or soft-delete if deletion is eventually needed.

------------------------------------------------------------------------

# 13. Request Retention

Do not automatically delete requests.

The architecture should allow future retention policies.

------------------------------------------------------------------------

# 14. Email Notification Settings

Admin settings should display:

**Request Notification Email**

Initial value:

`egypt_nationaltours@yahoo.com`

This should be editable.

The email must never be hardcoded throughout the application.

------------------------------------------------------------------------

# 15. Content Management

Main navigation:

**Content**

Suggested sub-sections:

-   Pages
-   Services
-   Egypt Tours
-   International Tours
-   Hajj
-   Umrah
-   Reviews
-   Media

------------------------------------------------------------------------

# 16. Pages Manager

The Pages manager handles static/editable pages.

Examples:

-   Homepage
-   About
-   Contact
-   Services
-   Visa Services
-   Security Approvals
-   Transportation
-   Hajj & Umrah

Each page can have:

-   Arabic title
-   English title
-   Arabic content
-   English content
-   Arabic SEO title
-   English SEO title
-   Arabic meta description
-   English meta description
-   Featured image
-   Published status

------------------------------------------------------------------------

# 17. Homepage Management

The homepage should not require code changes for normal content edits.

Admin should be able to manage:

-   Hero title
-   Hero subtitle
-   Hero image
-   Primary CTA
-   Secondary CTA
-   Featured services
-   Featured tours
-   Why choose us text
-   Reviews shown
-   Final CTA

Keep the structure controlled.

Do not allow the administrator to arbitrarily redesign the entire page.

------------------------------------------------------------------------

# 18. Services Manager

Admin can:

-   Add service
-   Edit service
-   Publish/unpublish service
-   Change image/icon
-   Edit Arabic title
-   Edit English title
-   Edit Arabic description
-   Edit English description
-   Set URL slug
-   Set display order

Each service may have an associated request form type.

Example:

``` text
flight -> flight_request
hotel -> hotel_request
visa -> visa_request
```

The form type should be selected from a controlled list.

Do not allow arbitrary code execution from CMS.

------------------------------------------------------------------------

# 19. Egypt Tours Manager

This is a core CMS feature.

Admin can:

-   Add tour
-   Edit tour
-   Duplicate tour
-   Publish/unpublish
-   Archive tour
-   Reorder tours

------------------------------------------------------------------------

# 20. Egypt Tour Fields

Required:

-   Arabic title
-   English title
-   Arabic short description
-   English short description
-   Main image
-   Duration
-   Destinations

Optional:

-   Arabic full description
-   English full description
-   Arabic itinerary
-   English itinerary
-   Arabic included
-   English included
-   Arabic not included
-   English not included
-   Arabic important information
-   English important information
-   Gallery
-   Price
-   Currency
-   SEO title Arabic
-   SEO title English
-   SEO description Arabic
-   SEO description English
-   Slug

------------------------------------------------------------------------

# 21. Tour Price Rules

Price is optional.

If no price is entered:

-   Do not display a price.
-   Display the request/contact CTA.

If price is entered:

-   Display only the approved value.
-   Currency must be explicit.

Do not automatically calculate a price.

Do not invent a price.

------------------------------------------------------------------------

# 22. Tour Program Editor

The administrator should be able to add itinerary days.

Recommended structure:

``` text
Day 1
Title
Description

Day 2
Title
Description

Day 3
Title
Description
```

The number of days should be flexible.

Avoid requiring HTML editing.

------------------------------------------------------------------------

# 23. Tour Gallery

Admin can:

-   Upload images
-   Remove images
-   Reorder images
-   Add alt text

The gallery should automatically optimize images.

------------------------------------------------------------------------

# 24. International Tours

Use the same general model as Egypt Tours.

Fields:

-   Arabic title
-   English title
-   Arabic description
-   English description
-   Main image
-   Duration
-   Destinations
-   Itinerary
-   Included
-   Not included
-   Optional price
-   Gallery
-   SEO fields
-   Published status

------------------------------------------------------------------------

# 25. Hajj Manager

Hajj should remain intentionally simple.

Admin can:

-   Add/edit current package
-   Upload program image
-   Edit title
-   Add description/details
-   Add optional price/details
-   Publish/unpublish
-   Add request CTA

No complicated Hajj product engine is required in version 1.

------------------------------------------------------------------------

# 26. Umrah Manager

Same principle as Hajj.

Admin can:

-   Upload/update current Umrah program image
-   Edit title
-   Edit details
-   Add optional price/details
-   Publish/unpublish
-   Request button

The administrator should be able to replace the package easily without
developer assistance.

------------------------------------------------------------------------

# 27. Visa Destinations Manager

Admin can manage the supported visa destinations.

Fields:

-   Arabic country/destination name
-   English country/destination name
-   Active/inactive
-   Display order

The public form reads this list dynamically.

Always include:

**Other / أخرى**

as a system option even if no CMS destination is added.

------------------------------------------------------------------------

# 28. Country List

The system requires a full world country list for:

-   Nationality
-   Country of residence
-   Security approval
-   Other country-related selectors

The list should be stored centrally.

Do not manually duplicate the country list in every form.

------------------------------------------------------------------------

# 29. Transportation Options

Admin can manage:

-   Service types
-   Arabic name
-   English name
-   Active/inactive
-   Display order

Examples:

-   Airport Transfer
-   Private Car
-   Minibus
-   Bus
-   Other

------------------------------------------------------------------------

# 30. Reviews Manager

Admin can:

-   Add review
-   Edit review
-   Publish/unpublish
-   Reorder
-   Archive

Fields:

-   Customer name
-   Country (optional)
-   Arabic review
-   English review
-   Rating
-   Date (optional)
-   Avatar/image (optional)
-   Published

------------------------------------------------------------------------

# 31. Demo Reviews

If placeholder reviews are used during development:

-   Mark them internally as DEMO.
-   Do not publish them as real testimonials.
-   Replace them before production.

The CMS should make this easy.

------------------------------------------------------------------------

# 32. Media Library

Create a central Media Library.

Admin can:

-   Upload image
-   View images
-   Search by filename
-   Select image
-   Replace image where safe
-   Delete/archive unused images

Every image should support:

-   Alt text Arabic
-   Alt text English
-   Optional caption

------------------------------------------------------------------------

# 33. Image Optimization

On upload:

-   Validate MIME type
-   Validate file extension
-   Validate file size
-   Resize very large images
-   Compress
-   Generate modern formats where supported
-   Keep sensible dimensions

The public website should use responsive image sizes.

------------------------------------------------------------------------

# 34. Contact Settings

Admin can edit:

### WhatsApp

`00201063314240`

### Landlines

`0020224052937`

`0020222637554`

### Email

`egypt_nationaltours@yahoo.com`

### Facebook

`https://www.facebook.com/EgyptNationalTours/`

### Google Maps

`https://share.google/x5xQDEnwcpAnw4NPq`

### Address Arabic

`152 عمارات التوفيق، شارع الطيران، مدينة نصر، القاهرة، مصر`

### Address English

`152 El Tawfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt`

### Working Hours Arabic

`من 10:30 صباحًا إلى 5:00 مساءً، ما عدا الجمعة والسبت. والعمل أونلاين متاح في باقي الأوقات.`

### Working Hours English

`10:30 AM to 5:00 PM, except Friday and Saturday. Online assistance is available at other times.`

------------------------------------------------------------------------

# 35. WhatsApp Link Generation

The WhatsApp number should be stored in normalized form.

The UI can generate:

`https://wa.me/201063314240`

Do not store multiple manually edited WhatsApp URLs throughout the site.

------------------------------------------------------------------------

# 36. SEO Manager

Admin should have a simple SEO area.

Global settings:

-   Site title Arabic
-   Site title English
-   Default meta description Arabic
-   Default meta description English
-   Default social image
-   Robots behavior
-   Organization/company information

Per page:

-   SEO title
-   Meta description
-   Slug
-   Canonical URL if needed
-   Open Graph title
-   Open Graph description
-   Open Graph image
-   Index/noindex

------------------------------------------------------------------------

# 37. SEO Safety

Do not allow an accidental empty or invalid SEO configuration to break
the website.

Use sensible defaults.

Do not expose technical SEO jargon unnecessarily.

------------------------------------------------------------------------

# 38. Site Settings

Admin can manage:

-   Company logo
-   Favicon
-   Contact details
-   Social links
-   Default language
-   Available languages
-   Request notification email
-   Footer text
-   Basic SEO defaults

------------------------------------------------------------------------

# 39. Language Settings

Initial languages:

-   Arabic
-   English

Default:

Arabic

Admin should not need to configure languages for the initial version.

The architecture can support future languages, but the UI should remain
focused on the two required languages.

------------------------------------------------------------------------

# 40. Publishing Workflow

Content states:

``` text
Draft
Published
Archived
```

Rules:

-   Draft is not public.
-   Published is public.
-   Archived is not public.
-   Only published content appears in lists/featured sections.

------------------------------------------------------------------------

# 41. Preview

Where practical, provide:

**Preview**

before publishing.

Preview should show the content in its actual Arabic/English layout.

------------------------------------------------------------------------

# 42. Unsaved Changes

If the administrator edits content and tries to leave without saving:

Show a confirmation.

Do not silently lose edits.

------------------------------------------------------------------------

# 43. Delete Behavior

Prefer:

**Archive**

over permanent delete.

Permanent deletion should only be available where safe and should
require confirmation.

For requests, do not provide a casual permanent-delete button.

------------------------------------------------------------------------

# 44. Audit Information

For important content, store:

-   Created date
-   Updated date
-   Published date
-   Created by
-   Updated by

The first version does not need a complete version-history interface.

------------------------------------------------------------------------

# 45. Admin Navigation

Recommended simple navigation:

``` text
Dashboard
Requests
Content
  Pages
  Services
  Egypt Tours
  International Tours
  Hajj
  Umrah
  Visa Destinations
  Reviews
  Media
Settings
  Contact
  SEO
  Site Settings
Logout
```

Avoid more than this unless required.

------------------------------------------------------------------------

# 46. Arabic Admin UI

The admin interface should be Arabic-first.

It should use:

-   RTL
-   Arabic labels
-   Clear icons
-   Simple terminology

English can be displayed next to Arabic content fields when editing
bilingual content.

------------------------------------------------------------------------

# 47. Bilingual Editor

For content entities, use a clear layout.

Example:

``` text
Arabic
[Title]
[Description]
[Content]

English
[Title]
[Description]
[Content]
```

Do not hide the second language behind confusing tabs unless mobile
layout requires it.

------------------------------------------------------------------------

# 48. Required Field Indicators

Use a consistent:

`*`

for required fields.

Show validation errors beside the relevant field.

------------------------------------------------------------------------

# 49. Admin Validation

The CMS must validate:

-   Required titles
-   Valid URLs
-   Valid email
-   Valid image type
-   Valid numeric values
-   Valid price/currency combinations
-   Duplicate slugs
-   Empty published content

Do not allow a page to be published with a broken required structure.

------------------------------------------------------------------------

# 50. Slug Rules

Generate slugs automatically from titles when first created.

Allow manual editing.

Ensure uniqueness.

Do not break existing published URLs unnecessarily.

If a slug changes, consider redirect support.

------------------------------------------------------------------------

# 51. Form Configuration

The administrator should NOT create arbitrary forms in version 1.

Forms are controlled by the application.

The CMS controls:

-   Which service is active
-   Which destinations/options are available
-   Which content is displayed

This prevents accidental breaking of business-critical forms.

------------------------------------------------------------------------

# 52. External API Settings

Create an integration/settings area only if needed.

Future integrations may include:

-   Flight APIs
-   Hotel APIs
-   WhatsApp Business API
-   Payment gateway
-   Email provider

API credentials must be stored securely server-side.

Never place secret API keys in public frontend JavaScript.

------------------------------------------------------------------------

# 53. Database Backup

The production architecture must support regular database backups.

The Admin Panel does not need to expose a manual database-backup
interface in version 1.

Backups belong to the deployment/infrastructure layer.

------------------------------------------------------------------------

# 54. Security Requirements

Admin:

-   Password hashes, never plaintext passwords
-   Secure cookies/session handling
-   HTTPS in production
-   Rate limiting on login
-   Protection against brute force
-   Server-side authorization
-   CSRF protection where applicable
-   Input validation
-   Output escaping
-   Secure file uploads

------------------------------------------------------------------------

# 55. Secrets

Never store:

-   SMTP passwords
-   API keys
-   Database passwords
-   Session secrets

inside public source files.

Use environment variables or the hosting provider's secure secret
storage.

Provide a `.env.example` file with variable names only.

------------------------------------------------------------------------

# 56. Admin Dashboard Performance

The dashboard should load quickly.

Do not fetch every request record at once.

Use:

-   Pagination
-   Server-side filtering
-   Lazy loading where useful

------------------------------------------------------------------------

# 57. Mobile Admin

The Admin Panel should be usable on tablet and mobile.

Priority is desktop, but basic mobile usability is required.

Tables may become cards on small screens.

------------------------------------------------------------------------

# 58. Empty States

Every CMS list needs a friendly empty state.

Examples:

**No tours have been added yet.**

Button:

**Add Tour**

Do not display blank tables.

------------------------------------------------------------------------

# 59. Error States

Errors should be understandable.

Avoid technical messages such as:

`500 Internal Server Error`

as the only visible message.

Show:

**حدث خطأ أثناء حفظ البيانات. برجاء المحاولة مرة أخرى.**

and the equivalent English message where appropriate.

Technical details belong in logs.

------------------------------------------------------------------------

# 60. Confirmation Messages

Examples:

Arabic:

**تم حفظ التغييرات بنجاح.**

**تم نشر المحتوى بنجاح.**

**تم تحديث الطلب بنجاح.**

English equivalents should exist for the English admin context if
implemented.

------------------------------------------------------------------------

# 61. Admin Home Quick Actions

Show useful buttons:

-   New Request
-   Add Egypt Tour
-   Add International Tour
-   Add Review
-   Upload Media

The administrator should be able to reach common actions in one click.

------------------------------------------------------------------------

# 62. Content Ordering

Where ordering matters, use:

-   Drag and drop where practical
-   Or numeric display order

Do not force administrators to edit IDs.

------------------------------------------------------------------------

# 63. Featured Content

For services/tours/reviews, support a simple:

**Featured**

toggle where useful.

Featured content appears in designated homepage sections.

Do not create a complex recommendation engine.

------------------------------------------------------------------------

# 64. Homepage Limits

The homepage should display a curated number of items.

Examples:

-   Featured services: limited
-   Featured tours: limited
-   Reviews: limited

The administrator controls which items are featured.

Do not show hundreds of items on the homepage.

------------------------------------------------------------------------

# 65. Admin Content Safety

CMS content must not allow arbitrary JavaScript.

If rich text is supported:

-   Sanitize HTML
-   Remove scripts
-   Remove dangerous attributes
-   Restrict allowed tags

A simple controlled rich-text editor is preferable.

------------------------------------------------------------------------

# 66. Operational Simplicity

The administrator should be able to perform these tasks without
developer help:

1.  Change WhatsApp number.
2.  Change phone number.
3.  Change email.
4.  Change working hours.
5.  Upload a new Umrah package.
6.  Upload a new Hajj package.
7.  Add an Egypt tour.
8.  Edit an Egypt tour.
9.  Add an international tour.
10. Add a review.
11. Add/remove a visa destination.
12. View a new customer request.
13. Mark a request as contacted.
14. Add an internal note.
15. Open WhatsApp for a customer.
16. Publish/unpublish content.
17. Change homepage featured tours.
18. Update basic SEO fields.

------------------------------------------------------------------------

# 67. What the CMS Must NOT Require

The administrator should not need to:

-   Edit source code
-   Edit database records manually
-   Write SQL
-   Modify JSON files manually
-   Configure API endpoints
-   Deploy code
-   Edit environment variables for normal content work

------------------------------------------------------------------------

# 68. Future Growth

The architecture should allow future:

-   Multiple administrators
-   Staff roles
-   Request assignment
-   Customer portal
-   Online payment
-   Live flight search
-   Live hotel search
-   WhatsApp API
-   CRM integration
-   Supplier APIs

But none of these should make version 1 unnecessarily complex.

------------------------------------------------------------------------

# 69. CMS Acceptance Criteria

The CMS is accepted when:

1.  Administrator can securely log in.
2.  Administrator can see requests.
3.  Administrator can search/filter requests.
4.  Administrator can change request status.
5.  Administrator can add internal notes.
6.  Administrator can manage homepage content.
7.  Administrator can manage services.
8.  Administrator can add/edit/publish Egypt tours.
9.  Administrator can add/edit/publish international tours.
10. Administrator can update Hajj.
11. Administrator can update Umrah.
12. Administrator can manage visa destinations.
13. Administrator can manage reviews.
14. Administrator can manage media.
15. Administrator can update contact settings.
16. Administrator can update SEO fields.
17. Arabic and English content can be edited.
18. Draft/published/archived states work.
19. No CMS action exposes secrets.
20. No CMS action permits arbitrary code execution.
21. The admin is usable without technical knowledge.
22. The public website updates when published content changes.

------------------------------------------------------------------------

# 70. Instruction to Antigravity

Build the Admin Panel as a real CMS backed by persistent data.

Do not create a fake dashboard populated with hardcoded sample numbers.

Do not make CMS buttons that only change frontend state without saving
data.

Do not hardcode tours, reviews, visa destinations, or contact settings
into the frontend when they are specified as CMS-managed.

If the selected free hosting/deployment environment cannot provide a
persistent backend/database, clearly separate:

-   the frontend prototype
-   the production CMS/backend requirements

Do not pretend a static hosting environment provides a real secure CMS.

Keep the data layer modular so it can be connected to a proper
database/backend later.

The first release must remain simple enough for one administrator to
operate confidently.
