import type { Education, Hackathon, Job, ProjectLink } from '@/lib/types';
import type { Strings } from '@/lib/i18n';
import { Body, Heading } from '@/components/common/Typography';

const Point = ({ text }: { text: string }) => {
  const i = text.indexOf(': ');
  const label = i > 0 ? text.slice(0, i) : '';
  const rest = i > 0 ? text.slice(i + 2) : text;
  return (
    <Body as="div" className="flex gap-3 !leading-[1.6]">
      <span className="text-fg-9">│</span>
      <span>
        {label && <span className="font-semibold text-fg-2">{label}: </span>}
        {rest}
      </span>
    </Body>
  );
};

const RefLink = ({ link }: { link: ProjectLink }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="border-b border-orange/40 pb-0.25 text-[12px] text-orange hover:!text-orange-dark"
  >
    {link.label}
  </a>
);

export const JobEntry = ({ job, index, human, strings }: { job: Job; index: number; human: boolean; strings: Strings }) => {
  const copy = strings.jobCopy(job.hash);
  return (
  <div className="grid grid-cols-[26px_1fr] gap-4.5">
    <div className="flex flex-col items-center">
      <span className="mt-1.5 h-2.75 w-2.75 rounded-full border-2 border-orange" style={{ background: index === 0 ? 'var(--color-orange)' : '#0c0c0c' }} />
      <span className="w-px flex-1 bg-line-4" />
    </div>
    <div className="pb-11">
      <div className="flex flex-wrap items-baseline gap-3 text-[13px]">
        {!human && <span className="font-semibold text-orange">{job.hash}</span>}
        <span className="text-yellow">{job.period}</span>
        <span className="text-ghost">{copy.loc}</span>
        {!human && index === 0 && <span className="text-green">(HEAD -&gt; main)</span>}
      </div>
      <Heading variant="role" as="div" className="mt-2.5">
        {copy.role}
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
      </Heading>
      <div className="mt-2 text-[12px] italic text-fg-5">{copy.summary}</div>
      <div className="mt-3.5 flex flex-col gap-2">
        {copy.points.map((pt, k) => (
          <Point key={k} text={pt} />
        ))}
      </div>
      {job.links && (
        <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 pl-3">
          <span className="text-[12px] text-fg-9">↳</span>
          {job.links.map((l) => (
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
      <div className="text-[14px] font-semibold text-[#eee]">{item.title}</div>
      <div className="mt-0.75 text-[12px] text-fg-5">{item.detail}</div>
    </div>
    <span className="whitespace-nowrap text-[12px] text-yellow">{item.period}</span>
  </div>
);

export const HackRow = ({ item }: { item: Hackathon }) => (
  <div className="flex items-baseline justify-between gap-4">
    <div>
      <div className="flex items-center gap-2.5">
        <span className="text-[14px] font-semibold text-[#eee]">{item.event}</span>
        {item.win && <span className="rounded-badge bg-orange px-1.75 py-0.5 text-[9px] font-bold tracking-[2px] text-black">WINNER</span>}
      </div>
      <div className="mt-0.75 text-[12px] text-fg-5">
        <span className="text-orange">{item.project}</span> · {item.role}
      </div>
    </div>
    <span className="whitespace-nowrap text-[12px] text-fg-6">{item.place}</span>
  </div>
);
