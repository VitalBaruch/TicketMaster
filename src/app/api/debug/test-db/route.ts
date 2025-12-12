import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // נסיון פשוט: לספור כמה משתמשים יש
    const count = await prisma.user.count();

    return NextResponse.json(
      {
        ok: true,
        userCount: count,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DB test error:", err);
    return NextResponse.json(
      { ok: false, error: "DB connection failed" },
      { status: 500 }
    );
  }
}
