'use client';

import Image from 'next/image';

import BottomNavigationBar from '@components/BottomNavigationBar';
import { InstallPWAButton, SignOutButton } from '@components/Button';
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
    <div className="min-h-screen flex flex-col items-center pt-10 pb-24 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4">
        {isLoading ? (
          <Skeleton className="w-32 h-32 rounded-full" />
        ) : (
          <Image
            src={user?.user_metadata?.avatar_url || ''}
            width={128}
            height={128}
            className="rounded-full object-cover"
            alt="user_avatar_image"
          />
        )}

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
        </div>

        <SignOutButton />
        <InstallPWAButton />

        <div className="text-sm text-gray-400">{`version: ${packageJson.version}`}</div>
      </div>

      <BottomNavigationBar />
    </div>
  );
}
