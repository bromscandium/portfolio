import Image from 'next/image';
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
}

function catCount(key: string): number {
  return key === 'all' ? portfolio.length : portfolio.filter((p) => p.category === key).length;
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
}: Props) {
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
        <span className="text-[12px] text-fg-7">{strings.projCount(projects.length)}</span>
      </div>
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
        {projects.map((p) => {
          const expanded = expandedId === p.id;
          const hovering = hoverId === p.id && !expanded;
          const border = expanded || hovering ? 'rgba(248,173,64,.55)' : '#242424';
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
