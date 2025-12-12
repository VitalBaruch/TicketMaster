import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
     const { title, venue, city, date, description } = body as {
      title?: string;
      venue?: string;
      city?: string;
      date?: string;
      description?: string;
    };

    if (!title || !venue || !city || !date) {
      return NextResponse.json(
        { error: "חסרים שדות חובה" },
        { status: 400 }
      );
    }

    const eventDate = new Date(date);
    const now = new Date();
    if (isNaN(eventDate.getTime()) || eventDate < now) {
      return NextResponse.json(
        { error: "תאריך לא תקין או עבר" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        venue,
        city,
        date: eventDate,
        description: description || null,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error("Error creating event:", err);
    return NextResponse.json(
      { error: "שגיאה בשרת בעת יצירת האירוע" },
      { status: 500 }
    );
  }
}
