import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';
import { createClient } from '@utils/supabase/server';

export default async function FolderDetailPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params;
  const supabase = await createClient();
  const { data: folder } = await supabase.from('folders').select().eq('id', Number(folderId)).single();
  const { data: posts } = await supabase.from('posts').select().eq('folder_id', Number(folderId));

  return (
    <div>
      <FolderDetailHeader folder={{ id: folder?.id, name: folder?.name }} />
      <PostList posts={posts || []} />
    </div>
  );
}
