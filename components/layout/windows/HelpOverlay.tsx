import { Modal } from '@/components/common/Modal';

interface Props {
  onClose: () => void;
}

const GROUPS: { title: string; rows: [string, string][] }[] = [
  {
    title: 'navigation',
    rows: [
      ['j / k · ↓ / ↑', 'next / previous section'],
      ['g / G', 'first / last section'],
      ['1 … 5', 'jump to section'],
    ],
  },
  {
    title: 'tabs',
    rows: [
      ['h / l · ← / → · [ / ]', 'previous / next tab'],
      ['⌥1 … ⌥4', 'open a specific tab'],
      ['t', 'open new tab'],
      ['w', 'close current tab'],
    ],
  },
  {
    title: 'commands',
    rows: [
      ['⌃K / ⌘K', 'command palette'],
      ['` (backtick)', 'toggle command line'],
      ['/', 'search projects'],
      ['? ', 'toggle this help'],
      ['Esc', 'close overlay / modal'],
    ],
  },
];

const HelpGroup = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <div>
    <div className="mb-3 text-[11px] uppercase tracking-[3px] text-ghost">{title}</div>
    <div className="flex flex-col gap-1.5">
      {rows.map(([key, desc]) => (
        <div key={key} className="flex items-baseline gap-4 text-[13px]">
          <span className="min-w-30 font-semibold text-orange">{key}</span>
          <span className="text-fg-2">{desc}</span>
        </div>
      ))}
    </div>
  </div>
);

export const HelpOverlay = ({ onClose }: Props) => (
  <Modal onClose={onClose} z={600} panelClassName="w-[min(560px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]">
    {(close) => (
      <>
        <div className="flex items-center gap-2 border-b border-line-3 bg-panel-6 px-4.5 py-3 text-[12px] text-fg-3">
          <span className="font-bold text-orange">❯ </span>
          <span className="text-[#eee]">man keybindings</span>
          <button onClick={close} className="ml-auto cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange">
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-6 p-6.5">
          {GROUPS.map((g) => (
            <HelpGroup key={g.title} title={g.title} rows={g.rows} />
          ))}
          <div className="text-[10px] text-fg-7">{'// shortcuts are disabled while typing in an input'}</div>
        </div>
      </>
    )}
  </Modal>
);
