import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || '';

let prismaInstance: PrismaClient;
let poolInstance: any;

// Avoid crashing serverless containers on startup if DATABASE_URL is missing or empty
if (databaseUrl) {
  const isLocal = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1') || databaseUrl.includes('::1');
  poolInstance = new Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false }
  });
  const adapter = new PrismaPg(poolInstance);
  prismaInstance = new PrismaClient({ adapter });
} else {
  // Graceful fallback to standard client without pg adapter if connection string is missing
  prismaInstance = new PrismaClient();
  poolInstance = null;
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
