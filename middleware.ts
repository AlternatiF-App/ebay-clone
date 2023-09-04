import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

const Middleware = async (req: any) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({res, req})
  const { data } = await supabase.auth.getSession()

  if (data?.session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (
    !data?.session && (
      req.nextUrl.pathname.startsWith('/checkout') ||
      req.nextUrl.pathname.startsWith('/success') ||
      req.nextUrl.pathname.startsWith('/address') ||
      req.nextUrl.pathname.startsWith('/orders') 
    )
  ) return NextResponse.redirect(new URL('/auth', req.url))

  return res
}

export default Middleware