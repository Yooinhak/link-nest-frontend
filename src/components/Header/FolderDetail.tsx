'use client';

import { useParams, useRouter } from 'next/navigation';

import { CreatePostButton } from '@components/Button';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';
import { ArrowLeft } from 'lucide-react';

const Component = () => {
  const router = useRouter();
  const supabase = createClient();
  const { folderId } = useParams() as { folderId: string };

  const { data } = useQuery({
    queryKey: [queryKeys.FOLDER_DETAIL],
    queryFn: async () => supabase.from('folders').select().eq('id', Number(folderId)).single(),
    select: res => res.data,
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
          <span className="text-lg font-semibold text-gray-800">{data?.name || '폴더 이름'}</span>
        </div>
        <CreatePostButton folderId={folderId} />
      </div>
    </div>
  );
};

export default Component;
