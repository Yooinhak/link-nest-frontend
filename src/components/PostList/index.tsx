'use client';

import LinkPreviewer from '@components/LinkPreviewer';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

const PostList = ({ folderId }: { folderId: string }) => {
  const supabase = createClient();

  const { data: postList } = useQuery({
    queryKey: [queryKeys.POST_LIST, folderId],
    queryFn: async () => await supabase.from('posts').select().eq('folder_id', Number(folderId)),
    select: data => data.data,
  });

  return (
    <div className="p-2 flex flex-col gap-2">
      {postList?.map(post => (
        <div key={post.id}>
          <LinkPreviewer url={post.url} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
