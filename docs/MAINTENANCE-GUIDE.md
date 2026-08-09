# ROUTINE MAINTENANCE GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  

---

## 1. Maintenance Principles

- **Minimal Risk**: Never upgrade major framework versions (`Next.js`, `React`, `Prisma`) without prior verification in a staging environment.
- **Audit First**: Always run `npm run type-check` and `npm run build` after updating dependencies.
- **Preserve Sacred Assets**: The official logo at `/assets/brand/logo-original.png` and company constants in `lib/utils/constants.ts` must never be altered or replaced during maintenance.

---

## 2. Routine Maintenance Tasks

### Monthly Security Audit
```bash
# Audit installed packages for known security vulnerabilities
npm audit

# Apply minor patch fixes safely
npm audit fix
```

### Prisma Client & Database Maintenance
```bash
# Re-validate schema syntax
npx prisma validate

# Re-generate type-safe client
npx prisma generate
```

---

## 3. Maintenance Checklist Before Upgrades

- [ ] Take a full Git branch backup (`git checkout -b maintenance-upgrade`).
- [ ] Run `npm run type-check` to confirm 0 baseline errors.
- [ ] Run `npm run build` to confirm clean baseline compilation.
- [ ] Update packages incrementally.
- [ ] Test public routes (`/ar`, `/en`) and `/admin/login`.
- [ ] Re-run `npm run type-check` and `npm run build`.
