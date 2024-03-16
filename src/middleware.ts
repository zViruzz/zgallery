import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authUser from './util/auth-user'

export const config = {
  matcher: ['/app/:path*', '/auth/:path*']
}

export async function middleware (req: NextRequest) {
  console.log('middleware')
  if (req.nextUrl.pathname === '/app') {
    return NextResponse.redirect(new URL('/app/imagen', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/auth')) {
    const { supabase } = await authUser()
    const { data } = await supabase.auth.getUser()

    if (data.user !== null) {
      return NextResponse.redirect(new URL('/app', req.url))
    }
  }
}
