import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./constants";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
