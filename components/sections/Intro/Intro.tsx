import { counters, heroPrompt, heroRole } from '@/lib/data';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  isDev: boolean;
  typedCmd: string;
  ghostCmd: string;
  heroDone: boolean;
  strings: Strings;
  onWork: () => void;
  onContact: () => void;
}

export function Intro({ ref, isDev, typedCmd, ghostCmd, heroDone, strings, onWork, onContact }: Props) {
  return (
    <section
      ref={ref}
      data-screen-label="Intro"
      className="box-border flex min-h-[calc(100vh-64px)] flex-col justify-center px-[6vw] pb-20 pt-[60px]"
    >
      {isDev && (
        <div className="text-[14px] leading-[1.7]">
          <div>
            <span className="font-bold text-cyan">~/yaroslav</span>
            {heroPrompt.map((t) => (
              <span key={t.name}>
                <span className="text-fg-6"> via </span>
                <span className={t.color}>
                  {t.icon} {t.name} {t.version}
                </span>
              </span>
            ))}
          </div>
          <div className="mt-[2px]">
            <span className="font-bold text-orange">❯ </span>
            <span className="text-[#eee]">{typedCmd}</span>
            <span className="text-ghost">{ghostCmd}</span>
            <span className="blink bg-orange text-orange">█</span>
          </div>
        </div>
      )}
      {heroDone && (
        <div className="fade-up mt-9">
          <h1 className="m-0 font-display text-[clamp(56px,7.5vw,108px)] font-light leading-none tracking-[5px] text-fg">
            YAROSLAV
            <br />
            YEROMENKO
          </h1>
          <div className="my-[26px] mb-[14px] text-[15px] tracking-[2px]">
            <span className="text-orange">{strings.roleWord}</span>
            <span className="text-fg-4"> — {heroRole.join(' · ')}</span>
          </div>
          <div className="max-w-[620px] text-[14px] leading-[1.7]" style={{ color: strings.stmtColor }}>
            {strings.statement}
          </div>
          <div className="mt-[30px] text-[14px] tracking-[1px] text-fg-5">
            {counters.map((c, i) => (
              <span key={c.key}>
                {i > 0 && <>&nbsp;&nbsp;·&nbsp;&nbsp;</>}
                <span className="font-semibold text-orange">{c.n}</span> {strings.counterLabels[c.key]}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onWork}
              className="cursor-pointer rounded-btn border-none bg-orange px-[26px] py-[14px] font-mono text-[13px] font-semibold tracking-[1px] text-black transition-all hover:-translate-y-[2px] hover:bg-orange-dark"
            >
              {strings.btnWork}
            </button>
            <button
              onClick={onContact}
              className="cursor-pointer rounded-btn border border-line-6 bg-transparent px-[26px] py-[14px] font-mono text-[13px] tracking-[1px] text-[#ccc] transition-all hover:border-orange hover:!text-orange"
            >
              {strings.btnContact}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
