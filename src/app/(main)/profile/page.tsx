'use client';

import Image from 'next/image';

import { SignOutButton } from '@components/Button';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/component';

export default function ProfilePage() {
  const supabase = createClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => await supabase.auth.getUser(),
    select: data => data.data.user,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>유저 정보를 불러오지 못했습니다.</p>;

  return (
    <div>
      <div>{user?.email}</div>
      <Image
        src={user?.user_metadata?.avatar_url || ''}
        width={64}
        height={64}
        className="rounded-full"
        alt="user_avatar_image"
      />
      <SignOutButton />
    </div>
  );
}
