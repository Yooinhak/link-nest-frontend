'use client';

import Image from 'next/image';

import { createClient } from '@utils/supabase/component';

type Props = {
  type: 'kakao' | 'google';
};

const BUTTON_STYLE = {
  kakao: 'bg-[#FEE500]',
  google: 'bg-[#fff] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.08)]',
};

const SocialLoginButton = ({ type }: Props) => {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: type,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className={`w-[300px] h-[45px] flex items-center justify-center gap-2 rounded-md ${BUTTON_STYLE[type]}`}
    >
      <Image src={`/icons/${type}_logo.svg`} width={18} height={18} alt={`${type} login`} />
      <span>{`${type.charAt(0).toUpperCase() + type.slice(1)}로 시작하기`}</span>
    </button>
  );
};

export default SocialLoginButton;
