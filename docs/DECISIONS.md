# Project Decisions

Record important approved architecture/business decisions here.

---

## Decision 001 — Database Strategy (2026-08-08)
**Decision:** Use PostgreSQL from the beginning. No SQLite, even temporarily.
**Rationale:** User directive. Architecture and Prisma schema must target PostgreSQL.

## Decision 002 — Hotel Star Rating Options (2026-08-08)
**Decision:** Hotel form offers ONLY: 3 Stars, 4 Stars, 5 Stars.
**Rationale:** User directive. No Luxury, Premium, No Preference, or other options. Additional preferences go in Notes.

## Decision 003 — Hotel Meal Plan Options (2026-08-08)
**Decision:** Meal plan options: Room Only, Breakfast, Half Board, Soft All Inclusive.
**Rationale:** User directive. No separate "All Inclusive" option.

## Decision 004 — Flight Trip Types (2026-08-08)
**Decision:** Flight form supports: One Way, Round Trip, Multi-City. Multi-City approved for v1.
**Rationale:** User directive.

## Decision 005 — Working Hours (2026-08-08)
**Decision:** Sun–Thu 10:30 AM – 5:00 PM. Friday and Saturday closed. Online requests accepted outside hours.
**Rationale:** User directive resolving wording conflict between docs.

## Decision 006 — Custom Tour Request Form Fields (2026-08-08)
**Decision:** Fields: Full Name, Phone/WhatsApp, Email, Desired Destination/Program, Travel Date, Number of Travelers, Trip Duration, Trip Style, Hotel Preference, Notes. Non-essential preference fields optional.
**Rationale:** User directive — collect important details without unnecessary complexity.

## Decision 007 — Language Architecture (2026-08-08)
**Decision:** Arabic primary, English fully supported. RTL for Arabic, LTR for English, easy language switcher.
**Rationale:** User directive confirming spec.

## Decision 008 — General Content Principle (2026-08-08)
**Decision:** Never invent business info, prices, services, reviews, legal info, visa rules, hotel info, airline info, or customer data. Use docs as authoritative spec. Undefined requirements use sensible technical defaults only if they don't affect business, and must be documented.
**Rationale:** User directive.

## Decision 009 — Git Usage (2026-08-08)
**Decision:** Initialize Git, meaningful commits, never expose secrets/API keys/passwords/.env in Git.
**Rationale:** User directive. Git now installed on machine.

## Decision 010 — Tailwind CSS Version (2026-08-08)
**Decision:** Use Tailwind CSS v4 (latest, CSS-first config) with Next.js 16.
**Rationale:** Technical default — current standard in 2026, natively supported by Next.js 16. No business impact.
