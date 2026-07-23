import { skillMap } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';
import { Section } from '@/components/common/Section';
import { CommandHeader } from '@/components/common/CommandHeader';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
}

export function Skills({ ref, human, strings }: Props) {
  return (
    <Section ref={ref} label="Skills">
      <CommandHeader human={human} command="docker ps" args={' --filter "label=stack"'} heading={strings.hSkills} className="mb-2.5" />
      <div className="mb-9 text-[11px] text-ghost">{strings.skillsNote}</div>
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {skillMap.map((r) => {
          const maxY = Math.max(...r.items.map((s) => s.y));
          const slug = r.region.toLowerCase();
          return (
            <div
              key={r.region}
              className="overflow-hidden rounded-window border border-line-2 bg-panel-0 transition-colors hover:border-orange/50"
            >
              <div className="flex items-center gap-2.5 border-b border-line-2 bg-panel-4 px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-dot" />
                {!human && <span className="shrink-0 text-[11px] text-ghost">{r.cid}</span>}
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-cyan-img">
                  {strings.regionName(r.region)}
                </span>
                <span className="ml-auto shrink-0 text-[11px] text-green">{strings.regionStatus(maxY)}</span>
              </div>
              <div className="flex flex-col gap-1.75 px-4 py-3.5">
                {r.items.map((sk, i) => (
                  <div key={sk.name} className="flex items-baseline gap-3 py-0.5 hover:bg-panel-4">
                    <span className="shrink-0 text-[12px] text-fg-9">{i === r.items.length - 1 ? '└─' : '├─'}</span>
                    <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#ddd]">{sk.name}</span>
                    <span className="ml-auto shrink-0 text-[11px] text-orange">{strings.yLabel(sk.y)}</span>
                  </div>
                ))}
                {!human && (
                  <div className="mt-2 flex gap-3 border-t border-[#1a1a1a] pt-2.5 text-[10px] text-fg-8">
                    <span>
                      NAMES: <span className="text-fg-5">{slug}_1</span>
                    </span>
                    <span className="ml-auto">
                      RESTARTS: <span className="text-fg-5">0</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
