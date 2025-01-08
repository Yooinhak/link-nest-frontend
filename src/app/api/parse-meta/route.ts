import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';

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

  // URL 유효성 검사
  if (!/^https?:\/\/[^ "]+$/.test(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  // 캐시 확인
  if (cache.has(url)) {
    return NextResponse.json(cache.get(url)!);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch the URL. Status: ${response.status}`);
      throw new Error('Failed to fetch the URL');
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    const metadata: Metadata = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text() || null,
      description: $('meta[property="og:description"]').attr('content') || null,
      image: $('meta[property="og:image"]').attr('content') || null,
    };

    console.log('Extracted Metadata:', metadata);
    cache.set(url, metadata);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error in metadata fetching:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
