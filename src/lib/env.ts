/**
 * Environment Variables Validation
 * 
 * This file validates all required environment variables at application startup
 * to prevent runtime errors from missing or invalid configuration.
 * 
 * @module env
 */

import { z } from 'zod';

/**
 * Environment variable schema definition
 * Add new required environment variables here
 */
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database Configuration
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  
  // NextAuth Configuration (optional for now, required when implementing auth)
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  
  // Public Environment Variables
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  
  // Payment Gateway (optional for now)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  
  // Email Service (optional for now)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
});

/**
 * Validates environment variables against the schema
 * Throws an error if validation fails with detailed information
 */
function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(parsed.error.format(), null, 2));
    
    throw new Error(
      'Environment validation failed. Please check your .env file.\n' +
      'Missing or invalid variables: ' +
      Object.keys(parsed.error.flatten().fieldErrors).join(', ')
    );
  }

  return parsed.data;
}

/**
 * Validated and typed environment variables
 * Use this throughout the application instead of process.env
 * 
 * @example
 * ```typescript
 * import { env } from '@/lib/env';
 * 
 * const dbUrl = env.DATABASE_URL; // Type-safe and validated
 * ```
 */
export const env = validateEnv();

/**
 * Type-safe environment variable type
 */
export type Env = z.infer<typeof envSchema>;
