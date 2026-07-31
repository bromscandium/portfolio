'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789:."=*+-<>¦｜╌';
const WORDS = ['HIRE ME', 'bromscandium', 'yaroslav', 'fullstack', 'i use arch btw', 'ukraine', 'swe', 'development', 'terminal'];
const COLORS = ['#f8ad40', '#56b6c2', '#98c379', '#e5c07b'];
const FONT = 18;

const rand = (s: string) => s[Math.floor(Math.random() * s.length)];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

// char of word `w` at stream position `idx`, with `gap` blank rows between repeats
const wordChar = (w: string, idx: number, gap: number): string => {
  const cyc = w.length + gap;
  const p = ((idx % cyc) + cyc) % cyc;
  return p < w.length ? w[p] : '';
};

export const MatrixOverlay = ({ onExit }: { onExit: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [closing, setClosing] = useState(false);
  const [shown, setShown] = useState(false);
  const [hint, setHint] = useState(true);
  const exitRef = useRef(onExit);
  useEffect(() => {
    exitRef.current = onExit;
  }, [onExit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const fadeIn = requestAnimationFrame(() => setShown(true));

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    let y: number[] = [];
    let li: number[] = [];
    let lastRow: number[] = [];
    let speeds: number[] = [];
    let cols: string[] = [];
    let gaps: number[] = [];
    let words: (string | null)[] = [];

    const spawn = (i: number, top = false) => {
      y[i] = top ? Math.floor((-Math.random() * h) / FONT) : 0;
      lastRow[i] = Math.floor(y[i]);
      li[i] = Math.floor(Math.random() * 40);
      speeds[i] = 0.35 + Math.random() * 0.7;
      cols[i] = pick(COLORS);
      gaps[i] = 4 + Math.floor(Math.random() * 6);
      words[i] = Math.random() < 0.12 ? pick(WORDS) : null; // rare word columns
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(w / FONT);
      if (y.length !== n) {
        y = new Array(n);
        li = new Array(n);
        lastRow = new Array(n);
        speeds = new Array(n);
        cols = new Array(n);
        gaps = new Array(n);
        words = new Array(n);
        for (let i = 0; i < n; i++) spawn(i, true);
      }
    };
    resize();

    let draining = false;
    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50) return;
      last = t;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FONT}px monospace`;

      for (let i = 0; i < y.length; i++) {
        const row = Math.floor(y[i]);
        if (row !== lastRow[i]) {
          li[i] += 1;
          lastRow[i] = row;
        }
        const word = words[i];
        const head = word ? wordChar(word, li[i], gaps[i]) : rand(CHARS);
        const x = i * FONT;
        const py = row * FONT;

        if (head) {
          const body = word ? wordChar(word, li[i] - 1, gaps[i]) : rand(CHARS);
          if (body) {
            ctx.globalAlpha = 0.5 + Math.random() * 0.5;
            ctx.fillStyle = cols[i];
            ctx.fillText(body, x, py - FONT);
          }
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#dfffe6';
          ctx.fillStyle = '#f6fff8';
          ctx.fillText(head, x, py);
          ctx.shadowBlur = 0;
        }

        if (py > h) {
          if (draining) continue;
          if (Math.random() > 0.975) spawn(i);
          else y[i] += speeds[i];
        } else y[i] += speeds[i];
      }
    };
    raf = requestAnimationFrame(draw);

    let hintT: ReturnType<typeof setTimeout>;
    const showHint = () => {
      setHint(true);
      clearTimeout(hintT);
      hintT = setTimeout(() => setHint(false), 2500);
    };
    showHint();

    let closeT: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        draining = true;
        setClosing(true);
        closeT = setTimeout(() => exitRef.current(), 1000);
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        e.stopPropagation();
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', showHint);
    window.addEventListener('keydown', onKey, true);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeIn);
      clearTimeout(hintT);
      clearTimeout(closeT);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', showHint);
      window.removeEventListener('keydown', onKey, true);
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[800] bg-black transition-opacity duration-700 ease-out"
      style={{ opacity: closing || !shown ? 0 : 1, touchAction: 'none' }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <span
        className="pointer-events-none fixed bottom-5 right-6 font-mono text-[12px] tracking-[1px] text-fg-4 transition-opacity duration-700"
        style={{ opacity: hint && !closing ? 1 : 0 }}
      >
        press esc to exit · f for fullscreen
      </span>
    </div>,
    document.body,
  );
};
