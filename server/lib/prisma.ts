import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || '';

let prismaInstance: PrismaClient;
let poolInstance: any;

// Create a PostgreSQL connection pool
const isLocal = !databaseUrl || databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1') || databaseUrl.includes('::1');

poolInstance = new Pool({
  connectionString: databaseUrl,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

// Create the Prisma adapter and client
const adapter = new PrismaPg(poolInstance);
prismaInstance = new PrismaClient({ adapter });

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
