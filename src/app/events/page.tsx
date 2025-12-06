import { events } from "@/data/events";
import { getListingsForEvent } from "@/data/tickets";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("he-IL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const activeEvents = events.filter((event) => {
  const eventDate = new Date(event.date);
  const now = new Date();
  return eventDate >= now;
});

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Marketplace – אירועים וכרטיסים</h1>
        <p className="text-sm text-slate-300">
          בחר אירוע כדי לראות כרטיסים יד שנייה למכירה. בהמשך נוסיף גם פרסום
          כרטיסים, רכישה אמיתית והגנת QR ביום האירוע בלבד.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {activeEvents.map((event) => {
          const ticketsForEvent = getListingsForEvent(event.id);
          const cheapest = ticketsForEvent.length
            ? Math.min(...ticketsForEvent.map((t) => t.price))
            : null;

          return (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold text-slate-100">
                        {event.title}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {event.venue} · {event.city}
                      </p>
                    </div>
                    <div className="text-xs text-sky-300">
                      {formatDate(event.date)}
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-xs text-slate-300">
                      {event.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-slate-400">
                      {ticketsForEvent.length
                        ? `${ticketsForEvent.length} כרטיסים זמינים`
                        : "אין כרטיסים זמינים כרגע"}
                    </span>
                    {cheapest && (
                      <span className="text-emerald-400 font-semibold">
                        החל מ־₪{cheapest.toLocaleString("he-IL")}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
