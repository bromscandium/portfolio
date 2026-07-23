import { useState } from 'react';
import { PICKER_COPY, type Lang, type Mode } from '@/lib/i18n';
import type { Option } from '@/lib/types';

interface Props {
  lang: Lang;
  onPick: (mode: Mode, lang: Lang) => void;
}

const LOCALES: Option<Lang>[] = [
  { key: 'en', label: 'en_US.UTF-8' },
  { key: 'uk', label: 'uk_UA.UTF-8' },
];

export const ProfilePicker = ({ lang, onPick }: Props) => {
  const [sel, setSel] = useState<Lang>(lang);
  const c = PICKER_COPY[sel];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/[.86] p-5 backdrop-blur-[5px]">
      <div className="w-[min(500px,94vw)] overflow-hidden rounded-modal border border-line-5 bg-panel-1 shadow-[0_30px_80px_rgba(0,0,0,.7)]">
        <div className="border-b border-line-3 bg-panel-6 px-4.5 py-3 text-[12px] text-fg-3">{c.title}</div>
        <div className="flex flex-col gap-4 p-6.5">
          <div className="mb-1 text-[14px]">
            <span className="font-bold text-orange">❯ </span>
            <span className="text-[#eee]">{c.who}</span>
          </div>
          <button
            onClick={() => onPick('dev', sel)}
            className="cursor-pointer rounded-card border-none bg-orange px-4.5 py-4 text-left transition-colors duration-300 hover:bg-orange-dark"
          >
            <span className="text-[13px] font-bold text-black">{c.dev}</span>
            <br />
            <span className="text-[11px] text-black/[.65]">{c.devDesc}</span>
          </button>
          <button
            onClick={() => onPick('human', sel)}
            className="cursor-pointer rounded-card border border-line-6 bg-transparent px-4.5 py-4 text-left transition-colors duration-300 hover:border-orange"
          >
            <span className="text-[13px] font-bold text-fg">{c.human}</span>
            <br />
            <span className="text-[11px] text-fg-5">{c.humanDesc}</span>
          </button>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-[11px] text-fg-6">{c.locale}</span>
            <div className="flex gap-1">
              {LOCALES.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setSel(l.key)}
                  className="cursor-pointer rounded-btn border font-mono text-[11px] transition-colors duration-300"
                  style={{
                    padding: '4px 10px',
                    background: sel === l.key ? '#f8ad40' : 'transparent',
                    borderColor: sel === l.key ? '#f8ad40' : '#2a2a2a',
                    color: sel === l.key ? '#000' : '#8a8a8a',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-fg-7">{c.note}</div>
        </div>
      </div>
    </div>
  );
};
