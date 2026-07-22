import { skillMap } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  human: boolean;
  strings: Strings;
}

export function Skills({ ref, human, strings }: Props) {
  return (
    <section ref={ref} data-screen-label="Skills" className="box-border border-t border-line-0 px-[6vw] py-[90px]">
      {human ? (
        <h2 className="mb-[10px] mt-0 font-display text-[30px] font-semibold tracking-[2px] text-fg">{strings.hSkills}</h2>
      ) : (
        <div className="mb-[10px] text-[14px]">
          <span className="font-bold text-orange">❯ </span>
          <span className="text-[#eee]">docker ps</span>
          <span className="text-ghost"> --filter &quot;label=stack&quot;</span>
        </div>
      )}
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
              <div className="flex items-center gap-[10px] border-b border-line-2 bg-panel-4 px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-dot" />
                {!human && <span className="shrink-0 text-[11px] text-ghost">{r.cid}</span>}
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-cyan-img">
                  {strings.regionName(r.region)}
                </span>
                <span className="ml-auto shrink-0 text-[11px] text-green">{strings.regionStatus(maxY)}</span>
              </div>
              <div className="flex flex-col gap-[7px] px-4 py-[14px]">
                {r.items.map((sk, i) => (
                  <div key={sk.name} className="flex items-baseline gap-3 py-[2px] hover:bg-panel-4">
                    <span className="shrink-0 text-[12px] text-fg-9">{i === r.items.length - 1 ? '└─' : '├─'}</span>
                    <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#ddd]">{sk.name}</span>
                    <span className="ml-auto shrink-0 text-[11px] text-orange">{strings.yLabel(sk.y)}</span>
                  </div>
                ))}
                {!human && (
                  <div className="mt-2 flex gap-3 border-t border-[#1a1a1a] pt-[10px] text-[10px] text-fg-8">
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
    </section>
  );
}
