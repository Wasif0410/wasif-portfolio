"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Point = { x: number; y: number; pressure: number };
type Stroke = {
  points: Point[];
  startedAt: number;
  endedAt: number | null;
};

const HOLD_MS = 600;
const FADE_MS = 5500;
const MIN_ALPHA = 0.006;
const MAX_STROKES = 48;
const POINT_STEP = 4;

type HeroDrawingLayerProps = {
  children: ReactNode;
};

function easeOutFade(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return Math.pow(1 - clamped, 2.4);
}

function strokeAlpha(stroke: Stroke, now: number, isActive: boolean) {
  if (isActive) return 1;

  const fadeStart = stroke.endedAt ?? stroke.startedAt;
  const age = now - fadeStart;

  if (age < HOLD_MS) return 1;

  return easeOutFade((age - HOLD_MS) / FADE_MS);
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + seed * 0.137) * 43758.5453;
  return value - Math.floor(value);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function averagePressure(points: Point[]) {
  if (points.length === 0) return 0.7;
  return points.reduce((sum, point) => sum + point.pressure, 0) / points.length;
}

export function HeroDrawingLayer({ children }: HeroDrawingLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const activeStrokeRef = useRef<Stroke | null>(null);
  const pointerRef = useRef({ inside: false });
  const frameRef = useRef<number>(0);
  const lastPointRef = useRef<Point | null>(null);
  const containerRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateRect = () => {
      containerRectRef.current = container.getBoundingClientRect();
    };

    const resize = () => {
      updateRect();
      const rect = containerRectRef.current;
      if (!rect) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getPoint = (clientX: number, clientY: number, prev: Point | null): Point => {
      const rect = containerRectRef.current ?? container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      let pressure = 0.78;
      if (prev) {
        const speed = Math.hypot(x - prev.x, y - prev.y);
        pressure = Math.min(1, Math.max(0.45, 1.05 - speed / 26));
      }

      return { x, y, pressure };
    };

    const tracePath = (points: Point[]) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (points.length === 2) {
        ctx.lineTo(points[1].x, points[1].y);
        return;
      }

      for (let i = 1; i < points.length - 1; i += 1) {
        const current = points[i];
        const next = points[i + 1];
        ctx.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
      }

      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
    };

    const drawPencilStroke = (stroke: Stroke, now: number, isActive: boolean) => {
      const points = stroke.points;
      if (points.length < 2) return;

      const fade = strokeAlpha(stroke, now, isActive);
      if (fade < MIN_ALPHA) return;

      const pressure = averagePressure(points);
      const baseWidth = 1.2 + pressure * 2;
      const seedBase = stroke.startedAt * 0.001;

      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      tracePath(points);

      ctx.strokeStyle = `rgba(0, 0, 0, ${fade * 0.14})`;
      ctx.lineWidth = baseWidth + 2.8;
      ctx.stroke();

      tracePath(points);
      ctx.strokeStyle = `rgba(0, 0, 0, ${fade * 0.82})`;
      ctx.lineWidth = baseWidth;
      ctx.stroke();

      tracePath(points);
      ctx.strokeStyle = `rgba(0, 0, 0, ${fade * 0.95})`;
      ctx.lineWidth = Math.max(0.8, baseWidth * 0.45);
      ctx.stroke();

      const grainStep = isActive ? 10 : 6;
      for (let i = 0; i < points.length; i += grainStep) {
        const point = points[i];
        const seed = seedBase + i * 3.1;

        if (pseudoRandom(seed) > 0.62) continue;

        const gx = point.x + (pseudoRandom(seed + 1) - 0.5) * 1.6;
        const gy = point.y + (pseudoRandom(seed + 2) - 0.5) * 1.6;
        const gr = 0.2 + pseudoRandom(seed + 3) * 0.45;

        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 0, 0, ${fade * point.pressure * (0.2 + pseudoRandom(seed + 4) * 0.35)})`;
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!isActive) {
        for (let i = 0; i < points.length - 1; i += 8) {
          const point = points[i];
          const seed = seedBase + i * 7.3;
          if (pseudoRandom(seed) > 0.6) continue;

          const angle = pseudoRandom(seed + 1) * Math.PI;
          const len = 1.2 + pseudoRandom(seed + 2) * 2;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x + Math.cos(angle) * len, point.y + Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(0, 0, 0, ${fade * point.pressure * 0.16})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const pushInterpolatedPoints = (target: Point) => {
      const stroke = activeStrokeRef.current;
      if (!stroke) return;

      const last = stroke.points[stroke.points.length - 1];
      if (!last) {
        stroke.points.push(target);
        lastPointRef.current = target;
        return;
      }

      const dist = Math.hypot(target.x - last.x, target.y - last.y);
      if (dist < 0.75) return;

      if (dist <= POINT_STEP) {
        stroke.points.push(target);
        lastPointRef.current = target;
        return;
      }

      const steps = Math.ceil(dist / POINT_STEP);
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        stroke.points.push({
          x: lerp(last.x, target.x, t),
          y: lerp(last.y, target.y, t),
          pressure: lerp(last.pressure, target.pressure, t),
        });
      }

      lastPointRef.current = target;
    };

    const startStroke = (point: Point) => {
      activeStrokeRef.current = {
        points: [point],
        startedAt: Date.now(),
        endedAt: null,
      };
      lastPointRef.current = point;
    };

    const endStroke = () => {
      const stroke = activeStrokeRef.current;
      if (stroke && stroke.points.length > 1) {
        stroke.endedAt = Date.now();
        strokesRef.current.push(stroke);
        if (strokesRef.current.length > MAX_STROKES) {
          strokesRef.current.splice(0, strokesRef.current.length - MAX_STROKES);
        }
      }
      activeStrokeRef.current = null;
      lastPointRef.current = null;
    };

    const render = () => {
      const now = Date.now();
      const rect = containerRectRef.current ?? container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      strokesRef.current = strokesRef.current.filter(
        (stroke) => strokeAlpha(stroke, now, false) >= MIN_ALPHA,
      );

      for (const stroke of strokesRef.current) {
        drawPencilStroke(stroke, now, false);
      }

      if (activeStrokeRef.current) {
        drawPencilStroke(activeStrokeRef.current, now, true);
      }

      frameRef.current = requestAnimationFrame(render);
    };

    const isInside = (clientX: number, clientY: number) => {
      const rect = containerRectRef.current ?? container.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const handlePointerSample = (clientX: number, clientY: number) => {
      const prev = lastPointRef.current;
      const point = getPoint(clientX, clientY, prev);

      if (!activeStrokeRef.current) {
        startStroke(point);
      } else {
        pushInterpolatedPoints(point);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      updateRect();

      const samples =
        typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];

      let sawInside = false;

      for (const sample of samples) {
        if (!isInside(sample.clientX, sample.clientY)) continue;
        sawInside = true;
        handlePointerSample(sample.clientX, sample.clientY);
      }

      if (!sawInside && pointerRef.current.inside) {
        endStroke();
      }

      pointerRef.current.inside = sawInside;
    };

    const onPointerDown = (event: PointerEvent) => {
      updateRect();
      if (!isInside(event.clientX, event.clientY)) return;
      handlePointerSample(event.clientX, event.clientY);
      pointerRef.current.inside = true;
    };

    const onPointerUp = () => {
      endStroke();
      pointerRef.current.inside = false;
    };

    const onPointerLeave = () => {
      endStroke();
      pointerRef.current.inside = false;
    };

    resize();
    frameRef.current = requestAnimationFrame(render);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-drawing-layer relative min-h-screen w-full">
      <canvas
        ref={canvasRef}
        className="hero-sketch-canvas pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div className="relative z-[2] flex w-full justify-center">{children}</div>
    </div>
  );
}
