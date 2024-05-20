import { NextRequest, NextResponse } from 'next/server'
import db from './lib/db'
import getSession from './lib/session'

interface Routes {
  [key: string]: boolean
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/api/auth/signin': true,
  '/api/auth/callback/google': true,
  '/api/auth/session': true,

  '/api/auth/providers': true,
  '/github/start': true,
  '/github/complete': true,
}

export async function middleware(request: NextRequest) {
  const session = await getSession()
  console.log('Middleware - Session:', session)
  console.log('Middleware - Request URL:', request.nextUrl.pathname)
  const exists = publicOnlyUrls[request.nextUrl.pathname]
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
