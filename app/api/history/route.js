import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const where = userId ? { userId } : {};
    const list = await db.interviewHistory.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ items: list }, { status: 200 });
  } catch (error) {
    console.error("history GET error", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId = null, topic, question, answer, feedback, rating } = body;
    if (!topic || !question || !answer || !feedback || typeof rating !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const record = await db.interviewHistory.create({
      data: { userId, topic, question, answer, feedback, rating },
    });
    return NextResponse.json({ ok: true, id: record.id }, { status: 200 });
  } catch (error) {
    console.error("history POST error", error);
    return NextResponse.json({ error: "Failed to save history" }, { status: 500 });
  }
}
