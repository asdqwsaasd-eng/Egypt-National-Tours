import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (err) {
    // Return dummy object if Prisma constructor fails when database URL is unconfigured placeholder
    return {} as PrismaClient;
  }
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma && 'adminUser' in prisma) {
  globalForPrisma.prisma = prisma;
}

/**
 * Check whether a valid PostgreSQL connection can be established.
 */
export async function isDatabaseConnected(): Promise<boolean> {
  try {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
      return false;
    }
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}
