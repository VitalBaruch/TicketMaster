import type { BaseTicket, UserTicket } from "@/types/ticket";
export const baseTickets: BaseTicket[] = [
  // Event 1 – Static
  { id: "BT-1", eventId: "1", section: "יציע עליון", row: "12", seat: "5" },
  { id: "BT-2", eventId: "1", section: "יציע עליון", row: "12", seat: "6" },
  { id: "BT-3", eventId: "1", section: "פרימיום", row: "3", seat: "8" },
  { id: "BT-4", eventId: "1", section: "פרימיום", row: "3", seat: "9" },
  { id: "BT-5", eventId: "1", section: "VIP", row: "1", seat: "2" },
  { id: "BT-6", eventId: "1", section: "VIP", row: "1", seat: "3" },

  // Event 2 – Techno Festival
  { id: "BT-7", eventId: "2", section: "עמידה", row: null, seat: null },
  { id: "BT-8", eventId: "2", section: "עמידה", row: null, seat: null },
  { id: "BT-9", eventId: "2", section: "עמידה", row: null, seat: null },
  { id: "BT-10", eventId: "2", section: "VIP מתחם", row: null, seat: null },

  // Event 3 – Standup
  { id: "BT-11", eventId: "3", section: "אולם תחתון", row: "4", seat: "11" },
  { id: "BT-12", eventId: "3", section: "אולם תחתון", row: "4", seat: "12" },
  { id: "BT-13", eventId: "3", section: "אולם עליון", row: "9", seat: "2" },

  // Event 4 – Berry Sakharof
  { id: "BT-14", eventId: "4", section: "עמידה", row: null, seat: null },
  { id: "BT-15", eventId: "4", section: "עמידה", row: null, seat: null },
  { id: "BT-16", eventId: "4", section: "פרימיום", row: "2", seat: "4" },
  { id: "BT-17", eventId: "4", section: "פרימיום", row: "2", seat: "5" },

  // Event 5 – Imagine Dragons
  { id: "BT-18", eventId: "5", section: "Golden Ring", row: null, seat: null },
  { id: "BT-19", eventId: "5", section: "Golden Ring", row: null, seat: null },
  { id: "BT-20", eventId: "5", section: "Regular Standing", row: null, seat: null },
  { id: "BT-21", eventId: "5", section: "Regular Standing", row: null, seat: null },
  { id: "BT-22", eventId: "5", section: "VIP", row: null, seat: null },

  // Event 6 – Les Misérables
  { id: "BT-23", eventId: "6", section: "אולם קדמי", row: "1", seat: "7" },
  { id: "BT-24", eventId: "6", section: "אולם קדמי", row: "1", seat: "8" },
  { id: "BT-25", eventId: "6", section: "אולם אמצעי", row: "5", seat: "10" },
  { id: "BT-26", eventId: "6", section: "אולם אמצעי", row: "5", seat: "11" },

  // Event 7 – Tuna
  { id: "BT-27", eventId: "7", section: "יציע", row: "10", seat: "21" },
  { id: "BT-28", eventId: "7", section: "יציע", row: "10", seat: "22" },
  { id: "BT-29", eventId: "7", section: "אולם מרכזי", row: "4", seat: "3" },
  { id: "BT-30", eventId: "7", section: "אולם מרכזי", row: "4", seat: "4" },
];


export const userTickets : UserTicket[] = [
  // -------- demo user --------
  { id: "UT-1", ticketId: "BT-1", ownerEmail: "demo@ticketmaster.test", sellerName: "האתר הרשמי", price: 280, currency: "ILS", status: "OWNED", createdAt: "2025-01-01T10:00:00Z" },
  { id: "UT-2", ticketId: "BT-2", ownerEmail: "demo@ticketmaster.test", sellerName: "shira@mail.com", price: 300, currency: "ILS", status: "LISTED", createdAt: "2025-01-10T10:00:00Z" },
  { id: "UT-3", ticketId: "BT-11", ownerEmail: "demo@ticketmaster.test", sellerName: "yossi@gmail.com", price: 160, currency: "ILS", status: "OWNED", createdAt: "2025-01-15T10:00:00Z" },
  { id: "UT-4", ticketId: "BT-14", ownerEmail: "demo@ticketmaster.test", sellerName: "moran@walla.com", price: 230, currency: "ILS", status: "SOLD", createdAt: "2025-01-18T10:00:00Z" },
  { id: "UT-5", ticketId: "BT-27", ownerEmail: "demo@ticketmaster.test", sellerName: "האתר הרשמי", price: 180, currency: "ILS", status: "LISTED", createdAt: "2025-01-19T11:00:00Z" },

  // -------- Shira --------
  { id: "UT-6", ticketId: "BT-3", ownerEmail: "shira@mail.com", sellerName: "demo@ticketmaster.test", price: 400, currency: "ILS", status: "LISTED", createdAt: "2025-01-20T11:00:00Z" },
  { id: "UT-7", ticketId: "BT-7", ownerEmail: "shira@mail.com", sellerName: "האתר הרשמי", price: 150, currency: "ILS", status: "OWNED", createdAt: "2025-01-21T11:00:00Z" },
  { id: "UT-8", ticketId: "BT-18", ownerEmail: "shira@mail.com", sellerName: "daniel@test.com", price: 600, currency: "ILS", status: "OWNED", createdAt: "2025-01-22T11:00:00Z" },

  // -------- Yossi --------
  { id: "UT-9", ticketId: "BT-4", ownerEmail: "yossi@gmail.com", sellerName: "demo@ticketmaster.test", price: 420, currency: "ILS", status: "OWNED", createdAt: "2025-01-10T09:00:00Z" },
  { id: "UT-10", ticketId: "BT-19", ownerEmail: "yossi@gmail.com", sellerName: "shira@mail.com", price: 610, currency: "ILS", status: "LISTED", createdAt: "2025-01-25T09:00:00Z" },
  { id: "UT-11", ticketId: "BT-22", ownerEmail: "yossi@gmail.com", sellerName: "האתר הרשמי", price: 850, currency: "ILS", status: "OWNED", createdAt: "2025-01-27T09:00:00Z" },

  // -------- Daniel --------
  { id: "UT-12", ticketId: "BT-8", ownerEmail: "daniel@test.com", sellerName: "האתר הרשמי", price: 140, currency: "ILS", status: "OWNED", createdAt: "2025-01-10T15:00:00Z" },
  { id: "UT-13", ticketId: "BT-9", ownerEmail: "daniel@test.com", sellerName: "shira@mail.com", price: 160, currency: "ILS", status: "SOLD", createdAt: "2025-01-12T15:00:00Z" },
  { id: "UT-14", ticketId: "BT-20", ownerEmail: "daniel@test.com", sellerName: "yossi@gmail.com", price: 300, currency: "ILS", status: "LISTED", createdAt: "2025-01-30T15:00:00Z" },
  { id: "UT-15", ticketId: "BT-29", ownerEmail: "daniel@test.com", sellerName: "moran@walla.com", price: 210, currency: "ILS", status: "OWNED", createdAt: "2025-02-01T15:00:00Z" },

  // -------- Lee --------
  { id: "UT-16", ticketId: "BT-10", ownerEmail: "lee@live.com", sellerName: "האתר הרשמי", price: 450, currency: "ILS", status: "LISTED", createdAt: "2025-01-07T20:00:00Z" },
  { id: "UT-17", ticketId: "BT-12", ownerEmail: "lee@live.com", sellerName: "daniel@test.com", price: 180, currency: "ILS", status: "OWNED", createdAt: "2025-01-08T20:00:00Z" },
  { id: "UT-18", ticketId: "BT-23", ownerEmail: "lee@live.com", sellerName: "האתר הרשמי", price: 260, currency: "ILS", status: "OWNED", createdAt: "2025-01-09T20:00:00Z" },

  // -------- Moran --------
  { id: "UT-19", ticketId: "BT-15", ownerEmail: "moran@walla.com", sellerName: "yossi@gmail.com", price: 200, currency: "ILS", status: "LISTED", createdAt: "2025-01-05T12:00:00Z" },
  { id: "UT-20", ticketId: "BT-16", ownerEmail: "moran@walla.com", sellerName: "האתר הרשמי", price: 310, currency: "ILS", status: "OWNED", createdAt: "2025-01-06T12:00:00Z" },
  { id: "UT-21", ticketId: "BT-24", ownerEmail: "moran@walla.com", sellerName: "demo@ticketmaster.test", price: 275, currency: "ILS", status: "SOLD", createdAt: "2025-01-07T12:00:00Z" },

  // -------- עוד קצת רשומות אקראיות למילוי מרקטפלייס --------
  { id: "UT-22", ticketId: "BT-5", ownerEmail: "shira@mail.com", sellerName: "demo@ticketmaster.test", price: 500, currency: "ILS", status: "LISTED", createdAt: "2025-01-28T18:00:00Z" },
  { id: "UT-23", ticketId: "BT-6", ownerEmail: "yossi@gmail.com", sellerName: "demo@ticketmaster.test", price: 530, currency: "ILS", status: "OWNED", createdAt: "2025-02-01T18:00:00Z" },
  { id: "UT-24", ticketId: "BT-17", ownerEmail: "daniel@test.com", sellerName: "shira@mail.com", price: 320, currency: "ILS", status: "LISTED", createdAt: "2025-02-02T18:00:00Z" },
  { id: "UT-25", ticketId: "BT-21", ownerEmail: "demo@ticketmaster.test", sellerName: "moran@walla.com", price: 260, currency: "ILS", status: "OWNED", createdAt: "2025-02-03T18:00:00Z" },
  { id: "UT-26", ticketId: "BT-25", ownerEmail: "moran@walla.com", sellerName: "daniel@test.com", price: 310, currency: "ILS", status: "OWNED", createdAt: "2025-02-05T18:00:00Z" },
  { id: "UT-27", ticketId: "BT-30", ownerEmail: "lee@live.com", sellerName: "daniel@test.com", price: 220, currency: "ILS", status: "LISTED", createdAt: "2025-02-06T18:00:00Z" },
  { id: "UT-28", ticketId: "BT-26", ownerEmail: "daniel@test.com", sellerName: "shira@mail.com", price: 295, currency: "ILS", status: "OWNED", createdAt: "2025-02-07T18:00:00Z" },
  { id: "UT-29", ticketId: "BT-28", ownerEmail: "yossi@gmail.com", sellerName: "demo@ticketmaster.test", price: 240, currency: "ILS", status: "SOLD", createdAt: "2025-02-08T18:00:00Z" },
  { id: "UT-30", ticketId: "BT-13", ownerEmail: "demo@ticketmaster.test", sellerName: "shira@mail.com", price: 150, currency: "ILS", status: "OWNED", createdAt: "2025-02-09T18:00:00Z" },
];

export const getUserTickets = (email : string) => {
  return userTickets.filter(ut => ut.ownerEmail === email);
}

export const getListingsForEvent = (eventId: string) => {
  // Find all base tickets for the event
  const eventBaseTicketIds = baseTickets
    .filter(bt => bt.eventId === eventId)
    .map(bt => bt.id);
  // Find all user tickets that are listed and match the base tickets
  return userTickets.filter(
    ut => ut.status === "LISTED" && eventBaseTicketIds.includes(ut.ticketId)
  );
}