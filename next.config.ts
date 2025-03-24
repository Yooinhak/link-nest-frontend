/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextPWA = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
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
