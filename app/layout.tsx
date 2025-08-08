import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import { site } from '../config/site';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: site.name,
  description:
    'Sparkling homes & offices across York Region. Reliable, detail‑oriented cleaning. Get a free quote today.',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} antialiased bg-white text-zinc-900`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
