
export type TicketStatus = "OWNED" | "LISTED" | "SOLD";

export type Event = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string; // ISO string
  description?: string;
};

// כרטיס בסיס – "נכס" אחד בעולם
export type BaseTicket = {
  id: string;
  eventId: string;
  section?: string | null;
  row?: string | null;
  seat?: string | null;
};

// כרטיס של משתמש ספציפי
export type UserTicket = {
  id: string;            // מזהה רשומה (לא חייב להיות כמו ה-ticketId)
  ticketId: string;      // מקשר ל-BaseTicket
  ownerEmail: string;    // למי זה שייך
  sellerName: string;    // מי מכר לו (לשימוש היסטורי/תצוגה)
  price: number;
  currency: "ILS" | "USD";
  status: TicketStatus;  // ממלכת המשתמש: OWNED/LISTED/SOLD
  createdAt: string;     // מתי נוצרה הבעלות הזאת
};