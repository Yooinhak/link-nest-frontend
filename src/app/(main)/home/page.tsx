import { CreateFolderButton } from '@components/Button';
import { createClient } from '@utils/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.from('folders').select();

  return (
    <div className="p-4 flex flex-col gap-4">
      <CreateFolderButton />
      {data?.map(d => <div key={d.id}>{d.name}</div>)}
    </div>
  );
}
