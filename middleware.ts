import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const publicPaths = ["/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
  const isFile = req.nextUrl.pathname.match(/\.(.*)$/);

  if (isFile) {
    return NextResponse.next();
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/abook", req.url));
  }

  return NextResponse.next();
}
