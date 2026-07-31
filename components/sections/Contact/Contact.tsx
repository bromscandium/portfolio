import { CommandHeader } from '@/components/common/CommandHeader';
import { Icon } from '@/components/common/Icon';
import { Heading } from '@/components/common/Typography';
import { useHuman, useStrings } from '@/hooks/useStrings';
import { LINKS } from '@/lib/config';
import { contacts } from '@/lib/data';
import type { ContactLink } from '@/lib/types';
import type { Ref } from 'react';
import { HireCheck } from './HireCheck';

interface Props {
  ref?: Ref<HTMLElement>;
  closed: boolean;
  onCopyEmail: (email: string) => void;
}

const EMAIL = LINKS.email.replace('mailto:', '');

const ContactButton = ({ link }: { link: ContactLink }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    title={link.label}
    className="flex h-12.5 w-12.5 items-center justify-center rounded-card border border-[#262626] text-fg-3 transition-all duration-300 hover:border-orange hover:!text-orange"
  >
    <Icon name={link.icon} size={20} />
  </a>
);

export const Contact = ({ ref, closed, onCopyEmail }: Props) => {
  const human = useHuman();
  const strings = useStrings();
  const copyEmail = (e: React.MouseEvent) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(
      () => onCopyEmail(EMAIL),
      () => {
        window.location.href = `mailto:${EMAIL}`;
      },
    );
  };

  return (
    <section ref={ref} data-screen-label="Contact" className="box-border flex min-h-full flex-col border-t border-line-0 px-[6vw] pb-6 pt-22.5">
      <div className="flex flex-1 flex-col justify-center">
        {closed ? (
          <div className="text-[13px] leading-[1.8] text-fg-6">
            <div>
              <span className="text-orange">❯</span> contact --close
            </div>
            <div className="text-yellow">connection closed — contact section unmounted.</div>
            <div className="text-fg-8">
              run <span className="text-orange">contact --open</span> to reconnect.
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-12 xl:grid-cols-2 xl:items-stretch">
              <div className="flex flex-col items-start">
                <CommandHeader command="contact --open" heading={strings.hContact} className="mb-2" />
                <div className="mb-10 text-[13px] text-green">{strings.contactNote}</div>
                <Heading variant="stroke" className="m-0 mb-9">
                  LET&apos;S TALK
                </Heading>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={copyEmail}
                  className="cursor-pointer self-start border-b border-line-6 pb-2 text-[clamp(17px,2.2vw,26px)] text-fg transition-all duration-300 hover:border-orange hover:!text-orange"
                >
                  {EMAIL}
                </a>
                <div className="mt-12 flex gap-5">
                  {contacts.map((c) => (
                    <ContactButton key={c.icon} link={c} />
                  ))}
                </div>
              </div>
              <HireCheck />
            </div>
          </>
        )}
      </div>
      <div className="mt-auto pt-17.5 text-[12px] text-fg-8">
        {!human && (
          <>
            <span className="text-orange">❯ </span>
            <span>exit 0&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          </>
        )}
        <span>© 2026 Yaroslav Yeromenko</span>
        <span>&nbsp;&nbsp;·&nbsp;&nbsp;{strings.lastUpdated(process.env.NEXT_PUBLIC_BUILD_TIME ?? '')}</span>
      </div>
    </section>
  );
};
