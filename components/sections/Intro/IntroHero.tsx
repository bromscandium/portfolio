import { counters, heroRole } from '@/lib/data';
import { GITHUB_USER } from '@/lib/config';
import { useContributions } from '@/hooks/useContributions';
import { Heading } from '@/components/common/Typography';
import type { Strings } from '@/lib/i18n';

const Counter = ({ n, label, first }: { n: string; label: string; first: boolean }) => (
  <span>
    {!first && <>&nbsp;&nbsp;·&nbsp;&nbsp;</>}
    <span className="font-semibold text-orange">{n}</span> {label}
  </span>
);

interface Props {
  strings: Strings;
  onWork: () => void;
  onContact: () => void;
}

export const IntroHero = ({ strings, onWork, onContact }: Props) => {
  const liveContrib = useContributions(GITHUB_USER);
  const counterN = (key: string, fallback: string) => (key === 'contributions' && liveContrib ? liveContrib : fallback);

  return (
  <div className="fade-up mt-9">
    <Heading variant="display" className="m-0">
      {strings.heroName[0]}
      <br />
      {strings.heroName[1]}
    </Heading>
    <div className="my-6.5 mb-3.5 text-[15px] tracking-[2px]">
      <span className="text-orange">{strings.roleWord}</span>
      <span className="text-fg-4"> — {heroRole.join(' · ')}</span>
    </div>
    <div className="max-w-155 text-[14px] leading-[1.7]" style={{ color: strings.stmtColor }}>
      {strings.statement}
    </div>
    <div className="mt-7.5 text-[14px] tracking-[1px] text-fg-5">
      {counters.map((c, i) => (
        <Counter key={c.key} n={counterN(c.key, c.n)} label={strings.counterLabels[c.key]} first={i === 0} />
      ))}
    </div>
    <div className="mt-10 flex flex-wrap gap-4">
      <button
        onClick={onWork}
        className="cursor-pointer rounded-btn border-none bg-orange px-6.5 py-3.5 font-mono text-[13px] font-semibold tracking-[1px] text-black transition-all duration-300 hover:-translate-y-[2px] hover:bg-orange-dark"
      >
        {strings.btnWork}
      </button>
      <button
        onClick={onContact}
        className="cursor-pointer rounded-btn border border-line-6 bg-transparent px-6.5 py-3.5 font-mono text-[13px] tracking-[1px] text-[#ccc] transition-all duration-300 hover:border-orange hover:!text-orange"
      >
        {strings.btnContact}
      </button>
    </div>
  </div>
  );
};
