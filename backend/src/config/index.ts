import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.number().default(3000),
  databaseUrl: z.string(),
  jwtSecret: z.string(),
  jwtExpiresIn: z.string().default('7d'),
  redisUrl: z.string(),
  corsOrigin: z.string(),
  stripeSecretKey: z.string(),
  stripeWebhookSecret: z.string(),
  googleCloudProjectId: z.string(),
  googleApplicationCredentials: z.string(),
  storageBucket: z.string(),
  smtpHost: z.string(),
  smtpPort: z.number(),
  smtpUser: z.string(),
  smtpPassword: z.string(),
  emailFrom: z.string().email(),
  rateLimitWindowMs: z.number(),
  rateLimitMaxRequests: z.number()
});

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
  redisUrl: process.env.REDIS_URL as string,
  corsOrigin: process.env.CORS_ORIGIN as string,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
  googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID as string,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS as string,
  storageBucket: process.env.STORAGE_BUCKET as string,
  smtpHost: process.env.SMTP_HOST as string,
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpUser: process.env.SMTP_USER as string,
  smtpPassword: process.env.SMTP_PASSWORD as string,
  emailFrom: process.env.EMAIL_FROM as string,
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
};

try {
  envSchema.parse(config);
} catch (error) {
  console.error('Invalid environment variables:', error);
  process.exit(1);
}

export default config;