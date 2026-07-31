'use client';

import { mailto, openUrl } from '@/lib/helpers';
import { HIRE_COPY } from '@/lib/i18n';
import { useTerminal } from '@/store/terminal';
import { useRef, useState } from 'react';

const CHIPS = ['Next.js', 'Python', 'Docker', 'PostgreSQL', 'CI/CD'];
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const Chip = ({ label }: { label: string }) => <span className="border border-green/30 px-2 py-0.5 text-[10px] tracking-[0.03em] text-green">{label}</span>;

export const HireCheck = () => {
  const lang = useTerminal((s) => s.lang);
  const human = useTerminal((s) => s.mode === 'human');
  const attempts = useTerminal((s) => s.hireAttempts);
  const c = HIRE_COPY[lang];
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);

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
      useTerminal.getState().bumpHireAttempts();
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
  const reject = () => {
    setActive(true);
    setClicked(true);
    useTerminal.getState().bumpHireAttempts();
    useTerminal.getState().setBaited(true);
  };
  const noLabel = c.noLabels[Math.min(attempts, c.noLabels.length - 1)];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 font-mono text-[14px]">
        <span className="font-bold text-orange">❯ </span>
        <span className="text-[#eee]">./hire-me</span>
      </div>
      <div
        ref={formRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative flex min-h-72 flex-1 flex-col overflow-hidden rounded-modal border border-line-3 bg-panel-1 transition-colors duration-300 hover:border-orange"
      >
        <div className="border-b border-line-3 bg-panel-6 px-4 py-3 text-[11px] tracking-[0.06em] text-fg-6">{c.title}</div>

        <div className="flex flex-1 flex-col px-6 py-5">
          <div className="text-[11px] text-fg-6">{c.stats}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {CHIPS.map((chip) => (
              <Chip key={chip} label={chip} />
            ))}
          </div>

          <div className="mt-6 text-[14px] text-fg">
            <span className="text-green">❯</span> {c.prompt}
          </div>
          <div className="mt-1 text-[12px] leading-[1.6] text-fg-6">{c.sub}</div>
          {clicked && <div className="mt-3 text-[12px] leading-[1.6] text-[#e06c75]">{c.clickTaunt}</div>}

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
              onClick={reject}
              onKeyDown={(e) => {
                if (e.key === 'n' || e.key === 'N') reject();
              }}
              className="w-28 rounded-btn border border-line-6 bg-transparent px-5 py-3 text-[13px] text-fg-5 transition-colors hover:border-[#e06c75]"
            >
              {noLabel}
            </button>
          </div>

          <div className="mt-4 flex min-h-8 items-center justify-between gap-3 text-[11px]">
            <span className="text-fg-8" style={{ opacity: attempts > 0 ? 1 : 0 }}>
              {c.attempts(attempts)}
            </span>
            <span className="text-right text-yellow transition-opacity duration-300" style={{ opacity: active ? 1 : 0 }} aria-hidden={!active}>
              {human ? c.cancelHuman : c.cancelDev}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
