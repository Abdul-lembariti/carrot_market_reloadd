import { NextRequest, NextResponse } from 'next/server'
import getSession from './lib/session'

export async function middleware(request: NextRequest) {
  const sessions = await getSession()
  // console.log(sessions)
  const pathname = request.nextUrl.pathname
  if (pathname === '/') {
    const response = NextResponse.next()
    response.cookies.set('middleware-cookie', 'hello')
    return response
  }
  if (pathname === '/profile') {
    return Response.redirect(new URL('/', request.url))
  }
}
