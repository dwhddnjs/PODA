import { NextRequest, NextResponse } from "next/server"
import { auth } from "./app/auth"

export default async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl

  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect(`${nextUrl.origin}/login`)
  }

  if (nextUrl.pathname === `/welcome`) {
    if (session.user.extra?.isOnboarding) {
      return NextResponse.redirect(`${nextUrl.origin}/mydiary`)
    }
  }
}

export const config = {
  matcher: [
    "/chart/:path*",
    "/exchange-diary/:path*",
    "/mydiary/:path*",
    "/mypage/:path*",
    "/welcome/:path*",
  ],
}
