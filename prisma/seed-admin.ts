import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { pbkdf2Sync, randomBytes } from 'crypto';

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function createPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString || connectionString.includes('placeholder')) {
    return null;
  }

  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (err: any) {
    console.error('[AdminSeed] Failed to instantiate PrismaClient:', err?.message || err);
    return null;
  }
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'asdqwsaasd@gmail.com').trim().toLowerCase();
  const displayName = (process.env.ADMIN_DISPLAY_NAME || 'Hossam').trim();
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;

  console.log('--- EGYPT NATIONAL TOURS: ADMIN USER SEED TOOLING ---');
  console.log(`Target Admin Email: ${email}`);
  console.log(`Target Display Name: ${displayName}`);

  if (!initialPassword || initialPassword.trim().length === 0) {
    console.log('[AdminSeed] Status: ADMIN TOOLING READY — PASSWORD STILL REQUIRED');
    console.log('[AdminSeed] Notice: ADMIN_INITIAL_PASSWORD is not set in environment variables.');
    console.log('[AdminSeed] To create or update the production Admin user, run:');
    console.log('  $env:ADMIN_INITIAL_PASSWORD="YourSecretPassword"; npx tsx prisma/seed-admin.ts');
    return;
  }

  const prisma = createPrismaClient();
  if (!prisma) {
    console.error('[AdminSeed] Error: Database connection string (DATABASE_URL) is not available.');
    process.exit(1);
  }

  try {
    // Check if admin user already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`[AdminSeed] Admin user "${email}" already exists with ID: ${existingUser.id}`);
      console.log('[AdminSeed] Preserving existing password hash and ensuring isActive = true.');
      
      const updated = await prisma.adminUser.update({
        where: { email },
        data: {
          displayName,
          isActive: true,
        },
      });

      console.log(`[AdminSeed] Status: ALREADY EXISTS (Updated isActive = ${updated.isActive})`);
      return;
    }

    // Create new Admin user with hashed password
    const passwordHash = hashPassword(initialPassword.trim());
    const newUser = await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        displayName,
        role: 'admin',
        isActive: true,
      },
    });

    console.log(`[AdminSeed] Status: CREATED SUCCESSFULLY`);
    console.log(`[AdminSeed] Admin ID: ${newUser.id}`);
    console.log(`[AdminSeed] Email: ${newUser.email}`);
    console.log(`[AdminSeed] Role: ${newUser.role}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('[AdminSeed] Execution error:', e.message || e);
  process.exit(1);
});
