import { CreateFolderButton } from '@components/Button';
import FolderList from '@components/FolderList/imdex';

export default async function HomePage() {
  return (
    <div className="p-4">
      <CreateFolderButton />
      <FolderList />
    </div>
  );
}
