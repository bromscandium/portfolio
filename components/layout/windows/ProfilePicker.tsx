interface Props {
  onPickDev: () => void;
  onPickHuman: () => void;
}

export function ProfilePicker({ onPickDev, onPickHuman }: Props) {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/[.86] p-5 backdrop-blur-[5px]">
      <div className="w-[min(500px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]">
        <div className="border-b border-line-3 bg-panel-6 px-4.5 py-3 text-[12px] text-fg-3">select session profile</div>
        <div className="flex flex-col gap-4 p-6.5">
          <div className="mb-1 text-[14px]">
            <span className="font-bold text-orange">❯ </span>
            <span className="text-[#eee]">who are you?</span>
          </div>
          <button
            onClick={onPickDev}
            className="cursor-pointer rounded-card border-none bg-orange px-4.5 py-4 text-left transition-colors hover:bg-orange-dark"
          >
            <span className="text-[13px] font-bold text-black">developer</span>
            <br />
            <span className="text-[11px] text-black/[.65]">full terminal UI — commands, containers, git log</span>
          </button>
          <button
            onClick={onPickHuman}
            className="cursor-pointer rounded-card border border-line-6 bg-transparent px-4.5 py-4 text-left transition-colors hover:border-orange"
          >
            <span className="text-[13px] font-bold text-fg">human</span>
            <br />
            <span className="text-[11px] text-fg-5">plain language, no commands — same content</span>
          </button>
          <div className="text-[10px] text-fg-7">{'// switch anytime with + in the tab bar'}</div>
        </div>
      </div>
    </div>
  );
}
