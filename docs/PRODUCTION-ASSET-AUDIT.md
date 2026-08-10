# PRODUCTION ASSET AUDIT — MISSING WEBSITE IMAGES

> **Date:** 2026-08-10  
> **Status:** AUDIT COMPLETE — DOCUMENTED FOR MANUAL ASSET PROVISIONING  
> **Project:** Egypt National Tours Website & CMS  
> **Target Environment:** Vercel Production Deployment  

---

## 1. Executive Summary

A comprehensive production asset audit was conducted across the entire repository to identify all local image and file references used by the public website, admin panel, and metadata configurations, comparing them against the actual contents of the `public/` directory.

### Key Audit Findings
1. **Sacred Brand Logo (`public/assets/brand/logo-original.png`)**: Intact (86.6 KB) and correctly displayed in `Header`, `Footer`, `MobileNav`, `AdminLayout`, `AdminLogin`, `AdminMedia`, and Schema.org metadata.
2. **Unreferenced Valid Asset (`public/assets/references/security-approval-reference.jpg`)**: Intact on disk (83.6 KB) but currently unhooked from the UI.
3. **Primary Missing Production Image (`/assets/references/cairo-tour-1.jpg`)**: Referenced by 5 critical UI locations (Homepage Hero + 4 Tour Programs in `lib/data/tours.ts`), but **missing from disk**, resulting in broken images on Vercel.
4. **Secondary Missing Admin Image (`/assets/hero/hero-bg.jpg`)**: Referenced in Admin Media Library (`/admin/media`), but missing from disk.

---

## 2. Inventory of Files under `public/`

| File Path | Size | Status | Notes |
|-----------|------|--------|-------|
| `public/assets/brand/logo-original.png` | 86.6 KB | **VALID** | Official Sacred Brand Logo. Rendered across 7 codebase locations. |
| `public/assets/references/security-approval-reference.jpg` | 83.6 KB | **VALID (UNHOOKED)** | Reference visual for security approval service. Exists on disk. |

---

## 3. Inventory of Referenced Image Paths in Codebase

| Referenced Path | Code Location(s) | Status on Disk | Display Result in Production |
|-----------------|------------------|----------------|------------------------------|
| `/assets/brand/logo-original.png` | `components/layout/Header.tsx`<br>`components/layout/Footer.tsx`<br>`components/layout/MobileNav.tsx`<br>`app/admin/layout.tsx`<br>`app/admin/login/page.tsx`<br>`app/admin/media/page.tsx`<br>`lib/seo/metadata.ts` | **EXISTS** | **PASS** (Renders correctly) |
| `/assets/references/cairo-tour-1.jpg` | `app/[locale]/page.tsx` (Hero Card)<br>`lib/data/tours.ts` (`cairo-classic`) <br>`lib/data/tours.ts` (`cairo-alexandria`) <br>`lib/data/tours.ts` (`nile-cruise-luxor-aswan`) <br>`lib/data/tours.ts` (`dubai-highlights`) | **MISSING** | **FAIL** (404 Broken Image on Vercel) |
| `/assets/hero/hero-bg.jpg` | `app/admin/media/page.tsx` (Media Item #2) | **MISSING** | **FAIL** (404 Broken Image in CMS) |

---

## 4. Affected Pages & Components

### Public Pages Affected by Missing `/assets/references/cairo-tour-1.jpg`
1. **Homepage (`/ar` & `/en`)**:
   - *Component*: Hero Section Image Card (`app/[locale]/page.tsx` line 85)
   - *User Impact*: Primary hero showcase card renders a broken image fallback box.
2. **Egypt Tours Listing (`/ar/egypt-tours` & `/en/egypt-tours`)**:
   - *Component*: `TourCard` (`components/ui/TourCard.tsx`)
   - *User Impact*: Renders broken thumbnail for 3 Egypt tour packages (`cairo-classic`, `cairo-alexandria`, `nile-cruise-luxor-aswan`).
3. **International Tours Listing (`/ar/international-tours` & `/en/international-tours`)**:
   - *Component*: `TourCard` (`components/ui/TourCard.tsx`)
   - *User Impact*: Renders broken thumbnail for `dubai-highlights`.
4. **Tour Detail Pages (`/ar/egypt-tours/[slug]` & `/ar/international-tours/[slug]`)**:
   - *Component*: Tour Detail Banner (`app/[locale]/egypt-tours/[slug]/page.tsx` line 66 & `app/[locale]/international-tours/[slug]/page.tsx` line 66)
   - *User Impact*: Hero banner image for all 4 tour detail pages renders a broken image box.

### Admin Pages Affected by Missing `/assets/hero/hero-bg.jpg`
1. **Admin Media Library (`/admin/media`)**:
   - *Component*: Media Item Card (`app/admin/media/page.tsx` line 19)
   - *User Impact*: Card item #2 displays broken thumbnail.

---

## 5. Duplicate Placeholder Usage Audit

Currently, `/assets/references/cairo-tour-1.jpg` is used as a single duplicate placeholder path across **5 distinct contexts**:
- Homepage Hero Card (General Egypt Tourism)
- Cairo Classic Tour (Pyramids & Museum)
- Cairo & Alexandria Tour (Mediterranean & Pyramids)
- Nile Cruise Tour (Luxor & Aswan Temples)
- Dubai Highlights Tour (Burj Khalifa & UAE Desert)

### Recommended Production Asset Structure
To eliminate duplicate placeholder reuse and provide high-quality visual representations, the following dedicated images should be supplied:

```
public/
└── assets/
    ├── brand/
    │   └── logo-original.png            (EXISTING — 86.6 KB)
    ├── hero/
    │   └── hero-bg.jpg                  (RECOMMENDED — 1920x1080 Pyramids/Cairo skyline)
    ├── references/
    │   ├── cairo-tour-1.jpg             (RECOMMENDED — 1200x800 Pyramids of Giza)
    │   └── security-approval-reference.jpg (EXISTING — 83.6 KB)
    └── tours/
        ├── cairo-classic.jpg            (RECOMMENDED — 1200x800 Giza Pyramids & Sphinx)
        ├── cairo-alexandria.jpg         (RECOMMENDED — 1200x800 Qaitbay Citadel & Sea)
        ├── nile-cruise.jpg              (RECOMMENDED — 1200x800 Nile Cruise Ship & Temple)
        └── dubai-highlights.jpg         (RECOMMENDED — 1200x800 Burj Khalifa & Desert)
```

---

## 6. Actionable Resolution Requirements for Owner

To resolve all missing images in production without altering code:

1. **Supply `public/assets/references/cairo-tour-1.jpg`**:
   - Place a high-resolution JPG image (minimum 1200x800px) showing Cairo/Pyramids at `public/assets/references/cairo-tour-1.jpg`.
2. **Supply `public/assets/hero/hero-bg.jpg`**:
   - Place a high-resolution JPG image (minimum 1920x1080px) at `public/assets/hero/hero-bg.jpg`.
3. **Commit & Push to GitHub**:
   - Commit the new image files and push to `origin/main` to trigger automatic Vercel redeployment.
