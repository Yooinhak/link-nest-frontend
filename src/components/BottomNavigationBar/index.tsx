'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ICON_PATH = Object.freeze({
  HOME: 'm19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z',
  PROFILE:
    'M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z',
});

const NAV_LINKS = Object.freeze({
  HOME: '/home',
  PROFILE: '/profile',
});

const BottomNavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-xl border border-gray-200 dark:border-gray-700 rounded-full">
        <ul className="grid grid-cols-2 h-16">
          {Object.keys(ICON_PATH).map(key => {
            const path = NAV_LINKS[key as keyof typeof NAV_LINKS];
            const isActive = pathname === path;

            return (
              <li key={key} className="flex items-center justify-center">
                <Link href={path} className="flex flex-col items-center justify-center w-full h-full group">
                  <svg
                    className={`w-6 h-6 mb-1 transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={ICON_PATH[key as keyof typeof ICON_PATH]} />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavigationBar;
