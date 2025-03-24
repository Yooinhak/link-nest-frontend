import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Supabase 인증 토큰 가져오기
  const tokenKey = process.env.NEXT_PUBLIC_SUPABASE_TOKEN;
  const supabaseToken = tokenKey ? req.cookies.get(tokenKey) : undefined;

  const hasToken = !!supabaseToken; // 값이 있으면 true, 없으면 false

  if (!url.pathname.startsWith('/auth') && !hasToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if ((url.pathname.startsWith('/auth') || url.pathname === '/') && hasToken) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|icons).*)'],
};
