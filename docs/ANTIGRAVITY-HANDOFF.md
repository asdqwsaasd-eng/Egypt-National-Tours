# AI DEVELOPER HANDOFF DOCUMENTATION — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Repository Root:** `e:\شغل\موقع سياحي\Egypt-National-Tours-Antigravity`  
> **Document Date:** 2026-08-08  
> **Current Phase:** Phase 1 Complete — Awaiting Phase 2 Authorization  
> **Target Database:** PostgreSQL  
> **Author/Maintainer:** Google Antigravity AI Pair Programmer  

---

## 1. PROJECT OVERVIEW

### 1.1 Company & Purpose
Egypt National Tours (إيجيبت ناشيونال تورز) is an established tourism and travel agency licensed since 1990 in Egypt & USA. The purpose of this project is to build a high-performance, responsive, accessible, bilingual (Arabic RTL primary, English LTR secondary) lead-generation website and single-admin Content Management System (CMS).

**Core Business Model:**  
The website functions as a **lead-generation and quotation request system**, NOT an automated e-commerce or instant booking engine. Customers select and fill out specialized request forms for various travel services, which generate server-side reference numbers (`ENT-YYYY-XXXXXX`), persist in PostgreSQL, and send notifications to the company for manual follow-up.

### 1.2 Target Audience
- Foreign tourists and international travelers visiting Egypt.
- Egyptian customers seeking domestic travel or international travel packages.
- Families, solo travelers, couples/honeymooners, groups, and corporate clients.
- Clients seeking specific travel services: flights, hotels, visas, entry security approvals, Hajj/Umrah, tourist transportation.

### 1.3 Current Development Stage & Status
- **Current Phase:** **Phase 1 Complete** (Technical Foundation & Architecture).
- **Phase 1 Deliverables Completed:**
  - Next.js 16 + TypeScript (strict mode) + Tailwind CSS v4 setup.
  - Full i18n architecture (`/ar/` RTL primary, `/en/` LTR secondary) with translation dictionaries (`ar.json`, `en.json`), middleware routing, and dynamic metadata.
  - Complete 21-entity relational database schema in Prisma 7 targeting PostgreSQL.
  - Core utility contracts, centralized company constants, SEO Schema.org generator, and provider-agnostic storage/email interfaces.
  - Build, lint, and TypeScript validation verified (0 type errors, production build succeeds).
  - Git repository initialized and initial foundation committed.
- **What Has NOT Been Implemented Yet:**
  - Phase 2: Design System UI Components (Buttons, Cards, Form Controls, Modals, Badges).
  - Phase 3: Global Header, Footer, Navigation, and WhatsApp CTA.
  - Phase 4: Public pages & content layouts.
  - Phase 5: Interactive public request forms with validation.
  - Phase 6–8: CMS backend, admin dashboard, email notification dispatch.
  - Phase 9–14: Advanced SEO, performance tuning, security hardening, E2E testing, deployment.

---

## 2. SOURCE OF TRUTH

All AI agents and human developers MUST treat the files in the `docs/` directory as the connected, authoritative source of truth. Individual documents must NOT be read in isolation.

### Specification Map (`docs/`)

1. **`docs/01-project-master-specification.md`**: Master project vision, business requirements, services overview, design guidelines, and governance.
2. **`docs/02-sitemap-and-navigation.md`**: Complete sitemap, page hierarchies, URL strategies (`/ar/`, `/en/`), and user journeys.
3. **`docs/03-brand-ui-design-system.md`**: Visual identity, logo rules, color tokens (`#C91F2E`, `#F4C400`, etc.), typography (Cairo & Inter), component metrics, and anti-patterns.
4. **`docs/04-pages-and-content-specification.md`**: Functional breakdown of all public pages, section content blocks, form field requirements, reference number generation, and notification rules.
5. **`docs/05-cms-and-admin-panel-specification.md`**: Internal admin panel (`/admin`), single-admin authentication, request status workflow, CMS content modules, media library, and SEO management.
6. **`docs/06-database-and-data-architecture.md`**: Relational database architecture, 21 entities, UUID keys, JSONB dynamic details, audit logs, and data integrity policies.
7. **`docs/07-seo-performance-security-accessibility.md`**: Hreflang, Schema.org, sitemap.xml, robots.txt, performance budgets, Web Vitals, WCAG 2.2 AA accessibility, form reliability, and security policies.
8. **`docs/08-technical-architecture-and-technology-stack.md`**: Full-stack Next.js + TypeScript + Tailwind + PostgreSQL architecture, directory layout, provider adapters, API response formats, and test standards.
9. **`docs/09-implementation-roadmap-and-antigravity-workflow.md`**: 16-phase implementation roadmap (Phases 0–15), phase checkpoint protocol, approval gates, and anti-hallucination rules.
10. **`docs/10-master-prompt-for-antigravity.md`**: Master operational instruction for AI coding assistants.
11. **`docs/DECISIONS.md`**: Historical log of all user-approved final architecture and business decisions.
12. **`docs/ANTIGRAVITY-INITIAL-AUDIT.md`**: Phase 0 initial environment and requirements audit report.
13. **`docs/PHASE-1-IMPLEMENTATION-AUDIT.md`**: Phase 1 verification audit report.

---

## 3. FINAL APPROVED DECISIONS

The following decisions recorded in `docs/DECISIONS.md` are **FINAL and AUTHORITATIVE**. Future developers/AI agents MUST NOT alter these without explicit user authorization:

1. **Database Target:** Use **PostgreSQL** exclusively from the start. Do NOT use SQLite, even temporarily.
2. **Hotel Star Ratings:** The hotel request form must offer **ONLY: 3 Stars, 4 Stars, 5 Stars**. Do NOT add Luxury, Premium, No Preference, or any other star options. Additional preferences must be entered by customers in the Notes field.
3. **Hotel Meal Plans:** Available options are **ONLY: Room Only, Breakfast, Half Board, Soft All Inclusive**. Do NOT add a separate "All Inclusive" option.
4. **Flight Trip Types:** The flight form MUST support **One Way, Round Trip, Multi-City**. Multi-City is approved for v1.
5. **Office Working Hours:** Official office hours are **Sunday through Thursday: 10:30 AM – 5:00 PM** (Friday & Saturday Closed). Online requests are accepted outside office hours.
6. **Custom Tour Form Fields:** Fields collected are: Full Name, Phone/WhatsApp, Email, Desired Destination/Program, Travel Date, Number of Travelers, Trip Duration, Trip Style, Hotel Preference, Notes. Non-essential preferences remain optional.
7. **Language Strategy:** Arabic is the primary default language (`/ar/`, `dir="rtl"`). English is fully supported (`/en/`, `dir="ltr"`). Seamless language switcher preserving route context.
8. **Truthful Content Principle:** Never invent prices, offers, reviews, awards, visa rules, flight schedules, hotel info, or legal claims. Use only verified company facts.
9. **Git Usage:** Initialize Git, write meaningful commits, never commit secrets/API keys/`.env.local`.
10. **Tailwind CSS Version:** Use Tailwind CSS v4 (CSS-first `@theme` configuration).

---

## 4. TECHNICAL STACK & DEPENDENCIES

| Layer / Tool | Technology | Version / Configuration |
|---|---|---|
| **Framework** | Next.js (App Router) | `v16.3.0` |
| **Language** | TypeScript | `v7.0.2` (Strict mode enabled) |
| **UI Library** | React / React DOM | `v19.2.8` |
| **Styling** | Tailwind CSS | `v4.3.3` (via `@tailwindcss/postcss`) |
| **Database** | PostgreSQL | Targeted via Prisma 7.9.1 |
| **ORM** | Prisma | `v7.9.1` (`prisma.config.ts` + `prisma/schema.prisma`) |
| **Validation** | Zod | `v3.24.2` |
| **Utilities** | `clsx`, `tailwind-merge`, `dotenv` | Latest |
| **Fonts** | Cairo (Arabic) & Inter (English) | `next/font/google` |
| **Linting** | ESLint + eslint-config-next | `v10.8.1` / `v16.3.0` |
| **Version Control** | Git | Installed and initialized |

---

## 5. PROJECT STRUCTURE

```text
Egypt-National-Tours-Antigravity/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx         # Locale layout (lang, dir, fonts, SEO, Schema.org)
│   │   └── page.tsx           # Locale homepage foundation
│   ├── globals.css            # Tailwind CSS v4 @theme design tokens
│   ├── layout.tsx             # Root layout wrapper
│   ├── not-found.tsx          # Bilingual 404 error page
│   └── page.tsx               # Root redirect to /ar/
├── docs/                      # Authoritative specifications (01-10 + audits)
│   ├── 01-project-master-specification.md
│   ├── 02-sitemap-and-navigation.md
│   ├── 03-brand-ui-design-system.md
│   ├── 04-pages-and-content-specification.md
│   ├── 05-cms-and-admin-panel-specification.md
│   ├── 06-database-and-data-architecture.md
│   ├── 07-seo-performance-security-accessibility.md
│   ├── 08-technical-architecture-and-technology-stack.md
│   ├── 09-implementation-roadmap-and-antigravity-workflow.md
│   ├── 10-master-prompt-for-antigravity.md
│   ├── ANTIGRAVITY-INITIAL-AUDIT.md
│   ├── ANTIGRAVITY-HANDOFF.md  # THIS HANDOFF FILE
│   ├── DECISIONS.md
│   ├── PHASE-1-IMPLEMENTATION-AUDIT.md
│   ├── PROJECT-STATUS.md
│   └── TODO.md
├── lib/
│   ├── api/
│   │   └── types.ts           # Standardized API response wrappers
│   ├── email/
│   │   └── adapter.ts         # Email notification interface
│   ├── i18n/
│   │   ├── config.ts          # Locale configs (locales, defaultLocale, direction)
│   │   ├── dictionaries.ts    # Lazy translation loader
│   │   └── dictionaries/
│   │       ├── ar.json        # Arabic translation strings
│   │       └── en.json        # English translation strings
│   ├── seo/
│   │   └── metadata.ts        # Canonical, hreflang, Open Graph & Schema.org helpers
│   ├── storage/
│   │   └── adapter.ts         # Storage provider interface
│   ├── utils/
│   │   ├── cn.ts              # Classname merge utility (clsx + tailwind-merge)
│   │   ├── constants.ts       # Verified company contact & brand constants
│   │   └── fonts.ts           # Cairo & Inter next/font configurations
│   └── validation/
│       └── schemas.ts         # Domain types & enum validation contracts
├── prisma/
│   └── schema.prisma          # 21 PostgreSQL relational models
├── public/
│   └── assets/
│       ├── brand/
│       │   └── logo-original.png     # Official company logo (SACRED)
│       └── references/
│           └── security-approval-reference.jpg
├── .env.example               # Safe environment variable template
├── .env.local                 # Local secrets (Git ignored)
├── .gitignore                 # Excludes secrets, builds, node_modules
├── eslint.config.mjs          # ESLint flat configuration
├── middleware.ts              # Locale detection & URL prefixing middleware
├── next.config.ts             # Next.js image optimization settings
├── package.json               # Scripts & dependencies
├── postcss.config.mjs         # PostCSS config for Tailwind v4
├── prisma.config.ts           # Prisma 7 CLI configuration
└── tsconfig.json              # Strict TypeScript config
```

---

## 6. DATABASE ARCHITECTURE (POSTGRESQL & PRISMA 7)

### 6.1 Prisma 7 Setup
In Prisma 7, connection URLs are defined in `prisma.config.ts` using `dotenv/config`, while `prisma/schema.prisma` contains the datasource provider (`postgresql`) and models without a `url` property inside `datasource db`.

- **Schema Location:** `prisma/schema.prisma`
- **Config Location:** `prisma.config.ts`
- **Client Generation:** Run `npx prisma generate` (Client generated at `node_modules/@prisma/client`).

### 6.2 The 21 Logical Models
1. **`AdminUser`**: CMS administrator accounts (`email`, `passwordHash`, `role: admin`, `isActive`).
2. **`Customer`**: Unique customer records (`fullName`, `email`, `phone`, `whatsapp`, `preferredLanguage`, `nationalityCountryId`, `residenceCountryId`).
3. **`Service`**: 10 service categories (`serviceKey`, `titleAr/En`, `requestFormType`, `displayOrder`, `isFeatured`, `status`, `slug`).
4. **`Request`**: Service quote requests (`reference: ENT-YYYY-XXXXXX`, `customerId`, `serviceId`, `requestType`, `status`, `detailsJson`, `notificationStatus`).
5. **`RequestNote`**: Internal admin notes thread per request (`requestId`, `adminUserId`, `note`).
6. **`RequestEvent`**: Chronological audit trail for request status/field changes (`eventType`, `oldValue`, `newValue`).
7. **`Tour`**: Tour programs (`tourType: egypt|international`, `titleAr/En`, `durationText`, `price`, `slug`, `status`).
8. **`TourDestination`**: Key destinations within a tour.
9. **`TourDay`**: Day-by-day itinerary entries (`dayNumber`, `titleAr/En`, `descriptionAr/En`). Unique `[tourId, dayNumber]`.
10. **`TourGalleryItem`**: Gallery images attached to a tour (`mediaId`, `displayOrder`).
11. **`HajjProgram`**: CMS-managed Hajj packages (`titleAr/En`, `descriptionAr/En`, `price`, `isCurrent`, `status`).
12. **`UmrahProgram`**: CMS-managed Umrah packages (`titleAr/En`, `descriptionAr/En`, `price`, `isCurrent`, `status`).
13. **`VisaDestination`**: Supported visa country destinations (`countryId`, `titleAr/En`, `isActive`).
14. **`Country`**: Centralized ISO world country catalog (`iso2`, `iso3`, `nameAr/En`).
15. **`TransportationOption`**: Vehicle/service types (`key`, `titleAr/En`, `isActive`).
16. **`Review`**: Testimonials (`customerName`, `reviewAr/En`, `rating` 1-5, `isFeatured`, `isDemo`, `status`).
17. **`Media`**: Uploaded media asset metadata (`fileName`, `storageKey`, `mimeType`, `fileSize`, `width`, `height`, `altText`).
18. **`Page`**: CMS static pages (`pageKey`, `titleAr/En`, `contentAr/En`, `slug`, `status`).
19. **`SiteSettings`**: Global site settings singleton (`companyNameAr/En`, `footerTextAr/En`, logo/favicon references).
20. **`ContactSettings`**: Global contact info singleton (`whatsappNumber`, `phonePrimary`, `phoneSecondary`, `email`, `addressAr/En`, `workingHoursAr/En`).
21. **`SeoSettings`**: Global SEO configuration singleton (`siteTitleAr/En`, `defaultMetaDescription`, `robotsMode`, `organizationSchemaEnabled`).

### 6.3 Dynamic JSON Fields & Historical Snapshots
- Service-specific form payloads are stored in `Request.detailsJson` (JSONB) with server-side validation against schema types.
- Historical snapshots of tour/program details at the time of request submission MUST be saved inside `detailsJson` to preserve integrity if CMS entities are edited or archived later.

---

## 7. INTERNATIONALIZATION (i18n)

### 7.1 Language Architecture
- **Primary Default Language:** Arabic (`ar`), Route: `/ar/`, Text Direction: `dir="rtl"`, Font: `Cairo`.
- **Secondary Language:** English (`en`), Route: `/en/`, Text Direction: `dir="ltr"`, Font: `Inter`.
- **Routing:** Managed via `middleware.ts` which automatically prefixes un-localized paths to `/${defaultLocale}`.
- **Dynamic Routing:** All public pages sit under `app/[locale]/`. Layout applies `lang={locale}` and `dir={localeDirection[locale]}` dynamically.

### 7.2 Translation Dictionaries
- **Arabic Dictionary:** `lib/i18n/dictionaries/ar.json`
- **English Dictionary:** `lib/i18n/dictionaries/en.json`
- **Loader:** `getDictionary(locale)` in `lib/i18n/dictionaries.ts`.

### 7.3 Rules for Adding Translation Keys
1. **Synchronization:** Whenever a new key is added to `ar.json`, an identical key structure MUST be added to `en.json`.
2. **No Fallback Machine Translation:** Missing English translations must be flagged in CMS or dictionary review rather than generating silent machine translations on the public UI.
3. **CMS Entities:** Database models store bilingual columns explicitly (`titleAr` / `titleEn`, `descriptionAr` / `descriptionEn`).

---

## 8. BRAND AND DESIGN SYSTEM

### 8.1 Visual Concept
**"Elegant Egyptian Tourism — Luxury without excess."** Clean, modern, trustworthy design highlighting high-quality Egyptian imagery on light backgrounds (white, cream, sand) with dark charcoal body text.

### 8.2 Sacred Assets
- **Official Logo (`public/assets/brand/logo-original.png`):** Features a red pyramid with golden sun rays. **MUST NEVER be recolored, stretched, redrawn, or distorted.**

### 8.3 Design Tokens (Configured in `app/globals.css` via Tailwind v4 `@theme`)
- **Brand Red (Primary Accent):** `--color-brand-red: #C91F2E`
- **Brand Red Dark (Hover):** `--color-brand-red-dark: #A91522`
- **Brand Gold (Secondary Accent):** `--color-brand-gold: #F4C400`
- **Brand Gold Light (Highlight):** `--color-brand-gold-light: #FFF3B0`
- **Sand Background:** `--color-sand: #F7F1E5`
- **Cream Background:** `--color-cream: #FCFAF5`
- **Text Primary (Charcoal):** `--color-text-primary: #222222`
- **Text Secondary:** `--color-text-secondary: #626262`
- **Text Muted:** `--color-text-muted: #858585`
- **Border Light:** `--color-border: #E8E8E8`
- **Card Shadow:** `0 4px 20px rgba(0, 0, 0, 0.06)`
- **Border Radius:** Buttons (`10px`), Cards (`16px`), Form Inputs (`10px`), Images (`20px`).

### 8.4 Typography
- **Arabic Font:** `Cairo` (Weights: 400, 500, 600, 700).
- **English Font:** `Inter` (Weights: 400, 500, 600, 700).

---

## 9. APPROVED COMPANY DATA

The following facts centralized in `lib/utils/constants.ts` are verified and MUST NOT be altered or replaced with invented information:

```typescript
export const COMPANY = {
  name: { en: "Egypt National Tours", ar: "إيجيبت ناشيونال تورز" },
  tagline: { en: "Discover the Charm of Egypt", ar: "اكتشف سحر مصر" },
  license: { en: "Licensed since 1990 in Egypt & USA", ar: "مرخصة منذ عام 1990 في مصر والولايات المتحدة" }
};

export const CONTACT = {
  whatsapp: "00201063314240",
  whatsappLink: "https://wa.me/201063314240",
  phonePrimary: "0020224052937",
  phoneSecondary: "0020222637554",
  email: "egypt_nationaltours@yahoo.com",
  facebook: "https://www.facebook.com/EgyptNationalTours/",
  googleMaps: "https://share.google/x5xQDEnwcpAnw4NPq",
  address: {
    en: "152 El Tawfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt",
    ar: "152 عمارات التوفيق، شارع الطيران، مدينة نصر، القاهرة، مصر"
  },
  workingHours: {
    en: "Sunday – Thursday: 10:30 AM – 5:00 PM",
    ar: "الأحد – الخميس: 10:30 صباحاً – 5:00 مساءً"
  },
  offDays: {
    en: "Friday & Saturday: Closed",
    ar: "الجمعة والسبت: مغلق"
  }
};
```

---

## 10. ENVIRONMENT VARIABLES

Template file: `.env.example` (committed to Git).  
Local file: `.env.local` (Git ignored).

### Environment Variable Map
- `DATABASE_URL`: PostgreSQL connection string (Placeholder in `.env.example`).
- `AUTH_SECRET`: Secret key for session signing.
- `EMAIL_PROVIDER`: Transactional email service (`resend` default).
- `EMAIL_PROVIDER_API_KEY`: Email provider API key.
- `EMAIL_NOTIFICATION_RECIPIENT`: `egypt_nationaltours@yahoo.com`.
- `STORAGE_PROVIDER`: Storage provider (`local` / `s3` / `r2` / `supabase`).
- `NEXT_PUBLIC_SITE_URL`: Public base URL (`http://localhost:3000` in dev).
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: `201063314240`.

**CRITICAL RULE:** NEVER commit `.env`, `.env.local`, or any actual API keys, passwords, or DB connection strings to Git!

---

## 11. TESTING AND VERIFICATION RESULTS

The codebase has undergone full empirical validation:

1. **TypeScript Type Checking (`npm run type-check`)**: **PASSED** (0 errors).
2. **Prisma Schema Validation (`npx prisma validate`)**: **PASSED** (Schema valid 🚀).
3. **Prisma Client Generation (`npx prisma generate`)**: **PASSED** (Client v7.9.1 generated).
4. **Next.js Production Build (`npm run build`)**: **PASSED** (Compiled successfully, static pages generated for `/ar` and `/en`).
5. **Secrets & Security Audit**: **PASSED** (No secrets committed, `.gitignore` active).

---

## 12. GIT STATUS & REPOSITORY STATE

- **Git Repository:** Initialized.
- **Active Branch:** `master`
- **Commits Log:**
  - `0b4f7d8` — `feat: complete Phase 1 project foundation and architecture`
  - `d6b0df1` — `build: update tsconfig from Next.js build verification`
- **Status:** Clean working directory (`git status` clean).

---

## 13. CURRENT STATUS SUMMARY

Phase 1 (Technical Foundation & Architecture) is **100% COMPLETE**.

All core infrastructure, database schemas, styling tokens, localization engines, fonts, middleware, and build setups are operational and tested.

---

## 14. NEXT STEP: PHASE 2 — DESIGN SYSTEM COMPONENTS

The project is ready for **Phase 2: Design System UI Components**.

### Phase 2 Scope:
- Reusable UI Component library adhering to Document 03 tokens:
  - `Button` (Primary Brand Red, Secondary White/Red border, WhatsApp Green).
  - `Card` (Service Card, Tour Card, Review Card, Info Card).
  - `FormInputs` (Text Input, Select Dropdown, Date Picker, Textarea, Checkbox, Radio, Number Counter).
  - `Badge` / `Tag` (Status indicators, rating stars, duration badges).
  - `Alert` / `Toast` (Success confirmation, inline form error messages).
  - `Modal` / `Dialog` (Confirmation dialogs, preview overlays).
  - `Container` & `SectionHeader` (Consistent page layout wrappers).
- All components must support RTL & LTR layout mirroring seamlessly.

*Note: Phase 2 has NOT started yet. It awaits explicit user authorization.*

---

## 15. KNOWN LIMITATIONS & OPEN QUESTIONS

1. **Local PostgreSQL Database Instance:** Dev machine currently uses `.env.local` placeholder for database operations. A cloud PostgreSQL database (e.g., Supabase, Neon) or local PostgreSQL server must be connected when performing migrations (`npx prisma migrate dev`).
2. **Transactional Email Provider Credentials:** SMTP/Resend API keys will be configured in Phase 8 (Notifications).
3. **Media Storage Credentials:** Object storage credentials (R2/S3) will be configured when CMS upload features are built.
4. **Production Deployment Target:** Platform (e.g., Vercel + Neon) to be finalized in Phase 14.

---

## 16. MANDATORY DEVELOPMENT RULES FOR FUTURE AGENTS

1. **Obey Source of Truth:** Treat `docs/01` through `10` and `docs/DECISIONS.md` as non-negotiable specifications.
2. **Do Not Invent Business Information:** Never invent tour prices, hotel names, airline guarantees, visa rules, government approvals, or customer reviews.
3. **Preserve Database Target:** Maintain PostgreSQL as the target DB. Do NOT revert to SQLite.
4. **Enforce Form Rules:**
   - Hotel star ratings: ONLY 3, 4, 5 Stars.
   - Hotel meal plans: ONLY Room Only, Breakfast, Half Board, Soft All Inclusive.
   - Flight trip types: Support One Way, Round Trip, Multi-City.
5. **Synchronize i18n Keys:** Whenever adding a key to `ar.json`, add the exact structure to `en.json`.
6. **Protect Secrets:** Never commit `.env.local` or secret credentials to Git.
7. **Maintain Checkpoint Protocol:** At the end of every phase, STOP, run tests (`type-check`, `build`), document the result in a phase audit file, and WAIT for user approval before moving to the next phase.

---

## 17. HANDOFF VALIDATION SIGN-OFF

- [x] Read and verified all actual project files in workspace.
- [x] Verified build output, TypeScript status, and Prisma schema.
- [x] Confirmed zero discrepancies between code implementation and specifications.
- [x] Verified Phase 1 completion status.
- [x] Confirmed Phase 2 has NOT started.

**HANDOFF COMPLETE — READY FOR PHASE 2 AUTHORIZATION.**
