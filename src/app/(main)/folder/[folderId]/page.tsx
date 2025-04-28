import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';

type Props = {
  params: { folderId: string };
};

export default function FolderDetail({ params }: Props) {
  const { folderId } = params;

  return (
    <div>
      <FolderDetailHeader folderId={folderId} />
      <PostList folderId={folderId} />
    </div>
  );
}
