import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { pbkdf2Sync, randomBytes } from 'crypto';

// Automatically load local environment variables from .env.local, fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

interface ConnectionSelection {
  connectionString: string | null;
  variableName: string | null;
  errorReason: string | null;
}

function getValidConnectionString(): ConnectionSelection {
  // Preferred connection priority for CLI seeding:
  // 1. DATABASE_URL_UNPOOLED (Direct PostgreSQL connection suitable for CLI/seeding)
  // 2. DATABASE_URL (Pooled connection)
  // 3. DATABASE_POSTGRES_URL_NON_POOLING
  // 4. DATABASE_POSTGRES_URL
  // 5. POSTGRES_URL
  const candidateKeys = [
    'DATABASE_URL_UNPOOLED',
    'DATABASE_URL',
    'DATABASE_POSTGRES_URL_NON_POOLING',
    'DATABASE_POSTGRES_URL',
    'POSTGRES_URL',
  ];

  for (const key of candidateKeys) {
    const val = process.env[key];
    if (val && typeof val === 'string') {
      const trimmed = val.trim();
      if (
        trimmed.length > 0 &&
        !trimmed.includes('placeholder') &&
        !trimmed.includes('[SENSITIVE]') &&
        (trimmed.startsWith('postgres://') || trimmed.startsWith('postgresql://'))
      ) {
        return {
          connectionString: trimmed,
          variableName: key,
          errorReason: null,
        };
      }
    }
  }

  // Check if any key was rejected due to [SENSITIVE] or placeholder for informative logging
  for (const key of candidateKeys) {
    const val = process.env[key];
    if (val && typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.includes('[SENSITIVE]')) {
        return {
          connectionString: null,
          variableName: key,
          errorReason: `The environment variable ${key} in .env.local contains "[SENSITIVE]". Vercel CLI requires authenticated login ('npx vercel login') before pulling production secrets into .env.local.`,
        };
      }
      if (trimmed.includes('placeholder')) {
        return {
          connectionString: null,
          variableName: key,
          errorReason: `The environment variable ${key} in .env.local contains local placeholder credentials.`,
        };
      }
    }
  }

  return {
    connectionString: null,
    variableName: null,
    errorReason: 'No valid PostgreSQL connection variable (DATABASE_URL_UNPOOLED, DATABASE_URL, etc.) starting with postgres:// or postgresql:// was found.',
  };
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
    console.log('[AdminSeed] To create or update the Admin user, run:');
    console.log('  $env:ADMIN_INITIAL_PASSWORD="YourSecretPassword"; npm run db:seed-admin');
    return;
  }

  const { connectionString, variableName, errorReason } = getValidConnectionString();

  if (!connectionString || !variableName) {
    console.error(`[AdminSeed] Error: ${errorReason}`);
    process.exit(1);
  }

  // Log ONLY the variable NAME, NEVER its value!
  console.log(`[AdminSeed] Using database connection from ${variableName}`);

  let prisma: PrismaClient | null = null;
  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  } catch (err: any) {
    console.error('[AdminSeed] Failed to instantiate PrismaClient with selected connection:', err?.message || err);
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
