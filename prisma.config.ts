import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local for local development if available
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/egypt_national_tours?schema=public",
  },
  migrations: {
    path: "prisma/migrations",
  },
});
