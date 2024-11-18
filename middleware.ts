import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";
import { validateNextAuth } from "@/app/lib/auth";

const matchersForAuth = ["/history", "/myaccount", "/settings"];
const matchersForSignIn = ["/auth/signup", "/auth/signin"];
export async function middleware(request: NextRequest) {
  const token = await validateNextAuth(request);
  console.log("middleware~", token);
  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return token
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // 인증 후 접근 제한이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return token
      ? NextResponse.redirect(new URL("/history", request.url))
      : NextResponse.next();
  }

  // 인증 조건에 해당하지 않으면 요청 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: [...matchersForAuth, ...matchersForSignIn],
};

// 경로 일치 확인
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
