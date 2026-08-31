"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3, ExternalLink, LockKeyhole, LogOut, Monitor, RefreshCw, Smartphone, Tablet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TrafficVisit } from "@/components/traffic-tracker";

const DAY_COUNT = 14;

function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function shortSession(id: string) {
  return `сессия ${id.slice(0, 6)}`;
}

function DeviceIcon({ device }: { device: TrafficVisit["device"] }) {
  if (device === "Телефон") return <Smartphone className="size-4" />;
  if (device === "Планшет") return <Tablet className="size-4" />;
  return <Monitor className="size-4" />;
}

export default function AdminPage() {
  const [visits, setVisits] = useState<TrafficVisit[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const refresh = async () => {
    const response = await fetch("/api/admin/visits", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (!response.ok) return;
    const data = (await response.json()) as { visits: TrafficVisit[] };
    setVisits(data.visits);
    setAuthenticated(true);
    setUpdatedAt(new Date());
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/visits", { cache: "no-store" }).then(async (response) => {
      if (!active) return;
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!response.ok) return;
      const data = (await response.json()) as { visits: TrafficVisit[] };
      if (!active) return;
      setVisits(data.visits);
      setAuthenticated(true);
      setUpdatedAt(new Date());
    }).catch(() => {
      if (active) setAuthenticated(false);
    });
    return () => { active = false; };
  }, []);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!response.ok) {
      setLoginError("Неверный пароль");
      return;
    }
    setPassword("");
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setVisits([]);
  }

  const stats = useMemo(() => {
    const sessions = new Set(visits.map((visit) => visit.sessionId));
    const pages = new Set(visits.map((visit) => visit.path));
    const today = dayKey(new Date());
    const todayVisits = visits.filter((visit) => dayKey(new Date(visit.visitedAt)) === today).length;
    return { sessions: sessions.size, pages: pages.size, todayVisits };
  }, [visits]);

  const chart = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: DAY_COUNT }, (_, index) => {
      const date = new Date(now);
      date.setHours(0, 0, 0, 0);
      date.setDate(now.getDate() - (DAY_COUNT - index - 1));
      const key = dayKey(date);
      return {
        key,
        label: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(date),
        count: visits.filter((visit) => dayKey(new Date(visit.visitedAt)) === key).length,
      };
    });
    const max = Math.max(1, ...days.map((day) => day.count));
    return days.map((day) => ({ ...day, height: Math.max(day.count ? 12 : 4, Math.round((day.count / max) * 100)) }));
  }, [visits]);

  const sourceRows = useMemo(() => {
    const counts = new Map<string, number>();
    visits.forEach((visit) => counts.set(visit.source, (counts.get(visit.source) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [visits]);

  if (authenticated === null) return <div className="grid min-h-screen place-items-center bg-[#07080b] text-sm text-zinc-500">Проверяем доступ…</div>;
  if (!authenticated) return <LoginScreen password={password} setPassword={setPassword} error={loginError} onSubmit={login} />;

  return (
    <main className="min-h-screen bg-[#07080b] text-zinc-100">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-6 md:px-8 md:py-10">
        <header className="flex items-center justify-between border-b border-white/[.1] pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Вернуться на сайт" className="grid size-10 place-items-center rounded-full border border-white/[.12] text-zinc-300 transition-colors hover:bg-white/[.06] hover:text-white">
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Приватный раздел</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-.04em] md:text-3xl">Аналитика трафика</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
          <button type="button" onClick={() => void refresh()} className="flex items-center gap-2 rounded-lg border border-white/[.12] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[.06] hover:text-white">
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline">Обновить</span>
          </button>
          <button type="button" onClick={() => void logout()} className="flex items-center gap-2 rounded-lg border border-white/[.12] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[.06] hover:text-white"><LogOut className="size-4" /><span className="hidden sm:inline">Выйти</span></button>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Посещения сегодня" value={stats.todayVisits} detail="уникальные загрузки" />
          <Stat label="Уникальные сессии" value={stats.sessions} detail="анонимные посетители" />
          <Stat label="Страницы" value={stats.pages} detail="отслежено маршрутов" />
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className="rounded-2xl border border-white/[.1] bg-[#0d0f14] p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400">Динамика посещений</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-.04em]">Последние 14 дней</p>
              </div>
              <BarChart3 className="size-5 text-violet-300" />
            </div>
            <div className="mt-8 flex h-48 items-end gap-2 border-b border-white/[.1] pb-0 sm:gap-3">
              {chart.map((day) => (
                <div key={day.key} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-xs text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">{day.count}</span>
                  <div className="w-full rounded-t-md bg-violet-300/80 transition-colors group-hover:bg-violet-200" style={{ height: `${day.height}%` }} title={`${day.label}: ${day.count}`} />
                  <span className="w-full truncate text-center text-[10px] text-zinc-500">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[.1] bg-[#0d0f14] p-5 md:p-6">
            <p className="text-sm text-zinc-400">Источники переходов</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-.04em]">Откуда приходят</p>
            <div className="mt-7 space-y-4">
              {sourceRows.length ? sourceRows.map(([source, count]) => (
                <div key={source} className="flex items-center justify-between gap-4 text-sm">
                  <span className="truncate text-zinc-300">{source}</span>
                  <span className="shrink-0 text-zinc-500">{count}</span>
                </div>
              )) : <EmptyState text="Источники появятся после первых визитов" />}
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-white/[.1] bg-[#0d0f14]">
          <div className="flex items-center justify-between border-b border-white/[.1] px-5 py-5 md:px-6">
            <div>
              <p className="text-sm text-zinc-400">Журнал визитов</p>
              <p className="mt-1 text-xl font-semibold tracking-[-.03em]">Кто заходил на сайт</p>
            </div>
            <span className="text-sm text-zinc-500">{updatedAt ? `обновлено в ${updatedAt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}` : ""}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[.12em] text-zinc-500">
                <tr className="border-b border-white/[.08]"><th className="px-5 py-3 font-medium md:px-6">Посетитель</th><th className="px-5 py-3 font-medium">Время</th><th className="px-5 py-3 font-medium">Устройство</th><th className="px-5 py-3 font-medium">Источник</th><th className="px-5 py-3 font-medium">IP</th><th className="px-5 py-3 font-medium">Страница</th></tr>
              </thead>
              <tbody>
                {visits.length ? visits.slice(0, 20).map((visit) => (
                  <tr key={visit.id} className="border-b border-white/[.06] last:border-0">
                    <td className="px-5 py-4 md:px-6"><span className="text-zinc-200">Анонимный посетитель</span><span className="mt-1 block text-xs text-zinc-500">{shortSession(visit.sessionId)}</span></td>
                    <td className="px-5 py-4 whitespace-nowrap text-zinc-400">{formatDate(visit.visitedAt)}</td>
                    <td className="px-5 py-4"><span className="flex items-center gap-2 text-zinc-300"><DeviceIcon device={visit.device} />{visit.device}<span className="text-xs text-zinc-500">{visit.browser}</span></span></td>
                    <td className="max-w-[150px] truncate px-5 py-4 text-zinc-400">{visit.source}</td>
                    <td className="px-5 py-4 font-mono text-xs text-zinc-400">{visit.ip ?? "Не определён"}</td>
                    <td className="px-5 py-4"><span className="flex items-center gap-1 text-zinc-400">{visit.path}<ExternalLink className="size-3" /></span></td>
                  </tr>
                )) : <tr><td colSpan={6} className="px-5 py-14 text-center text-zinc-500">Пока нет визитов. Открой главную страницу, чтобы записать первый.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-5 max-w-2xl text-xs leading-5 text-zinc-500">IP определяется сервером из заголовков запроса и доступен только после входа в админку. Данные сохраняются в локальном хранилище проекта.</p>
      </div>
    </main>
  );
}

function Stat({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <div className="rounded-2xl border border-white/[.1] bg-[#0d0f14] p-5"><p className="text-sm text-zinc-400">{label}</p><p className="mt-3 text-4xl font-semibold tracking-[-.06em] text-white">{value}</p><p className="mt-2 text-xs text-zinc-500">{detail}</p></div>;
}

function EmptyState({ text }: { text: string }) {
  return <p className="border-l border-violet-300/50 pl-3 text-sm leading-6 text-zinc-500">{text}</p>;
}

function LoginScreen({ password, setPassword, error, onSubmit }: { password: string; setPassword: (value: string) => void; error: string; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <main className="grid min-h-screen place-items-center bg-[#07080b] px-5 text-zinc-100"><form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-white/[.1] bg-[#0d0f14] p-6 md:p-8"><div className="grid size-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><LockKeyhole className="size-5" /></div><h1 className="mt-6 text-2xl font-semibold tracking-[-.04em]">Вход в админку</h1><p className="mt-2 text-sm leading-6 text-zinc-500">Раздел с данными о посещениях сайта.</p><label className="mt-7 block text-sm text-zinc-300">Пароль<input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-white/[.12] bg-black/20 px-3 py-3 text-white outline-none transition-colors focus:border-violet-300/70" /></label>{error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}<button type="submit" className="mt-5 w-full rounded-lg bg-violet-400 px-4 py-3 text-sm font-semibold text-[#160d2e] transition-colors hover:bg-violet-300">Войти</button></form></main>;
}
