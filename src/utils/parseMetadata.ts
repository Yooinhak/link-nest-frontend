import mql from '@microlink/mql';

export interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

export async function parseMetadata(url: string): Promise<Metadata> {
  try {
    const { data } = await mql(url, {
      meta: true,
      screenshot: false,
      video: false,
    });

    return {
      title: data.title ?? null,
      description: data.description ?? null,
      image: data.image?.url ?? null,
    };
  } catch (error) {
    console.error('[parseMetadata] Error parsing URL metadata:', error);
    return {
      title: null,
      description: null,
      image: null,
    };
  }
}
