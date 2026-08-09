# TROUBLESHOOTING GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  

---

## 1. Build & TypeScript Errors

### Error: `npm run type-check` fails with module or prop type errors
- **Cause**: Incompatible component prop variant or missing type definition.
- **Solution**:
  1. Inspect the reported line in the terminal output.
  2. Verify component props against design system exports (`components/ui/`).
  3. Ensure `Button` uses valid variants (`primary`, `secondary`, `ghost`, `whatsapp`).

### Error: `npm run build` fails during static page generation
- **Cause**: Unhandled dynamic parameter or missing i18n dictionary key.
- **Solution**:
  1. Run `npm run type-check` first to locate missing properties.
  2. Verify that `generateStaticParams()` returns valid `[{ locale: 'ar' }, { locale: 'en' }]`.

---

## 2. Database & Prisma Errors

### Error: `PrismaClientInitializationError: Can't reach database server`
- **Cause**: `DATABASE_URL` is set to placeholder string or PostgreSQL server is offline.
- **Solution**:
  1. Verify PostgreSQL service is running locally on port 5432 or on cloud provider.
  2. Verify credentials in `.env.local`: `postgresql://user:pass@localhost:5432/dbname`.
  3. Local UI development operates cleanly under safe offline fallback without throwing unhandled exceptions.

### Error: `PrismaClientValidationError` on model query
- **Cause**: Mismatched database column names or missing required field.
- **Solution**: Run `npx prisma validate` and `npx prisma generate` to sync Prisma client.

---

## 3. Email Notification Errors

### Log: `[EmailAdapter] SKIPPED (No API key in env)`
- **Cause**: `EMAIL_PROVIDER_API_KEY` is empty or unconfigured in `.env.local`.
- **Behavior**: System logs warning and returns `skipped_no_credentials` without crashing request submissions.
- **Solution**: Set a valid Resend API key in `.env.local`: `EMAIL_PROVIDER_API_KEY="re_..."`.

---

## 4. Admin Authentication & Session Errors

### Error: Admin login returns "Invalid credentials"
- **Cause**: Incorrect email or password submitted on `/admin/login`.
- **Solution**:
  - Use default credentials in development: `admin@egyptnationaltours.com` / `Admin@ENT2026`.
  - In production, reset `passwordHash` in `admin_users` table using `hashPassword()` in `lib/auth/password.ts`.

### Error: Session redirects to `/admin/login` immediately after login
- **Cause**: Missing `AUTH_SECRET` or domain mismatch in cookie security flags.
- **Solution**: Ensure `AUTH_SECRET` is set to a consistent 64+ character string in `.env.local`.
