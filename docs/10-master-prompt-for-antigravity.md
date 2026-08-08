# 10 --- MASTER START PROMPT FOR GOOGLE ANTIGRAVITY

## IMPORTANT

This is the operational starting instruction for the Egypt National
Tours website project.

DO NOT treat this message as the complete website specification.

The detailed specifications are stored inside the project's `docs/`
folder.

Your first responsibility is to READ, UNDERSTAND, AUDIT, and CONNECT
those documents before implementing the website.

Do not start by generating the whole website.

------------------------------------------------------------------------

# 1. PROJECT

Project name:

**Egypt National Tours**

Arabic company name:

**إيجيبت ناشيونال تورز**

Tagline:

**Discover the Charm of Egypt**

Company statement:

**Licensed since 1990 in Egypt & USA**

The website is a bilingual tourism website:

-   Arabic
-   English

Arabic is the primary language.

------------------------------------------------------------------------

# 2. FIRST ACTION --- READ THE PROJECT

Before changing or creating application code:

1.  Inspect the project root.
2.  Locate the `docs/` directory.
3.  Read ALL specification documents in `docs/`.
4.  Do not read only the latest file.
5.  Treat documents 01--10 as one connected project specification.
6.  Inspect all existing source files and configuration.
7.  Determine whether the project is empty, partially implemented, or
    already contains work.
8.  Determine what the current environment can actually support.

The documents are:

``` text
docs/
├── 01-project-master-specification.md
├── 02-sitemap-and-navigation.md
├── 03-brand-ui-design-system.md
├── 04-pages-and-content-specification.md
├── 05-cms-and-admin-panel-specification.md
├── 06-database-and-data-architecture.md
├── 07-seo-performance-security-accessibility.md
├── 08-technical-architecture-and-technology-stack.md
├── 09-implementation-roadmap-and-antigravity-workflow.md
└── 10-master-prompt-for-antigravity.md
```

If additional project documentation exists, inspect it too.

------------------------------------------------------------------------

# 3. DO NOT CODE YET

After reading the documentation, DO NOT immediately build the site.

First perform an audit.

Create:

``` text
docs/ANTIGRAVITY-INITIAL-AUDIT.md
```

The audit must contain:

### A. Environment

-   Operating environment
-   Node/npm availability
-   Existing framework
-   Existing packages
-   Database availability
-   File/storage capabilities
-   Deployment capabilities

### B. Existing project

-   Existing files
-   Existing pages
-   Existing components
-   Existing configuration
-   Existing assets
-   Existing code that should be preserved

### C. Specification understanding

Summarize:

-   Business goal
-   Target users
-   Languages
-   Main services
-   Public pages
-   Forms
-   CMS
-   Admin
-   Database
-   SEO
-   Security
-   Performance
-   Future integrations

### D. Conflicts or missing information

Identify:

-   Contradictions
-   Missing credentials
-   Missing infrastructure
-   Missing assets
-   Decisions that require the user's input

Do not invent answers.

### E. Recommended implementation sequence

Use the phases defined in:

``` text
09-implementation-roadmap-and-antigravity-workflow.md
```

------------------------------------------------------------------------

# 4. STOP AFTER THE AUDIT

This is mandatory.

After creating:

``` text
docs/ANTIGRAVITY-INITIAL-AUDIT.md
```

STOP.

Do not:

-   build pages
-   create the database
-   install large packages
-   create fake APIs
-   create fake CMS
-   create fake customer storage
-   deploy
-   redesign the logo
-   invent content

Wait for the user to review the audit and explicitly authorize Phase 1.

------------------------------------------------------------------------

# 5. SPECIFICATION AUTHORITY

The documentation is the source of truth.

Priority:

1.  Explicit user-approved business decisions
2.  Security/legal/technical safety
3.  Project specification
4.  Implementation convenience

If two requirements materially conflict:

STOP and report the conflict.

Do not silently choose a business decision.

------------------------------------------------------------------------

# 6. DO NOT INVENT INFORMATION

Never invent:

-   Prices
-   Offers
-   Reviews
-   Awards
-   Licenses
-   Government requirements
-   Visa rules
-   Hotel policies
-   Airline schedules
-   Tour facts
-   Company branches
-   Certifications
-   Customer information

If information is missing, write:

``` text
NEEDS USER INPUT
```

or:

``` text
PENDING
```

------------------------------------------------------------------------

# 7. BUSINESS DATA ALREADY PROVIDED

Use these approved details where applicable:

Company:

``` text
Egypt National Tours
```

Tagline:

``` text
Discover the Charm of Egypt
```

Statement:

``` text
Licensed since 1990 in Egypt & USA
```

WhatsApp:

``` text
00201063314240
```

Phone:

``` text
00201063314240
```

Landlines:

``` text
0020224052937
0020222637554
```

Email:

``` text
egypt_nationaltours@yahoo.com
```

Facebook:

``` text
https://www.facebook.com/EgyptNationalTours/
```

Address:

``` text
152 عمارات التوفيق، شارع الطيران، مدينة نصر، مصر
```

Working hours:

``` text
10:30 AM – 5:00 PM
Sunday–Thursday
```

Friday and Saturday:

``` text
Closed
```

Online contact may be available outside office hours.

Google Maps:

``` text
https://share.google/x5xQDEnwcpAnw4NPq
```

Use these as centralized company settings where possible.

Do not scatter them across many components.

------------------------------------------------------------------------

# 8. INITIAL IMPLEMENTATION PRINCIPLE

The first coding phase will begin ONLY after the user approves the
initial audit.

When authorized, start with:

``` text
PHASE 1 — PROJECT FOUNDATION
```

according to document 09.

Then:

``` text
IMPLEMENT
→ TEST
→ CHECKPOINT
→ STOP
```

Do not automatically proceed to Phase 2.

------------------------------------------------------------------------

# 9. CHECKPOINTS

Every major phase must create or update a checkpoint document.

Examples:

``` text
FOUNDATION-CHECKPOINT.md
DESIGN-CHECKPOINT.md
LAYOUT-CHECKPOINT.md
PUBLIC-PAGES-CHECKPOINT.md
CMS-DATABASE-CHECKPOINT.md
ADMIN-CHECKPOINT.md
NOTIFICATIONS-CHECKPOINT.md
SEO-CHECKPOINT.md
PERFORMANCE-CHECKPOINT.md
SECURITY-CHECKPOINT.md
ACCESSIBILITY-CHECKPOINT.md
TESTING-CHECKPOINT.md
DEPLOYMENT-CHECKPOINT.md
FINAL-AUDIT.md
```

Each checkpoint must state:

-   What was implemented
-   Files changed
-   Tests performed
-   Test results
-   Known problems
-   Remaining work
-   Whether the phase is ready for human review

------------------------------------------------------------------------

# 10. HUMAN APPROVAL

The user is the business owner.

Do not assume approval.

For every major phase:

``` text
Complete phase
↓
Run tests
↓
Create checkpoint
↓
Explain result
↓
STOP
```

Only continue after explicit approval.

------------------------------------------------------------------------

# 11. PROTECT EXISTING WORK

Before changing an existing file:

1.  Read it.
2.  Understand it.
3.  Preserve working functionality.
4.  Make the smallest reasonable change.

Do not overwrite working files unnecessarily.

------------------------------------------------------------------------

# 12. NO FAKE FUNCTIONALITY

Never make something appear functional when the required infrastructure
does not exist.

Examples:

If there is no database:

Do not claim customer requests are securely stored.

If there is no email provider:

Do not claim email notifications are operational.

If there is no flight API:

Do not display fake live flight results.

If there is no payment gateway:

Do not display a fake payment system.

Clearly separate:

``` text
Real
```

from:

``` text
Mock / Demo / Pending integration
```

------------------------------------------------------------------------

# 13. DESIGN PRINCIPLE

The design must follow the approved design system.

Desired visual direction:

-   Elegant
-   Simple
-   Professional
-   Light
-   Premium without being flashy
-   Tourism-oriented
-   Trustworthy
-   Fast
-   Mobile-first

Use the supplied company logo.

Do not alter the logo unless explicitly requested.

Do not introduce a completely different brand identity.

------------------------------------------------------------------------

# 14. BILINGUAL PRINCIPLE

Arabic:

``` text
RTL
```

English:

``` text
LTR
```

The bilingual architecture must exist from the beginning.

Do not build the entire site in English and attempt to patch Arabic
later.

Use:

``` text
/ar/...
/en/...
```

or an equally robust architecture defined by document 08.

------------------------------------------------------------------------

# 15. CUSTOMER REQUEST PRINCIPLE

The website is primarily a service presentation and lead-generation
platform.

Customers should be able to request:

-   Flights
-   Hotels
-   Tour programs
-   Visas
-   Egypt security approvals
-   Transportation
-   Hajj
-   Umrah
-   General inquiries

The request workflow must remain simple.

Do not turn the first version into an unnecessarily complicated online
booking engine.

------------------------------------------------------------------------

# 16. IMPORTANT FLIGHT REQUEST

The flight request must support at minimum:

-   From
-   To
-   One-way / Round-trip
-   Departure date
-   Return date when applicable
-   Adults
-   Children
-   Infants
-   Notes
-   Customer contact details

The request must eventually be saved and notified through the backend
architecture defined in the documentation.

------------------------------------------------------------------------

# 17. TOUR PROGRAM PRINCIPLE

Egypt tour programs should be presented as standard informative programs
without mandatory public prices unless approved.

Examples include:

-   Cairo
-   Cairo & Alexandria
-   Cairo + Aswan + Luxor
-   Other approved programs

When a visitor selects a program:

``` text
Program details
↓
Request this program
↓
Customer details
↓
Notes
↓
Submit
```

------------------------------------------------------------------------

# 18. HAJJ / UMRAH

Hajj and Umrah sections are primarily program presentation/request
sections.

The user will provide/update program images and details through the CMS
when available.

Do not invent religious package details.

------------------------------------------------------------------------

# 19. REVIEWS

Reviews may be added later.

Until genuine reviews are supplied:

-   Use placeholders only if needed for layout.
-   Clearly mark demo content.
-   Never present fake reviews as genuine.
-   Never create fake aggregate review schema.

------------------------------------------------------------------------

# 20. CMS PRINCIPLE

The CMS must eventually allow the administrator to update content
without editing source code.

At minimum it should support the approved content areas defined in
document 05.

Keep it simple enough for one non-technical administrator.

------------------------------------------------------------------------

# 21. FUTURE INTEGRATIONS

Design extension points for:

-   Flight APIs
-   Hotel APIs
-   Payment
-   WhatsApp Business
-   Email provider
-   Storage provider

But do not implement fake integrations.

Use adapters where appropriate.

------------------------------------------------------------------------

# 22. PERFORMANCE PRINCIPLE

Prefer:

-   Server rendering
-   Optimized images
-   Minimal JavaScript
-   Lightweight components
-   Caching
-   Lazy loading where appropriate

Avoid unnecessary:

-   animations
-   heavy libraries
-   social embeds
-   video backgrounds
-   third-party widgets

------------------------------------------------------------------------

# 23. SECURITY PRINCIPLE

Never expose:

-   passwords
-   database credentials
-   API keys
-   SMTP credentials
-   private customer data

in frontend code.

All sensitive operations must be server-side.

------------------------------------------------------------------------

# 24. SEO PRINCIPLE

The site must be built with SEO from the beginning.

Do not treat SEO as a final cosmetic step.

Follow document 07 for:

-   Metadata
-   Sitemap
-   Robots
-   Canonical
-   Hreflang
-   Schema
-   Open Graph
-   Performance

------------------------------------------------------------------------

# 25. SOURCE CODE

The final project must remain portable.

Do not create essential functionality that can only be edited through a
closed third-party interface.

The company must be able to receive:

-   Source code
-   Database schema
-   Migrations
-   Documentation
-   Configuration examples
-   Assets

------------------------------------------------------------------------

# 26. YOUR FIRST TASK

Your FIRST task is ONLY:

``` text
READ
→ INSPECT
→ AUDIT
→ DOCUMENT
→ STOP
```

Create:

``` text
docs/ANTIGRAVITY-INITIAL-AUDIT.md
```

Then report:

``` text
INITIAL AUDIT COMPLETE
```

and provide a concise summary of:

1.  What you found.
2.  What you understand.
3.  What is ready.
4.  What is missing.
5.  What needs user approval.

Then STOP.

Do not begin Phase 1 until the user explicitly says to proceed.
