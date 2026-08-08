# Egypt National Tours --- Pages & Content Specification

## 1. Purpose

This document is the implementation-level content and page specification
for the Egypt National Tours website.

It defines:

-   What appears on every public page
-   The exact purpose of each section
-   The information shown to visitors
-   The forms and their fields
-   Required vs optional fields
-   Form behavior
-   Request references
-   Success/error states
-   Arabic/English content structure
-   CMS-managed content
-   Notification requirements

This document must be treated as a functional specification, not as a
suggestion.

The implementation should remain simple, fast, maintainable,
mobile-friendly, and easy for one Arabic-speaking administrator to
manage.

------------------------------------------------------------------------

# 2. Global Content Rules

## 2.1 Company Identity

Company name:

**Egypt National Tours**

Arabic:

**إيجيبت ناشيونال تورز**

Tagline:

**Discover the Charm of Egypt**

Company statement:

**Licensed since 1990 in Egypt & USA**

Do not invent additional licenses, memberships, awards, certifications,
partnerships, prices, guarantees, or official government relationships.

------------------------------------------------------------------------

## 2.2 Language

The public website supports exactly two languages initially:

-   Arabic
-   English

Arabic is the primary language.

Every editable content item should support:

``` text
Arabic content
English content
```

If an English translation is missing, the system must not silently
produce poor machine-translated public content.

The CMS should make missing translations visible to the administrator.

------------------------------------------------------------------------

## 2.3 Content Philosophy

Keep public copy:

-   Clear
-   Short
-   Professional
-   Trustworthy
-   Conversion-oriented
-   Natural in Arabic
-   Natural in English

Avoid exaggerated claims such as:

-   Guaranteed visa approval
-   Guaranteed security approval
-   Guaranteed lowest price
-   Guaranteed flight availability
-   Guaranteed hotel availability

The company preference is to use **BEST PRICE** rather than the word
**cheapest** in marketing content.

------------------------------------------------------------------------

# 3. Homepage

## URL

Arabic:

`/ar/`

English:

`/en/`

## Section 1 --- Hero

### Arabic

Headline:

**اكتشف سحر مصر**

Supporting text:

**خبرة في خدمات السياحة والسفر منذ عام 1990**

Primary CTA:

**اطلب رحلتك الآن**

Secondary CTA:

**تواصل معنا عبر واتساب**

### English

Headline:

**Discover the Charm of Egypt**

Supporting text:

**Professional tourism and travel services since 1990**

Primary CTA:

**Request Your Trip**

Secondary CTA:

**Chat on WhatsApp**

The exact final marketing copy may be edited through CMS.

------------------------------------------------------------------------

## Section 2 --- Main Services

Heading Arabic:

**خدماتنا**

Heading English:

**Our Services**

Show the main service categories as compact cards.

Recommended cards:

1.  تذاكر الطيران / Flight Tickets
2.  حجز الفنادق / Hotel Reservations
3.  برامج سياحية في مصر / Egypt Tours
4.  السياحة الدولية / International Tours
5.  خدمات التأشيرات / Visa Services
6.  الموافقات الأمنية / Security Approvals
7.  الحج / Hajj
8.  العمرة / Umrah
9.  النقل السياحي / Tourist Transportation
10. البرامج السياحية الخاصة / Custom Tours

Each card contains:

-   Icon or image
-   Title
-   Short description
-   CTA

------------------------------------------------------------------------

## Section 3 --- Quick Request

Heading:

**What can we arrange for you?**

The user can choose a service quickly.

Options:

-   Flight
-   Hotel
-   Egypt Tour
-   International/Custom Tour
-   Hajj
-   Umrah
-   Visa
-   Security Approval
-   Transportation
-   General Inquiry

Selecting an option sends the user to the appropriate request form.

Do not create a complicated multi-step wizard for this section.

------------------------------------------------------------------------

## Section 4 --- Featured Egypt Tours

Display selected CMS-managed Egypt tour cards.

Recommended initial examples:

-   Cairo
-   Cairo & Alexandria
-   Cairo, Luxor & Aswan
-   Other standard programs

These are examples only. The administrator controls the actual published
programs.

No price should be displayed unless a price is explicitly entered in
CMS.

CTA:

**Explore Egypt Tours**

------------------------------------------------------------------------

## Section 5 --- Why Egypt National Tours

Keep this short.

Possible points based only on approved company facts:

-   Experience since 1990
-   Egypt & USA licensing statement as supplied by the company
-   Comprehensive tourism services
-   Personalized travel assistance
-   Local Egypt expertise

Do not invent numerical statistics.

------------------------------------------------------------------------

## Section 6 --- Reviews

Show a small selection of CMS-managed reviews.

Each review:

-   Customer name
-   Review text
-   Optional country
-   Optional date
-   Rating

Reviews must be replaceable from CMS.

Demo reviews may be used during development but must be clearly marked
internally as demo content and must never be presented as genuine
customer testimonials in production.

------------------------------------------------------------------------

## Section 7 --- Final CTA

Arabic:

**خطط لرحلتك معنا**

English:

**Plan Your Trip With Us**

Buttons:

-   Request Your Trip
-   WhatsApp

------------------------------------------------------------------------

# 4. Services Landing Page

## URL

`/ar/services/`

`/en/services/`

## Intro

Short explanation of the company's broad tourism services.

Then show the service categories.

No long paragraphs.

------------------------------------------------------------------------

# 5. Flight Tickets Page

## URL

`/ar/services/flights/`

`/en/services/flights/`

## Content

### Heading

Arabic:

**تذاكر الطيران**

English:

**Flight Tickets**

Short description:

The company assists customers with flight booking requests and travel
arrangements.

Do not claim live flight availability unless an actual flight API is
connected.

------------------------------------------------------------------------

# 6. Flight Request Form

This is one of the highest-priority forms on the website.

## Form title

Arabic:

**طلب تذكرة طيران**

English:

**Flight Request**

## Fields

### 1. Trip Type

Required.

Options:

-   ذهاب فقط / One Way
-   ذهاب وعودة / Round Trip

------------------------------------------------------------------------

### 2. From

Required.

Type:

Airport/city autocomplete or searchable text field.

Do not require the user to know an airport code.

------------------------------------------------------------------------

### 3. To

Required.

Type:

Airport/city autocomplete or searchable text field.

------------------------------------------------------------------------

### 4. Departure Date

Required.

Date picker.

------------------------------------------------------------------------

### 5. Return Date

Required only when trip type = Round Trip.

Hidden or disabled for One Way.

------------------------------------------------------------------------

### 6. Adults

Required.

Numeric selector.

Minimum:

1

------------------------------------------------------------------------

### 7. Children

Optional.

Default:

0

------------------------------------------------------------------------

### 8. Infants

Optional.

Default:

0

------------------------------------------------------------------------

### 9. Passenger Notes

Optional textarea.

Placeholder:

Arabic:

**أي تفاصيل أو متطلبات إضافية؟**

English:

**Any additional requirements or notes?**

------------------------------------------------------------------------

### 10. Customer Name

Required.

------------------------------------------------------------------------

### 11. Phone / WhatsApp

Required.

------------------------------------------------------------------------

### 12. Email

Required.

Used for internal request communication and reference information if
configured.

------------------------------------------------------------------------

## Flight Form Validation

-   Departure and destination cannot be identical.
-   Return date cannot be earlier than departure date.
-   Adults must be at least 1.
-   Children and infants cannot be negative.
-   Phone must have a reasonable valid format.
-   Email must have valid format.

------------------------------------------------------------------------

# 7. Hotel Reservations Page

## URL

`/ar/services/hotels/`

`/en/services/hotels/`

## Content

Short explanation of hotel reservation assistance.

Do not display live hotel inventory unless an actual hotel API is
integrated.

------------------------------------------------------------------------

# 8. Hotel Request Form

## Form title

Arabic:

**طلب حجز فندق**

English:

**Hotel Reservation Request**

## Fields

### 1. Destination / City

Required.

------------------------------------------------------------------------

### 2. Hotel Name

Optional.

Allows the customer to request a specific hotel.

------------------------------------------------------------------------

### 3. Check-in

Required.

Date picker.

------------------------------------------------------------------------

### 4. Check-out

Required.

Date picker.

------------------------------------------------------------------------

### 5. Number of Rooms

Required.

Default:

1

------------------------------------------------------------------------

### 6. Adults

Required.

Default:

1

------------------------------------------------------------------------

### 7. Children

Optional.

Default:

0

If children \> 0, show:

**Children Ages**

as a repeatable age selector.

This allows the company to understand room requirements without creating
a complicated room-allocation interface.

------------------------------------------------------------------------

### 8. Meal Plan

Required.

Options:

-   بدون وجبات / Room Only
-   إفطار / Breakfast
-   إفطار وعشاء / Half Board
-   سوفت أول إنكلوسف / Soft All Inclusive

Use the exact company-approved English naming for the final UI.

------------------------------------------------------------------------

### 9. Customer Name

Required.

------------------------------------------------------------------------

### 10. Phone / WhatsApp

Required.

------------------------------------------------------------------------

### 11. Email

Required.

------------------------------------------------------------------------

### 12. Notes

Optional.

Placeholder:

**أي طلبات أو تفاصيل إضافية؟**

------------------------------------------------------------------------

# 9. Egypt Tours Landing Page

## URL

`/ar/egypt-tours/`

`/en/egypt-tours/`

## Purpose

Display standard Egypt tourism programs.

## Program categories

Initial examples:

-   Cairo Only
-   Cairo & Alexandria
-   Cairo, Luxor & Aswan
-   Other Egypt programs

The CMS must allow unlimited additional programs.

------------------------------------------------------------------------

# 10. Egypt Tour Card

Each card contains:

-   Main image
-   Program title
-   Duration
-   Destinations
-   Short description
-   View Details
-   Request This Tour

Price:

Optional CMS field.

If empty, do not show a price.

------------------------------------------------------------------------

# 11. Egypt Tour Detail Page

## URL

`/ar/egypt-tours/[tour-slug]/`

`/en/egypt-tours/[tour-slug]/`

## Required content fields

-   Title
-   Short description
-   Main image
-   Duration
-   Destinations
-   Full overview
-   Daily itinerary
-   Included
-   Not included
-   Important information
-   Gallery
-   Optional price
-   SEO title
-   SEO description
-   Published status

------------------------------------------------------------------------

# 12. Request This Egypt Tour Form

When the visitor clicks:

**Request This Tour**

the selected tour must already be attached to the request.

The customer should not have to type the program name again.

## Fields

### Selected Program

Read-only display.

### Travel Date

Required.

### Adults

Required.

Default:

1

### Children

Optional.

Default:

0

### Infants

Optional.

Default:

0

### Customer Name

Required.

### Phone / WhatsApp

Required.

### Email

Required.

### Notes

Optional.

This notes field can contain:

-   Preferred hotels
-   Special requests
-   Desired duration changes
-   Dietary requirements
-   Accessibility requirements
-   Any other information

Do not create separate fields for every possible preference in the first
version.

------------------------------------------------------------------------

# 13. Custom Egypt Tour Request

For visitors who do not want a standard program.

Form fields:

-   Desired destinations
-   Approximate travel date
-   Number of adults
-   Number of children
-   Number of infants
-   Customer name
-   Phone/WhatsApp
-   Email
-   Notes

The Notes field is intentionally broad.

------------------------------------------------------------------------

# 14. International Tours

## URL

`/ar/international-tours/`

`/en/international-tours/`

Display CMS-managed international programs.

Each program may contain:

-   Destination
-   Image
-   Duration
-   Overview
-   Itinerary
-   Included
-   Not included
-   Optional price
-   Request button

No prices are required.

------------------------------------------------------------------------

# 15. International Tour Request

If the visitor selects a published program:

Preselect the program.

Fields:

-   Travel date
-   Adults
-   Children
-   Infants
-   Customer name
-   Phone/WhatsApp
-   Email
-   Notes

If the visitor wants a completely custom international trip:

Use the Custom Tour Request form.

------------------------------------------------------------------------

# 16. Hajj & Umrah Landing Page

## URL

`/ar/hajj-umrah/`

`/en/hajj-umrah/`

Keep the page simple.

Show:

-   Hajj
-   Umrah

No unnecessary educational content.

------------------------------------------------------------------------

# 17. Hajj Page

## URL

`/ar/hajj-umrah/hajj/`

`/en/hajj-umrah/hajj/`

The page is CMS-managed.

Content can be uploaded/updated by the administrator.

Recommended fields:

-   Program title
-   Main program image
-   Program description
-   Program details
-   Price/details
-   Important notes
-   Published status

The company may provide the program primarily as an image/content block.

Do not invent package details.

------------------------------------------------------------------------

# 18. Hajj Request Form

Fields:

-   Selected Hajj program
-   Customer name
-   Phone/WhatsApp
-   Email
-   Number of travelers
-   Notes

Keep this form short.

------------------------------------------------------------------------

# 19. Umrah Page

## URL

`/ar/hajj-umrah/umrah/`

`/en/hajj-umrah/umrah/`

The current Umrah package can be uploaded/replaced easily.

Content:

-   Program image
-   Program title
-   Program details
-   Price/details
-   Important notes
-   Request button

------------------------------------------------------------------------

# 20. Umrah Request Form

Fields:

-   Selected Umrah program
-   Customer name
-   Phone/WhatsApp
-   Email
-   Number of travelers
-   Notes

------------------------------------------------------------------------

# 21. Visa Services Page

## URL

`/ar/services/visas/`

`/en/services/visas/`

## Content

Explain that the company assists with visa requests for supported
destinations.

Display supported visa destinations/countries.

The country list must be CMS-managed.

------------------------------------------------------------------------

# 22. Visa Request Form

## Fields

### Visa Destination

Required.

Searchable select.

Options come from CMS.

Include:

**Other / أخرى**

If Other is selected, show:

**Other Destination**

text field.

------------------------------------------------------------------------

### Nationality

Required.

Country selector.

------------------------------------------------------------------------

### Travel Date

Optional.

------------------------------------------------------------------------

### Number of Travelers

Required.

Default:

1

------------------------------------------------------------------------

### Customer Name

Required.

------------------------------------------------------------------------

### Phone / WhatsApp

Required.

------------------------------------------------------------------------

### Email

Required.

------------------------------------------------------------------------

### Notes

Optional.

------------------------------------------------------------------------

# 23. Security Approval Page

## URL

`/ar/services/security-approvals/`

`/en/services/security-approvals/`

## Purpose

Allow foreign visitors/customers to request assistance regarding
entry/security approval procedures for Egypt.

The page should be simple.

Use the supplied security approval reference image as visual material
where appropriate.

Do not publish legal/government claims that have not been approved by
the company.

------------------------------------------------------------------------

# 24. Security Approval Request Form

## Fields

### Nationality

Required.

Country selector containing all countries.

------------------------------------------------------------------------

### Country of Residence

Required.

Country selector.

------------------------------------------------------------------------

### Intended Travel Date

Optional.

------------------------------------------------------------------------

### Number of Travelers

Required.

Default:

1

------------------------------------------------------------------------

### Customer Name

Required.

------------------------------------------------------------------------

### Phone / WhatsApp

Required.

------------------------------------------------------------------------

### Email

Required.

------------------------------------------------------------------------

### Notes

Optional.

Use Notes for:

-   Purpose of visit
-   Special circumstances
-   Additional information
-   Any relevant details

Do not request passport scans in the first public form.

If such documents are required operationally later, that should be added
through a controlled secure upload process rather than a normal public
form.

------------------------------------------------------------------------

# 25. Tourist Transportation Page

## URL

`/ar/services/transportation/`

`/en/services/transportation/`

Keep this page intentionally simple because transportation is fulfilled
through external suppliers/partners.

Do not claim direct vehicle ownership.

------------------------------------------------------------------------

# 26. Transportation Request Form

Fields:

### Service Type

Required.

Examples:

-   Airport Transfer
-   Private Car
-   Minibus
-   Bus
-   Other

The list must be editable.

### Pickup Location

Required.

### Drop-off Location

Required.

### Date

Required.

### Time

Required.

### Number of Travelers

Required.

### Customer Name

Required.

### Phone/WhatsApp

Required.

### Email

Required.

### Notes

Optional.

------------------------------------------------------------------------

# 27. General Request Page

## URL

`/ar/request/`

`/en/request/`

## Purpose

One universal entry point for visitors who do not know which service to
choose.

First field:

**What do you need?**

Options:

-   Flight
-   Hotel
-   Egypt Tour
-   International Tour
-   Custom Tour
-   Hajj
-   Umrah
-   Visa
-   Security Approval
-   Transportation
-   Other

When a service is selected, show only the relevant fields.

Do not show all possible fields at once.

------------------------------------------------------------------------

# 28. About & Contact Page

## URL

`/ar/about-contact/`

`/en/about-contact/`

## About section

Display:

**Egypt National Tours**

**Discover the Charm of Egypt**

**Licensed since 1990 in Egypt & USA**

Then a concise company introduction.

The final company story should be editable through CMS.

------------------------------------------------------------------------

# 29. Contact Information

Display exactly the currently supplied contact information.

### WhatsApp / Mobile

`00201063314240`

### Landline

`0020224052937`

`0020222637554`

### Email

`egypt_nationaltours@yahoo.com`

### Facebook

`https://www.facebook.com/EgyptNationalTours/`

### Address

`152 عمارات التوفيق، شارع الطيران، مدينة نصر، القاهرة، مصر`

English display:

`152 El Tawfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt`

### Working Hours

Arabic:

**من 10:30 صباحًا إلى 5:00 مساءً، ما عدا الجمعة والسبت. والعمل أونلاين
متاح في باقي الأوقات.**

English:

**10:30 AM to 5:00 PM, except Friday and Saturday. Online assistance is
available at other times.**

These details must be CMS-editable.

------------------------------------------------------------------------

# 30. Contact Actions

Buttons:

### WhatsApp

Open:

`https://wa.me/201063314240`

### Phone

Use `tel:` links.

### Email

Use `mailto:` link.

### Facebook

Open company Facebook page.

### Google Maps

Use the supplied Google Maps link:

`https://share.google/x5xQDEnwcpAnw4NPq`

Prefer a lightweight "Open in Google Maps" button initially instead of
automatically loading a heavy embedded map.

------------------------------------------------------------------------

# 31. Request Form --- Shared Customer Fields

Most forms should use the same customer identity component.

Shared fields:

1.  Full Name
2.  Phone / WhatsApp
3.  Email

Do not ask for the same customer information multiple times.

The system should generate a single request record.

------------------------------------------------------------------------

# 32. Request Reference Number

Every successful request must receive a unique reference.

Recommended format:

`ENT-YYYY-XXXXXX`

Example:

`ENT-2026-000001`

The reference must be generated server-side.

Never generate references only in browser JavaScript.

------------------------------------------------------------------------

# 33. Success State

After a successful submission:

Show the success page/message on the website.

Arabic:

**تم إرسال طلبكم بنجاح**

**رقم الطلب: ENT-2026-000001**

**سيتواصل معكم أحد مستشاري Egypt National Tours قريبًا.**

English:

**Your request has been submitted successfully.**

**Request Reference: ENT-2026-000001**

**One of our travel consultants will contact you shortly.**

Buttons:

-   WhatsApp
-   Home

No customer account is required.

------------------------------------------------------------------------

# 34. Submission Notifications

Each request must create an internal request record.

The preferred first notification channel is email because it is simple
and inexpensive to operate.

The request should also be structured so WhatsApp
notification/integration can be connected.

## Email notification

Send to the company email:

`egypt_nationaltours@yahoo.com`

The email subject should include:

`New Website Request — ENT-2026-000001 — Flight`

Example:

`New Website Request — ENT-2026-000002 — Hotel`

Email body should contain:

-   Reference
-   Service
-   Customer information
-   Request details
-   Notes
-   Submission date/time
-   Language used

------------------------------------------------------------------------

# 35. WhatsApp Notification Architecture

The system should be designed with a notification service/adapter so
WhatsApp can be added without changing the forms.

Important:

A public website cannot reliably send automated WhatsApp messages to the
company number simply by opening a normal WhatsApp link.

Automated server-to-WhatsApp notifications normally require an approved
WhatsApp Business/API provider and credentials.

Therefore:

## First release

-   Email notification must work.
-   WhatsApp direct-contact button must work.
-   The request reference can be included in a prefilled WhatsApp
    message when the customer chooses to contact the company.

## Architecture

Create a notification interface such as:

``` text
EmailNotificationService
WhatsAppNotificationService
```

The WhatsApp implementation remains disabled until the required
credentials/API are configured.

Do not hardcode API secrets.

This keeps the website ready for WhatsApp automation without making the
first release dependent on a paid external service.

------------------------------------------------------------------------

# 36. Customer Confirmation

No customer confirmation email is required in the first version.

The customer receives confirmation directly on the website.

Optional WhatsApp contact remains available.

------------------------------------------------------------------------

# 37. Form Anti-Spam

Every public form should include basic anti-spam protection.

Prefer a lightweight approach.

Possible implementation:

-   Honeypot field
-   Server-side rate limiting
-   Input validation
-   Request throttling

Avoid heavy CAPTCHA unless spam becomes a real problem.

------------------------------------------------------------------------

# 38. Form Security

Never trust client-side validation alone.

Every submitted field must be validated server-side.

Protect against:

-   SQL injection
-   XSS
-   CSRF where applicable
-   Malicious file uploads
-   Email header injection
-   Excessive request submissions

Escape/sanitize content when rendering it in admin and public pages.

------------------------------------------------------------------------

# 39. Form Data Storage

Each request record should include at minimum:

``` text
id
reference_number
service_type
customer_name
phone
email
language
request_payload
notes
status
created_at
updated_at
```

The request-specific fields can be stored in structured JSON or
normalized fields depending on the selected architecture.

The implementation should favor maintainability.

------------------------------------------------------------------------

# 40. Request Status

Admin should be able to set:

-   New
-   Contacted
-   In Progress
-   Completed
-   Cancelled

Default:

**New**

This status is internal and is not shown to the customer in the first
version.

------------------------------------------------------------------------

# 41. Admin Request View

The administrator should be able to:

-   View all requests
-   Filter by service
-   Filter by status
-   Search by reference
-   Search by customer name
-   Search by phone
-   Open request details
-   Change status
-   Add internal notes
-   Copy phone/email
-   Open WhatsApp
-   Call customer
-   Email customer

The admin should not need technical knowledge.

------------------------------------------------------------------------

# 42. CMS-Managed Content

The following content should be editable from admin:

### Global

-   Logo
-   Contact details
-   Working hours
-   Social links
-   Address
-   Google Maps link
-   WhatsApp number
-   Footer text
-   SEO defaults

### Pages

-   Homepage sections
-   About text
-   Service descriptions
-   Contact information
-   SEO title/description

### Tours

-   Egypt tours
-   International tours

### Religious packages

-   Hajj package
-   Umrah package

### Visa destinations

-   Supported countries/destinations

### Reviews

-   Customer reviews

### Media

-   Images
-   Gallery images

------------------------------------------------------------------------

# 43. Draft / Published

CMS content should support at least:

-   Draft
-   Published

Draft content must not appear publicly.

Deleted content should preferably be soft-deleted or recoverable where
practical.

------------------------------------------------------------------------

# 44. Content Editing Principle

The administrator should be able to update:

-   Text
-   Images
-   Program details
-   Prices
-   Reviews
-   Visa countries
-   Contact information

without editing source code.

------------------------------------------------------------------------

# 45. SEO Fields on CMS Content

Each indexable page/tour should support:

-   SEO title
-   Meta description
-   URL slug
-   Optional canonical URL
-   Open Graph title
-   Open Graph description
-   Social image
-   Index/noindex control where appropriate

Do not make SEO editing mandatory for every tiny CMS item.

------------------------------------------------------------------------

# 46. Empty Content Rules

If optional CMS content is empty:

-   Do not render an empty section.
-   Do not show broken image placeholders.
-   Do not show "\$0".
-   Do not show fake text.
-   Do not show empty headings.

This keeps the site professional.

------------------------------------------------------------------------

# 47. Image Upload Rules

CMS image uploads should:

-   Validate file type
-   Validate file size
-   Compress/optimize images
-   Generate responsive sizes where practical
-   Preserve original where necessary
-   Generate useful alt text field
-   Prevent executable files from being uploaded as images

Recommended formats:

-   WebP
-   AVIF where supported
-   JPEG/PNG when necessary

------------------------------------------------------------------------

# 48. Translation Management

Every translatable CMS entity should conceptually contain:

``` text
Arabic:
title
description
content
SEO title
SEO description

English:
title
description
content
SEO title
SEO description
```

The administrator must be able to switch between Arabic and English
editing.

------------------------------------------------------------------------

# 49. Arabic Content Direction

Arabic pages must use:

`dir="rtl"`

English pages:

`dir="ltr"`

Do not insert Arabic text into an English layout without proper
direction handling.

------------------------------------------------------------------------

# 50. Mobile Forms

All forms must be fully usable on mobile.

Requirements:

-   Large touch targets
-   Native date pickers where appropriate
-   No horizontal scrolling
-   Clear labels
-   Sticky submit button only if useful and non-obstructive
-   Preserve entered values after validation errors

------------------------------------------------------------------------

# 51. Accessibility for Forms

Each field must have:

-   Label
-   Appropriate input type
-   Required state
-   Error message
-   Accessible description where necessary

Do not rely on placeholder text as the only label.

------------------------------------------------------------------------

# 52. Data Minimization

Only request information needed to process the inquiry.

Do not request:

-   Passport copies
-   Credit card data
-   Passwords
-   Unnecessary personal information

through the basic public inquiry forms.

Payment and document collection, if required later, must be designed as
separate secure features.

------------------------------------------------------------------------

# 53. Service Type Data Model

Use stable internal service identifiers.

Example:

``` text
flight
hotel
egypt_tour
international_tour
custom_tour
hajj
umrah
visa
security_approval
transportation
general
```

Displayed Arabic/English names should be translatable.

Do not use translated display text as the database identifier.

------------------------------------------------------------------------

# 54. Form Architecture

Build reusable form components.

Example:

``` text
CustomerFields
DateField
CountrySelect
TravelerCount
NotesField
FlightRequestForm
HotelRequestForm
TourRequestForm
VisaRequestForm
SecurityApprovalForm
TransportationRequestForm
ReligiousPackageRequestForm
GeneralRequestForm
```

Do not duplicate validation/business logic across forms.

------------------------------------------------------------------------

# 55. Final Page-to-Form Map

  Page                        Form
  --------------------------- -------------------------------------
  Flight Tickets              Flight Request
  Hotels                      Hotel Request
  Egypt Tour Detail           Selected Egypt Tour Request
  Custom Egypt Tour           Custom Tour Request
  International Tour Detail   Selected International Tour Request
  Custom International Tour   Custom Tour Request
  Hajj                        Hajj Request
  Umrah                       Umrah Request
  Visas                       Visa Request
  Security Approvals          Security Approval Request
  Transportation              Transportation Request
  General Request             Dynamic General Request

------------------------------------------------------------------------

# 56. Implementation Priority

Priority 1:

-   Homepage
-   Services
-   Flight request
-   Hotel request
-   Egypt Tours
-   Tour details
-   General Request
-   Email notifications
-   Request reference numbers

Priority 2:

-   Visa
-   Security Approvals
-   Hajj
-   Umrah
-   Transportation
-   International Tours
-   Reviews CMS

Priority 3:

-   WhatsApp API automation
-   External booking APIs
-   Payment gateway
-   Advanced integrations

The first release should not depend on external booking APIs to
function.

------------------------------------------------------------------------

# 57. Final Acceptance Criteria

The implementation is considered functionally correct only when:

1.  Arabic and English pages exist.
2.  Language switching works.
3.  All main services are reachable.
4.  Flight request collects all required flight information.
5.  Hotel request collects dates, travelers, rooms, and meal plan.
6.  Tour requests automatically include the selected tour.
7.  Visa requests support destination selection and Other.
8.  Security approval requests support all-country nationality
    selection.
9.  Transportation requests capture pickup/drop-off/date/time/travelers.
10. Hajj and Umrah packages are CMS-editable.
11. Reviews are CMS-editable.
12. Contact information is CMS-editable.
13. Every successful request receives a unique reference.
14. Requests are stored securely.
15. Company email receives request notifications.
16. Website displays an on-site success message.
17. WhatsApp direct contact works.
18. Admin can view and manage requests.
19. Admin can update CMS content without code.
20. Empty optional content does not create broken UI.
21. Forms work correctly on mobile.
22. RTL and LTR layouts are correct.
23. No fake prices, fake availability, or fake testimonials appear in
    production.
24. No secrets are hardcoded in frontend code.
25. The site remains lightweight and fast.

------------------------------------------------------------------------

# 58. Important Instruction to Antigravity

Do not start implementing the website based on assumptions when a
requirement is defined in this document.

If a technical implementation detail is not specified:

-   Choose the simplest maintainable solution.
-   Preserve the requirements in this specification.
-   Do not add unnecessary functionality.
-   Do not replace a required feature with a visual approximation.
-   Do not invent company data.
-   Keep all business content editable where specified.
-   Keep the architecture ready for future APIs without making the first
    release dependent on them.

The website should be built as a real production-ready tourism company
website, not as a static visual mockup.
