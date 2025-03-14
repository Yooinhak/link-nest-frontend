
import LinkPreviewer from '@components/LinkPreviewer';
import { createClient } from 'utils/supabase/static-props';

export default async function Home() {
  const supabase = createClient();
  const postList = await supabase.from('posts').select();

  return (
    <div className="w-full h-screen p-12 bg-slate-400 flex justify-center items-center">
      {(postList.data ?? []).map((post) => (
        <LinkPreviewer key={`post_${post.id}`} url={post.url} />
      ))}
    </div>
  );
}
