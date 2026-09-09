import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n/config';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';
import { getMaintenanceHtml } from '@/lib/maintenance/template';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // ─── 1. ADMIN ROUTE SECURITY GUARD (ALWAYS ACCESSIBLE) ───
  // Admin routes (/admin, /admin/login, /admin/**) are NEVER blocked by maintenance mode.
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME);
    const session = sessionCookie?.value ? await verifySessionToken(sessionCookie.value) : null;
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
      if (session) {
        // If already authenticated, redirect to /admin dashboard
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // For all other /admin routes, enforce valid session
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // ─── 2. MAINTENANCE MODE INTERCEPTION ───
  if (isMaintenanceMode) {
    // Exclude Admin APIs and Auth APIs required for Admin functionality
    if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    // Exclude Next.js internals, brand assets, and static files
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/assets') ||
      pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }

    // Intercept public API routes with 503 JSON
    if (pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({
          error: 'Service Unavailable',
          message: 'The website is currently undergoing scheduled maintenance.',
          maintenance: true,
        }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    // Serve bilingual 503 Maintenance Page for all public website routes
    return new NextResponse(getMaintenanceHtml(), {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Retry-After': '3600',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }

  // ─── 3. NORMAL OPERATION (MAINTENANCE_MODE IS NOT 'true') ───

  // Skip Next.js internals, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the default locale for public routes
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};
