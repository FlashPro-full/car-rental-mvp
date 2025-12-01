import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow public access to these routes
  const publicPaths = ['/', '/login', '/register', '/cars']
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname === path)

  if (isPublicPath) {
    return NextResponse.next()
  }

  // For protected routes, check authentication on client side
  // (In production, use proper server-side authentication)
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

