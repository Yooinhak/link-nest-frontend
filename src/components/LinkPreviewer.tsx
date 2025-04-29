'use client';

import { useQuery } from '@tanstack/react-query';
import { parseMetadata } from '@utils/parseMetadata';
import { queryKeys } from '@utils/react-query/queryKeys';

import { Skeleton } from './Skeleton';

/* eslint-disable @next/next/no-img-element */

interface LinkPreviewCardProps {
  url: string;
  userDescription: string | null;
}

export const LinkPreviewCardSkeleton = ({ userDescription }: { userDescription?: string | null }) => {
  return (
    <div className="flex gap-4 p-4 rounded-xl shadow-md border border-gray-200 bg-white max-w-lg">
      <Skeleton className="min-w-[120px] h-[80px] rounded" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      {userDescription && (
        <p className="text-sm text-gray-600 italic border-t pt-2 mt-2 line-clamp-3">“{userDescription}”</p>
      )}
    </div>
  );
};

export default function LinkPreviewCard({ url, userDescription }: LinkPreviewCardProps) {
  const { data: metadata, isLoading } = useQuery({
    queryKey: [queryKeys.METADATA, url],
    queryFn: () => parseMetadata(url),
    enabled: !!url,
  });

  if (isLoading) {
    return <LinkPreviewCardSkeleton userDescription={userDescription} />;
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
          <div className="relative w-[120px] aspect-[3/2] bg-gray-100 rounded overflow-hidden flex-shrink-0">
            <img
              src={metadata.image}
              alt={metadata.title || 'Link Preview'}
              className="w-full h-full object-cover"
              loading="lazy"
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
