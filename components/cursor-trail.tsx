"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const points: TrailPoint[] = [];
    let frame = 0;
    let lastX = -100;
    let lastY = -100;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = points.length - 1; index >= 0; index -= 1) {
        const point = points[index];
        point.life -= 0.042;

        if (point.life <= 0) {
          points.splice(index, 1);
          continue;
        }

        context.fillStyle = `rgba(196, 181, 253, ${point.life * 0.88})`;
        context.beginPath();
        context.arc(point.x, point.y, 1.8 + point.life * 2.7, 0, Math.PI * 2);
        context.fill();
      }

      frame = points.length > 0 ? window.requestAnimationFrame(draw) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 5) return;

      lastX = event.clientX;
      lastY = event.clientY;
      points.push({ x: event.clientX, y: event.clientY, life: 1 });
      if (points.length > 28) points.shift();
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />;
}
