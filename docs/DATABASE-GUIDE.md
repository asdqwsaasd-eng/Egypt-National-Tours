# DATABASE CONFIGURATION & MAINTENANCE GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Target Database:** PostgreSQL 15+  
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

## 2. Connecting & Migrating PostgreSQL

1. **Configure Environment Variable**:
   In `.env.local` or hosting provider settings:
   ```env
   DATABASE_URL="postgresql://username:password@hostname:5432/dbname?schema=public&sslmode=require"
   ```

2. **Validate Prisma Schema**:
   ```bash
   npx prisma validate
   ```

3. **Apply Database Migrations / Sync Schema**:
   ```bash
   # Development environment:
   npx prisma migrate dev --name init

   # Production / Staging environment:
   npx prisma db push
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

---

## 3. Safe Fallback Behavior

When `DATABASE_URL` is set to a local placeholder string or PostgreSQL is unreachable:
- `isDatabaseConnected()` in `lib/db/prisma.ts` safely catches connection errors.
- Public request submission (`submitRequestAction`) generates reference `ENT-YYYY-XXXXXX` and dispatches email notification without throwing unhandled exceptions.
- Admin listings (`app/admin/requests`) render sample data fallbacks to allow interface inspection during offline development.

---

## 4. Backup & Restore Procedures

### Database Dump (Backup)
```bash
pg_dump -U username -h hostname -d dbname -F c -b -v -f ent_backup_$(date +%Y%m%d).dump
```

### Database Restore
```bash
pg_restore -U username -h hostname -d dbname -v ent_backup_20260810.dump
```
> **CAUTION:** Never run destructive `pg_restore` or `prisma migrate reset` against production databases without verifying backup integrity first.
