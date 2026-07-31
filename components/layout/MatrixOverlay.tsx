'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CHARS = 'アカサタナハマヤラワ0123456789ｦｱｳｴｵｶｷｸｹｺ<>{}[]/\\|=+*';
const COLORS = ['#f8ad40', '#56b6c2', '#98c379', '#e5c07b'];

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
    let drops: number[] = [];
    let speeds: number[] = [];
    let cols: string[] = [];
    const fontSize = 22;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.ceil(w / fontSize);
      if (drops.length !== columns) {
        drops = Array.from({ length: columns }, () => Math.floor((-Math.random() * h) / fontSize));
        speeds = Array.from({ length: columns }, () => 0.35 + Math.random() * 0.75);
        cols = Array.from({ length: columns }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
      }
    };
    resize();

    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 60) return;
      last = t;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const py = y * fontSize;
        ctx.fillStyle = py > h - fontSize * 2 ? '#f5f5f5' : cols[i];
        ctx.fillText(char, i * fontSize, py);
        if (py > h && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.35 + Math.random() * 0.75;
          cols[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
        } else {
          drops[i] = y + speeds[i];
        }
      });
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
        setClosing(true);
        closeT = setTimeout(() => exitRef.current(), 800);
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        e.stopPropagation();
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
        return;
      }
      // every other key is blocked while the matrix is running
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
