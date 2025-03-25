import { SocialLoginButton } from '@components/Button';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <SocialLoginButton type={'kakao'} />
      <SocialLoginButton type={'google'} />
    </div>
  );
}
