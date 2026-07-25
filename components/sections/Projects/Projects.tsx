import { CommandHeader } from '@/components/common/CommandHeader';
import { Section } from '@/components/common/Section';
import { useStrings } from '@/hooks/useStrings';
import { type Category, type Project } from '@/lib/data';
import { byCategory, fuzzy } from '@/lib/helpers';
import type { Ref } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';

interface Props {
  ref?: Ref<HTMLElement>;
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

const catCount = (key: Category | 'all'): number => byCategory(key).length;

const FilterChip = ({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="cursor-pointer rounded-btn border font-mono text-[12px] transition-colors hover:border-orange hover:!text-orange"
    style={{
      padding: '7px 14px',
      background: active ? 'var(--color-orange)' : 'transparent',
      borderColor: active ? 'var(--color-orange)' : '#2a2a2a',
      color: active ? '#000' : '#8a8a8a',
    }}
  >
    {label} <span className="opacity-[.55]">({count})</span>
  </button>
);

export const Projects = ({ ref, projects, cat, onCat, hoverId, expandedId, onEnter, onLeave, onClick, dashSec, searchOpen, onCloseSearch }: Props) => {
  const strings = useStrings();
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
    <Section ref={ref} label="Projects">
      <div className="mb-7.5 flex flex-wrap items-baseline justify-between gap-3.5">
        <CommandHeader command="ls ~/projects" args=" --group-directories-first" heading={strings.hWork} />
        <span className="text-[12px] text-fg-7">{strings.projCount(filtered.length)}</span>
      </div>
      {searchOpen && (
        <div className="mb-6 flex items-center gap-2 rounded-btn border border-orange/40 bg-panel-0 px-3.5 py-2.5">
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
          <span className="shrink-0 text-[11px] text-fg-6">
            {filtered.length} match{filtered.length === 1 ? '' : 'es'}
          </span>
          <button onClick={onCloseSearch} className="shrink-0 cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange">
            ✕
          </button>
        </div>
      )}
      <div className="mb-8 flex flex-wrap gap-2.5">
        {strings.catLabels.map((c) => (
          <FilterChip
            key={c.key}
            label={c.label}
            count={catCount(c.key as Category | 'all')}
            active={cat === c.key}
            onClick={() => onCat(c.key as Category | 'all')}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => {
          const expanded = expandedId === p.id;
          const selected = searchOpen && !!query && idx === selClamped;
          return (
            <ProjectCard
              key={p.id}
              project={p}
              hovering={hoverId === p.id && !expanded}
              forceOrange={expanded || selected}
              dashSec={dashSec}
              onEnter={onEnter}
              onLeave={onLeave}
              onClick={onClick}
            />
          );
        })}
      </div>
      <div className="mt-6.5 text-center text-[12px] text-ghost">{strings.workHint}</div>
    </Section>
  );
};
