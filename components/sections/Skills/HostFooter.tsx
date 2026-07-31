import { useHuman } from '@/hooks/useStrings';
import { MACHINE } from '@/lib/config';
import { memOf, skillMap } from '@/lib/data';
import { useEffect, useState } from 'react';

const TOTAL_MEM = skillMap.reduce((a, r) => a + r.items.reduce((b, s) => b + memOf(s.y), 0), 0);

const Row = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div className="flex gap-3">
    <span className="w-24 shrink-0 text-fg-9">{k}</span>
    <span className="min-w-0 text-fg-5">{children}</span>
  </div>
);

export const HostFooter = () => {
  const human = useHuman();
  const [load, setLoad] = useState(28);

  useEffect(() => {
    if (human) return;
    const tick = () => setLoad(22 + Math.round(Math.random() * 34));
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, [human]);

  if (human) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-window border border-line-2 bg-panel-0">
      <div className="flex items-center gap-2.5 border-b border-line-2 bg-panel-4 px-4 py-3 text-[12px]">
        <span className="text-orange">❯</span>
        <span className="text-cyan-img">docker info</span>
        <span className="ml-auto text-[11px] text-green">{skillMap.length} containers running</span>
      </div>
      <div className="grid gap-x-8 gap-y-1.5 px-4 py-3.5 text-[11px] sm:grid-cols-2">
        <Row k="CPU">
          {MACHINE.cpu} · {MACHINE.threads} threads
        </Row>
        <Row k="LOAD">
          <span className="tabular-nums text-orange">{load}%</span> avg
        </Row>
        <Row k="GPU">
          {MACHINE.gpu} · {MACHINE.vram}
        </Row>
        <Row k="MEM">
          <span className="tabular-nums text-orange">{TOTAL_MEM}MiB</span> / {MACHINE.ram}
        </Row>
        <Row k="OS">{MACHINE.os}</Row>
        <Row k="ENGINE">docker · {skillMap.length} images</Row>
      </div>
    </div>
  );
};
