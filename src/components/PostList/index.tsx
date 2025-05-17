'use client';

import { useParams } from 'next/navigation';

import LinkPreviewer, { LinkPreviewCardSkeleton } from '@components/LinkPreviewer';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

const PostList = () => {
  const supabase = createClient();
  const { folderId } = useParams();

  const {
    data: postList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.POST_LIST, folderId],
    queryFn: async () => await supabase.from('posts').select().eq('folder_id', Number(folderId)),
    select: data => data.data,
  });

  return (
    <div className="p-4 flex flex-col gap-2">
      {isLoading ? (
        <>
          <LinkPreviewCardSkeleton />
          <LinkPreviewCardSkeleton />
          <LinkPreviewCardSkeleton />
          <LinkPreviewCardSkeleton />
        </>
      ) : (
        postList?.map(post => (
          <div key={post.id}>
            <LinkPreviewer id={post.id} url={post.url} userDescription={post.description} reloadList={refetch} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
