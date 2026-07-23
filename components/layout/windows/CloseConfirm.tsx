interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const CloseConfirm = ({ onConfirm, onCancel }: Props) => {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div onClick={onCancel} className="fixed inset-0 z-[680] flex items-center justify-center bg-black/[.82] p-5" style={{ animation: 'overlayIn .16s ease forwards' }}>
      <div
        onClick={stop}
        className="w-[min(440px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
        style={{ animation: 'modalPop .2s ease-out forwards' }}
      >
        <div className="border-b border-line-3 bg-panel-6 px-[18px] py-3 text-[12px] text-fg-3">close session</div>
        <div className="flex flex-col gap-4 p-[26px]">
          <div className="text-[14px]">
            <span className="font-bold text-orange">❯ </span>
            <span className="text-[#eee]">are you sure you want to close this tab? </span>
            <span className="text-fg-5">[y/n]</span>
          </div>
          <div className="text-[12px] text-fg-5">This ends the session and asks you to pick a profile again.</div>
          <div className="mt-1 flex gap-3">
            <button
              onClick={onConfirm}
              className="cursor-pointer rounded-btn border-none bg-orange px-5 py-2.5 font-mono text-[13px] font-semibold text-black transition-colors duration-300 hover:bg-orange-dark"
            >
              close
            </button>
            <button
              onClick={onCancel}
              className="cursor-pointer rounded-btn border border-line-6 bg-transparent px-5 py-2.5 font-mono text-[13px] text-[#ccc] transition-colors duration-300 hover:border-orange hover:!text-orange"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
