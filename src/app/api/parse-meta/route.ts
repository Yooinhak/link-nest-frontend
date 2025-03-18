import { NextRequest, NextResponse } from 'next/server';
import * as puppeteer from 'puppeteer';

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

const cache = new Map<string, Metadata>();

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // 캐시 확인
  if (cache.has(url)) {
    return NextResponse.json(cache.get(url)!);
  }

  try {
    const browser = await puppeteer.launch({ headless: 'shell' });
    const page = await browser.newPage();

    // 브라우저에서 요청하는 것처럼 보이도록 User-Agent 설정
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // 메타데이터 추출
    const metadata: Metadata = await page.evaluate(() => {
      return {
        title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title || null,
        description:
          document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
          document.querySelector('meta[name="description"]')?.getAttribute('content') ||
          null,
        image:
          document.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
          document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
          null,
      };
    });

    await browser.close();

    cache.set(url, metadata);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
