import { NextRequest, NextResponse } from "next/server"
import { auth } from "./app/auth"

export default async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  const pathname = nextUrl.pathname

  const session = await auth()

  if (
    pathname.startsWith("/chart") ||
    pathname.startsWith("/exchange-diary") ||
    pathname.startsWith("/mydiary") ||
    pathname.startsWith("/mypage") ||
    pathname.startsWith("/welcome")
  ) {
    if (!session?.user) {
      return NextResponse.redirect(`${nextUrl.origin}/login`)
    }
    // Logic for API routes
  } else if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/get-extra-user-info") ||
    pathname.startsWith("/onboarding")
  ) {
    if (session?.user) {
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
    "/login/:path*",
    "/signup/:path*",
    "/get-extra-user-info/:path*",
    "/onboarding/:path*",
    "/",
  ],
}
