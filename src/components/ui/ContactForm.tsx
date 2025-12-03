"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // כאן בעתיד: שליחה אמיתית ל־API / Formspree
    setTimeout(() => {
      setStatus("sent");
    }, 600);
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4"
    >
      <h2 className="text-sm font-semibold mb-1">טופס יצירת קשר לדוגמה</h2>

      <div className="grid gap-2 text-sm">
        <label className="space-y-1">
          <span className="text-slate-200">שם מלא</span>
          <input
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
            name="name"
            required
          />
        </label>

        <label className="space-y-1">
          <span className="text-slate-200">אימייל</span>
          <input
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
            type="email"
            name="email"
            required
          />
        </label>

        <label className="space-y-1">
          <span className="text-slate-200">מה הרעיון שלך?</span>
          <textarea
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm min-h-[90px] outline-none focus:border-sky-500"
            name="message"
          />
        </label>
      </div>

      <Button type="submit">
        {status === "sending" ? "שולח..." : "שלח"}
      </Button>

      {status === "sent" && (
        <p className="text-xs text-emerald-400">נשלח בהצלחה (דמו) ✔️</p>
      )}
    </form>
  );
}
