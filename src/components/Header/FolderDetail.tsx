'use client';

import { useRouter } from 'next/navigation';

import { CreatePostButton } from '@components/Button';
import { ArrowLeft } from 'lucide-react';

interface FolderDetailHeaderProps {
  folder: { id?: number; name?: string };
}

const FolderDetailHeader = ({ folder }: FolderDetailHeaderProps) => {
  const router = useRouter();

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
          <span className="text-lg font-semibold text-gray-800">{folder?.name || '폴더 이름'}</span>
        </div>
        <CreatePostButton folderId={String(folder.id)} />
      </div>
    </div>
  );
};

export default FolderDetailHeader;
