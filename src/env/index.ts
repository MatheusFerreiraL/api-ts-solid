import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const dotenv = envSchema.safeParse(process.env);

if (!dotenv.success) {
  console.error('🚫 Invalid environment variables', dotenv.error.format());
  throw new Error('Invalida environment variables');
}

export const env = dotenv.data;
