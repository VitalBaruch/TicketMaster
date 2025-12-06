"use client";

import { baseTickets } from "@/data/tickets";
import type { UserTicket } from "@/types/ticket";
import { useSession } from "next-auth/react";

type Props = {
  userticket: UserTicket;
};

export function TicketCard({ userticket }: Props) {
  const baseTicket = baseTickets.find((bt) => bt.id === userticket.ticketId);
  if (!baseTicket) {
    return null; // או טיפול שגיאה מתאים
  }
  const { section, row, seat } = baseTicket;
  const { sellerName, price, currency } = userticket;

  const formatPrice = () => {
    const symbol = currency === "ILS" ? "₪" : "$";
    return `${symbol}${price.toLocaleString("he-IL")}`;
  };

  const { data: session } = useSession();

  function handleBuyClick() {
    if (!session) {
      alert("אנא התחבר כדי לרכוש כרטיסים.");
      return;
    }
    // כאן בעתיד תחבר ל-API של קנייה אמיתית
    alert(
      `דמו: כאן היית מתחיל תהליך רכישה לכרטיס של ${sellerName} במחיר ${formatPrice()}`
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-200">
          <div className="font-semibold">מוכר: {sellerName}</div>
          <div className="text-slate-400 text-xs">
            {section && <span>{section}</span>}
            {row && (
              <span>
                {" "}
                · שורה {row}
              </span>
            )}
            {seat && (
              <span>
                {" "}
                · מושב {seat}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-emerald-400">
            {formatPrice()}
          </div>
          <div className="text-[10px] text-slate-400 uppercase">
            second hand
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>העברה מובטחת דרך TicketMaster</span>
      </div>

      <div className="flex justify-end">
        <button className="cursor-pointer px-4 py-2 rounded-xl border border-gray-300 
         bg-white text-gray-800 font-medium
         hover:bg-gray-100 hover:border-gray-400
         transition-all duration-200
         dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
         dark:hover:bg-gray-700 dark:hover:border-gray-500
         active:scale-95" onClick={handleBuyClick}>קנה כרטיס</button>
      </div>
    </div>
  );
}
