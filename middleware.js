import { NextResponse } from 'next/server'
import { redis } from '@/lib/upstash'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!_next/|_proxy/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)'
  ]
}

export default async function middleware(req) {
  const path = req.nextUrl.pathname

  console.log('path:', path)

  if (path.length === 8) {
    const key = decodeURIComponent(path.split('/')[1])
    const response = await redis.get(`l0l.ink:${key}`)
    const { url } = response || {}
    if (url) {
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
