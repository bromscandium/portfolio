import type { ElementType, ReactNode } from 'react';

type Variant = 'display' | 'stroke' | 'section' | 'modal' | 'role' | 'card';

const VARIANT: Record<Variant, string> = {
  display: 'text-[clamp(56px,7.5vw,108px)] font-light leading-none tracking-[5px]',
  stroke: 'text-stroke-orange text-[clamp(60px,8vw,120px)] font-light leading-[.95] tracking-[5px]',
  section: 'text-[30px] font-semibold tracking-[2px]',
  modal: 'text-[28px] font-semibold tracking-[1px]',
  role: 'text-[24px] font-semibold tracking-[1px]',
  card: 'text-[17px] font-semibold tracking-[.5px]',
};

const DEFAULT_TAG: Record<Variant, ElementType> = {
  display: 'h1',
  stroke: 'h1',
  section: 'h2',
  modal: 'span',
  role: 'span',
  card: 'span',
};

interface Props {
  variant: Variant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export const Heading = ({ variant, as, className = '', children }: Props) => {
  const Tag = as ?? DEFAULT_TAG[variant];
  const color = variant === 'stroke' ? '' : 'text-fg';
  return <Tag className={`font-display ${color} ${VARIANT[variant]} ${className}`}>{children}</Tag>;
};
