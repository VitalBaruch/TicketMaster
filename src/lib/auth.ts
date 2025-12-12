import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { CROLE } from "@/generated/prisma/enums";

// מרחיבים את טיפוס ה-session כדי לכלול role
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: CROLE;
    };
  }

  interface User {
    role?: CROLE | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: CROLE | null;
  }
}

// קונפיגורציה של Auth.js
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database", // משתמש בטבלת Session שלך
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async session({ session, user }) {
    if (!session.user) return session;
    return {
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role ?? CROLE.USER,
       },
      };
    },
  },
  pages: {
    // כרגע אפשר להשתמש בדפים הדיפולטיביים של Auth.js
    // אם תרצה בעתיד דף Login מותאם, נגדיר כאן
  },
});
