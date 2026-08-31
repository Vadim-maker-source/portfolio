"use client";

import { useEffect } from "react";

export const TRAFFIC_STORAGE_KEY = "vadim67okak:traffic";
const SESSION_KEY = "vadim67okak:session";
const MAX_VISITS = 500;

export type TrafficVisit = {
  id: string;
  sessionId: string;
  visitedAt: string;
  path: string;
  source: string;
  device: "Компьютер" | "Телефон" | "Планшет";
  browser: string;
  language: string;
  ip?: string;
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getDevice() {
  const agent = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(agent)) return "Планшет" as const;
  if (/mobile|android|iphone|ipod/.test(agent)) return "Телефон" as const;
  return "Компьютер" as const;
}

function getBrowser() {
  const agent = navigator.userAgent;
  if (/edg\//i.test(agent)) return "Edge";
  if (/firefox\//i.test(agent)) return "Firefox";
  if (/chrome\//i.test(agent) && !/edg\//i.test(agent)) return "Chrome";
  if (/safari\//i.test(agent) && !/chrome\//i.test(agent)) return "Safari";
  return "Другой браузер";
}

function getSource() {
  if (!document.referrer) return "Прямой переход";
  try {
    return new URL(document.referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Внешняя ссылка";
  }
}

export function TrafficTracker() {
  useEffect(() => {
    const sessionId = sessionStorage.getItem(SESSION_KEY) ?? makeId();
    sessionStorage.setItem(SESSION_KEY, sessionId);

    const currentPath = `${window.location.pathname}${window.location.search}`;
    const now = Date.now();
    let visits: TrafficVisit[] = [];

    try {
      const saved = localStorage.getItem(TRAFFIC_STORAGE_KEY);
      visits = saved ? (JSON.parse(saved) as TrafficVisit[]) : [];
    } catch {
      return;
    }

    const duplicate = visits.some(
      (visit) =>
        visit.sessionId === sessionId &&
        visit.path === currentPath &&
        now - new Date(visit.visitedAt).getTime() < 30 * 60 * 1000,
    );

    if (duplicate) return;

    const visit: TrafficVisit = {
      id: makeId(),
      sessionId,
      visitedAt: new Date(now).toISOString(),
      path: currentPath,
      source: getSource(),
      device: getDevice(),
      browser: getBrowser(),
      language: navigator.language || "Неизвестно",
    };

    localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify([visit, ...visits].slice(0, MAX_VISITS)));
    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: visit.id,
        sessionId: visit.sessionId,
        visitedAt: visit.visitedAt,
        path: visit.path,
        source: visit.source,
        device: visit.device,
        browser: visit.browser,
        language: visit.language,
      }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}
