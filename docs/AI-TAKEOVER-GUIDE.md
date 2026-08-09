# AI TAKEOVER & CONTINUITY GUIDE — EGYPT NATIONAL TOURS

> **IMPORTANT NOTICE FOR ANY FUTURE AI CODING AGENT OR DEVELOPER:**  
> **DO NOT RESTART THIS PROJECT.**  
> **DO NOT REBUILD PHASES 1 THROUGH 14.**  
> **DO NOT RE-ARCHITECT OR RE-DESIGN THE WEBSITE.**  
> This project has completed all 14 development and verification phases under explicit user authorization.

---

## 1. Handoff Baseline Summary

- **Project Name:** Egypt National Tours Website & CMS
- **Repository Path:** `e:\شغل\موقع سياحي\Egypt-National-Tours-Antigravity`
- **Completed Phases:** Phases 1 through 14 (Technical Foundation, Design System, Global Layout, Public Pages, Request Forms, Request Processing, Admin Auth, CMS Core, Content Management, SEO/Performance/Accessibility, Security Hardening, E2E Testing, Staging Audit, Final Handoff).
- **Latest Commit Hash:** `5fbd1b7`
- **Current Production Classification:** **PRODUCTION READY WITH DOCUMENTED LIMITATIONS**

---

## 2. Crucial Handoff Files to Read First

Before taking any action or writing code:
1. Read `docs/AI-DEVELOPMENT-LOG.md` (complete chronological development log).
2. Read `docs/FINAL-PRODUCTION-HANDOFF.md` (full project architecture and data flows).
3. Read `docs/PHASE-13-IMPLEMENTATION-AUDIT.md` (runtime readiness audit).
4. Read `docs/GO-LIVE-CHECKLIST.md` (pre-deployment and operational readiness).
5. Inspect `git status` and confirm clean working tree state.

---

## 3. Mandatory Inviolable Rules

1. **Sacred Logo Protection**: The official logo at `/assets/brand/logo-original.png` is sacred and must NEVER be recolored, drawn over, stretched, or replaced.
2. **Truthful Content Enforcement**: Never invent fake prices, customer reviews, awards, hotel guarantees, visa rules, flight schedules, or legal claims.
3. **Demo Reviews Isolation**: Reviews marked with `isDemo: true` are isolated from the public website to maintain truthfulness compliance.
4. **PostgreSQL Exclusivity**: PostgreSQL is the only target database (configured via Prisma ORM). Never switch to SQLite.
5. **Hotel & Flight Rules**:
   - Hotel Star Ratings: `3 Stars`, `4 Stars`, `5 Stars` ONLY.
   - Hotel Meal Plans: `Room Only`, `Breakfast`, `Half Board`, `Soft All Inclusive` ONLY.
   - Flight Trip Types: `One Way`, `Round Trip`, `Multi-City` (minimum 2 segments).
6. **Zero External Phase 15**: Do NOT invent artificial Phase 15 or Phase 16 phases. Any future work must be explicitly requested by the human project owner.

---

## 4. Primary Verification Commands

Run these standard commands to verify project health:
```bash
# Type check
npm run type-check

# Prisma schema validation
npx prisma validate

# Production build
npm run build
```
