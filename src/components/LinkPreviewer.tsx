'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

interface LinkPreviewCardProps {
  url: string;
}

async function fetchMetadata(url: string): Promise<Metadata | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/parse-meta?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error fetching metadata:', err);
    return null;
  }
}

export default function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const { data: metadata } = useQuery({
    queryKey: [queryKeys.METADATA, url],
    queryFn: () => fetchMetadata(url),
    enabled: !!url,
  });

  if (!metadata) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition bg-white max-w-lg"
    >
      {metadata.image && (
        <div className="relative min-w-[120px] h-[80px] rounded overflow-hidden">
          <Image
            src={`/api/image-proxy?url=${encodeURIComponent(metadata.image)}`}
            alt={metadata.title || 'Link Preview'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 120px"
          />
        </div>
      )}
      <div className="flex flex-col justify-between text-sm">
        <p className="font-semibold text-gray-800 line-clamp-2">{metadata.title}</p>
        <p className="text-gray-500 mt-1 line-clamp-2">{metadata.description}</p>
      </div>
    </a>
  );
}
