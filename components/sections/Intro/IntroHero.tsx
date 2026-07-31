import { Counters } from '@/components/common/Counters';
import { Heading } from '@/components/common/Typography';
import { useStrings } from '@/hooks/useStrings';
import { heroRole } from '@/lib/data';

interface Props {
  onWork: () => void;
  onContact: () => void;
}

export const IntroHero = ({ onWork, onContact }: Props) => {
  const strings = useStrings();

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
      <Counters className="mt-7.5 text-[14px] tracking-[1px] text-fg-5" />
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
