import { education, experience, hackathons } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';
import { Section } from '@/components/common/Section';
import { CommandHeader } from '@/components/common/CommandHeader';
import { Panel } from './Panel';
import { EduRow, HackRow, JobEntry } from './Entries';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
}

export const Experience = ({ ref, human, strings }: Props) => {
  return (
    <Section ref={ref} label="Experience">
      <CommandHeader human={human} command="git log --graph work-history" heading={strings.hExp} className="mb-11" />
      <div className="flex flex-col">
        {experience.map((j, i) => (
          <JobEntry key={j.hash} job={j} index={i} human={human} strings={strings} />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-15 md:grid-cols-2">
        <div>
          <CommandHeader variant="sub" human={human} command="git tag -l study/*" heading={strings.hEdu} className="mb-5" />
          <Panel>
            {education.map((e) => (
              <EduRow key={e.title} item={e} />
            ))}
          </Panel>
        </div>
        <div>
          <CommandHeader variant="sub" human={human} command="git tag -l hackathons/*" heading={strings.hHacks} className="mb-5" />
          <Panel>
            {hackathons.map((h) => (
              <HackRow key={h.event} item={h} />
            ))}
          </Panel>
        </div>
      </div>
    </Section>
  );
};
