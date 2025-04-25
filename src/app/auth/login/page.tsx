import Image from 'next/image';

import { InstallPWAButton, SocialLoginButton } from '@components/Button';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image src={'/logo/ios/1024.png'} width={160} height={160} alt={'logo'} className="rounded-lg mb-8" />
      <SocialLoginButton type={'kakao'} />
      <SocialLoginButton type={'google'} />
      <InstallPWAButton />
    </div>
  );
}
