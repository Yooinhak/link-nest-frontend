import { Suspense } from 'react';

import { FolderDetailHeader } from '@components/Header';
import PostList from '@components/PostList';
import { PostPageLoading } from '@components/Skeleton';

export default function FolderDetailPage() {
  return (
    <Suspense fallback={<PostPageLoading />}>
      <FolderDetailHeader />
      <PostList />
    </Suspense>
  );
}
