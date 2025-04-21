import { CreatePostButton } from '@components/Button';
import { FolderDetailHeader } from '@components/Header';

type Props = {
  params: Promise<{ folderId: string }>;
};

export default async function FolderDetail({ params }: Props) {
  const { folderId } = await params;

  return (
    <div>
      <FolderDetailHeader folderId={folderId} />
      <CreatePostButton folderId={folderId} />
    </div>
  );
}
