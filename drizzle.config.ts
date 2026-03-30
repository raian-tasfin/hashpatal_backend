import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './libs/shared/src/db/schema.ts',
  out: './libs/shared/src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
    ssl: true,
  },
});
