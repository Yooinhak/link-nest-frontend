import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

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
  openGraph: {
    title: 'Link Nest',
    description: '즐겨찾는 공유 링크를 모두 모아둘 수 있는 아늑한 장소입니다.',
    url: '/',
    siteName: 'Link Nest',
    images: [
      {
        url: '/icons/ln_icon.png',
        width: 192,
        height: 192,
        alt: 'Link Nest Icon',
      },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/ln_icon.png" sizes="192x192" />
        <link rel="icon" href="/icons/ln_icon.png" sizes="512x512" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
