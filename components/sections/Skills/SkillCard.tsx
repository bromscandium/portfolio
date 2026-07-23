import type { SkillRegion } from '@/lib/types';
import type { Strings } from '@/lib/i18n';

const SkillRow = ({ name, yLabel, last }: { name: string; yLabel: string; last: boolean }) => (
  <div className="flex items-baseline gap-3 py-0.5 hover:bg-panel-4">
    <span className="shrink-0 text-[12px] text-fg-9">{last ? '└─' : '├─'}</span>
    <span className="min-w-0 truncate text-[13px] text-[#ddd]">{name}</span>
    <span className="ml-auto shrink-0 text-[11px] text-orange">{yLabel}</span>
  </div>
);

export const SkillCard = ({ region, human, strings }: { region: SkillRegion; human: boolean; strings: Strings }) => {
  const maxY = Math.max(...region.items.map((s) => s.y));
  const slug = region.region.toLowerCase();

  return (
    <div className="overflow-hidden rounded-window border border-line-2 bg-panel-0 transition-colors hover:border-orange/50">
      <div className="flex items-center gap-2.5 border-b border-line-2 bg-panel-4 px-4 py-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-green-dot" />
        {!human && <span className="shrink-0 text-[11px] text-ghost">{region.cid}</span>}
        <span className="min-w-0 truncate text-[12px] text-cyan-img">{strings.regionName(region.region)}</span>
        <span className="ml-auto shrink-0 text-[11px] text-green">{strings.regionStatus(maxY)}</span>
      </div>
      <div className="flex flex-col gap-1.75 px-4 py-3.5">
        {region.items.map((sk, i) => (
          <SkillRow key={sk.name} name={sk.name} yLabel={strings.yLabel(sk.y)} last={i === region.items.length - 1} />
        ))}
        {!human && (
          <div className="mt-2 flex gap-3 border-t border-[#1a1a1a] pt-2.5 text-[10px] text-fg-8">
            <span>
              NAMES: <span className="text-fg-5">{slug}_1</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
