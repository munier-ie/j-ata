import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL || '';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var poolGlobal: any | undefined;
}

let prismaInstance: PrismaClient;
let poolInstance: any;

// Create connection pool (reuse across serverless invocations)
poolInstance =
  global.poolGlobal ||
  new Pool({
    connectionString: databaseUrl,
    max: 1, // Serverless functions should use minimal connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  global.poolGlobal = poolInstance;
}

// Create Prisma client with pg adapter (reuse across invocations)
prismaInstance =
  global.prismaGlobal ||
  new PrismaClient({
    adapter: new PrismaPg(poolInstance),
    log: process.env.NODE_ENV !== "production" ? ["error", "warn"] : ["error"],
  });

export const pool = poolInstance;
export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
