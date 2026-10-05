"use client";

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
    <section id="technologies" className="section-shell" aria-labelledby="technologies-title">
      <SectionReveal className="site-container">
        <div id="technologies-title">
          <SectionHeading label="Инструменты / 03" title="Инструменты, на которых строится работа." description="Стек от клиентского интерфейса до инфраструктуры, анализа трафика и 3D-производства." />
        </div>
        <div className="grid border-t border-l border-white/14 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((technology) => {
            const Icon = iconMap[technology.icon];
            return (
              <div key={technology.name} data-reveal className="group flex aspect-square min-h-[150px] flex-col justify-between border-r border-b border-white/14 p-4 transition-colors duration-200 hover:bg-white hover:text-black md:p-5">
                <Icon aria-hidden="true" className="size-7 text-white/55 transition-colors group-hover:text-[#7657e8]" />
                <div>
                  <p className="text-base font-semibold tracking-[-.025em]">{technology.name}</p>
                  <p className="mt-1 text-xs leading-4 text-white/35 transition-colors group-hover:text-black/55">{technology.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
