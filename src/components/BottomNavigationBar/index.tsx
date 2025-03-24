import Link from 'next/link';

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
  return (
    <nav className="fixed z-50 w-full h-16 max-w-sm -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <ul className="grid h-full grid-cols-2">
        {Object.keys(ICON_PATH).map((key, index) => {
          const isFirst = index === 0;
          const isLast = index === Object.keys(ICON_PATH).length - 1;
          return (
            <li
              key={`${key}_nav`}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer ${
                isFirst ? 'rounded-s-full' : isLast ? 'rounded-e-full' : ''
              }`}
            >
              <Link
                href={NAV_LINKS[key as keyof typeof NAV_LINKS]}
                className="w-full h-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
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
    </nav>
  );
};

export default BottomNavigationBar;
