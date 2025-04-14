'use client';

import Image from 'next/image';

import BottomNavigationBar from '@components/BottomNavigationBar';
import { SignOutButton } from '@components/Button';
import { Skeleton } from '@components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/component';

import packageJson from '../../../../package.json';

export default function ProfilePage() {
  const supabase = createClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => await supabase.auth.getUser(),
    select: data => data.data.user,
  });

  return (
    <div className="p-4 flex flex-col items-center">
      {isLoading ? (
        <Skeleton className="w-[128px] h-[128px] rounded-full" />
      ) : (
        <Image
          src={user?.user_metadata?.avatar_url || ''}
          width={128}
          height={128}
          className="rounded-full"
          alt="user_avatar_image"
        />
      )}

      <div>{user?.email}</div>

      <SignOutButton />

      <span>{`version : ${packageJson.version}`}</span>

      <BottomNavigationBar />
    </div>
  );
}
