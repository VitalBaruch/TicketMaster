"use client";

import { CROLE } from "@/generated/prisma/enums";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-xs text-slate-400">
        טוען נתוני משתמש...
      </span>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-4">
        <button
          className="
              rounded-full px-4 py-1.5
              bg-gradient-to-br from-slate-800 to-slate-900
              hover:from-emerald-600 hover:to-emerald-500
              text-slate-200 hover:text-slate-950
              transition-all duration-300
              border border-slate-700 hover:border-emerald-400
              shadow-sm hover:shadow-emerald-500/30 cursor-pointer
            "
          onClick={() => signIn(undefined, { callbackUrl: "/tickets/my" })}
        >
          התחבר
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <a href="/tickets/my" className="hover:text-emerald-300 hover:scale-105 transition duration-200">
          הכרטיסים שלי
        </a>
        { session.user.role === CROLE.ADMIN &&
          <a href="/tickets/manage" className="hover:text-blue-500 hover:scale-105 transition duration-200">
          ניהול כרטיסים   
          </a>
        }
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <span>שלום, {session.user.name ?? session.user.email}</span>
        <span>הרשאות: {session.user.role}</span>
        <button
          className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          התנתק
        </button>
      </div>
    </div>
  );
}