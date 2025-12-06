"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // אפשר להעביר כאן פרופס ל-SessionProvider אם תרצה בעתיד
  return <SessionProvider>{children}</SessionProvider>;
}