import Image from 'next/image';

import { SignOutButton } from '@components/Button';
import { createClient } from '@utils/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div>{user?.email}</div>
      <Image
        src={user?.user_metadata?.avatar_url}
        width={64}
        height={64}
        className="rounded-full"
        alt={'user_avatar_image'}
      />
      <SignOutButton />
    </div>
  );
}
