import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';

type Props = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderDetail({ params }: Props) {
  const { folderId } = await params;

  return (
    <div>
      <FolderDetailHeader folderId={folderId} />
      <PostList folderId={folderId} />
    </div>
  );
}
