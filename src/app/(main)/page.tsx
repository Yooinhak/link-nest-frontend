import { createClient } from '@utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const data = await supabase.auth.getUserIdentities();
  console.log(data);
  return <div className="w-full h-screen p-12 bg-slate-400 flex justify-center items-center"></div>;
}
