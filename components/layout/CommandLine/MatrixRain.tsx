import { useEffect, useRef } from 'react';

const CHARS = 'アカサタナハマヤラワ0123456789ｦｱｳｴｵｶｷｸｹｺ<>{}[]/\\|=+*';

export const MatrixRain = ({ onExit }: { onExit: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const fontSize = 14;
    const columns = Math.ceil(parent.clientWidth / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor((-Math.random() * parent.clientHeight) / fontSize));

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, parent.clientWidth, parent.clientHeight);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        ctx.fillStyle = y * fontSize > parent.clientHeight - fontSize * 2 ? '#d7ffe0' : '#28c840';
        ctx.fillText(char, x, y * fontSize);
        if (y * fontSize > parent.clientHeight && Math.random() > 0.975) drops[i] = 0;
        else drops[i] = y + 1;
      });
    };

    const id = setInterval(draw, 55);
    window.addEventListener('resize', resize);
    const exit = () => onExit();
    window.addEventListener('keydown', exit);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', exit);
    };
  }, [onExit]);

  return (
    <div className="relative flex-1 cursor-pointer overflow-hidden bg-[#0a0a0a]" onClick={onExit}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[11px] text-green/70">press any key to exit</span>
    </div>
  );
};
