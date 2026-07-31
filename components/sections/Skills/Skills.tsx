import { CommandHeader } from '@/components/common/CommandHeader';
import { Section } from '@/components/common/Section';
import { useStrings } from '@/hooks/useStrings';
import { skillMap } from '@/lib/data';
import type { Ref } from 'react';
import { HostFooter } from './HostFooter';
import { SkillCard } from './SkillCard';

export const Skills = ({ ref }: { ref?: Ref<HTMLElement> }) => {
  const strings = useStrings();
  return (
    <Section ref={ref} label="Skills">
      <CommandHeader command="docker ps" args={' --filter "label=stack"'} heading={strings.hSkills} className="mb-2.5" />
      <div className="mb-9 text-[11px] text-ghost">{strings.skillsNote}</div>
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {skillMap.map((r) => (
          <SkillCard key={r.region} region={r} />
        ))}
      </div>
      <HostFooter />
    </Section>
  );
};
