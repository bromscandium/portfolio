import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';
import { IntroPrompt } from './IntroPrompt';
import { IntroHero } from './IntroHero';

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

export const Intro = ({ ref, isDev, typedCmd, ghostCmd, heroDone, strings, onWork, onContact }: Props) => {
  return (
    <section
      ref={ref}
      data-screen-label="Intro"
      className="box-border flex min-h-[calc(100vh-64px)] flex-col justify-center px-[6vw] pb-20 pt-15"
    >
      {isDev && <IntroPrompt typedCmd={typedCmd} ghostCmd={ghostCmd} />}
      {heroDone && <IntroHero strings={strings} onWork={onWork} onContact={onContact} />}
    </section>
  );
};
