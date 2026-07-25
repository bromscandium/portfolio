import type { Ref } from 'react';
import { useHuman } from '@/hooks/useStrings';
import { IntroPrompt } from './IntroPrompt';
import { IntroHero } from './IntroHero';

interface Props {
  ref?: Ref<HTMLElement>;
  typedCmd: string;
  ghostCmd: string;
  heroDone: boolean;
  onWork: () => void;
  onContact: () => void;
}

export const Intro = ({ ref, typedCmd, ghostCmd, heroDone, onWork, onContact }: Props) => {
  const human = useHuman();
  return (
    <section
      ref={ref}
      data-screen-label="Intro"
      className="box-border flex min-h-[calc(100vh-64px)] flex-col justify-center px-[6vw] pb-20 pt-15"
    >
      {!human && <IntroPrompt typedCmd={typedCmd} ghostCmd={ghostCmd} />}
      {heroDone && <IntroHero onWork={onWork} onContact={onContact} />}
    </section>
  );
};
