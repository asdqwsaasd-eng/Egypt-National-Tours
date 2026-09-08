# AI DEVELOPMENT LOG — EGYPT NATIONAL TOURS

> **Purpose:** Live development handoff log enabling any AI coding agent to continue this project from the exact point where the current agent stops.  
> **Project:** Egypt National Tours Website & CMS  
> **Repository:** `e:\شغل\موقع سياحي\Egypt-National-Tours-Antigravity`  
> **Created:** 2026-08-09T22:24:00+03:00  
> **Last Updated:** 2026-09-09T02:14:00+03:00

---

## 1. PROJECT STATUS OVERVIEW

- **Project Name:** Egypt National Tours Website & CMS
- **Current Phase:** Production Vercel Blob OIDC + Presigned PUT URL Upload Architecture (**DEPLOYED — AWAITING REAL UPLOAD ACCEPTANCE TEST**)
- **Completed Phases:**
  - **Phase 0–20:** See archive above.
  - **Phase 21:** Stale Blob Connection Detection Bug Fix — COMPLETE (Approved)
  - **Phase 22:** OIDC + Presigned PUT URL Upload Architecture Migration — DEPLOYED

---

## 2. PHASE 22 — OIDC PRESIGNED PUT ARCHITECTURE

### Root Cause: Why `handleUpload` Failed
`handleUpload` from `@vercel/blob/client` generates a short-lived client upload token by making a call to the Vercel Blob control-plane API. This API call requires a **read-write token** (`BLOB_READ_WRITE_TOKEN`) to be present on the server. Our project was connected via the new **Vercel OIDC flow**, which does NOT inject a long-lived `BLOB_READ_WRITE_TOKEN`. The server could not retrieve a client token, and the browser received `"Vercel Blob: Failed to retrieve the client token"`.

### Old Flow Removed
- `upload(name, file, { handleUploadUrl })` from `@vercel/blob/client` → REMOVED from `AdminMediaPicker.tsx`
- `handleUpload(...)` from `@vercel/blob/client` → REMOVED from `/api/admin/media/upload/route.ts`

### New OIDC Presigned PUT Flow

```
Browser
  → POST /api/admin/media/presign  (Admin-authenticated JSON request, sends filename/type/size only)
  → Server: getAdminSession() → MIME/size validation → safe pathname
  → Server: issueSignedToken({ pathname, operations:['put'], allowedContentTypes, maximumSizeInBytes, validUntil })
  → Server: presignUrl(signedToken, { access:'public', operation:'put', pathname, ... })
  → Server returns: { presignedUrl, pathname }

Browser
  → XMLHttpRequest PUT presignedUrl  (raw binary file bytes, 0 through Next.js functions)
  → xhr.upload.onprogress → real % display (0–95%)

Browser
  → POST /api/admin/media/complete  (Admin-authenticated, sends safe metadata only)
  → Server: getAdminSession() → head(pathname) from @vercel/blob SDK via OIDC
  → Server: verifies Blob EXISTS and obtains authoritative URL
  → Server: registerMediaRecord() idempotently (findFirst check)
  → Server returns: { success:true, media:{ storageKey, fileName, ... } }

Browser
  → onSelect(media.storageKey)
  → fetchLibrary() refreshes /admin/media
```

### Current SDK Methods Used (verified from `@vercel/blob@2.8.0`)
| Function | Module | Purpose |
|---|---|---|
| `issueSignedToken()` | `@vercel/blob` | Generate OIDC-scoped signed token via Blob control API |
| `presignUrl()` | `@vercel/blob` | Build a presigned PUT URL from signed token |
| `head()` | `@vercel/blob` | Verify Blob exists after upload completes |
| `del()` | `@vercel/blob` | OIDC-authenticated deletion (safe-delete, reference-checked) |

### Security Enforcement (Server-Level)
- **Authentication**: `getAdminSession()` required on both `/presign` and `/complete`.
- **MIME**: `['image/jpeg','image/png','image/webp']` enforced in `issueSignedToken`.
- **Size**: `maximumSizeInBytes: 8 * 1024 * 1024` enforced in `issueSignedToken`.
- **Expiry**: `validUntil: Date.now() + 10 * 60 * 1000` (10-minute token expiry).
- **Pathname**: Server-generated `egypt-national-tours/media/YYYY/MM/<uuid>-<sanitized>`.
- **No overwrite** by default.

### Client UX Validation (Browser-Level Only)
- Minimum dimensions: `800×450 px`
- Maximum dimensions: `6000×6000 px`
- Tour Cover aspect ratio: 16:9 (warning if outside 1.4–2.0 ratio)

### Idempotency
- `registerMediaRecord()` in `lib/db/media-repository.ts` performs `findFirst({ where: { storageKey } })` before `create`.
- **No DB-level UNIQUE constraint** exists on `Media.storageKey` in the Prisma schema. Protection is application-level only.

---

## 3. CONNECTED BLOB STORE

- **Store Name**: `egypt-national-tours-blob`
- **Access**: Public
- **Region**: Frankfurt, Germany (`fra1`)
- **Auth**: Vercel OIDC (new connection flow — `BLOB_STORE_ID` + `BLOB_WEBHOOK_PUBLIC_KEY` injected, **NO** `BLOB_READ_WRITE_TOKEN`)

---

## 4. NEXT STEPS FOR CONTINUATION

- **Immediate Action**: Perform REAL production browser upload test at `/admin/media` to confirm OIDC presigned PUT flow works end-to-end.
- If successful → update this log with "PRODUCTION OIDC PRESIGNED MEDIA UPLOAD VERIFIED".
- Then → test attaching a Blob image as cover photo on `cms-draft-test-2026` (Draft status preserved).
- **Environment**: Next.js 16 (App Router), Tailwind CSS v4, Prisma v7 (`@prisma/client`), Neon PostgreSQL, Vercel Production, `@vercel/blob@2.8.0`.

---

# STOP POINT

DEPLOYED — AWAITING PRODUCTION ACCEPTANCE TEST.

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   PHASE 22: OIDC PRESIGNED PUT ARCHITECTURE DEPLOYED              ║
║                                                                   ║
║   TypeScript: PASSED (0 errors)                                   ║
║   Build: PASSED (51 routes compiled)                              ║
║   Commit: (see below)                                             ║
║                                                                   ║
║   🔴 AWAITING: Real production browser upload acceptance test     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```
