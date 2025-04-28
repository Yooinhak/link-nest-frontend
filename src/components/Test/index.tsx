'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  return (
    <div>
      <Link href={'/test1'}>link로 갑니다~</Link>
      <button onClick={() => router.push('/test2')}>라우터로 갑니다~</button>
    </div>
  );
};

export default Component;
