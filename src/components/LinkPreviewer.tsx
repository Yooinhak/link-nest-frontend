'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';

import { Skeleton } from './Skeleton';

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

interface LinkPreviewCardProps {
  url: string;
  userDescription: string | null;
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

export const LinkPreviewCardSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 rounded-xl shadow-md border border-gray-200 bg-white max-w-lg">
      <Skeleton className="min-w-[120px] h-[80px] rounded" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
    </div>
  );
};

export default function LinkPreviewCard({ url, userDescription }: LinkPreviewCardProps) {
  const { data: metadata, isLoading } = useQuery({
    queryKey: [queryKeys.METADATA, url],
    queryFn: () => fetchMetadata(url),
    enabled: !!url,
  });

  if (isLoading) {
    return <LinkPreviewCardSkeleton />;
  }

  if (!metadata) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition bg-white max-w-lg"
    >
      <div className="flex gap-4">
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
      </div>
      {userDescription && (
        <p className="text-sm text-gray-600 italic border-t pt-2 mt-2 line-clamp-3">“{userDescription}”</p>
      )}
    </a>
  );
}
