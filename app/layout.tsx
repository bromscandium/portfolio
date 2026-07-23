import type { Metadata } from 'next';
import { Jura, JetBrains_Mono } from 'next/font/google';
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

const DESCRIPTION =
  'Yaroslav Yeromenko — Full-Stack Developer (Next.js · Python · Docker). Portfolio styled as an authentic developer terminal: experience, skill stack, and 19 shipped projects.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bromscandium.com'),
  title: 'portfolio',
  description: DESCRIPTION,
  applicationName: 'bromscandium terminal',
  authors: [{ name: 'Yaroslav Yeromenko', url: 'https://bromscandium.com' }],
  creator: 'Yaroslav Yeromenko',
  keywords: ['Yaroslav Yeromenko', 'bromscandium', 'Full-Stack Developer', 'Next.js', 'Python', 'Docker', 'PostgreSQL', 'CI/CD', 'portfolio', 'terminal'],
  robots: { index: false, follow: false },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.png' }] },
  openGraph: {
    type: 'website',
    url: 'https://bromscandium.com',
    siteName: 'bromscandium',
    title: 'Yaroslav Yeromenko | Full-Stack Developer',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: 'Yaroslav Yeromenko | Full-Stack Developer',
    description: DESCRIPTION,
  },
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={`${jura.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
