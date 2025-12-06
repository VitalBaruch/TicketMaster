// src/app/tickets/my/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { events } from "@/data/events";
import { baseTickets } from "@/data/tickets"
import { userTickets } from  "@/data/tickets"
import { MyTicketsClient } from "@/components/tickets/MyTicketClient";
import type { UserTicket } from "@/types/ticket";

export default async function MyTicketsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/tickets/my");
  }

  const email = session.user.email!;
  const ticketsForUser: UserTicket[] = userTickets.filter(
    (ut) => ut.ownerEmail === email
  );

  const marketListings: UserTicket[] = userTickets.filter(
    (ut) => ut.status === "LISTED"
  );

  return (
    <MyTicketsClient
      userEmail={email}
      initialUserTickets={ticketsForUser}
      baseTickets={baseTickets}
      events={events}
      initialMarketListings={marketListings}
    />
  );
}
