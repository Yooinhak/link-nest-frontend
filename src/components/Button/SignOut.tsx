'use client';

import { useRouter } from 'next/navigation';

import { createClient } from '@utils/supabase/component';

const Component = () => {
  const router = useRouter();
  const s = createClient();

  const handleSignOut = async () => {
    const { error } = await s.auth.signOut();
    if (error) {
      console.error(error);
    }
    router.push('/auth/login');
  };

  return <button onClick={handleSignOut}>로그아웃</button>;
};

export default Component;
