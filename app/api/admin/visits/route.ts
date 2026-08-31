import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readTraffic } from "@/lib/traffic-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 });
  return NextResponse.json({ visits: await readTraffic() }, { headers: { "Cache-Control": "no-store" } });
}

