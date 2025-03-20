'use client';

import { createClient } from '@utils/supabase/component';

import Image from 'next/image';

const KakaoLoginButton = () => {
  const supabase = createClient();

  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <Image
      src={'/icons/kakao_btn.png'}
      width={300}
      height={45}
      alt={'kakao login'}
      className="cursor-pointer"
      onClick={signInWithKakao}
    />
  );
};

export default KakaoLoginButton;
