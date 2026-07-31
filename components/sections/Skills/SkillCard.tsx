import { useHuman, useStrings } from '@/hooks/useStrings';
import { memOf, pidFor, tokensFor } from '@/lib/data';
import type { SkillRegion } from '@/lib/types';
import { useEffect, useState } from 'react';

const ProcRow = ({
  name,
  yLabel,
  last,
  clickable,
  cpu,
  mem,
}: {
  name: string;
  yLabel: string;
  last: boolean;
  clickable: boolean;
  cpu: number;
  mem: number;
}) => {
  const [open, setOpen] = useState(false);
  const tokens = tokensFor(name);

  return (
    <div>
      <div
        onClick={clickable ? () => setOpen((v) => !v) : undefined}
        className={`flex items-baseline gap-3 py-0.5 ${clickable ? 'cursor-pointer rounded transition-colors hover:bg-panel-4' : ''}`}
      >
        <span className="shrink-0 text-[12px] text-fg-9">{last ? '└─' : '├─'}</span>
        <span className="min-w-0 truncate text-[13px] text-[#ddd]">{name}</span>
        <span className="ml-auto shrink-0 text-[11px] text-orange">{yLabel}</span>
      </div>
      {clickable && (
        <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
          <div className="overflow-hidden">
            <div className="flex flex-col gap-0.5 pb-1 pl-6 pt-1 text-[10px] leading-[1.6] text-fg-8">
              <div>
                pid <span className="tabular-nums text-fg-5">{pidFor(name)}</span> · cpu <span className="tabular-nums text-orange">{cpu.toFixed(1)}%</span> ·
                mem <span className="tabular-nums text-fg-5">{mem}MiB</span>
              </div>
              {tokens.map((tk, i) => (
                <div key={tk} className="text-green/70">
                  {i === tokens.length - 1 ? '└─' : '├─'} <span className="text-fg-6">{tk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SkillCard = ({ region }: { region: SkillRegion }) => {
  const human = useHuman();
  const strings = useStrings();
  const maxY = Math.max(...region.items.map((s) => s.y));
  const slug = region.region.toLowerCase();

  const [cpuMap, setCpuMap] = useState<Record<string, number>>(() => Object.fromEntries(region.items.map((s) => [s.name, s.y * 3.2])));
  useEffect(() => {
    if (human) return;
    const tick = () => setCpuMap(Object.fromEntries(region.items.map((s) => [s.name, s.y * 3.2 + Math.random() * 5])));
    tick();
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, [human, region.items]);

  const totalCpu = region.items.reduce((a, s) => a + (cpuMap[s.name] ?? 0), 0);
  const totalMem = region.items.reduce((a, s) => a + memOf(s.y), 0);

  return (
    <div className={`overflow-hidden rounded-window border border-line-2 bg-panel-0 transition-colors ${human ? '' : 'hover:border-orange/50'}`}>
      <div className="flex items-center gap-2.5 border-b border-line-2 bg-panel-4 px-4 py-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-green-dot" />
        {!human && <span className="shrink-0 text-[11px] text-ghost">{region.cid}</span>}
        <span className="min-w-0 truncate text-[12px] text-cyan-img">{strings.regionName(region.region)}</span>
        <span className="ml-auto shrink-0 text-[11px] text-green">{strings.regionStatus(maxY)}</span>
      </div>
      <div className="flex flex-col gap-1.75 px-4 py-3.5">
        {region.items.map((sk, i) => (
          <ProcRow
            key={sk.name}
            name={sk.name}
            yLabel={strings.yLabel(sk.y)}
            last={i === region.items.length - 1}
            clickable={!human}
            cpu={cpuMap[sk.name] ?? 0}
            mem={memOf(sk.y)}
          />
        ))}
        {!human && (
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#1a1a1a] pt-2.5 text-[10px] text-fg-8">
            <span>
              CPU <span className="tabular-nums text-orange">{totalCpu.toFixed(1)}%</span>
            </span>
            <span className="text-fg-10">·</span>
            <span>
              MEM <span className="tabular-nums text-fg-5">{totalMem}MiB</span>
            </span>
            <span className="text-fg-10">·</span>
            <span>
              NAMES <span className="text-fg-5">{slug}_1</span>
            </span>
            <span className="ml-auto text-fg-9">click a process</span>
          </div>
        )}
      </div>
    </div>
  );
};
