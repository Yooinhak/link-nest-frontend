import { LinkPreviewCardSkeleton } from '@components/LinkPreviewer';

export default function Loading() {
  return (
    <div>
      <div className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <LinkPreviewCardSkeleton />
        <LinkPreviewCardSkeleton />
        <LinkPreviewCardSkeleton />
        <LinkPreviewCardSkeleton />
      </div>
    </div>
  );
}
