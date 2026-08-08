# Egypt National Tours --- Implementation Roadmap & Antigravity Workflow

## 1. Purpose

This document defines how Google Antigravity must work on the Egypt
National Tours project.

It is not a page specification.

It is the execution protocol that connects all project specifications
and prevents the AI from:

-   skipping requirements
-   inventing features
-   changing approved decisions without permission
-   building everything in one uncontrolled pass
-   creating fake backend functionality
-   losing previous work
-   ignoring Arabic/English requirements
-   treating prototype limitations as production capabilities

------------------------------------------------------------------------

# 2. Source of Truth

The `docs/` folder is the project's primary specification source.

Antigravity must read all specification documents before major
implementation.

Current specification order:

``` text
01-project-master-specification.md
02-sitemap-and-navigation.md
03-brand-ui-design-system.md
04-pages-and-content-specification.md
05-cms-and-admin-panel-specification.md
06-database-and-data-architecture.md
07-seo-performance-security-accessibility.md
08-technical-architecture-and-technology-stack.md
09-implementation-roadmap-and-antigravity-workflow.md
```

Do not treat the filenames as independent prompts.

They form one connected specification.

------------------------------------------------------------------------

# 3. Reading Protocol

At the beginning of a new Antigravity session:

1.  Inspect the project root.
2.  Inspect the `docs/` folder.
3.  Read every specification document.
4.  Inspect existing source code.
5.  Inspect existing configuration.
6.  Inspect available runtime/deployment capabilities.
7.  Identify what is already implemented.
8.  Identify what remains.
9.  Do not regenerate completed work unnecessarily.

------------------------------------------------------------------------

# 4. Specification Priority

When requirements appear to conflict, use this priority:

``` text
1. Explicit user-approved decisions
2. Security and legal/technical safety requirements
3. Project master specification
4. Page/content specification
5. CMS/data architecture
6. UI/design system
7. Technical architecture
8. Implementation convenience
```

If a conflict cannot be resolved safely:

STOP and ask for clarification.

Do not silently choose a materially different business requirement.

------------------------------------------------------------------------

# 5. No Silent Scope Changes

Antigravity must not:

-   add major features without approval
-   remove required features
-   rename business services without approval
-   change company information
-   invent prices
-   invent policies
-   invent certifications
-   invent reviews
-   invent hotel/tour details
-   invent API availability
-   invent payment functionality

Small implementation details may be chosen when they do not alter
business behavior.

------------------------------------------------------------------------

# 6. Prototype vs Production

Always distinguish:

``` text
Prototype
```

from:

``` text
Production
```

If the current free hosting environment cannot provide:

-   backend
-   database
-   secure environment variables
-   email service
-   persistent storage

then Antigravity must not fake these capabilities.

It may create:

-   frontend prototype
-   forms with clearly marked pending backend integration
-   architecture scaffolding

But it must not claim that submitted customer data is securely stored if
it is not.

------------------------------------------------------------------------

# 7. Implementation Philosophy

Build incrementally.

Never attempt to generate the entire project in one uncontrolled
operation.

Each phase must:

1.  Read the relevant specifications.
2.  Implement one bounded scope.
3.  Run checks.
4.  Review results.
5.  Fix problems.
6.  Document completion.
7.  Stop at the phase checkpoint.

------------------------------------------------------------------------

# 8. Phase 0 --- Environment Audit

Before coding:

-   Inspect runtime.
-   Inspect Node/npm availability.
-   Inspect framework support.
-   Inspect database availability.
-   Inspect deployment environment.
-   Inspect existing files.
-   Inspect installed packages.
-   Inspect source-control status if available.

Produce:

``` text
ENVIRONMENT-AUDIT.md
```

including:

-   Available capabilities
-   Missing capabilities
-   Risks
-   Recommended approach
-   Prototype limitations

Do not install large dependencies until necessary.

------------------------------------------------------------------------

# 9. Phase 1 --- Project Foundation

Create/verify:

-   Next.js application
-   TypeScript
-   Tailwind
-   ESLint
-   Basic folder structure
-   Environment configuration
-   README
-   Git-friendly structure

Success criteria:

-   Development server starts.
-   Production build can run where supported.
-   No critical TypeScript errors.
-   No unnecessary dependencies.

Checkpoint:

``` text
FOUNDATION-CHECKPOINT.md
```

------------------------------------------------------------------------

# 10. Phase 2 --- Design System

Implement:

-   Brand colors
-   Typography
-   Buttons
-   Cards
-   Forms
-   Navigation
-   Footer
-   Alerts
-   Spacing
-   Responsive rules
-   RTL/LTR foundations

Use the actual company logo supplied by the user.

Do not redesign the logo.

Do not invent a different brand identity.

Checkpoint:

``` text
DESIGN-CHECKPOINT.md
```

------------------------------------------------------------------------

# 11. Phase 3 --- Global Layout

Implement:

-   Header
-   Navigation
-   Language switcher
-   WhatsApp CTA
-   Footer
-   Contact information
-   Social links
-   Address
-   Working hours

Verify:

-   Arabic RTL
-   English LTR
-   Mobile navigation
-   Desktop navigation
-   Accessibility

Checkpoint:

``` text
LAYOUT-CHECKPOINT.md
```

------------------------------------------------------------------------

# 12. Phase 4 --- Public Pages

Build the approved public information architecture.

Priority:

1.  Home
2.  Services
3.  Flight request
4.  Hotel request
5.  Egypt tour programs
6.  Hajj
7.  Umrah
8.  Visas
9.  Egypt security approvals
10. Transportation
11. Contact

Do not add unnecessary standalone pages.

Where appropriate, combine information sections to keep the website
simple.

Checkpoint:

``` text
PUBLIC-PAGES-CHECKPOINT.md
```

------------------------------------------------------------------------

# 13. Phase 5 --- Public Forms

Build reusable forms.

Forms include:

-   General inquiry
-   Flight request
-   Hotel request
-   Tour/program request
-   Visa request
-   Egypt security approval request
-   Transportation request
-   Hajj request
-   Umrah request
-   Contact request

Requirements:

-   Arabic
-   English
-   Mobile friendly
-   Client validation
-   Server validation when backend exists
-   Notes field
-   Clear success message
-   Request reference when persistence exists

Do not create unnecessary fields.

------------------------------------------------------------------------

# 14. Phase 6 --- CMS and Database

Only implement this as real functionality when backend/database
infrastructure is available.

Implement:

-   PostgreSQL
-   Prisma
-   Migrations
-   Seed
-   CMS models
-   Services
-   Tours
-   Tour days
-   Hajj/Umrah programs
-   Visa countries
-   Security approval countries
-   Reviews
-   Media
-   Settings
-   Requests
-   Request events

All admin writes must be server-authorized.

Checkpoint:

``` text
CMS-DATABASE-CHECKPOINT.md
```

------------------------------------------------------------------------

# 15. Phase 7 --- Admin Panel

Implement the single-admin workflow.

Priority:

1.  Login
2.  Dashboard
3.  Requests
4.  Request details
5.  Status management
6.  CMS pages
7.  Services
8.  Tours
9.  Hajj/Umrah programs
10. Visa data
11. Security approval countries
12. Reviews
13. Media
14. Settings

Keep the interface simple.

The administrator should not need technical knowledge for routine
content changes.

Checkpoint:

``` text
ADMIN-CHECKPOINT.md
```

------------------------------------------------------------------------

# 16. Phase 8 --- Notifications

Implement:

-   Email notification
-   Optional customer confirmation email
-   WhatsApp integration architecture

Critical rule:

``` text
Save request first.
Notify second.
```

Email failure must never erase a saved request.

Checkpoint:

``` text
NOTIFICATIONS-CHECKPOINT.md
```

------------------------------------------------------------------------

# 17. Phase 9 --- SEO

Implement:

-   Metadata
-   Arabic/English titles
-   Descriptions
-   Canonical
-   Hreflang
-   Sitemap
-   Robots
-   Open Graph
-   Schema.org
-   Breadcrumbs where appropriate

Only publish truthful structured data.

Checkpoint:

``` text
SEO-CHECKPOINT.md
```

------------------------------------------------------------------------

# 18. Phase 10 --- Performance

Optimize:

-   Images
-   Fonts
-   JavaScript
-   CSS
-   Caching
-   Loading
-   Layout stability

Check:

-   LCP
-   INP
-   CLS

Do not add visual effects that materially harm performance.

Checkpoint:

``` text
PERFORMANCE-CHECKPOINT.md
```

------------------------------------------------------------------------

# 19. Phase 11 --- Security

Verify:

-   Authentication
-   Authorization
-   Validation
-   Rate limiting
-   CSRF where applicable
-   XSS protection
-   SQL injection protection
-   Upload validation
-   Secure cookies
-   Security headers
-   Secrets

Checkpoint:

``` text
SECURITY-CHECKPOINT.md
```

------------------------------------------------------------------------

# 20. Phase 12 --- Accessibility

Verify:

-   Keyboard navigation
-   Focus states
-   Form labels
-   Error messages
-   Contrast
-   Semantic HTML
-   RTL/LTR
-   Screen-reader-friendly controls
-   Mobile usability

Checkpoint:

``` text
ACCESSIBILITY-CHECKPOINT.md
```

------------------------------------------------------------------------

# 21. Phase 13 --- Testing

Run appropriate:

-   Type checking
-   Lint
-   Unit tests
-   Integration tests
-   End-to-end tests

At minimum verify:

### Public

-   Home
-   Language switch
-   Navigation
-   Each major request form

### Admin

-   Login
-   Requests
-   CMS editing
-   Publish/unpublish
-   Media
-   Settings

### Data

-   Request persistence
-   Reference generation
-   Validation
-   Notification failure handling

Checkpoint:

``` text
TESTING-CHECKPOINT.md
```

------------------------------------------------------------------------

# 22. Phase 14 --- Deployment Preparation

Prepare:

-   Production environment variables
-   Database migration
-   Build
-   HTTPS
-   Domain
-   Storage
-   Email
-   Backup
-   Monitoring
-   Error handling

Do not deploy production secrets into source code.

Checkpoint:

``` text
DEPLOYMENT-CHECKPOINT.md
```

------------------------------------------------------------------------

# 23. Phase 15 --- Final Audit

Before declaring the project complete, compare implementation against:

``` text
01–08
```

and this workflow.

Create:

``` text
FINAL-AUDIT.md
```

with:

``` text
Requirement
Status
Evidence/location
Notes
```

Use statuses:

``` text
PASS
PARTIAL
BLOCKED
NOT APPLICABLE
```

Do not mark an item PASS without evidence.

------------------------------------------------------------------------

# 24. Checkpoint Rule

At the end of every phase:

1.  Stop.
2.  Run available checks.
3.  Summarize what changed.
4.  List files changed.
5.  List tests performed.
6.  List known issues.
7.  State what is ready for review.
8.  Wait for approval before beginning the next major phase.

Do not automatically continue through all phases.

------------------------------------------------------------------------

# 25. Human Review Rule

The user is the business owner/reviewer.

Antigravity must not assume approval.

For major visual or business decisions:

``` text
Implement
→ Preview
→ Explain
→ Wait for approval
→ Continue
```

------------------------------------------------------------------------

# 26. Existing Work Protection

Before editing an existing file:

1.  Read it.
2.  Understand its purpose.
3.  Preserve working functionality.
4.  Make the smallest reasonable change.

Do not overwrite entire files merely because a cleaner implementation is
possible.

------------------------------------------------------------------------

# 27. Regression Protection

After major changes:

-   Re-run relevant tests.
-   Verify affected pages.
-   Verify previously working features.

If a change breaks an existing feature:

Fix the regression before continuing.

------------------------------------------------------------------------

# 28. Documentation Updates

When implementation changes architecture or behavior:

Update relevant documentation.

Do not allow the docs to describe a system that no longer matches the
code.

------------------------------------------------------------------------

# 29. Decision Log

Create:

``` text
docs/DECISIONS.md
```

Record important decisions:

-   Date
-   Decision
-   Reason
-   Alternatives considered
-   Impact

Do not record every tiny coding decision.

------------------------------------------------------------------------

# 30. Change Log

Maintain:

``` text
CHANGELOG.md
```

for meaningful project changes.

Use simple categories:

-   Added
-   Changed
-   Fixed
-   Security
-   Performance

------------------------------------------------------------------------

# 31. TODO Policy

Create:

``` text
docs/TODO.md
```

for deferred work.

Every TODO should state:

-   What
-   Why
-   Priority
-   Dependency/blocker if any

Do not silently leave important incomplete work.

------------------------------------------------------------------------

# 32. No Fake Data Policy

Demo content may be used only for development.

Clearly mark it:

``` text
is_demo = true
```

or equivalent.

Before production:

-   Remove demo requests
-   Remove fake customer data
-   Remove fake reviews
-   Remove fake claims

------------------------------------------------------------------------

# 33. Review Policy

The supplied user reviews may be added later through CMS.

Until genuine reviews are supplied:

-   Use clearly marked placeholders
-   Do not claim they are real customer testimonials
-   Do not create aggregate review schema from placeholders

------------------------------------------------------------------------

# 34. Content Policy

The company information provided by the user is authoritative.

Examples:

Company:

``` text
Egypt National Tours
```

Tagline:

``` text
Discover the Charm of Egypt
```

Experience statement:

``` text
Licensed since 1990 in Egypt & USA
```

Contact information must match the approved project data.

If information changes, update CMS/settings rather than hardcoding it
across pages.

------------------------------------------------------------------------

# 35. Contact Data Policy

Centralize:

-   WhatsApp
-   Phone
-   Landline
-   Email
-   Facebook
-   Address
-   Working hours
-   Google Maps

Do not duplicate contact details in dozens of components.

------------------------------------------------------------------------

# 36. Business Logic Policy

Business rules must be centralized.

Example:

``` text
request status values
tour publication status
CMS visibility
language availability
```

Do not duplicate these rules across frontend components.

------------------------------------------------------------------------

# 37. Naming Policy

Use clear English technical identifiers.

Examples:

``` text
FlightRequest
HotelRequest
TourRequest
VisaRequest
SecurityApprovalRequest
TransportationRequest
```

User-facing labels can be Arabic or English.

------------------------------------------------------------------------

# 38. Commit/Version Strategy

If Git is available:

Use small meaningful commits.

Examples:

``` text
feat: create public layout
feat: add flight request form
feat: add tour CMS
fix: correct Arabic RTL navigation
security: validate media uploads
perf: optimize hero images
```

Do not make one enormous commit after weeks of work.

------------------------------------------------------------------------

# 39. Backup Before Major Changes

Before major architectural changes:

-   Ensure source code is recoverable.
-   Commit or create a checkpoint if Git is available.
-   Do not destroy working versions.

------------------------------------------------------------------------

# 40. AI Behavior Rule

Antigravity must behave as:

``` text
Senior software engineer
+
UI/UX implementer
+
SEO engineer
+
security-conscious developer
```

But it must not behave as the business owner.

Business decisions remain with the user.

------------------------------------------------------------------------

# 41. Anti-Hallucination Rule

If information is not present in the project documents:

Do not invent it.

Use:

``` text
TODO / NEEDS USER INPUT
```

or ask the user.

Especially do not invent:

-   Prices
-   Legal claims
-   Licenses
-   Awards
-   Hotel policies
-   Airline schedules
-   Visa rules
-   Government requirements
-   Customer reviews

------------------------------------------------------------------------

# 42. External Research Rule

If current external information is required:

-   Identify it explicitly.
-   Do not silently assume it.
-   Prefer authoritative sources.
-   Record important external assumptions in `docs/DECISIONS.md`.

------------------------------------------------------------------------

# 43. API Availability Rule

If an external API is not configured:

Do not simulate live results as real data.

Use:

``` text
Integration pending
```

or development mock data clearly labeled as mock.

------------------------------------------------------------------------

# 44. Payment Rule

No payment system should be presented as operational until:

-   Provider selected
-   Credentials configured
-   Secure checkout implemented
-   Test completed
-   Production configuration completed

------------------------------------------------------------------------

# 45. Production Readiness Rule

Do not use the phrase:

``` text
Production ready
```

unless the final audit passes and all infrastructure dependencies are
actually configured.

------------------------------------------------------------------------

# 46. Phase Status File

Maintain:

``` text
docs/PROJECT-STATUS.md
```

Example:

``` text
Current Phase: 4
Status: Awaiting Review

Completed:
- ...

Blocked:
- ...

Next:
- ...
```

Update this after each checkpoint.

------------------------------------------------------------------------

# 47. User Review Package

At each major checkpoint, provide the user with:

1.  What was implemented.
2.  What changed.
3.  What can be visually reviewed.
4.  What tests passed.
5.  What remains.
6.  Any decisions needed.

Do not overwhelm the user with raw technical logs.

------------------------------------------------------------------------

# 48. Final Deliverables

At project completion deliver:

``` text
Source Code
Database Schema
Migrations
Seed
Documentation
Environment Example
README
CMS
Admin
Public Website
SEO configuration
Tests
Deployment instructions
```

The source must be usable by another developer.

------------------------------------------------------------------------

# 49. Master Prompt Preparation

Before generating the final Master Prompt, verify that:

-   Documents 01--09 exist.
-   All major business decisions are documented.
-   Technical architecture is documented.
-   CMS/data model is documented.
-   SEO/security requirements are documented.
-   Workflow is documented.
-   No major unresolved contradiction exists.

Only then create:

``` text
10-MASTER-PROMPT-FOR-ANTIGRAVITY.md
```

------------------------------------------------------------------------

# 50. Master Prompt Rule

The Master Prompt must not duplicate hundreds of pages of specifications
unnecessarily.

Instead it should:

1.  Identify the project.
2.  Tell Antigravity where the specifications are.
3.  Require reading them.
4.  Define authority/priority.
5.  Define workflow.
6.  Define checkpoints.
7.  Define prohibited behavior.
8.  Start the first approved phase.

This keeps the prompt maintainable while the `docs/` folder remains the
detailed source of truth.

------------------------------------------------------------------------

# 51. Final Instruction

When this workflow is activated, Antigravity should NOT immediately
build the entire Egypt National Tours website.

It must first:

``` text
READ
→ AUDIT
→ PLAN
→ IMPLEMENT PHASE
→ TEST
→ CHECKPOINT
→ WAIT FOR REVIEW
```

Then continue only after approval.

This is mandatory.
