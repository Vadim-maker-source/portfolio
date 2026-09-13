"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Binary, Box, Paintbrush, Radio, Waypoints } from "lucide-react";
import type { IconType } from "react-icons";
import { SiBlender, SiBurpsuite, SiCplusplus, SiDart, SiDocker, SiFastapi, SiFlutter, SiGit, SiGnubash, SiJavascript, SiKalilinux, SiLinux, SiMysql, SiNestjs, SiNextdotjs, SiNginx, SiNodedotjs, SiPostgresql, SiPython, SiSqlite, SiTailwindcss, SiTypescript, SiWireshark } from "react-icons/si";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { technologies, type TechnologyIcon } from "@/lib/constants";

const iconMap: Record<TechnologyIcon, IconType> = {
  javascript: SiJavascript, typescript: SiTypescript, dart: SiDart, python: SiPython,
  bash: SiGnubash, cplusplus: SiCplusplus, sqlite: SiSqlite, postgresql: SiPostgresql,
  nextjs: SiNextdotjs, tailwind: SiTailwindcss, fastapi: SiFastapi, nodejs: SiNodedotjs,
  nestjs: SiNestjs, docker: SiDocker, nginx: SiNginx, git: SiGit, linux: SiLinux,
  flutter: SiFlutter, mysql: SiMysql, websocket: Waypoints, webrtc: Radio,
  burpsuite: SiBurpsuite, ghidra: Binary, wireshark: SiWireshark, kalilinux: SiKalilinux,
  blender: SiBlender, zbrush: Box, substance: Paintbrush,
};

export function Technologies() {
  return (
    <section id="technologies" className="section-shell overflow-hidden" aria-labelledby="technologies-title">
      <SectionReveal className="site-container">
        <div id="technologies-title"><SectionHeading label="Языки и технологии" title="Инструменты, на которых строится работа." description="Языки, фреймворки, базы данных и инфраструктурные инструменты, с помощью которых идеи превращаются в надёжные программные продукты." /></div>
        <Tooltip.Provider delayDuration={250}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {technologies.map((technology) => {
              const Icon = iconMap[technology.icon];
              return (
                <Tooltip.Root key={technology.name}>
                  <Tooltip.Trigger asChild>
                    <motion.div data-reveal tabIndex={0} whileHover={{ borderColor: "rgba(167,139,250,.25)" }} transition={{ duration: 0.2 }} className="group relative min-h-[142px] cursor-default overflow-hidden rounded-2xl border border-white/[.075] bg-white/[.018] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                      <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                      <Icon aria-hidden="true" className="size-7 transition-transform duration-300 group-hover:scale-105" style={{ color: technology.color }} />
                      <div className="mt-8"><p className="text-base font-semibold tracking-[-.02em] text-zinc-100">{technology.name}</p><p className="mt-1.5 text-[.78rem] font-medium uppercase tracking-[.08em] text-zinc-500">{technology.category}</p></div>
                    </motion.div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal><Tooltip.Content sideOffset={8} className="z-[70] rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1.5 text-[.8rem] text-zinc-200 shadow-xl">{technology.name}<Tooltip.Arrow className="fill-zinc-900" /></Tooltip.Content></Tooltip.Portal>
                </Tooltip.Root>
              );
            })}
          </div>
        </Tooltip.Provider>
      </SectionReveal>
    </section>
  );
}
