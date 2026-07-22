interface Props {
  activeIdx: number;
  activeName: string;
  viewValue: string;
  viewHover: boolean;
  onViewEnter: () => void;
  onViewLeave: () => void;
  onViewClick: () => void;
  langValue: string;
  langHover: boolean;
  onLangEnter: () => void;
  onLangLeave: () => void;
  onLangClick: () => void;
}

export function StatusBar({
  activeIdx,
  activeName,
  viewValue,
  viewHover,
  onViewEnter,
  onViewLeave,
  onViewClick,
  langValue,
  langHover,
  onLangEnter,
  onLangLeave,
  onLangClick,
}: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] flex h-[26px] items-center justify-between border-t border-[#1f1f1f] bg-panel-3 px-4 text-[11px] text-fg-6">
      <span>
        <span className="text-orange">[{activeIdx}]</span> {activeName}
      </span>
      <span className="flex items-center gap-[6px]">
        <button
          onClick={onViewClick}
          onMouseEnter={onViewEnter}
          onMouseLeave={onViewLeave}
          title="switch view"
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
          style={{ color: viewHover ? '#f8ad40' : '#666' }}
        >
          {viewValue}
        </button>
        <span className="mx-2 text-fg-10">·</span>
        <button
          onClick={onLangClick}
          onMouseEnter={onLangEnter}
          onMouseLeave={onLangLeave}
          title="switch language"
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
          style={{ color: langHover ? '#f8ad40' : '#666' }}
        >
          {langValue}
        </button>
        <span>&nbsp;· Arch · zsh · spaceship</span>
      </span>
    </div>
  );
}
