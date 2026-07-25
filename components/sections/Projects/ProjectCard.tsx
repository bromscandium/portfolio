import { Heading } from '@/components/common/Typography';
import { useHuman, useStrings } from '@/hooks/useStrings';
import type { Project } from '@/lib/data';
import { projectPath } from '@/lib/helpers';
import { ProjectCover } from './ProjectCover';

interface Props {
  project: Project;
  hovering: boolean;
  forceOrange: boolean;
  dashSec: string;
  onEnter: (id: number) => void;
  onLeave: (id: number) => void;
  onClick: (id: number) => void;
}

export const ProjectCard = ({ project, hovering, forceOrange, dashSec, onEnter, onLeave, onClick }: Props) => {
  const human = useHuman();
  const catBadge = useStrings().catBadge[project.category];
  const enter = () => onEnter(project.id);
  const leave = () => onLeave(project.id);
  const click = () => onClick(project.id);

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={click}
      className={`cursor-pointer overflow-hidden rounded-window border bg-panel-1 transition-colors ${
        forceOrange ? 'border-orange/55' : 'border-line-4 hover:border-orange/55 active:border-orange/55'
      }`}
    >
      <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-3.5 py-2.5">
        <span className="min-w-0 truncate text-[11px] text-fg-3">{human ? project.title : projectPath(project.title)}</span>
        <span className="ml-auto shrink-0 text-[9px] uppercase tracking-[2px] text-orange/80">{catBadge}</span>
      </div>
      <div className="relative">
        <ProjectCover project={project} width={400} height={250} />
        {hovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/[.65]">
            <svg width="44" height="44" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#333" strokeWidth="2" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="var(--color-orange)"
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
        <Heading variant="card">{project.title}</Heading>
        <span className="truncate text-[10px] text-ghost">{project.technologies.slice(0, 2).join(' · ')}</span>
      </div>
    </div>
  );
};
