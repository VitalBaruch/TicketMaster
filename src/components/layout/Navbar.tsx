"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthStatus } from "../auth/AuthStatus";

export function Navbar() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* לוגו */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-25 h-12 rounded-full overflow-hidden ring-1 ring-slate-700 group-hover:ring-emerald-400/60 transition-all duration-300 shadow-md shadow-emerald-500/10">
            <Image
              src="/logo.png"
              alt="TicketMaster Logo"
              fill
              className="
                object-cover 
                transition-transform duration-500 
                group-hover:scale-125
              "
            />
          </div>
          <span className="font-semibold text-lg text-slate-100 group-hover:text-emerald-300 transition">
            TicketMaster
          </span>
        </Link>

        {/* כפתורי הרשמה / התחברות */}
        <div className="flex items-center gap-3 text-sm">
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
