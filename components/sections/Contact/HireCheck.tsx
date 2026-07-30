'use client';

import { mailto, openUrl } from '@/lib/helpers';
import { HIRE_COPY } from '@/lib/i18n';
import { useTerminal } from '@/store/terminal';
import { useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const HireCheck = () => {
  const lang = useTerminal((s) => s.lang);
  const human = useTerminal((s) => s.mode === 'human');
  const c = HIRE_COPY[lang];
  const [active, setActive] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const home = useRef({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    const form = formRef.current;
    const hire = hireRef.current;
    const no = noRef.current;
    if (!form || !hire || !no) return;

    const fr = form.getBoundingClientRect();
    const hr = hire.getBoundingClientRect();
    if (!active) home.current = { x: hr.left + hr.width / 2, y: hr.top + hr.height / 2 };
    const h = home.current;

    const nr = no.getBoundingClientRect();
    const near = Math.hypot(e.clientX - (nr.left + nr.width / 2), e.clientY - (nr.top + nr.height / 2)) < 60;
    if (near && !active) {
      setActive(true);
      useTerminal.getState().setBaited(true);
    }
    if (near || active) {
      const tx = clamp(e.clientX - h.x, fr.left + hr.width / 2 - h.x, fr.right - hr.width / 2 - h.x);
      const ty = clamp(e.clientY - h.y, fr.top + hr.height / 2 - h.y, fr.bottom - hr.height / 2 - h.y);
      hire.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  };

  const onLeave = () => {
    setActive(false);
    if (hireRef.current) hireRef.current.style.transform = '';
  };

  const hire = () => openUrl(mailto('hire form', lang));

  return (
    <div
      ref={formRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex h-full min-h-72 flex-col rounded-card border border-line-2 bg-panel-0 px-6 py-6"
    >
      <div className="text-[14px] text-fg">
        <span className="text-green">❯</span> {c.prompt}
      </div>
      <div className="mt-1 text-[12px] leading-[1.6] text-fg-6">{c.sub}</div>

      <div className="mt-auto flex h-14 items-end gap-4">
        <button
          ref={hireRef}
          onClick={hire}
          className="relative z-20 w-28 cursor-pointer rounded-btn border-none bg-orange px-5 py-3 text-[13px] font-bold text-black transition-transform duration-200 ease-out hover:bg-orange-dark"
        >
          {c.yes}
        </button>
        <button
          ref={noRef}
          className="w-28 rounded-btn border border-line-6 bg-transparent px-5 py-3 text-[13px] text-fg-5 transition-colors hover:border-[#e06c75]"
        >
          {c.no}
        </button>
      </div>

      <div
        className="mt-5 min-h-8 text-[12px] leading-[1.7] text-yellow transition-opacity duration-300"
        style={{ opacity: active ? 1 : 0 }}
        aria-hidden={!active}
      >
        {human ? c.cancelHuman : c.cancelDev}
      </div>
    </div>
  );
};
