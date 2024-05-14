import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
    //Github
    GITHUB_SECRET: z.string(),
    GITHUB_ID: z.string(),
    NEXTAUTH_SECRET: z.string(),

    //stripe
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    RESEND_API_KEY: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
});
