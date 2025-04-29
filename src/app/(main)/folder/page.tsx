import { Suspense } from 'react';

import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';

export default function FolderDetailPage() {
  return (
    <Suspense>
      <FolderDetailHeader />
      <PostList />
    </Suspense>
  );
}
