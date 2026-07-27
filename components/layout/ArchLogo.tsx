import { ARCH_LOGO } from '@/lib/config';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PHRASE = 'i use Arch btw';
const ORANGE = '#f8ad40';
const CYAN = '#56b6c2';

interface Particle {
  ch: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  settled: boolean;
}

const Overlay = ({
  iconRef,
  hoverRef,
  onDone,
}: {
  iconRef: React.RefObject<HTMLPreElement | null>;
  hoverRef: React.RefObject<boolean>;
  onDone: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const icon = iconRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !icon) return;

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rect = icon.getBoundingClientRect();
    const startX = rect.right;
    const baseY = rect.top + rect.height / 2;
    const font = '600 14px monospace';
    ctx.font = font;
    const totalW = ctx.measureText(PHRASE).width;
    const floorY = H - 8;

    let phase: 'flying' | 'shatter' | 'dying' = 'flying';
    let x = startX;
    let t = 0;
    let deathStart = 0;
    let particles: Particle[] = [];
    let raf = 0;

    const done = () => {
      cancelAnimationFrame(raf);
      onDone();
    };

    const WAVE = 0.0143;

    const shatter = () => {
      ctx.font = font;
      let cx = x;
      particles = [...PHRASE].map((ch) => {
        const y = baseY + Math.sin(cx * 0.012 + t * WAVE) * 12;
        const p: Particle = { ch, x: cx, y, vx: -0.8 + Math.random() * 1.6, vy: -2 - Math.random() * 1.5, settled: false };
        cx += ctx.measureText(ch).width;
        return p;
      });
      phase = 'shatter';
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = font;
      t++;

      if (phase === 'flying') {
        const dir = hoverRef.current ? 1 : -1;
        x += (dir === 1 ? 2 : 3.5) * dir;
        const appear = Math.max(0, Math.min(1, (x - startX) / 40));
        const grad = ctx.createLinearGradient(x, 0, x + totalW, 0);
        grad.addColorStop(0, ORANGE);
        grad.addColorStop(1, CYAN);
        ctx.save();
        ctx.beginPath();
        ctx.rect(startX, 0, W - startX, H);
        ctx.clip();
        ctx.fillStyle = grad;
        ctx.globalAlpha = appear;
        let cx = x;
        for (const ch of PHRASE) {
          const y = baseY + Math.sin(cx * 0.012 + t * WAVE) * 12;
          ctx.fillText(ch, cx, y);
          cx += ctx.measureText(ch).width;
        }
        ctx.restore();
        if (x + totalW >= W - 4) shatter();
        else if (dir === -1 && x <= startX) return done();
      } else if (phase === 'shatter') {
        for (const p of particles) {
          if (!p.settled) {
            p.vy += 0.14;
            p.x += p.vx;
            p.y += p.vy;
            if (p.y >= floorY) {
              p.y = floorY;
              p.settled = true;
            }
          }
          ctx.fillStyle = ORANGE;
          ctx.fillText(p.ch, p.x, p.y);
        }
        if (particles.every((p) => p.settled)) {
          phase = 'dying';
          deathStart = t;
        }
      } else {
        const sec = (t - deathStart) / 60;
        if (sec >= 6) return done();
        const period = sec < 3 ? 18 : 6;
        if (Math.floor(t / period) % 2 === 0) {
          ctx.fillStyle = ORANGE;
          for (const p of particles) ctx.fillText(p.ch, p.x, p.y);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [iconRef, hoverRef, onDone]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[400]" />;
};

export const ArchLogo = () => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const iconRef = useRef<HTMLPreElement>(null);
  const hoverRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!hover || active) return;
    const timer = setTimeout(() => setActive(true), 2000);
    return () => clearTimeout(timer);
  }, [hover, active]);

  const enter = () => {
    hoverRef.current = true;
    setHover(true);
  };
  const leave = () => {
    hoverRef.current = false;
    setHover(false);
  };

  return (
    <div
      className="absolute bottom-15 left-4 h-24 w-32 cursor-default transition-transform duration-500 ease-out"
      style={{ transform: hover ? 'scale(1.08)' : 'scale(1)' }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <pre
        className="m-0 flex h-full select-none items-center justify-center font-mono text-[10px] font-normal leading-[1.25] transition-opacity duration-500 ease-out"
        style={{ color: 'var(--color-fg-11)', opacity: hover ? 0 : 1 }}
      >
        {ARCH_LOGO}
      </pre>
      <pre
        ref={iconRef}
        className="absolute inset-0 m-0 flex h-full select-none items-center justify-center font-mono text-[10px] font-bold leading-[1.25] transition-opacity duration-500 ease-out"
        style={{
          opacity: hover ? 1 : 0,
          background: `linear-gradient(90deg, ${ORANGE}, ${CYAN}, ${ORANGE})`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'archShimmer 2s linear infinite',
        }}
      >
        {ARCH_LOGO}
      </pre>
      {mounted && active && createPortal(<Overlay iconRef={iconRef} hoverRef={hoverRef} onDone={() => setActive(false)} />, document.body)}
    </div>
  );
};
