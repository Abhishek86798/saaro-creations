import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Improved type-safe global declaration
declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client with validated environment variables
export const prisma = global.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Store in global for development (hot reload support)
if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}