import { education, experience, hackathons } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';
import { Section } from '@/components/common/Section';
import { CommandHeader } from '@/components/common/CommandHeader';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
}

export function Experience({ ref, human, strings }: Props) {
  return (
    <Section ref={ref} label="Experience">
      <CommandHeader human={human} command="git log --graph work-history" heading={strings.hExp} className="mb-11" />
      <div className="flex flex-col">
        {experience.map((j, i) => (
          <div key={j.hash} className="grid grid-cols-[26px_1fr] gap-[18px]">
            <div className="flex flex-col items-center">
              <span
                className="mt-[6px] h-[11px] w-[11px] rounded-full border-2 border-orange"
                style={{ background: i === 0 ? '#f8ad40' : '#0c0c0c' }}
              />
              <span className="w-px flex-1 bg-line-4" />
            </div>
            <div className="pb-11">
              <div className="flex flex-wrap items-baseline gap-3 text-[13px]">
                {!human && <span className="font-semibold text-orange">{j.hash}</span>}
                <span className="text-yellow">{j.period}</span>
                <span className="text-ghost">{j.loc}</span>
                {!human && i === 0 && <span className="text-green">(HEAD -&gt; main)</span>}
              </div>
              <div className="mt-[10px] font-display text-[24px] font-semibold tracking-[1px] text-fg">
                {j.role}
                <span className="font-light text-fg-3"> — {j.org}</span>
              </div>
              <div className="mt-[14px] flex flex-col gap-2">
                {j.points.map((pt, k) => (
                  <div key={k} className="flex gap-3 text-[13.5px] leading-[1.6] text-fg-2">
                    <span className="text-fg-9">│</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-[60px] md:grid-cols-2">
        <div>
          <CommandHeader variant="sub" human={human} command="cat education.txt" heading={strings.hEdu} className="mb-5" />
          <div className="flex flex-col gap-4 rounded-card border border-line-2 bg-panel-0 px-[22px] py-5">
            {education.map((e) => (
              <div key={e.title} className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[14px] font-semibold text-[#eee]">{e.title}</div>
                  <div className="mt-[3px] text-[12px] text-fg-5">{e.detail}</div>
                </div>
                <span className="whitespace-nowrap text-[12px] text-yellow">{e.period}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <CommandHeader variant="sub" human={human} command="git tag -l hackathons/*" heading={strings.hHacks} className="mb-5" />
          <div className="flex flex-col gap-4 rounded-card border border-line-2 bg-panel-0 px-[22px] py-5">
            {hackathons.map((h) => (
              <div key={h.event} className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-center gap-[10px]">
                    <span className="text-[14px] font-semibold text-[#eee]">{h.event}</span>
                    {h.win && (
                      <span className="rounded-badge bg-orange px-[7px] py-[2px] text-[9px] font-bold tracking-[2px] text-black">
                        WINNER
                      </span>
                    )}
                  </div>
                  <div className="mt-[3px] text-[12px] text-fg-5">
                    <span className="text-orange">{h.project}</span> · {h.role}
                  </div>
                </div>
                <span className="whitespace-nowrap text-[12px] text-fg-6">{h.place}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
