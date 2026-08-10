# DATABASE CONFIGURATION & MAINTENANCE GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Production Database Provider:** Neon PostgreSQL (Vercel Integration)  
> **ORM:** Prisma 7.9.1  
> **Schema File:** `prisma/schema.prisma`  

---

## 1. Database Overview & Models

The application uses **Prisma 7** with **PostgreSQL**. The schema defines **21 relational models** organized into four functional domains:

### A. Customers & Requests Domain
- `Customer`: Customer profiles (`fullName`, `email`, `phone`, `whatsapp`, `nationalityId`, `residenceCountryId`).
- `Request`: Customer service requests with unique reference `ENT-YYYY-XXXXXX`, `status` (`new`, `contacted`, `in_progress`, `completed`, `cancelled`), `notificationStatus` (`pending`, `sent`, `failed`, `skipped_no_credentials`), and `detailsJson`.
- `RequestNote`: Internal administrative notes for a request.
- `RequestEvent`: Audit log history tracking status changes and timestamps.

### B. Catalog Domain (Tours, Services & Pilgrimage)
- `Service`: Service sectors (Flight, Hotel, Visa, Security Approvals, Transportation, Egypt Tours, International Tours, Hajj, Umrah, Custom Tours).
- `Tour`: Tour programs (`tourType`: `egypt` | `international`, titles, descriptions, duration, slug, status, `isFeatured`).
- `TourDestination`: Destinations associated with a tour.
- `TourDay`: Day-by-day itineraries for a tour program.
- `HajjProgram`: Hajj pilgrimage packages.
- `UmrahProgram`: Umrah pilgrimage packages.

### C. Reviews & Auxiliaries
- `Review`: Testimonials (`customerName`, `rating`, `reviewAr`, `reviewEn`, `isFeatured`, `isDemo`, `status`).
- `VisaDestination`: Visa country catalog.
- `Country`: ISO-3166 country catalog.
- `TransportationOption`: Vehicles & transfer options.
- `Media`: Media library files & metadata.

### D. System & Security
- `AdminUser`: Administrative CMS users (`email`, `passwordHash`, `displayName`, `role`, `isActive`).

---

## 2. Neon PostgreSQL & Vercel Configuration

Vercel provisions pooled and unpooled Neon connection environment variables automatically:

1. **Runtime Pooled Connection (`DATABASE_URL`)**:
   Used at runtime by `@prisma/client` in `lib/db/prisma.ts` for optimized serverless connection pooling via PgBouncer.

2. **CLI Direct Connection (`DATABASE_URL_UNPOOLED`)**:
   Used by Prisma CLI (`npx prisma db push`, `prisma.config.ts`) for executing DDL schema modifications directly against Neon without pooling conflicts.

---

## 3. Database Schema Synchronization

Since no raw SQL migration files exist in `prisma/migrations/`, schema synchronization is executed via:

```bash
# Push schema definitions to Neon PostgreSQL:
npx prisma db push
```

During production Vercel builds (`npm run build`), `package.json` executes `npx prisma db push` conditionally when a live non-placeholder `DATABASE_URL` is detected.

---

## 4. AdminUser Initial Provisioning

In production (`NODE_ENV === 'production'`), fallback hardcoded admin accounts are disabled in `lib/auth/actions.ts`. Admin authentication strictly requires a matching `AdminUser` row in PostgreSQL.

Password hashes must be generated using PBKDF2 (SHA-512 with 100,000 iterations) via `hashPassword(password)` from `lib/auth/password.ts`:

```ts
import { hashPassword } from '@/lib/auth/password';
const passwordHash = hashPassword('YourStrongPasswordHere');
```

---

## 5. Safe Offline Fallback Behavior

When `DATABASE_URL` is unconfigured or set to a placeholder:
- `isDatabaseConnected()` in `lib/db/prisma.ts` safely returns `false`.
- Public request submissions generate reference `ENT-YYYY-XXXXXX` and attempt email dispatch without crashing.
- Admin views render sample data fallbacks for UI inspection.
