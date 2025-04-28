'use client';

import { useParams, useRouter } from 'next/navigation';

import { CreatePostButton } from '@components/Button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';
import { ArrowLeft } from 'lucide-react';

const FolderDetailHeader = () => {
  const router = useRouter();
  const { folderId } = useParams() as { folderId: string };
  const supabase = createClient();

  const { data } = useSuspenseQuery({
    queryKey: [queryKeys.FOLDER_DETAIL, folderId],
    queryFn: async () => {
      const { data } = await supabase.from('folders').select().eq('id', Number(folderId)).single();
      return data;
    },
  });

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-lg font-semibold text-gray-800">{data?.name ?? '폴더 이름'}</span>
        </div>
        <CreatePostButton folderId={folderId} />
      </div>
    </div>
  );
};

export default FolderDetailHeader;
