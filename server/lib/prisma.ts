import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || '';
const isPostgres = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://');

let prismaInstance: PrismaClient;
let poolInstance: any;

if (isPostgres) {
  // Create a PostgreSQL connection pool
  poolInstance = new Pool({
    connectionString: databaseUrl,
  });

  // Create the Prisma adapter and client
  const adapter = new PrismaPg(poolInstance);
  prismaInstance = new PrismaClient({ adapter });
} else {
  // SQLite local development fallback
  prismaInstance = new PrismaClient();
  // Safe mock pool with end() method to prevent Express graceful shutdown crashes
  poolInstance = {
    end: async () => {
      console.log('Local SQLite database connection closed.');
    }
  };
}

declare global {
  var prisma: PrismaClient | undefined;
  var pool: any;
}

export const prisma = globalThis.prisma || prismaInstance;
export const pool = globalThis.pool || poolInstance;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
  globalThis.pool = pool;
}

export default prisma;
