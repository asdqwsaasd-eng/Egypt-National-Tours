# EGYPT NATIONAL TOURS — FINAL PRODUCTION HANDOFF & ARCHITECTURE DOCUMENTATION

> **Project:** Egypt National Tours Website & CMS  
> **Status:** **PRODUCTION READY WITH DOCUMENTED LIMITATIONS**  
> **Created:** 2026-08-10  
> **Author:** Antigravity AI Engineering Team  

---

## 1. Executive Project Overview

The **Egypt National Tours Website & CMS** is a production-grade, bilingual (Arabic & English) travel portal and content management system for Egypt National Tours (founded 1990 in Egypt & USA, License No. 709).

The application comprises:
- **Public Customer Website**: Responsive, accessible (WCAG 2.2 AA), bilingual travel portal featuring Egypt Nile Cruises, Domestic Tours, International Vacations, Hajj & Umrah Packages, Flight & Hotel Bookings, Visas, Security Approvals, and Transportation.
- **Universal Interactive Request Engine**: 11 customized request forms with server-side Zod validation, automatic reference generation (`ENT-YYYY-XXXXXX`), PostgreSQL transaction persistence, and instant HTML email notification dispatch to `egypt_nationaltours@yahoo.com`.
- **Administrative CMS Panel (`/admin`)**: Protected management portal for viewing customer requests, managing status transitions (`new` -> `contacted` -> `in_progress` -> `completed`), logging audit events (`RequestEvent`), recording internal notes (`RequestNote`), and editing Tours, Services, and Reviews.

---

## 2. Technology Stack

| Layer | Technology / Package | Purpose |
|-------|----------------------|---------|
| **Core Framework** | Next.js 16.3.0 (App Router, Turbopack) | Server Components, Edge Middleware, Static Site Generation |
| **Language** | TypeScript 5.8 (Strict Mode) | Full type safety across components, actions, schemas |
| **Styling** | Vanilla CSS + Tailwind CSS v4 | Custom design system variables, glassmorphism, responsive RTL/LTR |
| **Icons** | Lucide React | Modern UI iconography |
| **Typography** | `next/font/google` (Cairo & Inter) | Cairo (Arabic) & Inter (English) with `display: "swap"` |
| **Database ORM** | Prisma 7.9.1 | 21 PostgreSQL entities, type-safe queries, migration support |
| **Target Database** | PostgreSQL 15+ | Relational data persistence, indexed foreign keys, UUID primary keys |
| **Validation** | Zod 3.24 | Schema-driven validation on client and server actions |
| **Authentication** | Custom Web Crypto HMAC + PBKDF2 | Zero-dependency Edge-compatible signed session cookies |
| **Email Service** | Resend API / Nodemailer Adapter | Async HTML email notifications with HTML escaping |

---

## 3. Directory & File Structure

```
├── app/
│   ├── [locale]/             # Locale-routed public website (/ar & /en)
│   │   ├── about-contact/    # About Us & Contact Details
│   │   ├── egypt-tours/      # Nile Cruises & Domestic Tours
│   │   ├── hajj-umrah/       # Hajj & Umrah Pilgrimage Packages
│   │   ├── international-tours/# International Outbound Vacations
│   │   ├── request/          # Universal Service Request Center
│   │   └── services/         # 10 Approved Service Sector Pages
│   ├── admin/                # Protected Admin Panel & CMS Pages
│   │   ├── hajj-umrah/
│   │   ├── login/            # Arabic-first Admin Login
│   │   ├── media/
│   │   ├── requests/         # Customer Request Management & Details
│   │   ├── reviews/          # Customer Reviews CMS & Moderation
│   │   ├── services/         # Services CMS & Display Order
│   │   ├── settings/
│   │   └── tours/            # Tour Programs CMS & Day-by-Day Itineraries
│   ├── favicon.ico
│   ├── globals.css           # Design Tokens, Color Palette, Glassmorphism
│   ├── robots.ts             # Dynamic /robots.txt Generator
│   └── sitemap.ts            # Dynamic /sitemap.xml Generator (44 routes)
├── components/
│   ├── forms/                # Request Forms (Zod + React Hook Form)
│   ├── layout/               # Header, DesktopNav, MobileNav, Footer, Breadcrumbs, WhatsApp
│   ├── seo/                  # JSON-LD Schema Components
│   └── ui/                   # Design System UI Components (Button, Card, Badge, TextInput, etc.)
├── docs/                     # Full Technical Audit & Operational Guides
├── lib/
│   ├── actions/              # Server Actions (Request, Admin, Tour, Service, Review)
│   ├── auth/                 # Web Crypto Session Token & PBKDF2 Password Hashing
│   ├── data/                 # Static Fallback Catalogs (Tours, Services, Reviews)
│   ├── db/                   # Prisma Client Singleton & Request Repository
│   ├── email/                # Email Adapter & Resend API Notification Service
│   ├── i18n/                 # Dictionaries (ar.json & en.json) & Locale Configuration
│   ├── seo/                  # Metadata Generators & Schema.org JSON-LD Helpers
│   ├── utils/                # Constants, CN Utility, Fonts
│   └── validation/           # Zod Validation Schemas
├── prisma/
│   └── schema.prisma         # 21 PostgreSQL Entity Models
├── middleware.ts             # Edge Middleware Admin Security Guard & i18n Redirect
├── next.config.ts            # Image Formats & Security Headers
└── package.json
```

---

## 4. Key Architectural Patterns

### A. Locale Routing & Language Switching
- Next.js App Router uses `/[locale]/...` where `locale` is `ar` or `en`.
- `middleware.ts` redirects un-prefixed public routes to `/${defaultLocale}` (`/ar`).
- `components/layout/LanguageSwitcher.tsx` toggles between `/ar/...` and `/en/...` preserving the exact route segments and query parameters.
- Fonts are automatically applied based on locale (`Cairo` for Arabic, `Inter` for English).

### B. Admin Session & Middleware Security
- Admin routes (`/admin/*`) are protected by Edge middleware in `middleware.ts`.
- Sessions are stored in HTTP-Only, `Secure` (production), `SameSite=Lax` cookies named `ent_admin_session`.
- Tokens are signed with Web Crypto HMAC-SHA256 and verified using `constantTimeCompare()` to prevent timing side-channel attacks.
- Unauthenticated access to `/admin` routes automatically redirects to `/admin/login`.

### C. Request Submission & Notification Pipeline
1. Client submits form data to `submitRequestAction()` in `lib/actions/request-actions.ts`.
2. Zod validates payload on the server side using schemas in `lib/validation/forms.ts`.
3. `saveRequestToDatabase()` generates reference `ENT-YYYY-XXXXXX` and persists `Customer`, `Service`, and `Request` in a Prisma transaction.
4. `emailNotificationService.sendRequestNotification()` dispatches HTML email alert with HTML escaping (`escapeHtml`) to `EMAIL_NOTIFICATION_RECIPIENT`.
5. Success response with reference is returned to the client and displayed on `/request/success/[reference]`.

---

## 5. Truthfulness & Content Compliance Rules

1. **Logo Protection**: The official logo at `/assets/brand/logo-original.png` is sacred and must never be recolored, stretched, or replaced.
2. **No Invented Claims**: Never invent prices, fake reviews, awards, hotel guarantees, visa rules, or government claims.
3. **Demo Reviews Isolation**: Reviews marked with `isDemo: true` are isolated in the database/CMS and never displayed on public production routes as real customer testimonials.
