import type { ReactNode, Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  label: string;
  className?: string;
  children: ReactNode;
}

export const Section = ({ ref, label, className = '', children }: Props) => {
  return (
    <section ref={ref} data-screen-label={label} className={`box-border border-t border-line-0 px-[6vw] py-22.5 ${className}`}>
      {children}
    </section>
  );
};
