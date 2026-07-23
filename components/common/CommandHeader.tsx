interface Props {
  human: boolean;
  command: string;
  args?: string;
  heading: string;
  variant?: 'main' | 'sub';
  className?: string;
}

export function CommandHeader({ human, command, args, heading, variant = 'main', className = '' }: Props) {
  if (human) {
    if (variant === 'sub') {
      return <div className={`text-[12px] uppercase tracking-[3px] text-fg-5 ${className}`}>{heading}</div>;
    }
    return <h2 className={`m-0 font-display text-[30px] font-semibold tracking-[2px] text-fg ${className}`}>{heading}</h2>;
  }
  return (
    <div className={`${variant === 'sub' ? 'text-[13px]' : 'text-[14px]'} ${className}`}>
      <span className="font-bold text-orange">❯ </span>
      <span className="text-[#eee]">{command}</span>
      {args && <span className="text-ghost">{args}</span>}
    </div>
  );
}
