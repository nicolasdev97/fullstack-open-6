import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const result = await db
          .select()
          .from(users)
          .where(eq(users.username, credentials.username as string));

        const user = result[0];

        if (!user) {
          return null;
        }

        const passwordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!passwordCorrect) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});
