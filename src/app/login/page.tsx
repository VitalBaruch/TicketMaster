"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError("פרטי ההתחברות שגויים");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-xl font-bold text-center mb-2">
          התחברות ל-TicketMaster
        </h1>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="text-slate-200">
            אימייל
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
            defaultValue="demo@ticketmaster.test"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="text-slate-200">
            סיסמה
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
            defaultValue="123456"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-900/30 rounded-lg p-2">
            {error}
          </p>
        )}

        <button type="submit" className="w-full cursor-pointer px-4 py-2 rounded-xl border border-gray-300 
         bg-white text-gray-800 font-medium
         hover:bg-gray-100 hover:border-gray-400
         transition-all duration-200
         dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
         dark:hover:bg-gray-700 dark:hover:border-gray-500
         active:scale-95">התחבר</button>

        <p className="text-xs text-slate-400 text-center">
          ל-MVP, אפשר להיכנס עם:
          <br />
          demo@ticketmaster.test / 123456
        </p>
      </form>
    </div>
  );
}
