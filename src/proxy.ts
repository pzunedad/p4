import { NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {

const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/post/:path*", "/profile/:path*", "/login"],
};