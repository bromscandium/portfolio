import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { portfolio, type Category, type Project } from '@/lib/data';
import { slugify, type Strings } from '@/lib/i18n';
import type { Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
  projects: Project[];
  totalCount: number;
  cat: Category | 'all';
  onCat: (c: Category | 'all') => void;
  hoverId: number | null;
  expandedId: number | null;
  onEnter: (id: number) => void;
  onLeave: (id: number) => void;
  onClick: (id: number) => void;
  dashSec: string;
  searchOpen: boolean;
  onCloseSearch: () => void;
}

function catCount(key: string): number {
  return key === 'all' ? portfolio.length : portfolio.filter((p) => p.category === key).length;
}

function fuzzy(q: string, text: string): boolean {
  if (!q) return true;
  const query = q.toLowerCase();
  const hay = text.toLowerCase();
  let i = 0;
  for (const ch of hay) {
    if (ch === query[i]) i += 1;
    if (i === query.length) return true;
  }
  return false;
}

export function Work({
  ref,
  human,
  strings,
  projects,
  cat,
  onCat,
  hoverId,
  expandedId,
  onEnter,
  onLeave,
  onClick,
  dashSec,
  searchOpen,
  onCloseSearch,
}: Props) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => (query ? projects.filter((p) => fuzzy(query, `${p.title} ${p.technologies.join(' ')} ${p.category}`)) : projects),
    [query, projects],
  );

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
    }
  }, [searchOpen]);

  const selClamped = Math.min(sel, Math.max(0, filtered.length - 1));

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(Math.min(selClamped + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(Math.max(selClamped - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const p = filtered[selClamped];
      if (p) onClick(p.id);
    }
  };

  return (
    <section ref={ref} data-screen-label="Projects" className="box-border border-t border-line-0 px-[6vw] py-[90px]">
      <div className="mb-[30px] flex flex-wrap items-baseline justify-between gap-[14px]">
        {human ? (
          <h2 className="m-0 font-display text-[30px] font-semibold tracking-[2px] text-fg">{strings.hWork}</h2>
        ) : (
          <div className="text-[14px]">
            <span className="font-bold text-orange">❯ </span>
            <span className="text-[#eee]">l ~/projects</span>
            <span className="text-ghost"> --group-directories-first</span>
          </div>
        )}
        <span className="text-[12px] text-fg-7">{strings.projCount(filtered.length)}</span>
      </div>
      {searchOpen && (
        <div className="mb-6 flex items-center gap-2 rounded-btn border border-orange/40 bg-panel-0 px-[14px] py-[10px]">
          <span className="text-[13px] text-orange">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onSearchKey}
            placeholder="fuzzy search — name, tech, category · ↑↓ enter"
            className="min-w-0 flex-1 border-none bg-transparent font-mono text-[13px] text-fg outline-none placeholder:text-fg-6"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="shrink-0 text-[11px] text-fg-6">{filtered.length} match{filtered.length === 1 ? '' : 'es'}</span>
          <button onClick={onCloseSearch} className="shrink-0 cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange">
            ✕
          </button>
        </div>
      )}
      <div className="mb-8 flex flex-wrap gap-[10px]">
        {strings.catLabels.map((c) => {
          const isActive = cat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => onCat(c.key as Category | 'all')}
              className="cursor-pointer rounded-btn border font-mono text-[12px] transition-colors hover:border-orange hover:!text-orange"
              style={{
                padding: '7px 14px',
                background: isActive ? '#f8ad40' : 'transparent',
                borderColor: isActive ? '#f8ad40' : '#2a2a2a',
                color: isActive ? '#000' : '#8a8a8a',
              }}
            >
              {c.label} <span className="opacity-[.55]">({catCount(c.key)})</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => {
          const expanded = expandedId === p.id;
          const hovering = hoverId === p.id && !expanded;
          const selected = searchOpen && !!query && idx === selClamped;
          const border = expanded || hovering || selected ? 'rgba(248,173,64,.55)' : '#242424';
          return (
            <div
              key={p.id}
              onMouseEnter={() => onEnter(p.id)}
              onMouseLeave={() => onLeave(p.id)}
              onClick={() => onClick(p.id)}
              className="fade-up cursor-pointer overflow-hidden rounded-window bg-panel-1 transition-colors"
              style={{ border: `1px solid ${border}` }}
            >
              <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-[14px] py-[10px]">
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-fg-3">
                  {human ? p.title : `~/projects/${slugify(p.title)}`}
                </span>
                <span className="ml-auto shrink-0 text-[9px] uppercase tracking-[2px] text-orange/80">{strings.catBadge[p.category]}</span>
              </div>
              <div className="relative">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={400}
                  height={250}
                  className="block aspect-[16/10] w-full object-cover"
                />
                {hovering && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/[.65]">
                    <svg width="44" height="44" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#333" strokeWidth="2" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#f8ad40"
                        strokeWidth="2"
                        strokeDasharray="94.25"
                        strokeDashoffset="94.25"
                        style={{ animation: `dashFill ${dashSec} linear forwards` }}
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-[10px] px-4 py-[14px]">
                <span className="font-display text-[17px] font-semibold tracking-[.5px] text-fg">{p.title}</span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-ghost">
                  {p.technologies.slice(0, 2).join(' · ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[26px] text-center text-[12px] text-ghost">{strings.workHint}</div>
    </section>
  );
}
