'use client';

import { useRef } from 'react';

import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { parseMetadata } from '@utils/parseMetadata';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';
import { MoreHorizontal, Trash2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';
import { Skeleton } from './Skeleton';

/* eslint-disable @next/next/no-img-element */

interface LinkPreviewCardProps {
  id: number;
  url: string;
  userDescription: string | null;
  reloadList: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | {
          created_at: string | null;
          description: string | null;
          folder_id: number | null;
          id: number;
          url: string;
          user_id: string | null;
        }[]
      | null,
      Error
    >
  >;
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

export default function LinkPreviewCard({ id, url, userDescription, reloadList }: LinkPreviewCardProps) {
  const supabase = createClient();
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  const { data: metadata, isLoading } = useQuery({
    queryKey: [queryKeys.METADATA, url],
    queryFn: () => parseMetadata(url),
    enabled: !!url,
  });

  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      reloadList();
    }
  };

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex flex-col gap-3 p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition bg-white max-w-lg"
      >
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-1">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <Pen className="w-4 h-4 mr-2" /> 수정
              </DropdownMenuItem> */}
              <DropdownMenuItem
                className="text-red-500"
                onClick={e => {
                  e.preventDefault();
                  deleteRef.current?.click();
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /> 삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-4">
          {isLoading ? (
            <Skeleton className="min-w-[120px] h-[80px] rounded" />
          ) : (
            metadata?.image && (
              <div className="relative w-[120px] aspect-[3/2] bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={metadata?.image}
                  alt={metadata?.title || 'Link Preview'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )
          )}
          {isLoading ? (
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          ) : (
            <div className="flex flex-col justify-between text-sm">
              <p className="font-semibold text-gray-800 line-clamp-2">{metadata?.title ?? ''}</p>
              <p className="text-gray-500 mt-1 line-clamp-2">{metadata?.description ?? ''}</p>
            </div>
          )}
        </div>

        {userDescription && (
          <p className="text-sm text-gray-600 italic border-t pt-2 mt-2 line-clamp-3">“{userDescription}”</p>
        )}
      </a>

      <AlertDialog>
        <AlertDialogTrigger ref={deleteRef} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>폴더 삭제</AlertDialogTitle>
            <AlertDialogDescription>폴더를 정말로 삭제하시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete();
              }}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
