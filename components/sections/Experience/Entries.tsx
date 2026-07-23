import type { Education, Hackathon, Job } from '@/lib/types';

const Point = ({ text }: { text: string }) => (
  <div className="flex gap-3 text-[13.5px] leading-[1.6] text-fg-2">
    <span className="text-fg-9">│</span>
    <span>{text}</span>
  </div>
);

export const JobEntry = ({ job, index, human }: { job: Job; index: number; human: boolean }) => (
  <div className="grid grid-cols-[26px_1fr] gap-4.5">
    <div className="flex flex-col items-center">
      <span className="mt-1.5 h-2.75 w-2.75 rounded-full border-2 border-orange" style={{ background: index === 0 ? '#f8ad40' : '#0c0c0c' }} />
      <span className="w-px flex-1 bg-line-4" />
    </div>
    <div className="pb-11">
      <div className="flex flex-wrap items-baseline gap-3 text-[13px]">
        {!human && <span className="font-semibold text-orange">{job.hash}</span>}
        <span className="text-yellow">{job.period}</span>
        <span className="text-ghost">{job.loc}</span>
        {!human && index === 0 && <span className="text-green">(HEAD -&gt; main)</span>}
      </div>
      <div className="mt-2.5 font-display text-[24px] font-semibold tracking-[1px] text-fg">
        {job.role}
        <span className="font-light text-fg-3"> — {job.org}</span>
      </div>
      <div className="mt-3.5 flex flex-col gap-2">
        {job.points.map((pt, k) => (
          <Point key={k} text={pt} />
        ))}
      </div>
    </div>
  </div>
);

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
