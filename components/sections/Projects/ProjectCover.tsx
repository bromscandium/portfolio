'use client';

import type { Project } from '@/lib/data';
import { slugify } from '@/lib/i18n';
import Image from 'next/image';
import { useState } from 'react';

const VERBS = ['feat', 'refactor', 'perf', 'chore', 'fix'];

const seedOf = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const hexAt = (seed: number, i: number): string => (Math.imul(seed ^ (i + 1), 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 7);

const LogLine = ({ hash, verb, tech }: { hash: string; verb: string; tech: string }) => (
  <div className="text-fg-7">
    <span className="text-orange/60">{hash}</span> {verb}: {tech.toLowerCase()}
  </div>
);

const CoverFallback = ({ project }: { project: Project }) => {
  const seed = seedOf(project.title);
  const angle = 15 + (seed % 30);
  const lines = project.technologies.slice(0, 3).map((tech, i) => ({
    hash: hexAt(seed, i),
    verb: VERBS[(seed + i) % VERBS.length],
    tech,
  }));

  return (
    <div className="relative flex aspect-[16/10] w-full select-none flex-col justify-center gap-1 overflow-hidden bg-gradient-to-br from-panel-1 to-[#080808] px-5 font-mono text-[10px] leading-[1.7]">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.07]">
        <defs>
          <pattern id={`grid-${seed}`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="22" stroke="var(--color-orange)" strokeWidth="1" />
            <line x1="0" y1="0" x2="22" y2="0" stroke="var(--color-orange)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>
      <div className="text-fg-9">$ cd ~/projects/{slugify(project.title)}</div>
      <div className="text-fg-9">$ git log --oneline -3</div>
      {lines.map((l) => (
        <LogLine key={l.hash} hash={l.hash} verb={l.verb} tech={l.tech} />
      ))}
      <div className="flex items-center gap-1 text-fg-8">
        <span>$</span>
        <span className="blink inline-block h-[1em] w-1.5 bg-orange/70" aria-hidden="true" />
      </div>
    </div>
  );
};

export const ProjectCover = ({ project, width, height }: { project: Project; width: number; height: number }) => {
  const [errored, setErrored] = useState(false);
  if (errored) return <CoverFallback project={project} />;
  return (
    <Image
      src={project.image}
      alt={project.title}
      width={width}
      height={height}
      onError={() => setErrored(true)}
      className="block aspect-[16/10] w-full object-cover brightness-[.82]"
    />
  );
};
