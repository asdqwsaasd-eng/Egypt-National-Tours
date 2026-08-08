# Egypt National Tours --- Sitemap & Navigation Specification

## 1. Purpose

This document defines the complete information architecture, navigation
structure, URL strategy, page hierarchy, and user journeys for the Egypt
National Tours website.

The structure is intentionally simple for visitors while still providing
dedicated pages where they improve usability, SEO, or request
conversion.

The site should NOT expose every service as a top-level navigation item.

------------------------------------------------------------------------

# 2. Recommended Main Navigation

## Desktop

Main navigation:

1.  Home
2.  Services
3.  Egypt Tours
4.  Hajj & Umrah
5.  International Tours
6.  About & Contact
7.  Language Switcher
8.  Primary CTA --- Request Your Trip

Recommended visual order:

`Logo → Home → Services → Egypt Tours → Hajj & Umrah → International Tours → About & Contact → Language → Request Your Trip`

The Request Your Trip button should be visually distinct but not
oversized.

------------------------------------------------------------------------

## Mobile

Use a clean hamburger menu.

Inside the menu:

-   Home
-   Services
-   Egypt Tours
-   Hajj & Umrah
-   International Tours
-   About & Contact
-   Language
-   Request Your Trip

Keep WhatsApp available as a floating action button.

------------------------------------------------------------------------

# 3. Language URL Strategy

The website supports Arabic and English.

Recommended structure:

### Arabic

`/ar/`

### English

`/en/`

Examples:

`/ar/`

`/en/`

`/ar/services/`

`/en/services/`

`/ar/egypt-tours/`

`/en/egypt-tours/`

This structure is preferred for:

-   SEO
-   Clear language separation
-   Canonical URLs
-   Easy language switching
-   Future expansion

If the hosting/platform requires a root URL, `/` may detect browser
language and route the visitor to `/ar/` or `/en/`, but the explicit
language URLs remain the canonical pages.

Do not rely only on automatic browser-language detection.

------------------------------------------------------------------------

# 4. Complete Sitemap

``` text
/
│
├── /ar/
│   ├── /services/
│   ├── /services/flights/
│   ├── /services/hotels/
│   ├── /services/visas/
│   ├── /services/security-approvals/
│   ├── /services/transportation/
│   ├── /services/custom-tours/
│   │
│   ├── /egypt-tours/
│   ├── /egypt-tours/[tour-slug]/
│   │
│   ├── /hajj-umrah/
│   ├── /hajj-umrah/hajj/
│   └── /hajj-umrah/umrah/
│
│   ├── /international-tours/
│   ├── /international-tours/[tour-slug]/
│   │
│   ├── /about-contact/
│   ├── /request/
│   └── /request/success/[reference]/
│
└── /en/
    ├── /services/
    ├── /services/flights/
    ├── /services/hotels/
    ├── /services/visas/
    ├── /services/security-approvals/
    ├── /services/transportation/
    ├── /services/custom-tours/
    │
    ├── /egypt-tours/
    ├── /egypt-tours/[tour-slug]/
    │
    ├── /hajj-umrah/
    ├── /hajj-umrah/hajj/
    └── /hajj-umrah/umrah/
    │
    ├── /international-tours/
    ├── /international-tours/[tour-slug]/
    │
    ├── /about-contact/
    ├── /request/
    └── /request/success/[reference]/
```

The actual framework may implement dynamic routes differently, but the
logical structure should remain equivalent.

------------------------------------------------------------------------

# 5. Homepage

## URL

Arabic:

`/ar/`

English:

`/en/`

## Purpose

The homepage is the main conversion and trust page.

It should answer three questions immediately:

1.  Who are we?
2.  What can we help with?
3.  How can I request a service?

## Sections

1.  Hero
2.  Main Services
3.  Quick Request
4.  Featured Egypt Tours
5.  Why Egypt National Tours
6.  Featured Reviews
7.  Contact / WhatsApp CTA
8.  Footer

The homepage should not contain every piece of company information.

Detailed information belongs on the appropriate internal pages.

------------------------------------------------------------------------

# 6. Services Landing Page

## URL

Arabic:

`/ar/services/`

English:

`/en/services/`

## Purpose

A simple overview of all major services.

## Service cards

### Travel & Booking

-   Flight Tickets
-   Hotel Reservations

### Egypt & International Travel

-   Egypt Tours
-   International Tours
-   Custom Tours

### Visas & Entry

-   Visa Services
-   Security Approvals for Egypt Entry

### Religious Travel

-   Hajj
-   Umrah

### Ground Services

-   Tourist Transportation

Each service card has:

-   Icon/image
-   Short description
-   View Service / Request button

The Services page should NOT become a long technical page.

------------------------------------------------------------------------

# 7. Flight Service Page

## URL

`/ar/services/flights/`

`/en/services/flights/`

## Purpose

Explain the flight ticket service briefly and provide the flight request
form.

## Content

-   Short service introduction
-   Why request through Egypt National Tours
-   Flight request form
-   WhatsApp CTA

The page should not pretend to have live flight inventory unless a real
API is integrated.

------------------------------------------------------------------------

# 8. Hotel Service Page

## URL

`/ar/services/hotels/`

`/en/services/hotels/`

## Content

-   Short hotel reservation introduction
-   Hotel request form
-   WhatsApp CTA

The site should not display live room availability unless a real
supplier/API is connected.

------------------------------------------------------------------------

# 9. Visa Service Page

## URL

`/ar/services/visas/`

`/en/services/visas/`

## Content

-   Introduction
-   Supported visa destinations/countries
-   Other option
-   Request form
-   Notes field
-   Contact CTA

The country list is CMS-managed.

Avoid claiming guaranteed approval.

------------------------------------------------------------------------

# 10. Security Approval Page

## URL

`/ar/services/security-approvals/`

`/en/services/security-approvals/`

## Content

-   Introductory service explanation
-   Appropriate reference image
-   Simple request form
-   Nationality/country selector
-   Notes
-   Contact CTA

Avoid publishing unverified government/legal procedures.

------------------------------------------------------------------------

# 11. Transportation Page

## URL

`/ar/services/transportation/`

`/en/services/transportation/`

## Content

-   Short introduction
-   Transportation request form
-   WhatsApp CTA

Do not state that the company owns vehicles unless explicitly confirmed.

------------------------------------------------------------------------

# 12. Custom Tour Page

## URL

`/ar/services/custom-tours/`

`/en/services/custom-tours/`

## Purpose

For customers who cannot find a standard program and want a personalized
itinerary.

## Content

-   Short explanation
-   Custom tour request form
-   Contact CTA

The form should allow notes and preferences without becoming
unnecessarily long.

------------------------------------------------------------------------

# 13. Egypt Tours Landing Page

## URL

`/ar/egypt-tours/`

`/en/egypt-tours/`

## Purpose

One of the most important SEO and conversion pages.

Display standard Egypt programs as CMS-managed cards.

Possible examples:

-   Cairo Only
-   Cairo & Alexandria
-   Cairo, Luxor & Aswan
-   Nile Cruise
-   Cairo & Sharm El Sheikh
-   Cairo & Red Sea
-   Other programs

These are examples only.

## Tour cards

Each card:

-   Main image
-   Tour name
-   Duration
-   Destinations
-   Short summary
-   View Details
-   Request This Tour

No price is required.

------------------------------------------------------------------------

# 14. Egypt Tour Detail Page

## URL

`/ar/egypt-tours/[tour-slug]/`

`/en/egypt-tours/[tour-slug]/`

Each tour is a CMS product.

## Structure

1.  Hero image
2.  Tour title
3.  Duration
4.  Destinations
5.  Overview
6.  Detailed itinerary
7.  What's Included
8.  What's Not Included
9.  Important information
10. Gallery
11. Request This Tour CTA

When the user clicks Request This Tour, the selected tour is
automatically attached to the request.

------------------------------------------------------------------------

# 15. Hajj & Umrah Landing Page

## URL

`/ar/hajj-umrah/`

`/en/hajj-umrah/`

Keep this page simple.

Show two primary cards:

-   Hajj
-   Umrah

Each card links to its dedicated page.

Do not overload the page with general religious/travel content.

------------------------------------------------------------------------

# 16. Hajj Page

## URL

`/ar/hajj-umrah/hajj/`

`/en/hajj-umrah/hajj/`

## Content

-   Current Hajj program
-   Program image/content
-   Pricing/details supplied by company
-   Request Hajj Package CTA
-   Request form

The current package should be easy to replace/update through CMS.

Do not invent prices or regulatory claims.

------------------------------------------------------------------------

# 17. Umrah Page

## URL

`/ar/hajj-umrah/umrah/`

`/en/hajj-umrah/umrah/`

## Content

-   Current Umrah program/package
-   Package image/content
-   Request Umrah Package CTA
-   Request form

The company should be able to replace the package easily from the CMS.

------------------------------------------------------------------------

# 18. International Tours

## URL

`/ar/international-tours/`

`/en/international-tours/`

## Purpose

Present international tourism options and allow customers to request
customized or published programs.

This section can initially be lighter than Egypt Tours.

If the company has standard international programs, they can be
published as CMS-managed products.

Each program can have:

-   Image
-   Destination
-   Duration
-   Overview
-   Itinerary
-   Request button

No price required unless the company provides one.

------------------------------------------------------------------------

# 19. International Tour Detail

## URL

`/ar/international-tours/[tour-slug]/`

`/en/international-tours/[tour-slug]/`

Use the same general structure as Egypt Tour details.

The CMS should use a reusable Tour/Product model instead of creating a
completely different system.

------------------------------------------------------------------------

# 20. About & Contact Page

## URL

`/ar/about-contact/`

`/en/about-contact/`

This page combines About Us and Contact Us to keep the main navigation
simple.

## Section A --- About Us

Include:

-   Egypt National Tours
-   Discover the Charm of Egypt
-   Licensed since 1990 in Egypt & USA
-   Company introduction
-   Main areas of service
-   Trust/experience content

Only approved company facts should be published.

## Section B --- Contact

Display:

-   WhatsApp
-   Mobile
-   Landline
-   Email
-   Facebook
-   Address
-   Working hours
-   Google Maps

## Section C --- Contact CTA

Buttons:

-   WhatsApp
-   Call
-   Email
-   Request Your Trip

## Section D --- Map

Embed or link to Google Maps depending on performance and hosting
considerations.

Prefer a lightweight map link/button initially rather than automatically
loading a heavy interactive map on page load.

------------------------------------------------------------------------

# 21. General Request Page

## URL

`/ar/request/`

`/en/request/`

This is a universal request entry point.

The user chooses:

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

After selection, show the relevant form.

This page is useful for the main CTA:

"Request Your Trip"

------------------------------------------------------------------------

# 22. Success Page

## URL

The exact URL may be implemented as:

`/ar/request/success/[reference]/`

`/en/request/success/[reference]/`

However, exposing the reference in the URL is optional from a
security/privacy perspective.

The success screen must display:

-   Success message
-   Request reference
-   Short explanation
-   WhatsApp CTA
-   Return Home button

Example Arabic:

> تم إرسال طلبكم بنجاح\
> رقم الطلب: ENT-2026-000001\
> سيتواصل معكم أحد مستشاري Egypt National Tours قريبًا.

Example English:

> Your request has been submitted successfully.\
> Request Reference: ENT-2026-000001\
> One of our travel consultants will contact you shortly.

------------------------------------------------------------------------

# 23. Pages That Should NOT Be in Main Navigation

Do not place these in the main navigation:

-   Flight request
-   Hotel request
-   Visa request
-   Security approval request
-   Transportation request
-   Custom tour request
-   Individual tour details
-   Request success

They should be reachable through Services, Tours, CTAs, and internal
links.

This keeps the header clean.

------------------------------------------------------------------------

# 24. Breadcrumbs

Use breadcrumbs on internal pages.

Example Arabic:

`الرئيسية > البرامج السياحية في مصر > القاهرة والأقصر وأسوان`

Example English:

`Home > Egypt Tours > Cairo, Luxor & Aswan`

Do not show breadcrumbs on the homepage.

Breadcrumbs should support SEO with appropriate structured data where
applicable.

------------------------------------------------------------------------

# 25. Footer Navigation

The footer can have 3--4 compact columns.

### Column 1

Egypt National Tours

-   About Us
-   Contact

### Column 2

Services

-   Flights
-   Hotels
-   Visas
-   Security Approvals
-   Transportation

### Column 3

Travel

-   Egypt Tours
-   International Tours
-   Hajj & Umrah

### Column 4

Contact

-   WhatsApp
-   Phone
-   Email
-   Address
-   Working Hours

Do not repeat every link excessively.

------------------------------------------------------------------------

# 26. Global CTA Strategy

The primary conversion CTA is:

Arabic:

**اطلب رحلتك الآن**

English:

**Request Your Trip**

Secondary CTA:

Arabic:

**تواصل معنا عبر واتساب**

English:

**Chat on WhatsApp**

The primary CTA should appear:

-   Header
-   Hero
-   Relevant service pages
-   Tour details
-   Hajj/Umrah pages
-   Footer/contact area

Do not place 5--6 competing CTA buttons in one section.

------------------------------------------------------------------------

# 27. Internal Linking Strategy

Use contextual links.

Examples:

### Homepage → Egypt Tours

"Explore Our Egypt Tours"

### Egypt Tour → Request

"Request This Tour"

### Services → Flight

"Request a Flight Quote"

### Services → Hotels

"Request a Hotel Quote"

### About & Contact → Request

"Tell Us What You Need"

### Hajj/Umrah → Request

"Request This Package"

This creates a simple conversion path without forcing the visitor
through multiple pages.

------------------------------------------------------------------------

# 28. SEO Page Priority

Initial SEO priority:

### Tier 1

1.  Homepage
2.  Egypt Tours
3.  Individual Egypt Tour pages
4.  Flight service
5.  Hotel service
6.  Visa services
7.  Security approvals

### Tier 2

8.  International Tours
9.  Hajj
10. Umrah
11. Transportation
12. Custom Tours

### Tier 3

13. About & Contact
14. General Request

The CMS should allow SEO title and description editing for all indexable
pages.

------------------------------------------------------------------------

# 29. 404 Page

Create custom Arabic and English 404 pages.

Arabic:

> الصفحة غير موجودة

English:

> Page Not Found

Include:

-   Home button
-   Services button
-   Egypt Tours button
-   Contact/WhatsApp CTA

Keep it simple.

------------------------------------------------------------------------

# 30. Technical/Utility Pages

The application may also require non-navigation routes such as:

-   Privacy Policy
-   Terms & Conditions
-   Cookie information if legally/technically required
-   Admin login
-   Admin dashboard
-   API endpoints

These should not clutter the main navigation.

Legal pages can be added once the company provides approved legal text.

Do not let AI invent company legal policies without approval.

------------------------------------------------------------------------

# 31. Admin Routes

Admin pages should be separated from the public site.

Conceptual structure:

``` text
/admin/login
/admin
/admin/requests
/admin/tours
/admin/services
/admin/reviews
/admin/visa-countries
/admin/media
/admin/pages
/admin/settings
/admin/seo
```

Exact implementation depends on the selected stack.

Admin routes must be protected by authentication.

------------------------------------------------------------------------

# 32. Primary User Journeys

## Journey A --- Flight

``` text
Home
  ↓
Services
  ↓
Flight Tickets
  ↓
Flight Request Form
  ↓
Submit
  ↓
Reference Number
  ↓
WhatsApp / Home
```

------------------------------------------------------------------------

## Journey B --- Egypt Tour

``` text
Home
  ↓
Egypt Tours
  ↓
Tour Details
  ↓
Request This Tour
  ↓
Preselected Tour Request Form
  ↓
Submit
  ↓
Reference Number
```

------------------------------------------------------------------------

## Journey C --- Hotel

``` text
Home
  ↓
Services
  ↓
Hotels
  ↓
Hotel Request
  ↓
Submit
  ↓
Reference Number
```

------------------------------------------------------------------------

## Journey D --- Visa

``` text
Home
  ↓
Services
  ↓
Visa Services
  ↓
Select Country
  ↓
Request Form
  ↓
Submit
  ↓
Reference Number
```

------------------------------------------------------------------------

## Journey E --- Security Approval

``` text
Home
  ↓
Services
  ↓
Security Approval
  ↓
Nationality + Visit Details
  ↓
Request
  ↓
Reference Number
```

------------------------------------------------------------------------

## Journey F --- Hajj / Umrah

``` text
Home
  ↓
Hajj & Umrah
  ↓
Hajj OR Umrah
  ↓
Current Package
  ↓
Request Package
  ↓
Customer Details
  ↓
Reference Number
```

------------------------------------------------------------------------

# 33. Navigation Simplification Rules

The following rules are mandatory:

1.  Do not add every service to the top header.
2.  Keep About and Contact together.
3.  Keep Hajj and Umrah together.
4.  Keep Egypt Tours as one main destination.
5.  Keep International Tours as one main destination.
6.  Put individual request pages behind Services/CTAs.
7.  Keep the homepage concise.
8.  Do not create a separate page for every tiny piece of information.
9.  Use reusable CMS models for tours and service pages.
10. Avoid duplicate pages between Arabic and English in the CMS; use
    translations of the same content entity.

------------------------------------------------------------------------

# 34. Future Expansion

The architecture should allow adding:

-   More Egypt tours
-   More international tours
-   More visa countries
-   More services
-   More languages
-   Live flight APIs
-   Live hotel APIs
-   Payment gateway
-   WhatsApp Business API
-   CRM
-   Customer portal
-   Online booking

These should be extensions, not reasons to make the first version
unnecessarily complex.

------------------------------------------------------------------------

# 35. Final Navigation Decision

The recommended final public navigation is:

``` text
HOME
SERVICES
EGYPT TOURS
HAJJ & UMRAH
INTERNATIONAL TOURS
ABOUT & CONTACT
LANGUAGE
[REQUEST YOUR TRIP]
```

This is the preferred structure for the first release because it
balances:

-   Simplicity
-   Professional appearance
-   SEO
-   Mobile usability
-   Service discoverability
-   Lead generation
-   Future expansion

Do not add more top-level navigation items unless a real business
requirement appears.
