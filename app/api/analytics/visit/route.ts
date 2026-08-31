import { NextResponse } from "next/server";
import { readTraffic, writeTraffic } from "@/lib/traffic-store";
import type { TrafficVisit } from "@/components/traffic-tracker";

export const runtime = "nodejs";

function requestIp(request: Request) {
  const headers = request.headers;
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "Не определён"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TrafficVisit>;
    if (!body.id || !body.sessionId || !body.path) return NextResponse.json({ error: "Некорректный визит" }, { status: 400 });

    const visits = await readTraffic();
    const duplicate = visits.some((visit) => visit.sessionId === body.sessionId && visit.path === body.path && Date.now() - new Date(visit.visitedAt).getTime() < 30 * 60 * 1000);
    if (duplicate) return NextResponse.json({ ok: true, duplicate: true });

    const visit: TrafficVisit = {
      id: String(body.id).slice(0, 80),
      sessionId: String(body.sessionId).slice(0, 80),
      visitedAt: new Date(body.visitedAt ?? Date.now()).toISOString(),
      path: String(body.path).slice(0, 200),
      source: String(body.source ?? "Прямой переход").slice(0, 120),
      device: body.device === "Телефон" || body.device === "Планшет" ? body.device : "Компьютер",
      browser: String(body.browser ?? "Неизвестно").slice(0, 60),
      language: String(body.language ?? "Неизвестно").slice(0, 40),
      ip: requestIp(request),
    };

    await writeTraffic([visit, ...visits]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось сохранить визит" }, { status: 500 });
  }
}

