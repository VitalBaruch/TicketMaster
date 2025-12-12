// src/app/tickets/manage/page.tsx
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TicketsManager } from "@/components/tickets/TicketManager";

export default async function ManageTicketsPage() {
  const session = await auth();

  if (!session?.user) {
    // לא מחובר – מפנים לעמוד התחברות
    redirect("/api/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    // מחובר אבל לא אדמין – חוסמים
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-red-400">
        אין לך הרשאה לצפות בעמוד זה.
      </div>
    );
  }

  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-slate-50 mb-2">
        ניהול כרטיסים ואירועים
      </h1>
      <p className="text-sm text-slate-300">
        כאן ניתן להוסיף אירועים חדשים וליצור כרטיסים קשורים אליהם.
      </p>

      <TicketsManager events={events} />
    </div>
  );
}
