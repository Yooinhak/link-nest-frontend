const withPWA = require('next-pwa')({
  dest: 'public', // Service Worker 및 기타 PWA 파일이 생성될 위치
  register: true, // Service Worker 등록
  skipWaiting: true, // 업데이트 시 대기하지 않고 즉시 활성화
});

module.exports = withPWA({
  // 다른 Next.js 설정
});
