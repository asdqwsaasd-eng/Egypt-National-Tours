# BACKUP & DISASTER RECOVERY PROCEDURES — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  

---

## 1. Database Backup & Disaster Recovery

### Automated Daily Backups
It is recommended to schedule daily PostgreSQL dumps using `pg_dump` or managed database backups (e.g. AWS RDS automated snapshots, Supabase Point-in-time Recovery, Vercel Postgres backups).

### Manual Backup Command
To take an immediate snapshot of the production PostgreSQL database:
```bash
pg_dump -U postgres -h db.yourdomain.com -d egypt_national_tours -F c -b -v -f ent_prod_backup_$(date +%Y%m%d_%H%M%S).dump
```

### Restoration Command
To restore a snapshot to a new PostgreSQL instance:
```bash
# 1. Create clean target database
createdb -U postgres -h db.yourdomain.com egypt_national_tours_restored

# 2. Restore schema and data from dump file
pg_restore -U postgres -h db.yourdomain.com -d egypt_national_tours_restored -v ent_prod_backup_20260810_120000.dump
```
> **IMPORTANT:** Never restore directly over a live production database without taking a safety snapshot first.

---

## 2. Git Source Code Rollback

### Rollback to Last Verified Commit
If a deployment error occurs:
```bash
# View recent release commits
git log --oneline -n 5

# Revert to last verified release commit (e.g., e46a16f)
git checkout e46a16f
```

---

## 3. Environment Secrets Rotation Procedure

If `AUTH_SECRET` or `EMAIL_PROVIDER_API_KEY` is accidentally exposed:
1. Generate a new 64+ character random string for `AUTH_SECRET`.
2. Revoke the compromised API key in the Resend dashboard and generate a new key.
3. Update environment variables in hosting provider settings.
4. Redeploy the application. All existing admin sessions will safely expire and require logging in again.
