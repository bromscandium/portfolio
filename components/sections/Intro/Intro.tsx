import { counters, heroPrompt, heroRole } from '@/lib/data';
import type { PromptTool } from '@/lib/types';
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

const PromptSegment = ({ tool }: { tool: PromptTool }) => (
  <span>
    <span className="text-fg-6"> via </span>
    <span className={tool.color}>
      {tool.icon} {tool.name} {tool.version}
    </span>
  </span>
);

const Counter = ({ n, label, first }: { n: string; label: string; first: boolean }) => (
  <span>
    {!first && <>&nbsp;&nbsp;·&nbsp;&nbsp;</>}
    <span className="font-semibold text-orange">{n}</span> {label}
  </span>
);

export const Intro = ({ ref, isDev, typedCmd, ghostCmd, heroDone, strings, onWork, onContact }: Props) => {
  return (
    <section
      ref={ref}
      data-screen-label="Intro"
      className="box-border flex min-h-[calc(100vh-64px)] flex-col justify-center px-[6vw] pb-20 pt-15"
    >
      {isDev && (
        <div className="text-[14px] leading-[1.7]">
          <div>
            <span className="font-bold text-cyan">~/yaroslav</span>
            {heroPrompt.map((tool) => (
              <PromptSegment key={tool.name} tool={tool} />
            ))}
          </div>
          <div className="mt-0.5">
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
          <div className="my-6.5 mb-3.5 text-[15px] tracking-[2px]">
            <span className="text-orange">{strings.roleWord}</span>
            <span className="text-fg-4"> — {heroRole.join(' · ')}</span>
          </div>
          <div className="max-w-155 text-[14px] leading-[1.7]" style={{ color: strings.stmtColor }}>
            {strings.statement}
          </div>
          <div className="mt-7.5 text-[14px] tracking-[1px] text-fg-5">
            {counters.map((c, i) => (
              <Counter key={c.key} n={c.n} label={strings.counterLabels[c.key]} first={i === 0} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onWork}
              className="cursor-pointer rounded-btn border-none bg-orange px-6.5 py-3.5 font-mono text-[13px] font-semibold tracking-[1px] text-black transition-all hover:-translate-y-[2px] hover:bg-orange-dark"
            >
              {strings.btnWork}
            </button>
            <button
              onClick={onContact}
              className="cursor-pointer rounded-btn border border-line-6 bg-transparent px-6.5 py-3.5 font-mono text-[13px] tracking-[1px] text-[#ccc] transition-all hover:border-orange hover:!text-orange"
            >
              {strings.btnContact}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
