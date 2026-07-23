import { contacts } from '@/lib/data';
import type { ContactLink } from '@/lib/types';
import { Icon } from '@/components/common/Icon';
import { CommandHeader } from '@/components/common/CommandHeader';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  isDev: boolean;
  strings: Strings;
  onCopyEmail: (email: string) => void;
}

const EMAIL = 'kkmshbiu@protonmail.com';

const ContactButton = ({ link }: { link: ContactLink }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    title={link.label}
    className="flex h-12.5 w-12.5 items-center justify-center rounded-card border border-[#262626] text-fg-3 transition-all hover:border-orange hover:!text-orange"
  >
    <Icon name={link.icon} size={20} />
  </a>
);

export const Contact = ({ ref, isDev, strings, onCopyEmail }: Props) => {
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
    <section
      ref={ref}
      data-screen-label="Contact"
      className="box-border flex min-h-[70vh] flex-col justify-center border-t border-line-0 px-[6vw] pb-17.5 pt-22.5"
    >
      <CommandHeader human={!isDev} command="contact --open" heading={strings.hContact} className="mb-2" />
      <div className="mb-10 text-[13px] text-green">{strings.contactNote}</div>
      <h2 className="text-stroke-orange m-0 mb-9 font-display text-[clamp(60px,8vw,120px)] font-light leading-[.95] tracking-[5px]">
        LET&apos;S TALK
      </h2>
      <a
        href={`mailto:${EMAIL}`}
        onClick={copyEmail}
        className="cursor-pointer self-start border-b border-line-6 pb-2 text-[clamp(17px,2.2vw,26px)] text-fg transition-all hover:border-orange hover:!text-orange"
      >
        {EMAIL}
      </a>
      <div className="mt-12 flex gap-5">
        {contacts.map((c) => (
          <ContactButton key={c.icon} link={c} />
        ))}
      </div>
      <div className="mt-17.5 text-[12px] text-fg-8">
        {isDev && (
          <>
            <span className="text-orange">❯ </span>
            <span>exit 0&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          </>
        )}
        <span>© 2026 Yaroslav Yeromenko</span>
      </div>
    </section>
  );
}
