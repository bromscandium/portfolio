import { Heading } from './Typography';

interface Props {
  human: boolean;
  command: string;
  args?: string;
  heading: string;
  variant?: 'main' | 'sub';
  className?: string;
}

export const CommandHeader = ({ human, command, args, heading, variant = 'main', className = '' }: Props) => {
  if (human) {
    if (variant === 'sub') {
      return <div className={`text-[12px] uppercase tracking-[3px] text-fg-5 ${className}`}>{heading}</div>;
    }
    return (
      <Heading variant="section" className={`m-0 ${className}`}>
        {heading}
      </Heading>
    );
  }
  return (
    <div className={`${variant === 'sub' ? 'text-[13px]' : 'text-[14px]'} ${className}`}>
      <span className="font-bold text-orange">❯ </span>
      <span className="text-[#eee]">{command}</span>
      {args && <span className="text-ghost">{args}</span>}
    </div>
  );
}
