import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'dead end',
  robots: { index: false, follow: false },
};

const FlagDecoy = () => (
  <main className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-bg px-6 text-center font-mono text-fg">
    <div className="text-[64px] leading-none">🐟</div>
    <div className="text-[15px] text-orange">404? no. just a dead end.</div>
    <p className="max-w-md text-[13px] leading-[1.7] text-fg-6">
      too easy. the flag is not a URL you can visit — <span className="text-fg">Disallow</span> was bait.
      <br />
      the real trail lives in the terminal: <span className="text-cyan">cd ~ &amp;&amp; ls -a</span>
    </p>
    <Link href="/" className="mt-2 text-[12px] text-fg-8 underline underline-offset-4 transition-colors hover:text-orange">
      ❮ back to the terminal
    </Link>
  </main>
);

export default FlagDecoy;
