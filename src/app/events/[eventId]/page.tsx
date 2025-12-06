import { notFound } from "next/navigation";
import { getEventById } from "@/data/events";
import { getListingsForEvent } from "@/data/tickets";
import { TicketCard } from "@/components/tickets/TicketCard";

type Props = {
  params: 
    Promise<{eventId: string;}>;
};

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

export default async function EventDetailsPage({ params }: Props) {
  const { eventId } = await params;
  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  const tickets = getListingsForEvent(event!.id);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs text-slate-400">
          <a href="/events" className="hover:text-slate-200">
            ← חזרה לרשימת אירועים
          </a>
        </p>
        <h1 className="text-2xl font-bold text-slate-100">{event!.title}</h1>
        <p className="text-sm text-slate-300">
          {event!.venue} · {event!.city} · {formatDate(event!.date)}
        </p>
        {event!.description && (
          <p className="text-sm text-slate-300 mt-2">{event!.description}</p>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">כרטיסים למכירה</h2>

        {tickets.length === 0 ? (
          <p className="text-sm text-slate-400">
            כרגע אין כרטיסים למכירה לאירוע זה.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {tickets.map((userTicket) => (
              <TicketCard key={userTicket.id} userticket={userTicket} />
            ))}
          </div>
        )}
      </section>

      <section className="text-xs text-slate-400 border-t border-slate-800 pt-4">
        <p>
          ב־TicketMaster הכרטיסים עוברים רק בתוך המערכת, ללא החלפות QR ידניות.
        </p>
        <p>
          ביום האירוע עצמו, רק הבעלים האחרון של הכרטיס יקבל QR פעיל – כדי למנוע
          רמאות ומכירה כפולה.
        </p>
      </section>
    </div>
  );
}
