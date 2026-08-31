import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };
    const expected = process.env.ADMIN_PASSWORD ?? "Vadim2011";
    if (password !== expected) return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, getAdminToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }
}

