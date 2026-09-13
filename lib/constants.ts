export const portfolioConfig = {
  name: "Vadim67okak",
  role: "Software Engineer",
  experience: "3 года",
  socials: { github: "https://github.com/Vadim-maker-source", telegram: "https://t.me/Vadim67okak" },
} as const;

export const navItems = [
  { label: "Обо мне", href: "#about" },
  { label: "Опыт", href: "#experience" },
  { label: "Технологии", href: "#technologies" },
  { label: "Контакты", href: "#contact" },
] as const;

export const expertise = [
  { title: "Frontend", experience: "2 года", technologies: ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS"], description: "Разрабатываю современные адаптивные веб-интерфейсы, переиспользуемые UI-системы, клиентскую логику и интеграции с backend API.", index: "01" },
  { title: "Backend", experience: "2 года", technologies: ["Python", "FastAPI", "Node.js", "NestJS", "WebSocket", "WebRTC", "MySQL", "PostgreSQL", "SQLite"], description: "Создаю backend-сервисы и API, работаю с реляционными данными, real-time коммуникацией через WebSocket и peer-to-peer решениями на WebRTC.", index: "02" },
  { title: "DevOps", experience: "1 год", technologies: ["Docker", "Nginx", "Git", "Linux", "Bash"], description: "Контейнеризирую приложения, настраиваю reverse proxy, разворачиваю сервисы, работаю в Linux-окружении и автоматизирую повседневные процессы.", index: "03" },
  { title: "CyberSecurity", experience: "4 месяца", technologies: ["Burp Suite", "Ghidra", "Wireshark", "Bash", "OSINT", "Криптография", "Форензика"], description: "Развиваю практические знания в анализе веб-приложений, OSINT, криптографии, reverse engineering и цифровой криминалистике.", index: "04" },
  { title: "AI", experience: "2 месяца", technologies: ["AI-инструменты", "Интеграция в продукты", "Прикладные процессы"], description: "Изучаю современные AI-инструменты и практические способы интегрировать интеллектуальные возможности в полезные программные продукты.", index: "05" },
  { title: "Mobile", experience: "2 месяца", technologies: ["Flutter", "Dart"], description: "Изучаю кроссплатформенную мобильную разработку и создаю приложения с помощью Flutter и Dart.", index: "06" },
  { title: "3D-графика", experience: "Практический навык", technologies: ["Blender", "ZBrush", "Substance 3D Painter"], description: "Создаю 3D-модели, работаю со скульптингом, детализацией и текстурированием объектов.", index: "07" },
] as const;

export type TechnologyIcon = "javascript" | "typescript" | "dart" | "python" | "bash" | "cplusplus" | "sqlite" | "postgresql" | "nextjs" | "tailwind" | "fastapi" | "nodejs" | "nestjs" | "docker" | "nginx" | "git" | "linux" | "flutter" | "mysql" | "websocket" | "webrtc" | "burpsuite" | "ghidra" | "wireshark" | "kalilinux" | "blender" | "zbrush" | "substance";

export const technologies: ReadonlyArray<{ name: string; category: string; icon: TechnologyIcon; color: string }> = [
  { name: "JavaScript", category: "Язык", icon: "javascript", color: "#F7DF1E" }, { name: "TypeScript", category: "Язык", icon: "typescript", color: "#3178C6" },
  { name: "Dart", category: "Язык", icon: "dart", color: "#40C4FF" }, { name: "Python", category: "Язык", icon: "python", color: "#FFD43B" },
  { name: "Bash", category: "Скриптинг", icon: "bash", color: "#4EAA25" }, { name: "C++", category: "Язык", icon: "cplusplus", color: "#659AD2" },
  { name: "Next.js", category: "Frontend", icon: "nextjs", color: "#FFFFFF" }, { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", color: "#38BDF8" },
  { name: "FastAPI", category: "Backend", icon: "fastapi", color: "#009688" }, { name: "Node.js", category: "Backend", icon: "nodejs", color: "#5FA04E" },
  { name: "NestJS", category: "Backend", icon: "nestjs", color: "#E0234E" }, { name: "WebSocket", category: "Real-time", icon: "websocket", color: "#A78BFA" },
  { name: "WebRTC", category: "Real-time", icon: "webrtc", color: "#38BDF8" }, { name: "PostgreSQL", category: "Система управления базами данных", icon: "postgresql", color: "#4169E1" },
  { name: "MySQL", category: "Система управления базами данных", icon: "mysql", color: "#4479A1" }, { name: "SQLite", category: "Система управления базами данных", icon: "sqlite", color: "#44A5CB" },
  { name: "Docker", category: "DevOps", icon: "docker", color: "#2496ED" }, { name: "Nginx", category: "DevOps", icon: "nginx", color: "#009639" },
  { name: "Git", category: "Инструмент", icon: "git", color: "#F05032" }, { name: "Linux", category: "Платформа", icon: "linux", color: "#FCC624" },
  { name: "Flutter", category: "Mobile", icon: "flutter", color: "#54C5F8" },
  { name: "Burp Suite", category: "Веб-безопасность", icon: "burpsuite", color: "#FF6633" },
  { name: "Ghidra", category: "Reverse engineering", icon: "ghidra", color: "#EF4444" },
  { name: "Wireshark", category: "Анализ трафика", icon: "wireshark", color: "#1679A7" },
  { name: "Kali Linux", category: "Дистрибутив", icon: "kalilinux", color: "#557C94" },
  { name: "Blender", category: "3D-моделирование", icon: "blender", color: "#E87D0D" },
  { name: "ZBrush", category: "Цифровой скульптинг", icon: "zbrush", color: "#C4B5FD" },
  { name: "Substance 3D Painter", category: "Текстурирование", icon: "substance", color: "#A3E635" },
];
