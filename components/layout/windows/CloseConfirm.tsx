import { useEffect } from 'react';
import { Modal } from '@/components/common/Modal';

interface Props {
  human: boolean;
  uk: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const COPY = {
  en: { title: 'close session', q: 'are you sure you want to close this tab?', desc: 'This ends the session and asks you to pick a profile again.', close: 'close', cancel: 'cancel' },
  uk: { title: 'закрити сесію', q: 'справді закрити цю вкладку?', desc: 'Це завершить сесію і знову запропонує вибір профілю.', close: 'закрити', cancel: 'скасувати' },
};

const Body = ({ human, uk, onConfirm, cancel }: { human: boolean; uk: boolean; onConfirm: () => void; cancel: () => void }) => {
  const c = COPY[uk ? 'uk' : 'en'];

  useEffect(() => {
    if (human) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'y') {
        e.preventDefault();
        onConfirm();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        cancel();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [human, onConfirm, cancel]);

  return (
    <>
      <div className="border-b border-line-3 bg-panel-6 px-[18px] py-3 text-[12px] text-fg-3">{c.title}</div>
      <div className="flex flex-col gap-4 p-[26px]">
        <div className="text-[14px]">
          {!human && <span className="font-bold text-orange">❯ </span>}
          <span className="text-[#eee]">{c.q} </span>
          {!human && <span className="text-fg-5">[y/n]</span>}
        </div>
        <div className="text-[12px] text-fg-5">{c.desc}</div>
        <div className="mt-1 flex gap-3">
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-btn border-none bg-orange px-5 py-2.5 font-mono text-[13px] font-semibold text-black transition-colors duration-300 hover:bg-orange-dark"
          >
            {c.close}
          </button>
          <button
            onClick={cancel}
            className="cursor-pointer rounded-btn border border-line-6 bg-transparent px-5 py-2.5 font-mono text-[13px] text-[#ccc] transition-colors duration-300 hover:border-orange hover:!text-orange"
          >
            {c.cancel}
          </button>
        </div>
      </div>
    </>
  );
};

export const CloseConfirm = ({ human, uk, onConfirm, onCancel }: Props) => (
  <Modal
    onClose={onCancel}
    z={680}
    escAllowed={() => !human}
    panelClassName="w-[min(440px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
  >
    {(close) => <Body human={human} uk={uk} onConfirm={onConfirm} cancel={close} />}
  </Modal>
);
