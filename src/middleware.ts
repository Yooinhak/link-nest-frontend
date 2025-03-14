import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get(`${process.env.NEXT_PUBLIC_SUPABASE_TOKEN}`);

  if (!url.pathname.startsWith('/login') && !url.pathname.startsWith('/api') && !token) {
    return NextResponse.redirect(new URL('login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|icons).*)',
  ],
};
