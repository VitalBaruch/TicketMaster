// src/components/tickets/MyTicketsClient.tsx
"use client";

import { useState } from "react";
import type { BaseTicket, Event, UserTicket } from "@/types/ticket";
import { get } from "http";

type Props = {
  initialUserTickets: UserTicket[];
  baseTickets: BaseTicket[];
  events: Event[];
  userEmail: string;
  initialMarketListings: UserTicket[]; // כל הליסטים בשוק
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

function canShowQr(dateStr: string, hourOffset: number = 12) {
  const now = new Date();
  const eventDate = new Date(dateStr).getTime();
  const hourdiff = hourOffset * 60 * 60 * 1000;
  return now.getTime() + hourdiff >= eventDate;
}

function dayPassed(dateStr: string) {
  const now = new Date().getTime();
  const eventDate = new Date(dateStr).getTime();
  const day = 1000 * 60 * 60 * 24;
  return now > eventDate + day;
}

export function MyTicketsClient({
  initialUserTickets,
  baseTickets,
  events,
  userEmail,
  initialMarketListings,
}: Props) {
  const [userTicketState, setUserTicketState] =
    useState<UserTicket[]>(initialUserTickets);

  // כל ה־BaseTickets במערכת + דברים שנוסיף מקומית
  const [baseTicketState, setBaseTicketState] =
    useState<BaseTicket[]>(baseTickets);

  // ה־MARKET הכללי (כל מי שמוכר, לא רק המשתמש)
  const [marketListingsState, setMarketListingsState] =
    useState<UserTicket[]>(initialMarketListings);

  // מצב מודאל מכירה
  const [sellModal, setSellModal] = useState<{
    isOpen: boolean;
    ticket: UserTicket | null;
    avgPrice: number | null;
  }>({ isOpen: false, ticket: null, avgPrice: null });

  const [sellPrice, setSellPrice] = useState<string>("");

  const MyTickets = userTicketState.filter(
    (t) => (t.status === "OWNED" || t.status === "LISTED"));

  const activeTickets: UserTicket[] = [];
  const expiredTickets: UserTicket[] = [];

  MyTickets.forEach((t) => {
    const { base, event } = getEventAndBase(t);
    if (!event) return;

    if (dayPassed(event.date)) {
      expiredTickets.push(t);
    } else {
      activeTickets.push(t);
    }
  });

  const soldTickets = userTicketState.filter((t) => t.status === "SOLD");

  const soldOrExpiredTickets = [
    ...soldTickets.map((t) => ({...t, type: "SOLD" as const })),
    ...expiredTickets.map((t) => ({...t, type: "EXPIRED" as const })),
  ];

  function getEventAndBase(userTicket: UserTicket) {
    const base = baseTicketState.find((bt) => bt.id === userTicket.ticketId);
    if (!base) return { base: null as BaseTicket | null, event: null as Event | null };

    const event = events.find((ev) => ev.id === base.eventId) || null;
    return { base, event };
  }

  // מחיקת כרטיס מהמבט של היוזר (היסטוריה)
  function handleRemoveSold(userTicketId: string) {
    setUserTicketState((prev) => prev.filter((t) => t.id !== userTicketId));
  }

  // פתיחת מודאל מכירה מתוך הכרטיס
  function openSellModal(ticket: UserTicket) {
    const { base, event } = getEventAndBase(ticket);
    if (!base || !event) {
      return;
    }

    // כל הליסטים בשוק לאותו EVENT
    const listingsSameEvent = marketListingsState.filter((listing) => {
      const baseListing = baseTicketState.find(
        (bt) => bt.id === listing.ticketId
      );
      return baseListing?.eventId === base.eventId && listing.status === "LISTED";
    });

    let avgPrice: number | null = null;
    if (listingsSameEvent.length > 0) {
      const sum = listingsSameEvent.reduce((acc, l) => acc + l.price, 0);
      avgPrice = Math.round(sum / listingsSameEvent.length);
    }

    setSellModal({
      isOpen: true,
      ticket,
      avgPrice,
    });

    setSellPrice(
      avgPrice !== null ? String(avgPrice) : String(ticket.price || "")
    );
  }

  function closeSellModal() {
    setSellModal({ isOpen: false, ticket: null, avgPrice: null });
    setSellPrice("");
  }

  // אישור מכירה → משנה סטטוס ל-LISTED ומעדכן מחיר
  function confirmSell() {
    if (!sellModal.ticket) return;
    const ticketFromModal = sellModal.ticket;
    const priceNumber = Number(sellPrice);
    if (!priceNumber || priceNumber <= 0) return;

    const ticketId = ticketFromModal.id;

    // עדכון כרטיס של המשתמש
    setUserTicketState((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "LISTED",
              price: priceNumber,
            }
          : t
      )
    );

    // אם הוא כבר בשוק – נעדכן, אם לא – נוסיף לליסטים של הMARKET
    setMarketListingsState((prev) => {
      const exists = prev.some((l) => l.id === ticketId);
      if (exists) {
        return prev.map((l) =>
          l.id === ticketId ? { ...l, price: priceNumber, status: "LISTED" } : l
        );
      }
      const original =
        userTicketState.find((t) => t.id === ticketId) ?? ticketFromModal;
      return [
        ...prev,
        {
          ...original,
          price: priceNumber,
          status: "LISTED",
        },
      ];
    });

    closeSellModal();
  }


  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">הכרטיסים שלי</h1>
        <p className="text-sm text-slate-300">
          משתמש מחובר: <span className="font-mono">{userEmail}</span>
        </p>
      </header>

      {/* כרטיסים פעילים */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">כרטיסים פעילים בבעלותך</h2>
        {activeTickets.length === 0 ? (
          <p className="text-sm text-slate-400">
            אין כרגע כרטיסים פעילים בבעלותך.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {activeTickets.map((ut) => {
              const { base, event } = getEventAndBase(ut);
              if (!event || !base) return null;
                const showQr = canShowQr(event.date);
              return (
                <div
                  key={ut.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-100">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {event.venue} · {event.city}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">
                        ₪{ut.price.toLocaleString("he-IL")}
                      </div>
                      <div className={`text-[10px] ${ut.status === "LISTED" ? "text-sky-400" : "text-slate-400"} uppercase`}>
                        {ut.status === "LISTED"
                          ? "מוצע למכירה"
                          : "ברשותך בלבד"}
                      </div>
                    </div>
                  </div>

                  {(base.section || base.row || base.seat) && (
                    <p className="text-xs text-slate-300">
                      {base.section && <>אזור: {base.section}</>}
                      {base.row && <> · שורה {base.row}</>}
                      {base.seat && <> · מושב {base.seat}</>}
                    </p>
                  )}

                  <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      {showQr
                        ? "QR זמין (בדמו: רק טקסט)."
                        : "QR יהיה זמין רק ביום האירוע."}
                    </span>

                    {ut.status === "OWNED" && !showQr && (
                      <button type="button" onClick={() => openSellModal(ut)} className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
                        מכור כרטיס
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* כרטיסים שנמכרו או עבר התוקף שלהם */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">כרטיסים שנמכרו או שפג תוקפם (היסטוריה)</h2>
        {soldOrExpiredTickets.length === 0 ? (
          <p className="text-sm text-slate-400">
            אין עדיין כרטיסים בהיסטוריה שלך (כרטיסים שפג תוקפם או נמכרו יופיעו כאן).
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {soldOrExpiredTickets.map((ut) => {
              const { base, event } = getEventAndBase(ut);
              if (!event || !base) return null;

              return (
                <div
                  key={ut.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-100">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {event.venue} · {event.city}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">
                        ₪{ut.price.toLocaleString("he-IL")}
                      </div>
                      <div className={`text-[10px] ${ut.type === "SOLD" ? "text-orange-300" : "text-red-300"} uppercase`}>
                        {ut.type === "SOLD"
                          ? "נמכר"
                          : "פג תוקף"}
                      </div>
                    </div>
                  </div>

                  {(base.section || base.row || base.seat) && (
                    <p className="text-xs text-slate-300">
                      {base.section && <>אזור: {base.section}</>}
                      {base.row && <> · שורה {base.row}</>}
                      {base.seat && <> · מושב {base.seat}</>}
                    </p>
                  )}

                  <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      {ut.type === "SOLD"
                        ? "הכרטיס נמכר בהצלחה, "
                        : "תוקף הכרטיס פג, "}
                       ניתן להסיר מההיסטוריה.
                    </span>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveSold(ut.id)}
                    >
                      הסר מההיסטוריה
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* מודאל מכירה */}
      {sellModal.isOpen && sellModal.ticket && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-sm">
            <h2 className="text-lg font-semibold mb-1">מכירת כרטיס</h2>
            {(() => {
              const { base, event } = getEventAndBase(sellModal.ticket!);
              if (!event || !base) return null;
              return (
                <div className="space-y-1 text-slate-200">
                  <div>{event.title}</div>
                  <div className="text-xs text-slate-400">
                    {event.venue} · {event.city} · {formatDate(event.date)}
                  </div>
                  {(base.section || base.row || base.seat) && (
                    <div className="text-xs text-slate-300">
                      {base.section && <>אזור: {base.section}</>}
                      {base.row && <> · שורה {base.row}</>}
                      {base.seat && <> · מושב {base.seat}</>}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="space-y-1">
              <div className="text-xs text-slate-400">
                {sellModal.avgPrice !== null ? (
                  <>
                    מחיר ממוצע בשוק לאירוע זה:{" "}
                    <span className="text-emerald-400 font-semibold">
                      ₪{sellModal.avgPrice.toLocaleString("he-IL")}
                    </span>
                  </>
                ) : (
                  "אין עדיין מספיק עסקאות בשוק לאירוע הזה – תבחר מחיר שמתאים לך."
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="space-y-1 w-full">
                <span className="text-slate-200">מחיר מכירה (₪)</span>
                <input
                  type="number"
                  min={1}
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 outline-none focus:border-sky-500"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 text-xs"
                onClick={closeSellModal}
              >
                ביטול
              </button>
              <button type="button" onClick={confirmSell} className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
                אשר מכירה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
