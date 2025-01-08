/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextPWA = withPWA({
  dest: 'public',
  register: true, // Service Worker 자동 등록
  skipWaiting: true, // 업데이트가 감지되면 대기하지 않고 새 SW 적용
});

const nextConfig = {};

export default nextPWA(nextConfig);
