import { NextRequest, NextResponse } from "next/server";
import { TOKEN_NAME } from "./constants";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  const publicRoutes = ["/login", "/signup"]; // Agrega aquí las rutas públicas
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
