import { Body, Heading } from '@/components/common/Typography';
import { useHuman, useStrings } from '@/hooks/useStrings';
import { prUrl } from '@/lib/config';
import { portfolio } from '@/lib/data';
import type { Education, Hackathon, Job, ProjectLink } from '@/lib/types';
import { useTerminal } from '@/store/terminal';
import { useState } from 'react';

const Point = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const i = text.indexOf(': ');
  if (i <= 0) {
    return (
      <Body as="div" className="flex gap-3 !leading-[1.6]">
        <span className="text-fg-9">│</span>
        <span>{text}</span>
      </Body>
    );
  }

  const toggle = () => setOpen((was) => !was);
  const height = open ? 'max-h-80' : 'max-h-[1.6em] group-hover:max-h-80';
  const fade = open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    <div className="group cursor-pointer" onClick={toggle}>
      <Body as="div" className="flex gap-3 !leading-[1.6]">
        <span className="text-fg-9 transition-colors group-hover:text-orange">│</span>
        <span className={`block overflow-hidden transition-[max-height] duration-300 ease-out ${height}`}>
          <span className="font-semibold text-fg-2">{text.slice(0, i)}</span>
          <span className={`transition-opacity duration-300 ease-out ${fade}`}>
            <span className="font-semibold text-fg-2">: </span>
            {text.slice(i + 2)}
          </span>
        </span>
      </Body>
    </div>
  );
};

const RefLink = ({ link }: { link: ProjectLink }) => (
  <a href={link.href} target="_blank" rel="noopener noreferrer" className="border-b border-orange/40 pb-0.25 text-[12px] text-orange hover:!text-orange-dark">
    {link.label}
  </a>
);

const SHIMMER = {
  background: 'linear-gradient(90deg, var(--color-orange), var(--color-cyan-img), var(--color-orange))',
  backgroundSize: '200% 100%',
  animation: 'archShimmer 2s linear infinite',
} as const;

const SEEKING = {
  ...SHIMMER,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const;

const dotStyle = (job: Job, index: number) =>
  job.seeking ? { ...SHIMMER, borderColor: 'transparent' } : { background: index === 0 ? 'var(--color-orange)' : 'var(--color-bg)' };

const OrgName = ({ job }: { job: Job }) => (
  <span className="font-light text-fg-3">
    {' — '}
    {job.orgLink ? (
      <a href={job.orgLink} target="_blank" rel="noopener noreferrer" className="text-fg-3 hover:!text-orange">
        {job.org}
      </a>
    ) : (
      job.org
    )}
  </span>
);

const ProjectRef = ({ id }: { id: number }) => {
  const project = portfolio.find((p) => p.id === id);
  if (!project) return null;

  const open = () => useTerminal.getState().openProject(id);

  return (
    <button
      onClick={open}
      className="cursor-pointer border-0 border-b border-solid border-orange/40 bg-transparent p-0 pb-0.25 font-mono text-[12px] text-orange hover:!text-orange-dark"
    >
      {project.title}
    </button>
  );
};

const PrBadge = ({ n }: { n: number }) => (
  <a href={prUrl(n)} target="_blank" rel="noopener noreferrer" className="text-green hover:!text-orange">
    (PR #{n} open)
  </a>
);

export const JobEntry = ({ job, index }: { job: Job; index: number }) => {
  const human = useHuman();
  const copy = useStrings().jobCopy(job.hash);
  return (
    <div className="grid grid-cols-[26px_1fr] gap-4.5">
      <div className="flex flex-col items-center">
        <span className="mt-1.5 h-2.75 w-2.75 rounded-full border-2 border-orange" style={dotStyle(job, index)} />
        <span className="w-px flex-1 bg-line-4" />
      </div>
      <div className="pb-11">
        <div className="flex flex-wrap items-baseline gap-3 text-[13px]">
          {!human && <span className="font-semibold text-orange">{job.hash}</span>}
          <span className="text-yellow">{job.period}</span>
          <span className="text-ghost">{copy.loc}</span>
          {job.pr ? <PrBadge n={job.pr} /> : !human && index === 0 && <span className="text-green">(HEAD -&gt; main)</span>}
        </div>
        <Heading variant="role" as="div" className="mt-2.5">
          <span className={job.seeking ? 'font-bold' : undefined} style={job.seeking ? SEEKING : undefined}>
            {copy.role}
          </span>
          {job.org && <OrgName job={job} />}
        </Heading>
        <div className="mt-2 text-[12px] italic text-fg-5">{copy.summary}</div>
        <div className="mt-3.5 flex flex-col gap-2">
          {copy.points.map((pt, k) => (
            <Point key={k} text={pt} />
          ))}
        </div>
        {(job.links || job.projects || job.pr) && (
          <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 pl-3">
            <span className="text-[12px] text-fg-9">↳</span>
            {job.pr && <RefLink link={{ label: `pull request #${job.pr}`, href: prUrl(job.pr) }} />}
            {job.projects?.map((id) => (
              <ProjectRef key={id} id={id} />
            ))}
            {job.links?.map((l) => (
              <RefLink key={l.href} link={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const EduRow = ({ item }: { item: Education }) => (
  <div className="flex items-baseline justify-between gap-4">
    <div>
      <div className="text-[14px] font-semibold text-fg">{item.title}</div>
      <div className="mt-0.75 text-[12px] text-fg-5">{item.detail}</div>
    </div>
    <span className="whitespace-nowrap text-[12px] text-yellow">{item.period}</span>
  </div>
);

export const HackRow = ({ item }: { item: Hackathon }) => (
  <div className="flex items-baseline justify-between gap-4">
    <div>
      <div className="flex items-center gap-2.5">
        <span className="text-[14px] font-semibold text-fg">{item.event}</span>
        {item.win && <span className="rounded-badge bg-orange px-1.75 py-0.5 text-[9px] font-bold tracking-[2px] text-on-orange">WINNER</span>}
      </div>
      <div className="mt-0.75 text-[12px] text-fg-5">
        <span className="text-orange">{item.project}</span> · {item.role}
      </div>
    </div>
    <span className="whitespace-nowrap text-[12px] text-fg-6">{item.place}</span>
  </div>
);
