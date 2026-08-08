# Egypt National Tours --- Project Master Specification

## 1. Project Identity

**Company name:** Egypt National Tours\
**Arabic name:** إيجيبت ناشيونال تورز\
**Tagline:** Discover the Charm of Egypt\
**Additional brand statement:** Licensed since 1990 in Egypt & USA

The website is for a professional tourism and travel company serving
both Arabic-speaking and international customers.

The website must present the company as trustworthy, established,
professional, modern, simple, and tourism-focused.

------------------------------------------------------------------------

## 2. Primary Objectives

The website must:

1.  Present Egypt National Tours and its tourism services
    professionally.
2.  Serve both Arabic-speaking and English-speaking visitors.
3.  Use Arabic as the primary/default language for Arabic users and
    provide a complete English version for international visitors.
4.  Allow visitors to request:
    -   Flight quotations
    -   Hotel quotations
    -   Egypt tour programs
    -   International/tailor-made tours
    -   Hajj packages
    -   Umrah packages
    -   Visa assistance
    -   Security approval assistance for visitors entering Egypt
    -   Tourist transportation
    -   General/custom tourism services
5.  Send/store customer requests so the company can contact the customer
    manually.
6.  Provide a simple CMS/Admin dashboard so the company can update
    content without editing source code.
7.  Make the project SEO-ready.
8.  Keep the site lightweight, fast, responsive, secure, and
    maintainable.
9.  Keep the architecture ready for future external booking APIs and
    online payment integration.
10. Deliver complete source code and documentation.

The initial business model is **lead generation and quotation
requests**, not automated online booking/payment.

------------------------------------------------------------------------

## 3. Target Audience

The site should serve:

-   Foreign tourists planning trips to Egypt
-   International travelers seeking Egypt tours
-   Egyptian customers seeking travel abroad
-   Families
-   Individuals
-   Couples/honeymoon travelers
-   Groups
-   Corporate/business travelers
-   Customers seeking flights
-   Customers seeking hotels
-   Customers seeking visas
-   Customers seeking Hajj/Umrah
-   Customers seeking transportation
-   Customers seeking customized travel programs
-   Travel-related business customers where appropriate

------------------------------------------------------------------------

## 4. Design Direction

### Overall style

**Modern + Luxury + Simple**

The website must look premium without being visually heavy or flashy.

### Brand-inspired colors

The existing logo uses Egyptian red and gold/yellow. The interface
should take inspiration from those colors while using light backgrounds
and restrained accents.

Suggested direction:

-   Egyptian/deep red as the primary brand accent
-   Soft gold as a secondary accent
-   White/off-white backgrounds
-   Warm sand/beige accents where useful
-   Dark charcoal for main text
-   Light neutral surfaces for cards and forms

Do not make the whole website red and gold.

### Visual principles

-   Clean whitespace
-   Large, high-quality tourism photography
-   Clear typography
-   Strong but simple CTAs
-   Rounded or subtly softened cards where appropriate
-   Very light shadows
-   Minimal borders
-   Consistent spacing
-   Clear hierarchy
-   No unnecessary visual clutter
-   No excessive gradients
-   No excessive animations

### Animation

Use only lightweight, subtle animations:

-   Smooth hover states
-   Gentle section reveal on scroll
-   Small button transitions
-   Subtle image transitions

Do not use heavy parallax, large animated backgrounds, or effects that
slow down the site.

------------------------------------------------------------------------

## 5. Responsive Requirements

The website must be fully responsive and tested for:

-   Mobile
-   Tablet
-   Laptop
-   Desktop
-   Large desktop screens

The design must be mobile-first.

Forms must remain easy to complete on mobile.

Buttons must be touch-friendly.

The floating WhatsApp/contact actions must remain accessible on mobile
without obstructing content.

------------------------------------------------------------------------

## 6. Language Requirements

The website supports exactly two initial languages:

1.  Arabic
2.  English

### Arabic

-   RTL layout
-   Arabic navigation
-   Arabic forms
-   Arabic buttons
-   Arabic validation/error/success messages
-   Arabic SEO metadata
-   Arabic content

### English

-   LTR layout
-   English navigation
-   English forms
-   English buttons
-   English validation/error/success messages
-   English SEO metadata
-   English content

A visible language switcher must be available.

The system must not produce awkward machine-translated UI text.
Translation content should be structured so it can be edited
independently.

The CMS/Admin interface should preferably be Arabic-first and support
English where practical.

------------------------------------------------------------------------

## 7. Main Navigation

Keep the navigation simple.

Recommended main navigation:

-   Home
-   Our Services
-   Egypt Tours
-   Hajj & Umrah
-   International Tours
-   About Us
-   Contact Us

Language switcher:

-   العربية
-   English

Primary CTA:

-   Request Your Trip / اطلب رحلتك الآن

Do not put every individual service into the top navigation.

------------------------------------------------------------------------

## 8. Main Service Categories

The website must support these services:

### Travel & Booking

-   Flight Tickets
-   Hotel Reservations
-   Egypt Tours
-   International Tours
-   Tailor-Made Tours

### Religious Travel

-   Hajj
-   Umrah

### Immigration/Entry Assistance

-   Visa Services
-   Security Approvals for Egypt Entry

### Ground Services

-   Tourist Transportation

The CMS should allow additional services to be added later.

------------------------------------------------------------------------

## 9. Homepage Structure

The homepage should be visually strong but simple.

### Section 1 --- Hero

Include:

-   High-quality Egypt/travel image
-   Company branding
-   Main headline
-   Tagline: "Discover the Charm of Egypt"
-   "Licensed since 1990 in Egypt & USA"
-   Primary CTA: Explore Egypt Tours
-   Secondary CTA: Request Your Trip

The hero image must be replaceable from the CMS.

------------------------------------------------------------------------

### Section 2 --- Quick Services

A clean grid of service cards:

-   Flight Tickets
-   Hotels
-   Egypt Tours
-   International Tours
-   Visas
-   Security Approvals
-   Hajj
-   Umrah
-   Transportation

Each card should link to the appropriate service/request page.

------------------------------------------------------------------------

### Section 3 --- Quick Request

A simple service selector:

"What are you looking for?"

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

Selecting an option should take the visitor to the appropriate request
form.

------------------------------------------------------------------------

### Section 4 --- Featured Egypt Tours

Show selected standard Egypt tour programs.

No prices are required at this stage.

Each card should contain:

-   Image
-   Tour name
-   Duration
-   Destinations
-   Short description
-   View Details button
-   Request This Tour button

The featured tours must be controlled from the CMS.

------------------------------------------------------------------------

### Section 5 --- Why Egypt National Tours

Use concise trust-oriented content.

Possible themes:

-   Established tourism experience
-   Professional travel assistance
-   Egypt and international travel services
-   Personalized support
-   One company for multiple travel needs

Do not invent numerical statistics or awards.

------------------------------------------------------------------------

### Section 6 --- Reviews

Display a small selection of real customer reviews.

During development, placeholder/demo reviews may be used but must be
clearly treated as temporary data and replaced before production.

Reviews must be CMS-managed.

The homepage should display a few selected reviews rather than every
review.

------------------------------------------------------------------------

### Section 7 --- Contact CTA

Strong but simple CTA:

"Ready to plan your trip?"

Buttons:

-   WhatsApp
-   Call Us
-   Request Your Trip

------------------------------------------------------------------------

### Section 8 --- Footer

Footer should contain:

-   Logo
-   Company name
-   Short description
-   Main navigation
-   Services
-   Contact information
-   WhatsApp
-   Phone
-   Email
-   Facebook
-   Address
-   Working hours
-   Google Maps link
-   Language switcher
-   Copyright

Keep the footer compact and organized.

------------------------------------------------------------------------

## 10. Flight Request Form

Flight requests are a high-priority feature.

### Fields

#### Trip Type

-   Round Trip
-   One Way
-   Multi-City

#### Route

-   From
-   To

#### Dates

-   Departure date
-   Return date when applicable

#### Travelers

-   Adults
-   Children
-   Infants

#### Additional Notes

Free-text field for:

-   Preferred airline
-   Travel class
-   Special requests
-   Other requirements

Do not add dedicated airline or travel-class selectors at this stage.

#### Customer Information

-   Full Name
-   Email
-   Phone
-   WhatsApp

### Submission

On submit:

1.  Validate required fields.
2.  Save the request.
3.  Generate a unique request reference number.
4.  Send an internal notification if email integration is configured.
5.  Show an on-site success message.

Example success state:

"Your request has been submitted successfully."

"Request Reference: ENT-2026-000001"

"Our travel consultant will contact you shortly."

Do not require customer email confirmation in the initial version.

------------------------------------------------------------------------

## 11. Hotel Request Form

### Fields

-   Destination / City
-   Hotel Name (optional)
-   Check-in
-   Check-out
-   Adults
-   Children
-   Number of Rooms
-   Children Ages
-   Hotel Category:
    -   3 Star
    -   4 Star
    -   5 Star
    -   Luxury
-   Meal Plan:
    -   Room Only
    -   Bed & Breakfast
    -   Half Board
    -   Soft All Inclusive
    -   All Inclusive
-   Additional Notes
-   Full Name
-   Email
-   Phone
-   WhatsApp

### Submission

Same request workflow as flight requests.

------------------------------------------------------------------------

## 12. Egypt Tours

Egypt tour programs are primarily informational and lead-generation
based.

No prices are required initially.

Possible program categories/examples:

-   Cairo Only
-   Cairo & Alexandria
-   Cairo, Luxor & Aswan
-   Nile Cruise
-   Cairo & Red Sea
-   Cairo & Sharm El Sheikh
-   Other Egypt combinations

These are examples, not a restriction.

### Tour Detail Page

Each tour should support:

-   Hero image
-   Gallery
-   Tour title
-   Duration
-   Destinations
-   Overview
-   Detailed itinerary
-   What's Included
-   What's Not Included
-   Important Information
-   Request This Tour

### Request This Tour

When a visitor clicks "Request This Tour", the selected tour should
automatically be attached to the request.

The customer then enters:

-   Travel date
-   Number of adults
-   Number of children
-   Number of infants if applicable
-   Hotel preferences where applicable
-   Additional Notes
-   Full Name
-   Email
-   Phone
-   WhatsApp

The customer should not need to manually type the tour name again.

------------------------------------------------------------------------

## 13. International / Tailor-Made Tours

Provide a simple request path for customers who want a custom program.

Suggested fields:

-   Destination(s)
-   Travel date
-   Number of days
-   Adults
-   Children
-   Travel style/type
-   Hotel preference
-   Additional Notes
-   Full Name
-   Email
-   Phone
-   WhatsApp

Possible trip styles:

-   Family
-   Honeymoon
-   Luxury
-   Adventure
-   Cultural
-   Beach
-   Religious
-   Business
-   Other

The exact options must remain editable.

------------------------------------------------------------------------

## 14. Hajj

The Hajj section should remain simple.

The company will publish the current Hajj package/program and
pricing/details.

Content should be manageable through the CMS.

The page should provide:

-   Current Hajj package image/content
-   Program details
-   Pricing/details as supplied by the company
-   Request Hajj Package form

Do not invent Hajj prices or religious/legal claims.

------------------------------------------------------------------------

## 15. Umrah

The Umrah section should remain simple.

The company will publish the current Umrah package/program as an
image/content and update it when needed.

The CMS must make replacing the current package easy.

Provide:

-   Current Umrah package
-   Request Umrah Package button
-   Simple customer request form

Do not invent package pricing.

------------------------------------------------------------------------

## 16. Visa Services

Provide a visa service page.

The CMS should manage the supported countries.

The visitor should be able to choose:

-   Country
-   Visa type where applicable
-   Other country option
-   Additional Notes

Customer information:

-   Full Name
-   Email
-   Phone
-   WhatsApp

Submit request.

The list of supported countries must be editable from the CMS.

------------------------------------------------------------------------

## 17. Security Approval Service

Target audience:

Foreign visitors who want to enter Egypt and may require assistance with
security approval procedures.

Use the provided reference image as visual inspiration/reference where
appropriate.

The request form should remain simple.

### Fields

-   Nationality
-   Travel date where useful
-   Purpose of visit
-   Additional Notes
-   Full Name
-   Email
-   Phone
-   WhatsApp

Nationality should contain a complete country list.

Do not invent government procedures, approval guarantees, legal
requirements, or processing times.

All legal/regulatory content must be based on verified company-provided
information.

------------------------------------------------------------------------

## 18. Tourist Transportation

This is a simple request service because the company currently works
through suppliers/intermediaries.

Possible request fields:

-   Pickup location
-   Drop-off location
-   Date
-   Time
-   Number of passengers
-   Required transportation/service
-   Additional Notes
-   Full Name
-   Email
-   Phone
-   WhatsApp

Do not imply that Egypt National Tours owns a fleet unless the company
explicitly confirms this.

------------------------------------------------------------------------

## 19. Reviews / Testimonials CMS

Reviews should be manageable from the CMS.

Fields:

-   Customer name
-   Country/nationality if supplied and appropriate
-   Rating
-   Review text
-   Optional image
-   Published/hidden
-   Featured on homepage

Production site must use genuine customer reviews supplied/approved by
the company.

------------------------------------------------------------------------

## 20. Contact Information

Official contact details supplied for the project:

### WhatsApp / Mobile

+20 106 331 4240

### Landline

+20 2 24052937\
+20 2 22637554

### Email

egypt_nationaltours@yahoo.com

### Facebook

https://www.facebook.com/EgyptNationalTours/

### Address

152 Tewfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt

### Office Hours

Saturday--Thursday: 10:30 AM -- 5:00 PM

Friday: Closed

The company also works online outside office hours.

### Google Maps

Use the company-provided Google Maps link:
https://share.google/x5xQDEnwcpAnw4NPq

The exact map URL should be configurable from the CMS.

------------------------------------------------------------------------

## 21. WhatsApp Integration

Provide a floating WhatsApp button.

WhatsApp number:

+20 106 331 4240

The link should open WhatsApp chat directly.

Use a prefilled message appropriate to the current language.

Arabic example:

"مرحبًا Egypt National Tours، أرغب في الاستفسار عن خدماتكم السياحية."

English example:

"Hello Egypt National Tours, I would like to inquire about your tourism
services."

Do not require a paid WhatsApp API in the initial version.

------------------------------------------------------------------------

## 22. Request Management

Every customer request must be stored in a database.

Every request receives a unique reference number, for example:

ENT-2026-000001

Recommended request categories:

-   Flight
-   Hotel
-   Egypt Tour
-   Custom Tour
-   Hajj
-   Umrah
-   Visa
-   Security Approval
-   Transportation
-   General

The initial CMS does not need a complex workflow/status system, but the
database should be designed so statuses can be added later.

------------------------------------------------------------------------

## 23. CMS / Admin Dashboard

The project must include a secure Admin dashboard.

Initial role:

-   Admin

The architecture should allow future roles if needed.

### CMS content management

Admin must be able to manage:

-   Homepage content
-   Hero image
-   Services
-   Egypt Tours
-   International Tours
-   Hajj content
-   Umrah content
-   Visa countries
-   Security approval content
-   Transportation content
-   Reviews
-   Contact information
-   Social media links
-   Working hours
-   SEO metadata
-   Arabic content
-   English content
-   Images/media

### Tour management

Admin must be able to create/edit/delete or deactivate tourism
products/packages.

A tour may have:

-   With price
-   Without price

Pricing must be optional and should never be invented automatically.

### Media

Admin should be able to replace images without editing source code.

------------------------------------------------------------------------

## 24. Database

The database should support at minimum:

-   Users/Admin
-   Services
-   Tours
-   Tour images
-   Tour itineraries
-   Reviews
-   Visa countries
-   Requests
-   Request types
-   Contact information
-   Site settings
-   Translation/content fields
-   SEO metadata

Use a clean relational structure where appropriate.

Do not hard-code business content into components when it should be
editable through CMS.

------------------------------------------------------------------------

## 25. SEO Requirements

SEO is a high priority.

Implement:

-   Semantic HTML
-   Correct H1/H2/H3 hierarchy
-   Unique page titles
-   Meta descriptions
-   Canonical URLs
-   Open Graph metadata
-   Twitter/social metadata where appropriate
-   XML sitemap
-   robots.txt
-   Clean URLs
-   Image alt text
-   Optimized internal linking
-   Fast page loading
-   Responsive design
-   Structured data / Schema Markup

Relevant schema types may include appropriate organization/travel/local
business/tour/review schemas only when their data is accurate and
appropriate.

Do not create fake ratings, reviews, prices, awards, or statistics for
SEO.

SEO metadata must support both Arabic and English.

------------------------------------------------------------------------

## 26. Performance Requirements

The website must be lightweight.

Use:

-   WebP/AVIF where appropriate
-   Responsive images
-   Lazy loading
-   Image dimension control
-   Compression
-   Minified production assets
-   Code splitting where appropriate
-   Caching
-   Efficient fonts
-   Minimal dependencies
-   No unnecessary third-party scripts

Do not use huge unoptimized images.

The original uploaded logo should be optimized for web use while
preserving the original asset separately.

------------------------------------------------------------------------

## 27. Security Requirements

Application-level security must include:

-   HTTPS in production
-   Secure authentication
-   Password hashing
-   Secure session handling
-   Input validation
-   Server-side validation
-   Protection against XSS
-   CSRF protection where applicable
-   Rate limiting for public forms
-   Secure API endpoints
-   Role-based access architecture
-   Environment variables for secrets
-   No API keys or secrets in frontend code
-   Secure database access
-   Safe file upload handling
-   Audit-friendly code structure

------------------------------------------------------------------------

## 28. Infrastructure Requirements

The application should be deployable to a suitable cloud/hosting
environment.

Infrastructure requirements from the business specification include:

### Performance

-   High uptime
-   Adequate bandwidth
-   Fast response time

### Security

-   Firewall/WAF where available
-   HTTPS
-   Data encryption in transit
-   Disaster recovery plan

### Reliability

-   Periodic backups
-   High availability where practical
-   Recovery procedures
-   Service continuity

### Technical support

The final hosting/support arrangement should provide appropriate
technical support.

Important distinction: Hosting uptime, firewall, backups, disaster
recovery, and 24/7 support are infrastructure/hosting responsibilities
and must not be falsely represented as features created by frontend
code.

------------------------------------------------------------------------

## 29. External API Readiness

The system should be designed so external services can be integrated
later.

Potential future integrations:

-   Flight booking APIs
-   Hotel booking APIs
-   Tour/product APIs
-   REST APIs
-   SOAP services where required
-   Payment gateways
-   WhatsApp Business API
-   Email providers

Do not implement fake integrations.

Do not connect to an external booking supplier until real
credentials/API documentation are provided.

The architecture should isolate external integrations behind service
modules/adapters so they can be added without rebuilding the entire
frontend.

------------------------------------------------------------------------

## 30. Payments

Initial version:

-   No online payment required.
-   Customer submits a request.
-   Egypt National Tours contacts the customer.
-   Payment can be added later.

The architecture should remain payment-ready.

If payment is added in a future phase, it must support:

-   Secure payment processing
-   Clear pricing
-   Applicable commissions/fees
-   Transaction status
-   Payment confirmation
-   Secure webhook handling

Do not expose payment credentials in the frontend.

------------------------------------------------------------------------

## 31. Social Media

Provide compact icons/links for:

-   WhatsApp
-   Facebook
-   Instagram if supplied
-   TikTok if supplied

Do not embed heavy social-media feeds unless specifically requested.

Current confirmed Facebook: https://www.facebook.com/EgyptNationalTours/

------------------------------------------------------------------------

## 32. Analytics

The website should be analytics-ready.

Google Analytics and Google Search Console may be added after
deployment/domain setup.

Do not make analytics a hard dependency for the site to function.

Analytics identifiers must be configurable through environment variables
or CMS/site settings, not hard-coded into random components.

------------------------------------------------------------------------

## 33. Domain

No custom domain is currently owned.

Initial deployment may use a temporary hosting-provided domain.

The architecture must not depend on the temporary domain.

Later the company can connect a custom domain such as an appropriate
Egypt National Tours domain.

The final domain will be decided separately.

------------------------------------------------------------------------

## 34. Source Code Delivery

The company must receive the complete source code.

Delivery should include:

-   Frontend
-   Backend
-   Database schema/migrations
-   CMS
-   Configuration templates
-   Assets
-   Deployment instructions
-   Environment variable example
-   Documentation
-   Testing instructions

Avoid unnecessary vendor lock-in.

------------------------------------------------------------------------

## 35. Training Requirement

Provide at least 7 hours of training for company staff.

Suggested training structure:

1.  CMS overview
2.  Managing homepage content
3.  Managing services
4.  Adding/editing tours
5.  Managing images/media
6.  Managing Arabic/English content
7.  Managing requests
8.  Basic SEO
9.  Basic security/admin practices
10. Backup/recovery basics

Training can be divided into multiple sessions.

------------------------------------------------------------------------

## 36. Content Governance

The system must distinguish between:

### Company-provided facts

Examples:

-   Company name
-   Contact details
-   Address
-   Working hours
-   License statement
-   Actual packages
-   Actual prices
-   Actual reviews

These must not be changed or invented by AI.

### Design-generated content

AI may suggest:

-   Layout
-   CTA wording
-   Generic marketing copy
-   Visual concepts

But final factual claims must be approved by the company.

### Legal/regulatory content

Do not invent or guarantee:

-   Visa approval
-   Security approval
-   Government processing time
-   Hajj/Umrah regulatory requirements
-   Immigration requirements
-   Government fees
-   Official eligibility rules

Only use verified information supplied/approved by the company.

------------------------------------------------------------------------

## 37. UX Principles

The customer should reach the desired action quickly.

Priorities:

1.  Understand what the company does.
2.  Find the needed service.
3.  Submit a request easily.
4.  Receive a clear confirmation.
5.  Contact the company through WhatsApp/phone if desired.

Avoid:

-   Long complicated forms
-   Unnecessary account creation
-   Forced registration
-   Excessive popups
-   Intrusive animations
-   Unnecessary surveys
-   Complex booking flows when a quotation request is sufficient

------------------------------------------------------------------------

## 38. Request Reference Workflow

On every successful request:

1.  Validate data.
2.  Save request.
3.  Generate unique reference.
4.  Show success page/message.
5.  Provide optional WhatsApp CTA.

Example:

> تم إرسال طلبكم بنجاح\
> رقم الطلب: ENT-2026-000001\
> سيتواصل معكم أحد مستشاري Egypt National Tours قريبًا.

English:

> Your request has been submitted successfully.\
> Request Reference: ENT-2026-000001\
> One of our travel consultants will contact you shortly.

------------------------------------------------------------------------

## 39. Maintainability Rules

The implementation must:

-   Use reusable components
-   Avoid duplicated forms/components
-   Centralize translations
-   Centralize site settings
-   Keep business content separate from UI code
-   Use clear naming
-   Include useful comments only where needed
-   Keep modules organized
-   Avoid unnecessary dependencies
-   Avoid hard-coded contact information in multiple files
-   Avoid hard-coded tour content when CMS-managed
-   Keep future API integrations isolated

------------------------------------------------------------------------

## 40. Antigravity Working Rules

Before modifying or creating application code:

1.  Read this specification.
2.  Read the project rules under `.agents/rules`.
3.  Read relevant files under `/docs`.
4.  Inspect the existing project structure.
5.  Reuse existing components where possible.
6.  Do not delete existing functionality without explicit approval.
7.  Do not replace the architecture unnecessarily.
8.  Do not invent company facts.
9.  Do not invent prices.
10. Do not publish fake testimonials.
11. Do not expose secrets.
12. Test changes after implementation.
13. Check both Arabic RTL and English LTR.
14. Check mobile and desktop layouts.
15. Check forms and validation.
16. Check console errors and broken links.
17. Keep performance in mind.
18. Update documentation when architecture or major functionality
    changes.

------------------------------------------------------------------------

## 41. Definition of Done

The website is considered ready for initial production only when:

-   Arabic version works
-   English version works
-   RTL/LTR are correct
-   Navigation works
-   All major service pages work
-   Flight request works
-   Hotel request works
-   Tour request works
-   Custom tour request works
-   Hajj request works
-   Umrah request works
-   Visa request works
-   Security approval request works
-   Transportation request works
-   Requests are stored
-   Reference numbers are generated
-   Success messages work
-   Admin login works
-   CMS content can be edited
-   Tours can be added/edited
-   Images can be changed through CMS
-   Reviews can be managed
-   Contact details can be managed
-   SEO metadata exists
-   Sitemap exists
-   Robots.txt exists
-   Images are optimized
-   Responsive behavior is tested
-   Security checks are performed
-   Source code is organized
-   Deployment documentation exists
-   No placeholder/fake production data remains unless explicitly
    approved

------------------------------------------------------------------------

## 42. Important Scope Principle

The first version should prioritize:

**Simple + Fast + Professional + Reliable + Easy to Manage**

Do not turn the first version into a complicated online booking engine.

The website should generate high-quality customer leads and make it easy
for Egypt National Tours to manage those leads.

Future capabilities such as live flight inventory, live hotel inventory,
payment gateways, WhatsApp API automation, advanced CRM, and supplier
APIs should be possible without requiring a complete rebuild.
