# Egypt National Tours --- SEO, Performance, Security & Accessibility Specification

## 1. Purpose

This document defines the technical requirements for:

-   Search Engine Optimization (SEO)
-   Performance
-   Security
-   Accessibility
-   Privacy-conscious data handling
-   Reliable public forms
-   Future production deployment

The implementation must remain lightweight and simple.

Do not add unnecessary third-party scripts.

------------------------------------------------------------------------

# 2. SEO Strategy

Primary SEO markets:

-   Egypt
-   Arabic-speaking customers
-   International travelers interested in Egypt
-   Travelers seeking Egypt tourism services
-   Travelers seeking flights, hotels, visas, Hajj/Umrah, transportation
    and tour programs

Primary languages:

-   Arabic
-   English

Arabic is the default language.

------------------------------------------------------------------------

# 3. SEO URL Structure

Use clean human-readable URLs.

Examples:

``` text
/ar/
 /en/

 /ar/services
 /en/services

 /ar/services/flights
 /en/services/flights

 /ar/egypt-tours
 /en/egypt-tours

 /ar/egypt-tours/cairo-alexandria
 /en/egypt-tours/cairo-alexandria

 /ar/visas
 /en/visas

 /ar/security-approvals
 /en/security-approvals

 /ar/contact
 /en/contact
```

Avoid:

``` text
/page?id=123
/product.php?id=7
```

where a clean slug is possible.

------------------------------------------------------------------------

# 4. Language URLs

Arabic and English must have distinct indexable URLs.

Recommended:

``` text
/ar/
 /en/
```

or an equivalent architecture with equally clear language separation.

Do not rely exclusively on JavaScript to switch language.

------------------------------------------------------------------------

# 5. Hreflang

Where equivalent Arabic and English pages exist, implement:

``` text
hreflang="ar"
hreflang="en"
hreflang="x-default"
```

Each language version should reference the corresponding alternate page.

Do not generate hreflang links for pages that do not have a real
equivalent.

------------------------------------------------------------------------

# 6. Canonical URLs

Every indexable page should have one canonical URL.

Canonical URLs must:

-   Use HTTPS in production.
-   Use the preferred language URL.
-   Avoid duplicate query-string variants.
-   Avoid accidental trailing-slash duplication.

------------------------------------------------------------------------

# 7. Title Tags

Every important public page must have a unique title.

Recommended structure:

Arabic:

``` text
[Page/Service] | Egypt National Tours
```

English:

``` text
[Page/Service] | Egypt National Tours
```

Avoid keyword stuffing.

------------------------------------------------------------------------

# 8. Meta Descriptions

Each important page should have:

-   Arabic meta description
-   English meta description

Keep descriptions useful and readable.

Do not duplicate one generic description across every page.

------------------------------------------------------------------------

# 9. Heading Structure

Every page should have:

-   One clear H1
-   Logical H2/H3 hierarchy

Do not use headings only for visual styling.

------------------------------------------------------------------------

# 10. Content SEO

Content should naturally mention relevant services such as:

-   Egypt Tours
-   Cairo Tours
-   Nile Cruise
-   Alexandria Tours
-   Flights
-   Hotel Booking
-   Visa Services
-   Security Approvals
-   Hajj
-   Umrah
-   Transportation

Do not keyword-stuff.

Write primarily for customers.

------------------------------------------------------------------------

# 11. Structured Data

Use Schema.org structured data where appropriate.

Primary organization type:

``` text
TravelAgency
```

Include, where accurate:

-   Name
-   Logo
-   URL
-   Telephone
-   Email
-   Address
-   Opening hours
-   SameAs social profiles

------------------------------------------------------------------------

# 12. Local Business Data

Where supported by Schema.org, provide accurate local business
information.

Use the company's actual:

-   Address
-   Telephone
-   Opening hours
-   Website
-   Facebook

Do not invent:

-   Ratings
-   Review counts
-   Awards
-   Locations
-   Branches

------------------------------------------------------------------------

# 13. Review Schema

Do not create fake aggregate review schema.

Only use review structured data if the displayed reviews are genuine and
the implementation complies with search engine guidelines.

Demo reviews must never generate fake review schema in production.

------------------------------------------------------------------------

# 14. Breadcrumbs

Implement breadcrumbs on deeper pages where useful.

Example:

``` text
Home > Services > Egypt Tours > Cairo & Alexandria
```

Use BreadcrumbList structured data where appropriate.

------------------------------------------------------------------------

# 15. Sitemap

Generate:

``` text
/sitemap.xml
```

The sitemap should include only:

-   Public
-   Published
-   Indexable
-   Canonical URLs

Do not include:

-   Admin
-   Draft pages
-   Archived pages
-   Customer requests
-   Private URLs

------------------------------------------------------------------------

# 16. Robots.txt

Provide:

``` text
/robots.txt
```

The admin area must not be intended for search indexing.

Example conceptual rule:

``` text
Disallow: /admin
```

Do not use robots.txt as a security mechanism.

Authentication is still required.

------------------------------------------------------------------------

# 17. Open Graph

Public pages should have:

-   `og:title`
-   `og:description`
-   `og:image`
-   `og:url`
-   `og:type`
-   `og:site_name`

Use language-appropriate metadata.

------------------------------------------------------------------------

# 18. Social Sharing

Provide sensible social preview images.

The CMS should allow administrators to change the default social image.

------------------------------------------------------------------------

# 19. Images

All meaningful images must have useful alt text.

Decorative images should use empty alt text where appropriate.

Do not put large amounts of keyword text into alt attributes.

------------------------------------------------------------------------

# 20. Image Formats

Prefer modern optimized formats:

-   WebP
-   AVIF where safely supported

Keep fallback support where required.

------------------------------------------------------------------------

# 21. Responsive Images

Use responsive image techniques:

-   `srcset`
-   `sizes`

where appropriate.

Do not send desktop-sized images to small mobile screens unnecessarily.

------------------------------------------------------------------------

# 22. Image Dimensions

Avoid layout shifts by providing:

-   width
-   height
-   aspect ratio

for images where practical.

------------------------------------------------------------------------

# 23. Image Compression

Uploaded CMS images should be:

-   Validated
-   Resized when excessive
-   Compressed
-   Optimized for web delivery

Do not blindly preserve multi-megabyte original files for public
delivery.

Original files may be retained separately only if the storage strategy
requires it.

------------------------------------------------------------------------

# 24. Lazy Loading

Use lazy loading for below-the-fold images.

Do not lazy-load the main above-the-fold hero image if that harms the
Largest Contentful Paint.

------------------------------------------------------------------------

# 25. Performance Budget

The site should remain lightweight.

Avoid:

-   Large JS frameworks when unnecessary
-   Heavy animation libraries
-   Auto-playing video backgrounds
-   Excessive web fonts
-   Unnecessary tracking scripts
-   Large third-party widgets

------------------------------------------------------------------------

# 26. Critical Rendering

Prioritize:

1.  HTML/content
2.  Critical CSS
3.  Main hero
4.  Primary navigation
5.  Main CTA

Defer non-essential JavaScript.

------------------------------------------------------------------------

# 27. JavaScript

Use JavaScript only where it provides real functionality.

Examples:

-   Forms
-   Language switching
-   Menu behavior
-   Validation
-   Admin functionality

Do not require JavaScript for basic page content visibility where
avoidable.

------------------------------------------------------------------------

# 28. CSS

Use a maintainable styling system.

Avoid:

-   Repeated inline styles
-   Huge unused CSS bundles
-   Conflicting component overrides

------------------------------------------------------------------------

# 29. Fonts

Use a small number of fonts.

Arabic and English typography must remain readable.

Avoid loading many font weights that are never used.

------------------------------------------------------------------------

# 30. Performance Caching

Production should use appropriate caching for:

-   Static assets
-   Images
-   Public CMS content

Do not cache private request/admin responses publicly.

------------------------------------------------------------------------

# 31. Compression

Production server/CDN should support:

-   Brotli where available
-   Gzip fallback

Do not compress already-compressed binary files unnecessarily.

------------------------------------------------------------------------

# 32. Core Web Vitals

Target good performance for:

-   LCP
-   INP
-   CLS

The implementation should avoid obvious causes of poor scores.

------------------------------------------------------------------------

# 33. Layout Stability

Reserve dimensions for:

-   Images
-   Hero sections
-   Buttons where dynamic content could shift layout
-   Fonts where possible

Avoid content jumping after page load.

------------------------------------------------------------------------

# 34. Mobile First

The public website must be fully responsive.

Test at minimum:

-   Small mobile
-   Large mobile
-   Tablet
-   Laptop
-   Desktop

------------------------------------------------------------------------

# 35. Touch Targets

Interactive elements should be comfortable to tap.

Avoid tiny links/buttons.

------------------------------------------------------------------------

# 36. Accessibility

Target WCAG 2.2 AA principles where practical.

At minimum:

-   Keyboard navigation
-   Visible focus states
-   Sufficient contrast
-   Proper labels
-   Semantic HTML
-   Alt text
-   Form error messages
-   Accessible buttons
-   Accessible navigation

------------------------------------------------------------------------

# 37. RTL

Arabic pages must use:

``` html
dir="rtl"
lang="ar"
```

English pages:

``` html
dir="ltr"
lang="en"
```

Do not fake RTL by manually reversing individual elements.

------------------------------------------------------------------------

# 38. Language Switcher

Language switching must:

-   Be visible
-   Be easy to understand
-   Preserve equivalent page where available
-   Never unexpectedly erase form data

Example:

``` text
العربية | English
```

------------------------------------------------------------------------

# 39. Accessibility of Forms

Every form field must have:

-   Label
-   Clear purpose
-   Required/optional indication
-   Accessible error state

Placeholder text must not replace the label.

------------------------------------------------------------------------

# 40. Form Validation

Validate both:

-   Client-side for immediate feedback
-   Server-side for security and correctness

Client validation must never be considered sufficient.

------------------------------------------------------------------------

# 41. Error Messages

Errors should be clear.

Example Arabic:

``` text
برجاء إدخال الاسم.
```

Example English:

``` text
Please enter your name.
```

Do not expose technical stack traces.

------------------------------------------------------------------------

# 42. Success Messages

After successful request submission:

Arabic:

``` text
تم إرسال طلبكم بنجاح.
سنتواصل معكم في أقرب وقت ممكن.
```

English:

``` text
Your request has been submitted successfully.
We will contact you as soon as possible.
```

Display the request reference.

------------------------------------------------------------------------

# 43. Request Reliability

Request submission must follow this order:

1.  Validate input.
2.  Validate again on server.
3.  Save request.
4.  Generate unique reference.
5.  Return success.
6.  Attempt notification.

Email failure must not delete or invalidate the saved request.

------------------------------------------------------------------------

# 44. Spam Protection

Public forms must include anti-spam protection.

Prefer lightweight methods such as:

-   Honeypot
-   Rate limiting
-   Server-side validation

Use CAPTCHA only if spam becomes a real problem.

Do not make every form unnecessarily difficult to use.

------------------------------------------------------------------------

# 45. Rate Limiting

Rate-limit:

-   Login
-   Public request submission
-   Sensitive API endpoints

Limits should be reasonable and configurable.

------------------------------------------------------------------------

# 46. HTTPS

Production must use HTTPS.

All HTTP requests should redirect to HTTPS.

Do not send customer form data over plain HTTP in production.

------------------------------------------------------------------------

# 47. Secure Cookies

Where cookies are used:

-   Secure
-   HttpOnly where appropriate
-   SameSite configured appropriately

Session cookies must not be accessible to normal frontend JavaScript
where avoidable.

------------------------------------------------------------------------

# 48. Authentication Security

Admin authentication must use:

-   Password hashing
-   Secure session handling
-   Rate limiting
-   Logout
-   Expiration/rotation strategy where appropriate

Never store passwords in:

-   localStorage
-   plaintext database fields
-   source code

------------------------------------------------------------------------

# 49. Authorization

Every admin API endpoint must verify authorization server-side.

Do not trust frontend route guards as the only security layer.

------------------------------------------------------------------------

# 50. CSRF

If cookie-based authentication is used, implement appropriate CSRF
protection for state-changing requests.

------------------------------------------------------------------------

# 51. XSS

All user-submitted and CMS content must be safely rendered.

If HTML is allowed:

-   Sanitize it
-   Restrict allowed tags/attributes
-   Strip scripts
-   Strip event-handler attributes

------------------------------------------------------------------------

# 52. SQL Injection

Use:

-   Parameterized queries
-   ORM/database query builders safely
-   Validated input

Never concatenate raw user input into SQL.

------------------------------------------------------------------------

# 53. File Upload Security

Media uploads must validate:

-   File extension
-   MIME type
-   File signature where possible
-   File size
-   Image dimensions

Reject executable files.

Do not allow uploaded files to become executable server-side content.

------------------------------------------------------------------------

# 54. SVG Security

SVG uploads require special caution because SVG can contain active
content.

Either:

-   Sanitize SVG strictly
-   Or disallow SVG uploads in version 1

Prefer the simpler safe option unless SVG is genuinely required.

------------------------------------------------------------------------

# 55. API Keys

Never expose:

-   API keys
-   SMTP credentials
-   Database credentials
-   Session secrets
-   Payment secrets

in frontend JavaScript.

Use environment variables or secure secret storage.

------------------------------------------------------------------------

# 56. Security Headers

Production should support appropriate headers such as:

-   Content-Security-Policy
-   X-Content-Type-Options
-   Referrer-Policy
-   Permissions-Policy
-   Strict-Transport-Security

Configure CSP carefully so the site still functions.

------------------------------------------------------------------------

# 57. Content Security Policy

Do not blindly copy a restrictive CSP that breaks:

-   Fonts
-   Images
-   APIs
-   Forms

Start from actual resource requirements and tighten it.

------------------------------------------------------------------------

# 58. Clickjacking

Protect authenticated/admin pages from unauthorized framing.

Use appropriate:

-   CSP `frame-ancestors`
-   or equivalent header controls

------------------------------------------------------------------------

# 59. CORS

Do not use:

``` text
Access-Control-Allow-Origin: *
```

for authenticated/private APIs unless there is a specific justified
need.

Restrict allowed origins.

------------------------------------------------------------------------

# 60. Admin Security

The admin panel must:

-   Be authenticated
-   Use HTTPS
-   Avoid exposing sensitive information
-   Rate-limit login
-   Avoid indexing
-   Validate all writes
-   Log important operational events

------------------------------------------------------------------------

# 61. Privacy

Only collect information needed to handle the customer's request.

Provide a simple privacy notice.

The privacy page should explain:

-   What data is collected
-   Why it is collected
-   How customers can contact the company
-   That information is used to respond to tourism/service requests

Avoid unnecessary legal complexity in the UI.

------------------------------------------------------------------------

# 62. Sensitive Data

Do not store:

-   Credit card numbers
-   CVV
-   Passwords in plaintext
-   Unnecessary identity documents

Passport/identity documents should not be introduced into version 1
without a clear operational and legal requirement and secure storage
design.

------------------------------------------------------------------------

# 63. Logs

Application logs must not contain unnecessary sensitive customer data.

Avoid logging:

-   Full passwords
-   API secrets
-   Payment details
-   Complete private form payloads where unnecessary

------------------------------------------------------------------------

# 64. Error Handling

Production errors must be:

-   Logged securely
-   Given a friendly public message
-   Hidden from public stack traces

Do not expose:

-   SQL queries
-   File paths
-   Stack traces
-   Secret environment variables

------------------------------------------------------------------------

# 65. Backups

Production deployment should provide:

-   Automated database backups
-   Media backup
-   Defined retention
-   Restore procedure

The actual backup schedule depends on the final infrastructure.

------------------------------------------------------------------------

# 66. Disaster Recovery

Document:

-   Database restore
-   Media restore
-   Application redeploy
-   Environment variables
-   DNS/domain recovery

Do not promise a specific recovery time before selecting the provider.

------------------------------------------------------------------------

# 67. Uptime

The production hosting solution should target reliable availability.

Do not claim 100% uptime.

Document the actual hosting provider's SLA once selected.

------------------------------------------------------------------------

# 68. Monitoring

At minimum monitor:

-   Application errors
-   Failed request submissions
-   Failed notification attempts
-   Database health
-   Uptime

Use lightweight monitoring appropriate to the selected infrastructure.

------------------------------------------------------------------------

# 69. Third-Party Scripts

Do not add analytics or tracking scripts without a clear business
reason.

Any third-party script must be reviewed for:

-   Performance
-   Privacy
-   Security
-   Mobile impact

------------------------------------------------------------------------

# 70. Social Media

Social links may be normal external links.

Do not embed heavy social feeds on the homepage unless there is a clear
benefit.

Prefer simple social icons/links.

------------------------------------------------------------------------

# 71. Google Maps

Use a simple link to Google Maps by default.

Do not embed a heavy interactive map unless needed.

This improves performance.

------------------------------------------------------------------------

# 72. WhatsApp

Use a direct WhatsApp link.

Do not load a heavy third-party chat widget merely to provide WhatsApp
contact.

------------------------------------------------------------------------

# 73. Email

Email notifications should be processed server-side.

Do not place SMTP credentials in the browser.

The request should remain saved if email delivery fails.

------------------------------------------------------------------------

# 74. SEO and Forms

Do not expose customer request URLs containing personal data.

Do not index:

-   Submitted forms
-   Request references
-   Admin pages
-   Customer details

------------------------------------------------------------------------

# 75. SEO and CMS

Only published content should be indexable.

Draft and archived content must not accidentally appear in:

-   Sitemap
-   Public API
-   Internal public navigation
-   Search engine metadata

------------------------------------------------------------------------

# 76. SEO and Deleted URLs

If a published URL is permanently removed:

-   Prefer a relevant redirect where appropriate.
-   Otherwise return a proper 404.
-   Do not redirect every missing URL to the homepage.

------------------------------------------------------------------------

# 77. 404 Page

Create a useful bilingual 404 page.

Arabic example:

``` text
الصفحة غير موجودة
```

English:

``` text
Page not found
```

Include navigation back to useful sections.

------------------------------------------------------------------------

# 78. 500 Error Page

Create a friendly production error page.

Do not show technical details.

------------------------------------------------------------------------

# 79. Accessibility Testing

Before production test:

-   Keyboard-only navigation
-   Screen-reader-friendly labels
-   Focus visibility
-   Form errors
-   Language direction
-   Contrast
-   Mobile interaction

------------------------------------------------------------------------

# 80. Browser Compatibility

Support current mainstream versions of:

-   Chrome
-   Edge
-   Safari
-   Firefox

Do not optimize for obsolete browsers unless specifically required.

------------------------------------------------------------------------

# 81. Performance Testing

Before production measure:

-   Page load
-   LCP
-   INP
-   CLS
-   Image sizes
-   JavaScript size
-   CSS size
-   Number of third-party requests

------------------------------------------------------------------------

# 82. Production Checklist

Before launch:

## SEO

-   Titles
-   Meta descriptions
-   H1
-   Canonical
-   Hreflang
-   Sitemap
-   Robots
-   Schema
-   Open Graph

## Performance

-   Optimized images
-   Responsive images
-   Lazy loading
-   Compression
-   Caching
-   No unnecessary scripts

## Security

-   HTTPS
-   Secure authentication
-   Rate limiting
-   Input validation
-   Secure uploads
-   Security headers
-   Secrets protected

## Accessibility

-   Labels
-   Keyboard navigation
-   Focus
-   Contrast
-   RTL/LTR
-   Error messages

## Forms

-   Server validation
-   Request persistence
-   Email notification
-   Success reference
-   Anti-spam

------------------------------------------------------------------------

# 83. Free Hosting / Prototype Rule

If the initial free hosting environment cannot provide:

-   HTTPS
-   Backend execution
-   Persistent database
-   Secure environment variables
-   Server-side email

then Antigravity must not claim the site is production-ready.

It should instead:

1.  Build the public frontend prototype.
2.  Keep the production backend architecture ready.
3.  Clearly identify the missing infrastructure.
4.  Avoid fake security or fake CMS behavior.

------------------------------------------------------------------------

# 84. Production Infrastructure Rule

Once a real hosting provider is selected, configure:

-   Custom domain
-   HTTPS
-   Backend
-   Database
-   Secure secrets
-   Email provider
-   Backups
-   Monitoring

The exact provider should be chosen based on cost, reliability,
technical requirements and ability to deliver source code/data
portability.

------------------------------------------------------------------------

# 85. Acceptance Criteria

This specification is accepted when:

1.  Arabic and English pages have clean indexable URLs.
2.  Canonical URLs are correct.
3.  Hreflang is correct where applicable.
4.  Sitemap contains only valid public URLs.
5.  Robots does not expose admin intent for indexing.
6.  Structured data is valid and truthful.
7.  No fake reviews/ratings are marked as genuine.
8.  Images are optimized.
9.  Mobile performance is prioritized.
10. Core Web Vitals are actively considered.
11. Forms validate client-side and server-side.
12. Requests persist before notification attempts.
13. Spam protection exists.
14. Admin authentication is secure.
15. Secrets never reach the browser.
16. Uploads are validated.
17. XSS/SQL injection/CSRF risks are addressed according to the selected
    architecture.
18. HTTPS is mandatory in production.
19. Backups are defined.
20. Error messages do not expose internal technical information.
21. Public APIs never expose private customer/admin information.
22. Accessibility is considered throughout the UI.
23. The free-hosting limitation is not hidden.

------------------------------------------------------------------------

# 86. Instruction to Antigravity

Before writing production code:

1.  Read documents 01--06.
2.  Read this document completely.
3.  Build an implementation checklist from these requirements.
4.  Identify conflicts before coding.
5.  Do not sacrifice security for convenience.
6.  Do not sacrifice performance for visual effects.
7.  Do not add unnecessary dependencies.
8.  Do not create fake backend behavior.
9.  Do not use fake SEO data.
10. Do not create fake review schema.
11. Keep the website lightweight.
12. Keep the CMS simple for a single administrator.
13. Clearly separate prototype limitations from production requirements.
14. Do not claim compliance/certification that has not actually been
    verified.
15. Test Arabic RTL and English LTR separately.
