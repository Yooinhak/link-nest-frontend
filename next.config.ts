/** @type {import('next').NextConfig} */
import withPWA from '@ducanh2912/next-pwa';

const nextPWA = withPWA({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  images: {
    domains: [
      // 소셜 로그인 프로필 이미지
      'lh3.googleusercontent.com',
      'k.kakaocdn.net',
    ],
  },
};

export default nextPWA(nextConfig);
