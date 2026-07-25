import { TERMINAL_ROOT } from '@/lib/config';
import { heroPrompt } from '@/lib/data';
import type { PromptTool } from '@/lib/types';

const PromptSegment = ({ tool }: { tool: PromptTool }) => (
  <span>
    <span className="text-fg-6"> via </span>
    <span className={tool.color}>
      {tool.icon} {tool.name} {tool.version}
    </span>
  </span>
);

export const IntroPrompt = ({ typedCmd, ghostCmd }: { typedCmd: string; ghostCmd: string }) => (
  <div className="text-[14px] leading-[1.7]">
    <div>
      <span className="font-bold text-cyan">{TERMINAL_ROOT}</span>
      {heroPrompt.map((tool) => (
        <PromptSegment key={tool.name} tool={tool} />
      ))}
    </div>
    <div className="mt-0.5">
      <span className="font-bold text-orange">❯ </span>
      <span className="text-[#eee]">{typedCmd}</span>
      <span className="text-ghost">{ghostCmd}</span>
      <span className="blink ml-0.5 inline-block h-[1em] w-[7px] translate-y-[1px] bg-orange" aria-hidden />
    </div>
  </div>
);
