import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#222',
};

export const metadata: Metadata = {
  title: 'Link Nest',
  description: '즐겨찾는 공유 링크를 모두 모아둘 수 있는 아늑한 장소입니다.',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/ln_icon.png', sizes: '192x192' },
    { rel: 'icon', url: '/icons/ln_icon.png', sizes: '512x512' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
