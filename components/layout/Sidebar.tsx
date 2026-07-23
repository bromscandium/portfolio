import { ARCH_LOGO } from '@/lib/config';

interface Props {
  navRoot: string;
  names: string[];
  active: number;
  onNav: (i: number) => void;
}

const NavItem = ({ label, branch, active, onClick }: { label: string; branch: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex cursor-pointer items-center gap-2 border-none bg-transparent py-1.25 text-left font-mono text-[13px] transition-colors hover:!text-orange"
    style={{ color: active ? '#f8ad40' : '#8a8a8a' }}
  >
    <span className="text-fg-10">{branch}</span>
    <span>{label}</span>
    <span className="text-orange">{active ? '❮' : ''}</span>
  </button>
);

export const Sidebar = ({ navRoot, names, active, onNav }: Props) => {
  return (
    <nav className="fixed bottom-6.5 left-0 top-9.5 z-[100] hidden w-55 overflow-hidden border-r border-line-1 bg-bg px-5.5 py-7 md:block">
      <div className="mb-3.5 text-[13px] font-bold text-cyan">{navRoot}</div>
      <div className="flex flex-col gap-1.5">
        {names.map((label, i) => (
          <NavItem key={label} label={label} branch={i === names.length - 1 ? '└─' : '├─'} active={active === i} onClick={() => onNav(i)} />
        ))}
      </div>
      <pre className="pointer-events-none absolute bottom-16 left-5.5 m-0 select-none font-mono text-[10px] leading-[1.25] text-fg-11">
        {ARCH_LOGO}
      </pre>
      <div className="absolute bottom-8 left-5.5 text-[10px] tracking-[1px] text-fg-8">© 2026 · bromscandium</div>
    </nav>
  );
}
