import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const g = await db.gamification.findUnique({ where: { userId } });
    return NextResponse.json({ gamification: g }, { status: 200 });
  } catch (error) {
    console.error("gamification GET error", error);
    return NextResponse.json({ error: "Failed to fetch gamification" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, points = 0, level = 1, streak = 0, badges = [] } = body;
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const g = await db.gamification.upsert({
      where: { userId },
      update: { points, level, streak, badges },
      create: { userId, points, level, streak, badges },
    });
    return NextResponse.json({ ok: true, gamification: g }, { status: 200 });
  } catch (error) {
    console.error("gamification POST error", error);
    return NextResponse.json({ error: "Failed to save gamification" }, { status: 500 });
  }
}
