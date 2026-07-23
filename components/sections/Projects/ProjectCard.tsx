import Image from 'next/image';
import type { Project } from '@/lib/data';
import { slugify } from '@/lib/i18n';

interface Props {
  project: Project;
  human: boolean;
  catBadge: string;
  hovering: boolean;
  forceOrange: boolean;
  dashSec: string;
  onEnter: (id: number) => void;
  onLeave: (id: number) => void;
  onClick: (id: number) => void;
}

export const ProjectCard = ({ project, human, catBadge, hovering, forceOrange, dashSec, onEnter, onLeave, onClick }: Props) => {
  const enter = () => onEnter(project.id);
  const leave = () => onLeave(project.id);
  const click = () => onClick(project.id);

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={click}
      className={`fade-up cursor-pointer overflow-hidden rounded-window border bg-panel-1 transition-colors ${
        forceOrange ? 'border-orange/55' : 'border-line-4 hover:border-orange/55'
      }`}
    >
      <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-3.5 py-2.5">
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-fg-3">
          {human ? project.title : `~/projects/${slugify(project.title)}`}
        </span>
        <span className="ml-auto shrink-0 text-[9px] uppercase tracking-[2px] text-orange/80">{catBadge}</span>
      </div>
      <div className="relative">
        <Image src={project.image} alt={project.title} width={400} height={250} className="block aspect-[16/10] w-full object-cover" />
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
      <div className="flex items-baseline justify-between gap-2.5 px-4 py-3.5">
        <span className="font-display text-[17px] font-semibold tracking-[.5px] text-fg">{project.title}</span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-ghost">
          {project.technologies.slice(0, 2).join(' · ')}
        </span>
      </div>
    </div>
  );
};
