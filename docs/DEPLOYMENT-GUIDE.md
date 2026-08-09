# PRODUCTION & STAGING DEPLOYMENT GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Framework:** Next.js 16.3.0 (App Router)  
> **Deployment Status:** **READY FOR DEPLOYMENT (PLATFORM UNCONFIGURED)**  

---

## 1. Production Hosting Requirements

The application can be deployed to any modern Node.js 20+ hosting platform:
- **Vercel** *(Recommended for Next.js App Router)*
- **AWS Amplify / ECS / App Runner**
- **Railway / Render / Fly.io**
- **Docker Container / Self-Hosted VPS (Coolify, Nginx + PM2)**

---

## 2. Required Production Environment Variables

Configure the following environment variables in your hosting provider's dashboard:

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `DATABASE_URL` | Secret | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname?sslmode=require` |
| `AUTH_SECRET` | Secret | 64+ char random string for session HMAC signing | `c9f8a...random_secret` |
| `EMAIL_PROVIDER` | Public | Email provider adapter | `resend` |
| `EMAIL_PROVIDER_API_KEY` | Secret | Resend API secret key | `re_123456789_YourResendKey` |
| `EMAIL_NOTIFICATION_RECIPIENT` | Public | Request notification email recipient | `egypt_nationaltours@yahoo.com` |
| `NEXT_PUBLIC_SITE_URL` | Public | Live domain URL (used for SEO & canonicals) | `https://egyptnationaltours.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | WhatsApp phone number | `201063314240` |

---

## 3. Build & Deployment Commands

```bash
# 1. Install dependencies
npm install

# 2. Sync Prisma schema with production PostgreSQL
npx prisma db push

# 3. Build production bundle
npm run build

# 4. Start production server (Node.js runtime)
npm run start
```

---

## 4. Post-Deployment Verification Checklist

1. **Public Site Accessibility**:
   - Access `https://your-domain.com/ar` and `https://your-domain.com/en`.
   - Verify Cairo (Arabic) & Inter (English) font loading.
2. **Dynamic SEO Endpoints**:
   - Verify `https://your-domain.com/sitemap.xml` generates 44 routes.
   - Verify `https://your-domain.com/robots.txt` disallows `/admin/`.
3. **Request Submission & Notification Pipeline**:
   - Submit a test request on `/ar/request`.
   - Confirm reference `ENT-YYYY-XXXXXX` is displayed on `/ar/request/success/[reference]`.
   - Verify record in PostgreSQL `requests` table.
   - Verify notification email arrival at `egypt_nationaltours@yahoo.com`.
4. **Admin Panel Access**:
   - Access `https://your-domain.com/admin/login`.
   - Log in with admin credentials and verify session cookie `Secure` flag in HTTPS environment.
