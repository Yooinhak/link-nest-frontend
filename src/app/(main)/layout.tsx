'use client';

import { useRouter } from 'next/navigation';
import { createClient } from 'utils/supabase/component';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <button onClick={signOut}>로그아웃</button>
      {children}
    </div>
  );
}
