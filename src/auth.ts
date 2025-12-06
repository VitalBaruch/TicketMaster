// src/auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        /**
         * פה נמצאת הלוגיקה שלך לבדוק אם המשתמש תקין.
         * ב-MVP אפשר לעשות בדיקה "קשיחה".
         * בעתיד: לבדוק ב-DB (Supabase / Prisma וכו').
         */

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // דוגמה פשוטה: יוזר אחד "קשיח"
        if (
          credentials.email === "demo@ticketmaster.test" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@ticketmaster.test",
          };
        }

        // אם לא מצאנו משתמש תקין:
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // נשתמש בדף לוגין מותאם משלנו
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

// כאן אנחנו יוצרים את כל ה-APIs של Auth.js מהקונפיג
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
