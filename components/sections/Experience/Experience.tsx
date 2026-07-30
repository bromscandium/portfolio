import { CommandHeader } from '@/components/common/CommandHeader';
import { Section } from '@/components/common/Section';
import { useStrings } from '@/hooks/useStrings';
import { education, experience, hackathons } from '@/lib/data';
import type { Ref } from 'react';
import { EduRow, HackRow, JobEntry } from './Entries';
import { Panel } from './Panel';

export const Experience = ({ ref }: { ref?: Ref<HTMLElement> }) => {
  const strings = useStrings();
  return (
    <Section ref={ref} label="Experience">
      <CommandHeader command="git log --graph work-history" heading={strings.hExp} className="mb-11" />
      <div className="flex flex-col">
        {experience.map((j, i) => (
          <JobEntry key={j.hash} job={j} index={i} />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-15 xl:grid-cols-2">
        <div>
          <CommandHeader variant="sub" command="git tag -l study/*" heading={strings.hEdu} className="mb-5" />
          <Panel>
            {education.map((e) => (
              <EduRow key={e.title} item={e} />
            ))}
          </Panel>
        </div>
        <div>
          <CommandHeader variant="sub" command="git tag -l hackathons/*" heading={strings.hHacks} className="mb-5" />
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
