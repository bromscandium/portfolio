interface Props {
  navRoot: string;
  names: string[];
  active: number;
  onNav: (i: number) => void;
}

const ARCH_LOGO = `      /\\
     /  \\
    /    \\
   /      \\
  /   ..   \\
 /   |  |   \\
/_-\`\`    \`\`-_\\`;

export function Sidebar({ navRoot, names, active, onNav }: Props) {
  return (
    <nav className="fixed bottom-[26px] left-0 top-[38px] z-[100] hidden w-[220px] overflow-hidden border-r border-line-1 bg-bg px-[22px] py-7 md:block">
      <div className="mb-[14px] text-[13px] font-bold text-cyan">{navRoot}</div>
      <div className="flex flex-col gap-[6px]">
        {names.map((label, i) => {
          const isActive = active === i;
          return (
            <button
              key={label}
              onClick={() => onNav(i)}
              className="flex cursor-pointer items-center gap-2 border-none bg-transparent py-[5px] text-left font-mono text-[13px] transition-colors hover:!text-orange"
              style={{ color: isActive ? '#f8ad40' : '#8a8a8a' }}
            >
              <span className="text-fg-10">{i === names.length - 1 ? '└─' : '├─'}</span>
              <span>{label}</span>
              <span className="text-orange">{isActive ? '❮' : ''}</span>
            </button>
          );
        })}
      </div>
      <pre className="pointer-events-none absolute bottom-[88px] left-[22px] m-0 select-none font-mono text-[10px] leading-[1.25] text-fg-11">
        {ARCH_LOGO}
      </pre>
      <div className="absolute bottom-[56px] left-[22px] text-[10px] tracking-[1px] text-fg-8">© 2026 · bromscandium</div>
    </nav>
  );
}
