import { SITE_URL } from '@/lib/config';
import { PROJECT_COUNT } from '@/lib/data/projectCount';
import { FAVICON_ID } from '@/lib/favicon';
import { STORAGE_KEYS } from '@/lib/storage';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Jura } from 'next/font/google';
import './globals.css';

const jura = Jura({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jura',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const DESCRIPTION = `Yaroslav Yeromenko — Full-Stack Engineer (Next.js · Python · Docker). Portfolio styled as an authentic developer terminal: experience, skill stack, and ${PROJECT_COUNT} shipped projects.`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'portfolio',
  description: DESCRIPTION,
  applicationName: 'bromscandium terminal',
  authors: [{ name: 'Yaroslav Yeromenko', url: SITE_URL }],
  creator: 'Yaroslav Yeromenko',
  keywords: ['Yaroslav Yeromenko', 'bromscandium', 'Full-Stack Engineer', 'Next.js', 'Python', 'Docker', 'PostgreSQL', 'CI/CD', 'portfolio', 'terminal'],
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'bromscandium',
    title: 'Yaroslav Yeromenko | Full-Stack Engineer',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: 'Yaroslav Yeromenko | Full-Stack Engineer',
    description: DESCRIPTION,
  },
};

const THEME_SCRIPT = `try{var d=document.documentElement,a=localStorage.getItem('${STORAGE_KEYS.accent}');if(localStorage.getItem('${STORAGE_KEYS.theme}')==='light')d.dataset.theme='light';if(a==='red'||a==='blue'||a==='green')d.dataset.accent=a}catch(e){}`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${jura.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link id={FAVICON_ID} rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
