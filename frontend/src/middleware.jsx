import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const protectedPaths = ["/dashboard"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (protectedPaths.includes(pathname)) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Validate and decode the token
      const decoded = jwtVerify(token, process.env.JWT_SECRET);

      // You can attach user info to the request here if needed
      req.user = decoded;

      return NextResponse.next();
    } catch (err) {
      // Invalid token
      console.error("JWT verification failed:", err.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
