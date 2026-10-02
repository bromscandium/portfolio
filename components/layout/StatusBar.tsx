import { SHELL } from '@/lib/config';
import { useEffect, useState } from 'react';

const useClock = () => {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
};

interface Props {
  activeIdx: number;
  activeName: string;
  viewValue: string;
  viewHover: boolean;
  onViewEnter: () => void;
  onViewLeave: () => void;
  onViewClick: () => void;
  langValue: string;
  langHover: boolean;
  onLangEnter: () => void;
  onLangLeave: () => void;
  onLangClick: () => void;
  themeValue: string;
  themeHover: boolean;
  onThemeEnter: () => void;
  onThemeLeave: () => void;
  onThemeClick: () => void;
}

export const StatusBar = ({
  activeIdx,
  activeName,
  viewValue,
  viewHover,
  onViewEnter,
  onViewLeave,
  onViewClick,
  langValue,
  langHover,
  onLangEnter,
  onLangLeave,
  onLangClick,
  themeValue,
  themeHover,
  onThemeEnter,
  onThemeLeave,
  onThemeClick,
}: Props) => {
  const clock = useClock();
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] flex h-6.5 items-center justify-between gap-3 border-t border-line-3 bg-panel-3 px-4 text-[11px] text-fg-6">
      <span className="min-w-0 truncate whitespace-nowrap">
        <span className="text-orange">[{activeIdx}]</span> {activeName}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
        <button
          onClick={onViewClick}
          onMouseEnter={onViewEnter}
          onMouseLeave={onViewLeave}
          title="switch view"
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
          style={{ color: viewHover ? 'var(--color-orange)' : 'var(--color-fg-6)' }}
        >
          {viewValue}
        </button>
        <span className="mx-2 text-fg-10">·</span>
        <button
          onClick={onLangClick}
          onMouseEnter={onLangEnter}
          onMouseLeave={onLangLeave}
          title="switch language"
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
          style={{ color: langHover ? 'var(--color-orange)' : 'var(--color-fg-6)' }}
        >
          {langValue}
        </button>
        <span className="mx-2 text-fg-10">·</span>
        <button
          onClick={onThemeClick}
          onMouseEnter={onThemeEnter}
          onMouseLeave={onThemeLeave}
          title="switch theme"
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
          style={{ color: themeHover ? 'var(--color-orange)' : 'var(--color-fg-6)' }}
        >
          {themeValue}
        </button>
        <span className="hidden sm:inline">&nbsp;· Arch · {SHELL} · spaceship</span>
        {clock && <span className="ml-2 hidden text-fg-8 tabular-nums sm:inline">· {clock}</span>}
      </span>
    </div>
  );
};
