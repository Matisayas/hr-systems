import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const isLoginPage = request.nextUrl.pathname === '/auth/login'
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/employees') ||
    request.nextUrl.pathname.startsWith('/dashboard')
  
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/employees/:path*',
    '/dashboard/:path*',
    '/auth/login'
  ]
}