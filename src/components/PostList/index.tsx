'use client';

import { useParams } from 'next/navigation';

import LinkPreviewer from '@components/LinkPreviewer';
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

const PostList = () => {
  const { folderId } = useParams() as { folderId: string };
  const supabase = createClient();

  const { data: postList } = useSuspenseQuery({
    queryKey: [queryKeys.POST_LIST, folderId],
    queryFn: async () => {
      const { data } = await supabase.from('posts').select().eq('folder_id', Number(folderId));
      return data;
    },
  });

  if (!postList || postList.length === 0) {
    return <div className="p-4 text-gray-500">게시글이 없습니다.</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      {postList.map(post => (
        <div key={post.id}>
          <LinkPreviewer url={post.url} userDescription={post.description} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
