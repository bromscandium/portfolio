interface Props {
  onClose: () => void;
}

const GROUPS: { title: string; rows: [string, string][] }[] = [
  {
    title: 'navigation',
    rows: [
      ['j / ↓', 'next section'],
      ['k / ↑', 'previous section'],
      ['g / G', 'first / last section'],
      ['1 … 5', 'jump to section'],
    ],
  },
  {
    title: 'tabs',
    rows: [
      ['] / [', 'next / previous tab'],
      ['t', 'open new tab'],
      ['w', 'close current tab'],
    ],
  },
  {
    title: 'commands',
    rows: [
      ['` (backtick)', 'toggle command line'],
      ['/', 'search projects'],
      ['? ', 'toggle this help'],
      ['Esc', 'close overlay / modal'],
    ],
  },
];

export function HelpOverlay({ onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[600] flex items-center justify-center bg-black/[.8] p-5"
      style={{ animation: 'overlayIn .16s ease forwards' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[min(560px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
        style={{ animation: 'modalPop .2s ease-out forwards' }}
      >
        <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-[18px] py-3 text-[12px] text-fg-3">
          <span className="font-bold text-orange">❯ </span>
          <span className="text-[#eee]">man keybindings</span>
          <button onClick={onClose} className="ml-auto cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange">
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-6 p-[26px]">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div className="mb-3 text-[11px] uppercase tracking-[3px] text-ghost">{g.title}</div>
              <div className="flex flex-col gap-[6px]">
                {g.rows.map(([key, desc]) => (
                  <div key={key} className="flex items-baseline gap-4 text-[13px]">
                    <span className="min-w-[120px] font-semibold text-orange">{key}</span>
                    <span className="text-fg-2">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-[10px] text-fg-7">{'// shortcuts are disabled while typing in an input'}</div>
        </div>
      </div>
    </div>
  );
}
