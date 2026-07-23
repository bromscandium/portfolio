import { skillMap } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';
import { Section } from '@/components/common/Section';
import { CommandHeader } from '@/components/common/CommandHeader';
import { SkillCard } from './SkillCard';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
}

export const Skills = ({ ref, human, strings }: Props) => {
  return (
    <Section ref={ref} label="Skills">
      <CommandHeader human={human} command="docker ps" args={' --filter "label=stack"'} heading={strings.hSkills} className="mb-2.5" />
      <div className="mb-9 text-[11px] text-ghost">{strings.skillsNote}</div>
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {skillMap.map((r) => (
          <SkillCard key={r.region} region={r} human={human} strings={strings} />
        ))}
      </div>
    </Section>
  );
};
