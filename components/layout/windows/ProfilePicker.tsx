import { PICKER_COPY, type Lang, type Mode } from '@/lib/i18n';
import { LANGS, LOCALE_LABEL, MODES, MODE_META } from '@/lib/modes';
import { useState } from 'react';

interface Props {
  lang: Lang;
  onPick: (mode: Mode, lang: Lang) => void;
}

const LOCALES = LANGS.map((key) => ({ key, label: LOCALE_LABEL[key] }));

const ModeButton = ({ mode, lang, onPick }: { mode: Mode; lang: Lang; onPick: (m: Mode) => void }) => {
  const meta = MODE_META[mode];
  return (
    <button
      onClick={() => onPick(mode)}
      className={
        meta.primary
          ? 'cursor-pointer rounded-card border-none bg-orange px-4.5 py-4 text-left transition-colors duration-300 hover:bg-orange-dark'
          : 'cursor-pointer rounded-card border border-line-6 bg-transparent px-4.5 py-4 text-left transition-colors duration-300 hover:border-orange'
      }
    >
      <span className={meta.primary ? 'text-[13px] font-bold text-black' : 'text-[13px] font-bold text-fg'}>{meta.label[lang]}</span>
      <br />
      <span className={meta.primary ? 'text-[11px] text-black/[.65]' : 'text-[11px] text-fg-5'}>{meta.desc[lang]}</span>
    </button>
  );
};

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
          {MODES.map((m) => (
            <ModeButton key={m} mode={m} lang={sel} onPick={(mode) => onPick(mode, sel)} />
          ))}
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
                    background: sel === l.key ? 'var(--color-orange)' : 'transparent',
                    borderColor: sel === l.key ? 'var(--color-orange)' : '#2a2a2a',
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
