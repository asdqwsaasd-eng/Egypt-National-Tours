import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

function createPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;

  // If DATABASE_URL is missing or a local placeholder, return null safely
  if (!connectionString || connectionString.includes('placeholder')) {
    return null;
  }

  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (err: any) {
    console.error('[Prisma] Failed to instantiate PrismaClient with Pg adapter:', err?.message || err);
    return null;
  }
}

export const prisma =
  globalForPrisma.prisma !== undefined ? globalForPrisma.prisma : createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Check whether a valid PostgreSQL connection can be established.
 */
export async function isDatabaseConnected(): Promise<boolean> {
  try {
    if (!prisma) {
      return false;
    }
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error: any) {
    console.error('[Prisma] DB connection check failed:', error?.message || error);
    return false;
  }
}
