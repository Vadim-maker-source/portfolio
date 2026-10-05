"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D } from "@react-three/drei";
import { MathUtils, type Group } from "three";

const FONT_PATH = "/fonts/helvetiker_bold.typeface.json";

export function IdentityScene() {
  const story = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateScroll = () => {
      if (!story.current) return;
      const rect = story.current.getBoundingClientRect();
      const distance = Math.max(1, story.current.offsetHeight - window.innerHeight);
      setProgress(MathUtils.clamp(-rect.top / distance, 0, 1));
    };

    updateMotion();
    updateScroll();
    media.addEventListener("change", updateMotion);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div ref={story} className="identity-story">
      <div className="identity-sticky">
        <Canvas
          aria-label="Интерактивный трёхмерный знак V67"
          camera={{ position: [0, 0.1, 10.6], fov: 34, near: 0.1, far: 50 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onPointerMissed={() => setHovered(false)}
          fallback={<div className="grid h-full place-items-center text-white/55">V67</div>}
        >
          <color attach="background" args={["#070707"]} />
          <ambientLight intensity={0.22} />
          <directionalLight position={[-5, 6, 8]} intensity={2.8} />
          <Environment resolution={192}>
            <Lightformer form="rect" intensity={4.5} position={[-5, 5, 6]} scale={[7, 2.4]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={2.1} color="#9b84ff" position={[5, -1.5, 2]} scale={[2.5, 6]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={1.1} position={[0, -5, 4]} scale={[6, 1.5]} target={[0, 0, 0]} />
          </Environment>
          <SculpturalWordmark progress={progress} hovered={hovered} reducedMotion={reducedMotion} onHover={setHovered} />
        </Canvas>

        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="site-container flex h-full flex-col pb-7 pt-24 md:pb-10 md:pt-28">
            <div className="flex justify-between text-xs uppercase tracking-[.08em] text-white/42">
              <span>Инженер программных систем</span>
              <span>Прокрутите страницу ↓</span>
            </div>

            <div className="mt-auto grid gap-7 pt-5 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              <div>
                <p className="mb-2 text-sm text-[#a994ff]">Vadim67okak</p>
                <h1 className="max-w-[850px] text-[clamp(3.45rem,8.25vw,8.25rem)] font-normal leading-[.82] tracking-[-.085em] text-[#f1efe9]">
                  Собираю системы целиком.
                </h1>
              </div>
              <div className="pointer-events-auto lg:pb-1">
                <p className="max-w-[470px] text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.55] text-white/58">
                  Интерфейсы, backend, инфраструктура и безопасность. 3D, mobile и AI дополняют основную инженерную практику.
                </p>
                <div className="mt-6 flex gap-7 text-sm">
                  <a href="#experience" className="catalog-link text-white">Опыт ↓</a>
                  <a href="#contact" className="catalog-link text-white/62 hover:text-white">Контакты ↗</a>
                </div>
              </div>
            </div>

            <div className="mt-7 h-px bg-white/14">
              <div className="h-px bg-[#9175ff] transition-[width] duration-75" style={{ width: `${Math.max(1, progress * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SculpturalWordmark({ progress, hovered, reducedMotion, onHover }: { progress: number; hovered: boolean; reducedMotion: boolean; onHover: (active: boolean) => void }) {
  const root = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!root.current) return;
    const pointerX = reducedMotion ? 0 : state.pointer.x;
    const pointerY = reducedMotion ? 0 : state.pointer.y;
    const targetScale = MathUtils.clamp(state.viewport.width / 15.7, 0.5, 0.78);
    const scrollArc = Math.sin(progress * Math.PI);

    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, -0.07 - pointerY * 0.075 + progress * 0.075, 4, delta);
    root.current.rotation.y = MathUtils.damp(root.current.rotation.y, -0.16 + pointerX * 0.14 + scrollArc * 0.12 + (hovered ? 0.09 : 0), 4, delta);
    root.current.rotation.z = MathUtils.damp(root.current.rotation.z, (progress - 0.5) * -0.035, 4, delta);
    root.current.position.x = MathUtils.damp(root.current.position.x, pointerX * 0.13, 4, delta);
    root.current.position.y = MathUtils.damp(root.current.position.y, 0.58, 5, delta);
    root.current.position.z = MathUtils.damp(root.current.position.z, scrollArc * 0.24, 4, delta);
    root.current.scale.setScalar(MathUtils.damp(root.current.scale.x, targetScale, 5, delta));
  });

  const handleEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHover(true);
    document.body.style.cursor = "pointer";
  };

  const handleLeave = () => {
    onHover(false);
    document.body.style.cursor = "default";
  };

  return (
    <group ref={root} position={[0, 0.58, 0]}>
      <Center>
        <Text3D
          font={FONT_PATH}
          size={3.05}
          height={0.62}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.045}
          bevelSize={0.028}
          bevelOffset={0}
          bevelSegments={6}
          letterSpacing={-0.055}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
        >
          V67
          <meshPhysicalMaterial attach="material-0" color={hovered ? "#eeeaff" : "#d9d6cf"} metalness={0.16} roughness={0.4} clearcoat={0.06} />
          <meshPhysicalMaterial attach="material-1" color={hovered ? "#a78fff" : "#6046b9"} metalness={0.3} roughness={0.32} clearcoat={0.12} />
        </Text3D>
      </Center>
    </group>
  );
}
