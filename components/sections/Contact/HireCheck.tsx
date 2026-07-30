'use client';

import { mailto, openUrl } from '@/lib/helpers';
import { HIRE_COPY } from '@/lib/i18n';
import { useTerminal } from '@/store/terminal';
import { useState } from 'react';

export const HireCheck = () => {
  const lang = useTerminal((s) => s.lang);
  const c = HIRE_COPY[lang];
  const [covered, setCovered] = useState(false);

  const tryNo = () => {
    if (covered) return;
    setCovered(true);
    useTerminal.getState().setBaited(true);
  };

  const hire = () => {
    openUrl(mailto('hire form', lang));
    useTerminal.getState().showToast(lang === 'uk' ? 'чудовий вибір ✓' : 'excellent choice ✓');
  };

  return (
    <div className="w-full rounded-card border border-line-2 bg-panel-0 px-6 py-6">
      <div className="mb-1 text-[14px] text-fg">
        <span className="text-green">❯</span> {c.prompt}
      </div>
      <div className="mb-7 text-[12px] leading-[1.6] text-fg-6">{c.sub}</div>
      <div className="relative h-13 w-64">
        <button
          onClick={hire}
          style={{ transform: covered ? 'translateX(144px)' : 'translateX(0)' }}
          className="absolute left-0 top-0 z-20 w-28 cursor-pointer rounded-btn border-none bg-orange px-5 py-3 text-[13px] font-bold text-black transition-transform duration-300 ease-out hover:bg-orange-dark"
        >
          {c.yes}
        </button>
        <button
          onClick={tryNo}
          onPointerEnter={tryNo}
          className="absolute left-36 top-0 z-10 w-28 cursor-pointer rounded-btn border border-line-6 bg-transparent px-5 py-3 text-[13px] text-fg-5 transition-colors hover:border-[#e06c75]"
        >
          {c.no}
        </button>
      </div>
      {covered && <div className="mt-7 text-[12px] leading-[1.7] text-yellow">{c.cancelNote}</div>}
    </div>
  );
};
