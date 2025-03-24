import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Supabase 인증 토큰 찾기 (code-verifier 제외)
  const supabaseToken = req.cookies
    .getAll()
    .find(
      ({ name }) => name.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_TOKEN}`) && !name.includes('-code-verifier'),
    );

  const hasToken = supabaseToken !== undefined;

  if (!url.pathname.startsWith('/auth') && !hasToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if ((url.pathname.startsWith('/auth') || url.pathname === '/') && hasToken) {
    return NextResponse.redirect(new URL('/home', req.url));
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
