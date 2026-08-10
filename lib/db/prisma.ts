import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (err: any) {
    console.error('[Prisma] Failed to instantiate PrismaClient:', err?.message || err);
    
    // Return a safe Proxy fallback so offline builds don't crash with TypeErrors on dummy calls
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (prop === '$queryRaw' || prop === '$transaction' || prop === '$executeRaw') {
          return async () => {
            throw new Error('PRISMA_CLIENT_NOT_INITIALIZED');
          };
        }
        return new Proxy({}, {
          get() {
            return async () => {
              throw new Error('PRISMA_CLIENT_NOT_INITIALIZED');
            };
          },
        });
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

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
  } catch (error: any) {
    console.error('[Prisma] DB connection check failed:', error?.message || error);
    return false;
  }
}
