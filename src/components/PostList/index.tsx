'use client';

import LinkPreviewer from '@components/LinkPreviewer';

interface PostListProps {
  posts:
    | {
        created_at: string | null;
        description: string | null;
        folder_id: number | null;
        id: number;
        url: string;
        user_id: string | null;
      }[]
    | null;
}

const PostList = ({ posts }: PostListProps) => {
  if (!posts?.length) {
    return <div className="p-4 text-gray-500">포스트가 없습니다.</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      {posts.map(post => (
        <div key={post.id}>
          <LinkPreviewer url={post.url} userDescription={post.description} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
