import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';
import { createClient } from '@utils/supabase/server';

export default async function FolderDetailPage({ params }: { params: { folderId: string } }) {
  const supabase = await createClient();
  const { data: folder } = await supabase.from('folders').select().eq('id', Number(params.folderId)).single();
  const { data: posts } = await supabase.from('posts').select().eq('folder_id', Number(params.folderId));

  return (
    <div>
      <FolderDetailHeader folder={{ id: folder?.id, name: folder?.name }} />
      <PostList posts={posts || []} />
    </div>
  );
}
