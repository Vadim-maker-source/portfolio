import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "vadim_admin_session";

function sessionToken() {
  const password = process.env.ADMIN_PASSWORD ?? "Vadim2011";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "vadim-admin-session-secret";
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export function isAdminRequest(request: NextRequest) {
  const value = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const expected = Buffer.from(sessionToken());
  const received = Buffer.from(value);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function getAdminToken() {
  return sessionToken();
}

