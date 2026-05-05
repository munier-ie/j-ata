import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Serverless-optimized Prisma client
// Connection pooling is critical for serverless environments

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var poolGlobal: Pool | undefined;
}

// Create connection pool (reuse across invocations)
export const pool =
  global.poolGlobal ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1, // Serverless functions should use minimal connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  global.poolGlobal = pool;
}

// Create Prisma client with pg adapter (reuse across invocations)
export const prisma =
  global.prismaGlobal ||
  new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV !== "production" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}
