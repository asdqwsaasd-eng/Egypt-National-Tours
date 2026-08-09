# FINAL GO-LIVE CHECKLIST — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Target Release:** Production Launch  

---

## 1. Pre-Deployment Configuration Checklist

- [ ] **Production Domain & SSL**: HTTPS certificate provisioned and enforced.
- [ ] **PostgreSQL Database**: Production PostgreSQL 15+ database instance created.
- [ ] **DATABASE_URL**: Production connection string added to environment variables.
- [ ] **AUTH_SECRET**: 64+ character random secret generated for session signing.
- [ ] **EMAIL_PROVIDER_API_KEY**: Live Resend API key provisioned and configured.
- [ ] **EMAIL_NOTIFICATION_RECIPIENT**: Verified as `egypt_nationaltours@yahoo.com`.
- [ ] **NEXT_PUBLIC_SITE_URL**: Configured to live domain (e.g. `https://egyptnationaltours.com`).
- [ ] **NEXT_PUBLIC_WHATSAPP_NUMBER**: Verified as `201063314240`.

---

## 2. Pre-Build Code & Schema Verification

- [ ] **TypeScript Type-Check**: `npm run type-check` (0 errors).
- [ ] **Prisma Schema Validation**: `npx prisma validate` (Schema valid).
- [ ] **Production Build**: `npm run build` (All 44 static/dynamic routes compiled cleanly).
- [ ] **Database Migration**: `npx prisma db push` executed on production PostgreSQL.

---

## 3. SEO & Internationalization Verification

- [ ] `/sitemap.xml` accessible and returns 44 valid URL entries.
- [ ] `/robots.txt` accessible and blocks `/admin/` and `/api/`.
- [ ] Canonical URLs specify `/ar` and `/en` prefixes correctly.
- [ ] Hreflang tags specify `ar`, `en`, and `x-default` alternates.
- [ ] Schema.org JSON-LD scripts (`TouristTrip`, `BreadcrumbList`, `TravelAgency`) present on tour and home pages.
- [ ] Arabic Cairo font and English Inter font loading with `display: "swap"`.
- [ ] Language Switcher preserves path during locale toggle (`/ar/...` <-> `/en/...`).

---

## 4. Security Verification

- [ ] HTTP Security Headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, HSTS) active.
- [ ] Session cookie `ent_admin_session` has `HttpOnly`, `Secure`, and `SameSite=Lax` flags.
- [ ] No `.env` or `.env.local` files tracked in Git repository.
- [ ] No API keys, passwords, or secrets exposed in `NEXT_PUBLIC_*` variables or client bundles.
- [ ] Unauthenticated access to `/admin/*` routes blocked by Edge Middleware (`middleware.ts`).

---

## 5. Post-Deployment Verification (Live Testing)

- [ ] Access public homepage in Arabic (`/ar`) and English (`/en`).
- [ ] Submit a live test request on `/ar/request`.
- [ ] Verify reference number `ENT-YYYY-XXXXXX` generated and displayed on success page.
- [ ] Verify notification email delivered to `egypt_nationaltours@yahoo.com`.
- [ ] Access `/admin/login`, log in with admin credentials, and verify request in CMS.
- [ ] Update request status to `contacted` and add an internal note.
