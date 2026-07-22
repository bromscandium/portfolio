import Image from 'next/image';
import { projectLinks, type Project } from '@/lib/data';
import { slugify, type Strings } from '@/lib/i18n';

interface Props {
  project: Project;
  closing: boolean;
  strings: Strings;
  onClose: () => void;
}

export function ProjectModal({ project, closing, strings, onClose }: Props) {
  const links = projectLinks(project);
  const path = strings.modalPath(project.title, slugify(project.title));

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/[.82] px-[5vw] py-[5vh] backdrop-blur-[4px]"
      style={{ animation: closing ? 'fadeOutM .24s ease forwards' : 'fadeUp .25s ease-out forwards' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-[980px] overflow-y-auto rounded-modal border border-orange/50 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
      >
        <div className="sticky top-0 flex items-center gap-2 border-b border-line-3 bg-panel-6 px-4 py-3">
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-fg-3">{path}</span>
          <button
            onClick={onClose}
            className="ml-auto shrink-0 cursor-pointer border-none bg-transparent font-mono text-[16px] text-fg-6 transition-colors hover:text-orange"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 gap-[34px] p-7 md:grid-cols-[minmax(240px,460px)_minmax(280px,1fr)]">
          <div className="self-start overflow-hidden rounded-card border border-line-4">
            <Image
              src={project.image}
              alt={project.title}
              width={460}
              height={288}
              className="block aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-[14px]">
              <span className="font-display text-[28px] font-semibold tracking-[1px] text-fg">{project.title}</span>
              <span className="text-[10px] uppercase tracking-[2px] text-orange/80">{strings.catBadge[project.category]}</span>
            </div>
            <div className="my-4 mb-5 flex flex-col gap-[10px]">
              {project.description.map((par, i) => (
                <p key={i} className="m-0 text-[13.5px] leading-[1.65] text-fg-2">
                  {par}
                </p>
              ))}
            </div>
            <div className="mb-[22px] flex flex-wrap gap-[7px]">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-badge border border-[#262626] bg-panel-4 px-[9px] py-1 text-[11px] text-[#aaa]">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-[22px]">
              {links.length > 0 ? (
                links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-orange/40 pb-[3px] text-[12px] tracking-[1px] text-orange hover:!text-orange-dark"
                  >
                    {l.label}
                  </a>
                ))
              ) : (
                <span className="text-[11px] text-fg-7">{strings.privateNote}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
