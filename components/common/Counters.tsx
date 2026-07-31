import { useContributions } from '@/hooks/useContributions';
import { useStrings } from '@/hooks/useStrings';
import { GITHUB_USER } from '@/lib/config';
import { counters } from '@/lib/data';

const Counter = ({ n, label, first }: { n: string; label: string; first: boolean }) => (
  <span>
    {!first && <>&nbsp;&nbsp;·&nbsp;&nbsp;</>}
    <span className="font-semibold text-orange">{n}</span> {label}
  </span>
);

export const Counters = ({ className = '' }: { className?: string }) => {
  const strings = useStrings();
  const liveContrib = useContributions(GITHUB_USER);
  const counterN = (key: string, fallback: string) => (key === 'contributions' && liveContrib ? liveContrib : fallback);

  return (
    <div className={className}>
      {counters.map((c, i) => (
        <Counter key={c.key} n={counterN(c.key, c.n)} label={strings.counterLabels[c.key]} first={i === 0} />
      ))}
    </div>
  );
};
