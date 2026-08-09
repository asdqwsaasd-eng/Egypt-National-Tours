# LOCAL DEVELOPMENT & SETUP GUIDE — EGYPT NATIONAL TOURS

> **Project:** Egypt National Tours Website & CMS  
> **Repository:** `e:\شغل\موقع سياحي\Egypt-National-Tours-Antigravity`  

---

## 1. Prerequisites

Ensure your local development workstation has the following installed:
- **Node.js**: `v20.0.0` or higher (LTS recommended)
- **npm**: `v10.0.0` or higher
- **Git**: `v2.40.0` or higher
- **PostgreSQL**: `v15.0` or higher (Optional for basic local UI development; required for live DB testing)

---

## 2. Installation Steps

1. **Clone or Open Repository**:
   ```bash
   cd e:\شغل\موقع سياحي\Egypt-National-Tours-Antigravity
   ```

2. **Install Project Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Note: For local UI development without PostgreSQL, default offline fallback handles database queries gracefully.*

4. **Validate Prisma Schema & Generate Client**:
   ```bash
   npx prisma validate
   npx prisma generate
   ```

---

## 3. Available npm Scripts

| Command | Action | Notes |
|---------|--------|-------|
| `npm run dev` | Start Next.js development server | Listens at `http://localhost:3000` |
| `npm run type-check` | Run TypeScript compiler check | Strict mode verification (`tsc --noEmit`) |
| `npm run build` | Generate production build | Compiles static & dynamic pages (44 routes) |
| `npm run start` | Start production server locally | Requires prior `npm run build` |
| `npx prisma validate` | Validate Prisma schema | Checks syntax of `prisma/schema.prisma` |
| `npx prisma db push` | Push Prisma schema to PostgreSQL | Syncs database tables with schema |
| `npx prisma studio` | Open Prisma database browser GUI | Interactive database management interface |

---

## 4. Local Development vs Production Build Testing

### Development Mode (`npm run dev`)
- Enables Fast Refresh and live code updates.
- Renders page updates instantly.
- Listens at `http://localhost:3000`.

### Production Build Mode (`npm run build && npm run start`)
- Compiles optimized JavaScript/CSS bundles using Next.js Turbopack.
- Validates static page generation, server action boundaries, and middleware redirects.
- Generates `/sitemap.xml` and `/robots.txt`.
