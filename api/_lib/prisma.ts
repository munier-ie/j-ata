import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Serverless-optimized Prisma client
// Connection pooling is critical for serverless environments

const databaseUrl = process.env.DATABASE_URL || '';
const isPostgres = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://');

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var poolGlobal: any | undefined;
}

let prismaInstance: PrismaClient;
let poolInstance: any;

if (isPostgres) {
  // Create connection pool (reuse across invocations)
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
} else {
  // SQLite local fallback
  poolInstance = {
    end: async () => {}
  };
  prismaInstance =
    global.prismaGlobal ||
    new PrismaClient({
      log: process.env.NODE_ENV !== "production" ? ["error", "warn"] : ["error"],
    });
}

export const pool = poolInstance;
export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
