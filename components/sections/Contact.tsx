import { contacts } from '@/lib/data';
import { Icon } from '../Icon';
import type { Strings } from '@/lib/i18n';
import type { Ref } from 'react';

interface Props {
  ref?: Ref<HTMLElement>;
  isDev: boolean;
  strings: Strings;
  onCopyEmail: (email: string) => void;
}

const EMAIL = 'kkmshbiu@protonmail.com';

export function Contact({ ref, isDev, strings, onCopyEmail }: Props) {
  return (
    <section
      ref={ref}
      data-screen-label="Contact"
      className="box-border flex min-h-[70vh] flex-col justify-center border-t border-line-0 px-[6vw] pb-[70px] pt-[90px]"
    >
      {isDev ? (
        <div className="mb-2 text-[14px]">
          <span className="font-bold text-orange">❯ </span>
          <span className="text-[#eee]">contact --open</span>
        </div>
      ) : (
        <h2 className="mb-2 mt-0 font-display text-[30px] font-semibold tracking-[2px] text-fg">{strings.hContact}</h2>
      )}
      <div className="mb-10 text-[13px] text-green">{strings.contactNote}</div>
      <h2 className="text-stroke-orange m-0 mb-9 font-display text-[clamp(60px,8vw,120px)] font-light leading-[.95] tracking-[5px]">
        LET&apos;S TALK
      </h2>
      <a
        href={`mailto:${EMAIL}`}
        onClick={(e) => {
          if (navigator.clipboard) {
            e.preventDefault();
            navigator.clipboard.writeText(EMAIL).then(
              () => onCopyEmail(EMAIL),
              () => {
                window.location.href = `mailto:${EMAIL}`;
              },
            );
          }
        }}
        className="cursor-pointer self-start border-b border-line-6 pb-2 text-[clamp(17px,2.2vw,26px)] text-fg transition-all hover:border-orange hover:!text-orange"
      >
        {EMAIL}
      </a>
      <div className="mt-12 flex gap-5">
        {contacts.map((c) => (
          <a
            key={c.icon}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            title={c.label}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-card border border-[#262626] text-fg-3 transition-all hover:border-orange hover:!text-orange"
          >
            <Icon name={c.icon} size={20} />
          </a>
        ))}
      </div>
      <div className="mt-[70px] text-[12px] text-fg-8">
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
