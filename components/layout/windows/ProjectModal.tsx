import { projectLinks, type Project, type ProjectLink } from '@/lib/data';
import { slugify, type Strings } from '@/lib/i18n';
import { Body, Heading } from '@/components/common/Typography';
import { ProjectCover } from '@/components/sections/Projects/ProjectCover';

interface Props {
  project: Project;
  closing: boolean;
  strings: Strings;
  onClose: () => void;
}

const Paragraph = ({ text }: { text: string }) => <Body className="m-0">{text}</Body>;

const TechChip = ({ label }: { label: string }) => (
  <span className="rounded-badge border border-[#262626] bg-panel-4 px-2.25 py-1 text-[11px] text-[#aaa]">{label}</span>
);

const ModalLink = ({ link }: { link: ProjectLink }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="border-b border-orange/40 pb-0.75 text-[12px] tracking-[1px] text-orange hover:!text-orange-dark"
  >
    {link.label}
  </a>
);

export const ProjectModal = ({ project, closing, strings, onClose }: Props) => {
  const links = projectLinks(project);
  const path = strings.modalPath(project.title, slugify(project.title));
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/[.85] px-[5vw] py-[5vh]"
      style={{ animation: closing ? 'fadeOutM .2s ease forwards' : 'overlayIn .18s ease forwards', willChange: 'opacity' }}
    >
      <div
        onClick={stop}
        className="max-h-[90vh] w-full max-w-245 overflow-y-auto rounded-modal border border-orange/50 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
        style={{ animation: closing ? 'none' : 'modalPop .22s ease-out forwards', willChange: 'transform, opacity' }}
      >
        <div className="sticky top-0 flex items-center gap-2 border-b border-line-3 bg-panel-6 px-4 py-3">
          <span className="min-w-0 truncate text-[12px] text-fg-3">{path}</span>
          <button
            onClick={onClose}
            className="ml-auto shrink-0 cursor-pointer border-none bg-transparent font-mono text-[16px] text-fg-6 transition-colors hover:text-orange"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8.5 p-7 md:grid-cols-[minmax(240px,460px)_minmax(280px,1fr)]">
          <div className="self-start overflow-hidden rounded-card border border-line-4">
            <ProjectCover project={project} width={460} height={288} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-3.5">
              <Heading variant="modal">{project.title}</Heading>
              <span className="text-[10px] uppercase tracking-[2px] text-orange/80">{strings.catBadge[project.category]}</span>
            </div>
            <div className="my-4 mb-5 flex flex-col gap-2.5">
              {strings.projectDesc(project.id).map((par, i) => (
                <Paragraph key={i} text={par} />
              ))}
            </div>
            <div className="mb-5.5 flex flex-wrap gap-1.75">
              {project.technologies.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
            <div className="flex flex-wrap gap-5.5">
              {links.length > 0 ? (
                links.map((l) => <ModalLink key={l.label} link={l} />)
              ) : (
                <span className="text-[11px] text-fg-7">{strings.privateNote}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
