import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // Map Better Auth singular user model to the existing users table.
    schema: {
      ...schema,
      user: schema.users,
    },
  }),
  advanced: {
    database: {
      // Preserve integer IDs used by documents and userProgress.
      generateId: "serial",
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3456",
});

export type Session = typeof auth.$Infer.Session;
