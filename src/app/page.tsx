import Link from "next/link";
import { events } from "@/data/events";

const eventsInDays = 30;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("he-IL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(dateStr: string) {
  const now = new Date();
  const d = new Date(dateStr);

  return (
    now.getFullYear() === d.getFullYear() &&
    now.getMonth() === d.getMonth() &&
    now.getDate() === d.getDate()
  );
}

function isSoon(dateStr: string, days = eventsInDays) {
  const now = Date.now();
  const d = new Date(dateStr).getTime();
  const diff = d - now;
  const limit = days * 24 * 60 * 60 * 1000;
  return diff > 0 && diff <= limit;
}

export default function HomePage() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const featuredEvents = sortedEvents.filter((event) => {
    return isToday(event.date) || isSoon(event.date, eventsInDays);
  }).slice(0, 5);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-8 md:px-10 md:py-12 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 md:max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              מרקטפלייס כרטיסים מאובטח – בלי רמאויות
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-slate-50">
              TicketMaster
              <span className="block text-lg md:text-2xl text-slate-300 mt-1">
                קונים ומוכרים כרטיסים להופעות, מסיבות והצגות – בראש שקט.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-300">
              אצלנו הכרטיס נשאר במערכת עד יום האירוע, ורק אז משוחרר QR
              לבעלים האחרון. ככה אי אפשר למכור את אותו כרטיס פעמיים, ואתה
              לא צריך לסמוך על צילום מסך בוואטסאפ.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                מצא כרטיסים לאירועים
              </Link>
              <Link
                href="/tickets/my"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:border-slate-500 transition"
              >
                נהל את הכרטיסים שלי
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                הגנת QR – משוחרר רק ביום האירוע
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                העברת בעלות דרך המערכת בלבד
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                היסטוריית כרטיסים לכל משתמש
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:w-100">
            <div className="w-82 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>היום במערכת</span>
                <span className="font-mono text-emerald-300">
                  {featuredEvents.length} אירועים חמים
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {featuredEvents.map((event) => {
                  const today = isToday(event.date);
                  const soon = isSoon(event.date, 3);
                  return (
                    <Link
                      href={`/events/${event.id}`}
                      key={event.id}
                      className="block rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-emerald-500/60 transition"
                    >
                      <div className="flex justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-slate-100 line-clamp-1">
                            {event.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {event.venue} · {event.city}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-[11px] text-slate-300">
                            {formatDate(event.date)}
                          </div>
                          {today && (
                            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-500/40">
                              היום
                            </span>
                          )}
                          {!today && soon && (
                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300 border border-amber-500/40">
                              בקרוב
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-[11px] text-slate-500 text-center">
                לחץ על אירוע כדי לראות כרטיסים למכירה
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* איך זה עובד */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-50">איך זה עובד?</h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
        {/* STEP 1 */}
        <div
          className="
            group relative overflow-hidden
            rounded-2xl border border-slate-800 bg-slate-900/70 
            p-4 space-y-2
            transition-all duration-300
            hover:border-emerald-400/70 hover:bg-slate-900
            hover:shadow-lg hover:shadow-emerald-500/20
            hover:-translate-y-1 hover:scale-[1.02]
          "
        >
          <div className="inline-block">
            <div
              className="
                text-slate-100 font-semibold
                transition-transform transition-colors duration-300
                group-hover:text-emerald-300 group-hover:scale-105
                origin-right
              "
            >
              1. קניית כרטיסים דרך המערכת
            </div>
          </div>
          <div className="inline-block">
            <p
              className="
                text-slate-300 text-xs leading-relaxed
                transition-transform transition-colors duration-300
                group-hover:text-emerald-200 group-hover:scale-105
                origin-right
              "
            >
              ניתן לרכוש כרטיסים דרך המקרטפלייס ריטייל או ישירות מהחברה המארגנת.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div
          className="
            group relative overflow-hidden
            rounded-2xl border border-slate-800 bg-slate-900/70 
            p-4 space-y-2
            transition-all duration-300
            hover:border-emerald-400/70 hover:bg-slate-900
            hover:shadow-lg hover:shadow-emerald-500/20
            hover:-translate-y-1 hover:scale-[1.02]
          "
        >
          <div className="inline-block">
            <div
              className="
                text-slate-100 font-semibold
                transition-transform transition-colors duration-300
                group-hover:text-emerald-300 group-hover:scale-105
                origin-right
              "
            >
              2. מוכרים בבטחה למישהו אחר
            </div>
          </div>
          <div className="inline-block">
            <p
              className="
                text-slate-300 text-xs leading-relaxed
                transition-transform transition-colors duration-300
                group-hover:text-emerald-200 group-hover:scale-105
                origin-right
              "
            >
              הכרטיס נשאר במערכת – בלי צילום מסך, בלי לשלוח QR ידנית. הבעלות
              עוברת דרך TicketMaster בלבד.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div
          className="
            group relative overflow-hidden
            rounded-2xl border border-slate-800 bg-slate-900/70 
            p-4 space-y-2
            transition-all duration-300
            hover:border-emerald-400/70 hover:bg-slate-900
            hover:shadow-lg hover:shadow-emerald-500/20
            hover:-translate-y-1 hover:scale-[1.02]
          "
        >
          <div className="inline-block">
            <div
              className="
                text-slate-100 font-semibold
                transition-transform transition-colors duration-300
                group-hover:text-emerald-300 group-hover:scale-105
                origin-right
              "
            >
              3. ביום האירוע – מקבלים QR
            </div>
          </div>
          <div className="inline-block">
            <p
              className="
                text-slate-300 text-xs leading-relaxed
                transition-transform transition-colors duration-300
                group-hover:text-emerald-200 group-hover:scale-105
                origin-right
              "
            >
              רק הבעלים האחרון של הכרטיס, ביום האירוע עצמו, מקבל QR פעיל. כך
              מונעים רמאויות ומכירה כפולה של אותו כרטיס.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* CTA תחתון */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1>
          הצטרפו עכשיו ל־TicketMaster ותיהנו מקנייה ומכירה של כרטיסים בראש שקט!
        </h1>
      </section>
    </div>
  );
}
