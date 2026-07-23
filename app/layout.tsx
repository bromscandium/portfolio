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

export const metadata: Metadata = {
  title: 'Portfolio | Yaroslav Yeromenko',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.png' },
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
