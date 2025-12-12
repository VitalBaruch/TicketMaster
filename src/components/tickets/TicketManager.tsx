
"use client";

import { useState } from "react";
import type { Event } from "@/generated/prisma/client";

type Props = {
  events: Event[];
};

export function TicketsManager({ events: initialEvents }: Props) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [creatingTicket, setCreatingTicket] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    venue: "",
    city: "",
    date: "",
    description: "",
  });

  const [ticketForm, setTicketForm] = useState({
    eventId: "",
    marketPrice: "",
    section: "",
    row: "",
    seat: "",
  });

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    setCreatingEvent(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("שגיאה ביצירת האירוע: " + err.error);
        return;
      }

      const created = (await res.json()) as Event;
      setEvents((prev) => [...prev, created]);
      setEventForm({
        title: "",
        venue: "",
        city: "",
        date: "",
        description: "",
      });
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleCreateTicket(e: React.FormEvent) {
    e.preventDefault();
    setCreatingTicket(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: ticketForm.eventId,
          marketPrice: Number(ticketForm.marketPrice),
          section: ticketForm.section || null,
          row: ticketForm.row || null,
          seat: ticketForm.seat || null,
        }),
      });

      if (!res.ok) {
        console.error("Failed to create ticket");
        return;
      }

      // אפשר להוסיף כאן toast / הודעה למשתמש
      setTicketForm({
        eventId: "",
        marketPrice: "",
        section: "",
        row: "",
        seat: "",
      });
    } finally {
      setCreatingTicket(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* טופס יצירת אירוע */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <h2 className="text-lg font-semibold text-slate-50">
          יצירת אירוע חדש
        </h2>
        <form onSubmit={handleCreateEvent} className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">שם האירוע</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">מקום</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={eventForm.venue}
              onChange={(e) =>
                setEventForm((f) => ({ ...f, venue: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">עיר</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={eventForm.city}
              onChange={(e) =>
                setEventForm((f) => ({ ...f, city: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">תאריך ושעה</label>
            <input
              type="datetime-local"
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={eventForm.date}
              onChange={(e) =>
                setEventForm((f) => ({ ...f, date: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-300">תיאור (אופציונלי)</label>
            <textarea
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50 min-h-[60px]"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={creatingEvent}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              {creatingEvent ? "מוסיף..." : "הוסף אירוע"}
            </button>
          </div>
        </form>
      </section>

      {/* טופס יצירת כרטיס */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <h2 className="text-lg font-semibold text-slate-50">
          יצירת כרטיס עבור אירוע
        </h2>
        <form onSubmit={handleCreateTicket} className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">אירוע</label>
            <select
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={ticketForm.eventId}
              onChange={(e) =>
                setTicketForm((f) => ({ ...f, eventId: e.target.value }))
              }
              required
            >
              <option value="">בחר אירוע...</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} – {new Date(ev.date).toLocaleString("he-IL")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">מחיר שוק (ILS)</label>
            <input
              type="number"
              min={0}
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={ticketForm.marketPrice}
              onChange={(e) =>
                setTicketForm((f) => ({ ...f, marketPrice: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">יציע / אזור</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={ticketForm.section}
              onChange={(e) =>
                setTicketForm((f) => ({ ...f, section: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">שורה</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={ticketForm.row}
              onChange={(e) =>
                setTicketForm((f) => ({ ...f, row: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300">מושב</label>
            <input
              className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-50"
              value={ticketForm.seat}
              onChange={(e) =>
                setTicketForm((f) => ({ ...f, seat: e.target.value }))
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={creatingTicket}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              {creatingTicket ? "מוסיף..." : "הוסף כרטיס"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
