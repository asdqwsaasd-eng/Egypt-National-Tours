# Egypt National Tours --- Database & Data Architecture Specification

## 1. Purpose

This document defines the logical data architecture for Egypt National
Tours.

The goal is to give Antigravity a precise, implementation-independent
blueprint for the application's data model before it writes application
code.

The architecture must support:

-   Arabic and English
-   Customer service requests
-   Tourism programs
-   CMS content
-   Reviews
-   Media
-   Countries and selectable destinations
-   Contact/settings
-   SEO
-   Future integrations
-   Secure administration

The design must avoid unnecessary complexity in version 1.

------------------------------------------------------------------------

# 2. Architecture Principle

Use a normalized relational data model where persistent data is
required.

Recommended production stack:

-   PostgreSQL or another reliable relational database
-   Server-side API/backend
-   Secure authentication
-   Object/file storage for media

If the first prototype uses a different storage mechanism, keep the
application data layer abstract enough that it can later migrate to a
relational database without rewriting the public UI.

------------------------------------------------------------------------

# 3. Core Entities

The initial logical model contains:

``` text
AdminUser
Customer
Service
Request
RequestEvent
RequestNote
Tour
TourDay
TourGalleryItem
HajjProgram
UmrahProgram
VisaDestination
Country
TransportationOption
Review
Media
Page
SiteSettings
ContactSettings
SeoSettings
```

Future entities may include:

``` text
Supplier
FlightSearch
HotelSearch
Booking
Payment
WhatsAppConversation
ApiIntegration
```

Do not implement future entities unless they are required by the
selected deployment.

------------------------------------------------------------------------

# 4. ID Strategy

Use generated unique IDs.

Recommended:

-   UUID for internal primary keys

Human-readable request references should be separate.

Example:

``` text
id: UUID
reference: ENT-2026-000001
```

Never use a customer phone number or email as a primary key.

------------------------------------------------------------------------

# 5. AdminUser

Purpose:

Stores administrator accounts.

Fields:

``` text
id
email
password_hash
display_name
role
is_active
created_at
updated_at
last_login_at
```

Role in version 1:

``` text
admin
```

Passwords must never be stored in plaintext.

------------------------------------------------------------------------

# 6. Customer

Purpose:

Stores customer identity/contact information associated with requests.

Fields:

``` text
id
full_name
email
phone
whatsapp
preferred_language
nationality_country_id
residence_country_id
created_at
updated_at
```

Important:

Do not require customers to create accounts.

A customer can submit multiple requests.

Do not expose customer records publicly.

------------------------------------------------------------------------

# 7. Customer Data Minimization

Only store information required to handle the request.

Do not collect:

-   Passport number unless legally/operationally required later
-   Passport scans in version 1
-   Unnecessary identity information
-   Payment card details
-   Sensitive information unrelated to the requested service

If a future service requires additional regulated information, add
dedicated secure fields only after confirming the legal/operational
requirement.

------------------------------------------------------------------------

# 8. Service

Purpose:

Defines the company's public services.

Fields:

``` text
id
service_key
title_ar
title_en
short_description_ar
short_description_en
description_ar
description_en
icon_or_media_id
request_form_type
display_order
is_featured
status
slug
created_at
updated_at
```

Example service keys:

``` text
flights
hotels
egypt_tours
international_tours
visas
security_approvals
hajj
umrah
transportation
general_inquiry
```

`service_key` should be stable and unique.

------------------------------------------------------------------------

# 9. Request

Purpose:

Stores all customer service requests.

Fields:

``` text
id
reference
customer_id
service_id
request_type
status
preferred_language
source
details_json
created_at
updated_at
contacted_at
completed_at
```

Request status:

``` text
new
contacted
in_progress
completed
cancelled
```

Source examples:

``` text
website
whatsapp
admin
```

The `details_json` field can store service-specific fields while the
common customer information remains normalized.

For production relational databases, critical searchable fields may
later be promoted into dedicated columns.

------------------------------------------------------------------------

# 10. Request Reference

Format:

``` text
ENT-YYYY-000001
```

Example:

``` text
ENT-2026-000001
```

The reference must be unique.

Do not derive uniqueness only from timestamp.

Use a server-side sequence/counter or collision-safe generator.

------------------------------------------------------------------------

# 11. Request Types

Recommended request types:

``` text
flight
hotel
egypt_tour
international_tour
visa
security_approval
hajj
umrah
transportation
general
```

------------------------------------------------------------------------

# 12. Flight Request Data

A flight request may contain:

``` text
trip_type
origin
destination
departure_date
return_date
adults
children
infants
notes
```

Allowed trip type:

``` text
one_way
round_trip
```

Rules:

-   Return date is required for round trip.
-   Return date is not required for one way.
-   Adults must be at least 1 unless business rules explicitly change.
-   Children and infants may be 0.
-   Dates must be validated.
-   Do not accept a return date earlier than departure.

------------------------------------------------------------------------

# 13. Hotel Request Data

A hotel request may contain:

``` text
destination
hotel_name
check_in
check_out
rooms
adults
children
children_ages
meal_plan
notes
```

Meal plan values:

``` text
room_only
breakfast
half_board
soft_all_inclusive
```

Hotel name can be optional if the customer wants recommendations.

------------------------------------------------------------------------

# 14. Egypt Tour Request Data

May contain:

``` text
tour_id
travel_date
adults
children
infants
notes
```

The selected tour should be referenced by ID.

Do not duplicate the full tour content inside the request.

If the tour is later edited, the historical request must still retain
enough information to understand what the customer requested.

Therefore store a small request snapshot such as:

``` text
tour_title_snapshot_ar
tour_title_snapshot_en
```

at submission time where appropriate.

------------------------------------------------------------------------

# 15. International Tour Request Data

Same general structure:

``` text
tour_id
travel_date
adults
children
infants
notes
```

Use the same snapshot principle.

------------------------------------------------------------------------

# 16. Hajj Request Data

May contain:

``` text
program_id
customer details
notes
```

Hajj program reference should be stored.

Optional snapshot:

``` text
program_title_snapshot_ar
program_title_snapshot_en
```

------------------------------------------------------------------------

# 17. Umrah Request Data

May contain:

``` text
program_id
customer details
notes
```

Same snapshot principle.

------------------------------------------------------------------------

# 18. Visa Request Data

May contain:

``` text
destination_country_id
passport_country_id
travel_date
number_of_travelers
notes
```

The exact additional fields can remain minimal until business
requirements require more.

If destination is:

``` text
Other
```

allow:

``` text
other_destination
```

------------------------------------------------------------------------

# 19. Security Approval Request Data

For foreign travelers requesting entry-related approval:

``` text
nationality_country_id
travel_date
number_of_travelers
notes
```

If operational requirements later require more data, extend carefully.

Do not collect unnecessary passport data in version 1.

------------------------------------------------------------------------

# 20. Transportation Request Data

May contain:

``` text
transportation_option_id
pickup_location
dropoff_location
service_date
service_time
passengers
vehicle_notes
notes
```

The form must not imply that Egypt National Tours owns the vehicles
directly.

It should simply present the service as a transportation request.

------------------------------------------------------------------------

# 21. General Inquiry Data

May contain:

``` text
subject
message
notes
```

Use the same customer contact fields.

------------------------------------------------------------------------

# 22. Request Notes

Entity:

`RequestNote`

Fields:

``` text
id
request_id
admin_user_id
note
created_at
```

Notes are private.

Never expose them to customers.

------------------------------------------------------------------------

# 23. Request Events

Entity:

`RequestEvent`

Purpose:

Provide a lightweight operational history.

Fields:

``` text
id
request_id
admin_user_id
event_type
old_value
new_value
created_at
```

Example events:

``` text
status_changed
note_added
request_viewed
request_archived
```

A full audit system is not required in version 1.

------------------------------------------------------------------------

# 24. Tour

Use a shared base tour model.

Fields:

``` text
id
tour_type
title_ar
title_en
short_description_ar
short_description_en
description_ar
description_en
duration_text_ar
duration_text_en
price
currency
main_media_id
slug
is_featured
status
created_at
updated_at
published_at
```

Tour type:

``` text
egypt
international
```

Price is nullable.

------------------------------------------------------------------------

# 25. Tour Destinations

If multiple destinations are needed, use a relation rather than storing
one comma-separated text field.

Logical entity:

`TourDestination`

Fields:

``` text
id
tour_id
destination_name_ar
destination_name_en
display_order
```

For version 1, this may remain simple text if a full destination catalog
is unnecessary.

Do not over-engineer destination management.

------------------------------------------------------------------------

# 26. Tour Day

Entity:

`TourDay`

Fields:

``` text
id
tour_id
day_number
title_ar
title_en
description_ar
description_en
display_order
```

Unique constraint:

``` text
tour_id + day_number
```

------------------------------------------------------------------------

# 27. Tour Gallery

Entity:

`TourGalleryItem`

Fields:

``` text
id
tour_id
media_id
display_order
alt_text_ar
alt_text_en
```

------------------------------------------------------------------------

# 28. Hajj Program

Entity:

`HajjProgram`

Fields:

``` text
id
title_ar
title_en
description_ar
description_en
program_image_media_id
price
currency
is_current
status
created_at
updated_at
published_at
```

Version 1 can support multiple archived programs, but normally only the
current published package should be featured.

------------------------------------------------------------------------

# 29. Umrah Program

Entity:

`UmrahProgram`

Fields:

``` text
id
title_ar
title_en
description_ar
description_en
program_image_media_id
price
currency
is_current
status
created_at
updated_at
published_at
```

The administrator should be able to replace the current program easily.

------------------------------------------------------------------------

# 30. Visa Destination

Entity:

`VisaDestination`

Fields:

``` text
id
country_id
title_ar
title_en
display_order
is_active
```

Do not hardcode visa destinations into the frontend.

------------------------------------------------------------------------

# 31. Country

Central world-country catalog.

Fields:

``` text
id
iso2
iso3
name_ar
name_en
is_active
```

Use ISO-standard country codes where possible.

The same country catalog should serve:

-   Nationality
-   Residence
-   Security approval
-   Visa-related selections
-   Other future forms

------------------------------------------------------------------------

# 32. Other Country Option

The UI should always support:

``` text
Other
أخرى
```

This can be a system-level option rather than a fake country row.

------------------------------------------------------------------------

# 33. TransportationOption

Fields:

``` text
id
key
title_ar
title_en
description_ar
description_en
display_order
is_active
```

Example:

``` text
airport_transfer
private_car
minibus
bus
other
```

------------------------------------------------------------------------

# 34. Review

Fields:

``` text
id
customer_name
country_id
review_ar
review_en
rating
review_date
avatar_media_id
is_featured
status
created_at
updated_at
published_at
```

Rating range:

``` text
1–5
```

------------------------------------------------------------------------

# 35. Demo Review Flag

If development placeholder reviews are used, add:

``` text
is_demo
```

Default:

`false`

Production UI must not display demo reviews as genuine customer
testimonials.

------------------------------------------------------------------------

# 36. Media

Fields:

``` text
id
file_name
storage_key
mime_type
file_size
width
height
alt_text_ar
alt_text_en
caption_ar
caption_en
created_at
updated_at
```

Do not store large binary files directly in relational database fields.

Store them in object/file storage and keep the storage key in the
database.

------------------------------------------------------------------------

# 37. Page

Fields:

``` text
id
page_key
title_ar
title_en
content_ar
content_en
featured_media_id
slug
seo_title_ar
seo_title_en
meta_description_ar
meta_description_en
status
created_at
updated_at
published_at
```

`page_key` should be unique.

------------------------------------------------------------------------

# 38. SiteSettings

Use a controlled settings record.

Possible fields:

``` text
id
default_language
company_name_ar
company_name_en
logo_media_id
favicon_media_id
footer_text_ar
footer_text_en
updated_at
```

------------------------------------------------------------------------

# 39. ContactSettings

Fields:

``` text
id
whatsapp_number
phone_primary
phone_secondary
email
facebook_url
google_maps_url
address_ar
address_en
working_hours_ar
working_hours_en
updated_at
```

Do not scatter these values across source files.

------------------------------------------------------------------------

# 40. SeoSettings

Global SEO settings:

``` text
id
site_title_ar
site_title_en
default_meta_description_ar
default_meta_description_en
default_og_image_id
robots_mode
organization_schema_enabled
updated_at
```

------------------------------------------------------------------------

# 41. Relationships

Main relationships:

``` text
Customer 1 ---- N Request

Service 1 ---- N Request

Request 1 ---- N RequestNote

Request 1 ---- N RequestEvent

AdminUser 1 ---- N RequestNote

AdminUser 1 ---- N RequestEvent

Tour 1 ---- N TourDay

Tour 1 ---- N TourGalleryItem

Media 1 ---- N TourGalleryItem

Country 1 ---- N VisaDestination

Country 1 ---- N Customer

Country 1 ---- N Review

TransportationOption 1 ---- N Request
```

------------------------------------------------------------------------

# 42. Request Details Strategy

The system should use a hybrid model.

Common fields are normalized:

``` text
request
customer
service
status
timestamps
reference
```

Service-specific fields can be stored in structured JSON:

``` text
details_json
```

This is preferable to creating dozens of nearly-empty columns on the
main request table.

However:

-   Searchable operational fields may later receive dedicated columns.
-   JSON must still be validated against the request type.
-   Do not accept arbitrary unvalidated JSON from the public client.

------------------------------------------------------------------------

# 43. Request Snapshots

Historical customer requests must remain understandable.

If a request references a CMS item that later changes:

Store small immutable snapshots where appropriate.

Examples:

``` text
tour_title_snapshot_ar
tour_title_snapshot_en
program_title_snapshot_ar
program_title_snapshot_en
service_title_snapshot_ar
service_title_snapshot_en
```

Do not duplicate full program content unnecessarily.

------------------------------------------------------------------------

# 44. CMS Publishing

Every public CMS entity should have a controlled status.

Recommended:

``` text
draft
published
archived
```

The public API must only return published content unless preview mode is
explicitly authorized.

------------------------------------------------------------------------

# 45. Soft Deletion

Prefer:

``` text
archived
```

over permanent deletion for business content.

Requests should normally never be permanently deleted through ordinary
admin UI.

------------------------------------------------------------------------

# 46. Timestamps

Use UTC internally where practical.

Convert to Egypt/local display time in the UI.

Store:

``` text
created_at
updated_at
published_at
```

where applicable.

------------------------------------------------------------------------

# 47. Database Constraints

Use database-level constraints for important integrity rules.

Examples:

-   Unique request reference
-   Unique service key
-   Unique country ISO codes
-   Unique page key
-   Unique tour slug
-   Valid status values
-   Positive prices
-   Valid ratings 1--5

Do not rely only on frontend validation.

------------------------------------------------------------------------

# 48. Indexing

Recommended indexes:

### Request

-   reference
-   customer_id
-   service_id
-   status
-   created_at
-   phone/email where supported

### Tour

-   slug
-   status
-   is_featured

### Review

-   status
-   is_featured

### Country

-   iso2
-   iso3
-   name_en
-   name_ar

### VisaDestination

-   is_active
-   display_order

------------------------------------------------------------------------

# 49. Privacy

Customer data must be accessible only to authorized administrators and
backend services.

Never expose:

-   Customer email lists
-   Customer phone lists
-   Internal notes
-   Admin data

through public APIs.

------------------------------------------------------------------------

# 50. Public API Principle

Public API responses should contain only what the public website needs.

For example:

A public tour endpoint may return:

``` text
id
slug
title
description
duration
price if configured
images
itinerary
```

It must never return:

-   admin information
-   internal notes
-   customer records
-   private settings
-   API credentials

------------------------------------------------------------------------

# 51. Admin API Principle

Admin endpoints require authentication and authorization.

Every write operation must be validated server-side.

Do not trust:

-   hidden frontend fields
-   localStorage permissions
-   client-supplied role
-   client-supplied status permissions

------------------------------------------------------------------------

# 52. Email Notifications

When a public request is successfully created:

1.  Save the request.
2.  Generate reference.
3.  Return success to the customer.
4.  Attempt email notification.
5.  Log email delivery status.

Important:

A temporary email provider failure should not erase the saved request.

The request must remain in the database.

------------------------------------------------------------------------

# 53. Email Notification Record

If practical, store:

``` text
notification_status
notification_attempted_at
notification_error
```

Either on the request or a dedicated notification table.

Do not expose technical errors to the customer.

------------------------------------------------------------------------

# 54. WhatsApp

The database should not depend on WhatsApp for request persistence.

WhatsApp is a communication channel.

The website request remains the source of truth.

Future WhatsApp Business API integration can attach to the request
system later.

------------------------------------------------------------------------

# 55. Future Flight/Hotel APIs

The architecture must leave room for external search APIs.

Future:

``` text
FlightSearch
HotelSearch
Booking
```

must not be mixed into the initial simple customer-request model unless
a real API is connected.

Version 1 is a:

**Request / inquiry system**

not a live GDS booking engine.

------------------------------------------------------------------------

# 56. Payments

No payment entity is required for version 1 because the current website
is designed around request/contact rather than online checkout.

If payment is added later:

Create a dedicated payment model.

Never store card numbers or CVV.

Use a compliant payment provider.

------------------------------------------------------------------------

# 57. Migration Strategy

Database schema must be versioned through migrations.

Do not manually alter production tables without a migration.

Migration files should be included in source code delivery.

------------------------------------------------------------------------

# 58. Seed Data

Provide safe seed data for development:

-   Admin user placeholder configuration
-   Services
-   Countries
-   Transportation options
-   Optional demo content

Do not seed fake customer requests as real production requests.

Demo reviews must be clearly flagged.

------------------------------------------------------------------------

# 59. Environment Separation

Support:

``` text
development
staging
production
```

At minimum, configuration must distinguish development from production.

Never reuse production secrets in development.

------------------------------------------------------------------------

# 60. Free Hosting Constraint

The initial free hosting plan may be static-only.

If so:

-   The frontend can be deployed there.
-   A real CMS/database cannot safely be simulated with browser
    localStorage.
-   The production architecture must use a real backend/database
    service.

Antigravity must clearly report which parts are prototype-only and which
require backend infrastructure.

Do not present localStorage as a production CMS.

------------------------------------------------------------------------

# 61. Data Portability

The company must eventually receive the source code and data.

Use standard formats and technologies.

Avoid locking core business data into a proprietary frontend-only
structure.

Provide a future export path for:

-   Requests
-   Tours
-   Reviews
-   Countries
-   CMS content
-   Contact settings

------------------------------------------------------------------------

# 62. Source Code Delivery

The final project should include:

-   Frontend source
-   Backend source
-   Database schema
-   Migrations
-   Seed scripts
-   Configuration examples
-   Documentation
-   Asset references

No critical business logic should exist only in an external visual
editor.

------------------------------------------------------------------------

# 63. Backup Strategy

Production infrastructure should provide:

-   Automated database backups
-   Recovery procedure
-   Media backup
-   Retention policy

The exact schedule depends on the final hosting provider.

------------------------------------------------------------------------

# 64. Disaster Recovery

At minimum document:

1.  Database restore.
2.  Media restore.
3.  Environment variable restoration.
4.  Application redeployment.
5.  Domain/DNS reconnection.

Do not claim a specific recovery time until the hosting provider is
selected.

------------------------------------------------------------------------

# 65. Data Architecture Acceptance Criteria

The architecture is accepted when:

1.  All major public services can create requests.
2.  Every request has a unique reference.
3.  Customers can submit multiple requests.
4.  Service-specific request fields are structured and validated.
5.  Tours are manageable through CMS.
6.  Hajj/Umrah programs are manageable.
7.  Visa destinations are dynamic.
8.  Countries are centrally managed.
9.  Reviews are manageable.
10. Media is centrally managed.
11. Contact information is centrally managed.
12. SEO information is centrally managed.
13. Arabic and English content are supported.
14. Requests are never dependent on email delivery for persistence.
15. Internal notes remain private.
16. Public APIs never expose private data.
17. Admin writes are authenticated and authorized.
18. Database migrations are included.
19. Production can use a real persistent database.
20. The architecture can later accept flight/hotel/payment/WhatsApp
    integrations without redesigning the entire site.

------------------------------------------------------------------------

# 66. Instruction to Antigravity

Before implementing the database:

1.  Read all project specification documents.
2.  Compare this data model with the page/form specification.
3.  Identify any contradiction.
4.  Prefer the latest explicit business requirement.
5.  Do not invent business fields without necessity.
6.  Keep the first version simple.
7.  Create migrations rather than an undocumented database.
8.  Validate all public request payloads server-side.
9.  Never expose secrets to the frontend.
10. Never use localStorage as the production source of truth for
    requests or CMS content.
11. If the current environment cannot support the required
    backend/database, stop and clearly report the limitation instead of
    creating a misleading fake CMS.
