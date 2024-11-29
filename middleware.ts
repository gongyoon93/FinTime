import { NextRequest, NextResponse } from "next/server";
import { validateNextAuth } from "@/app/lib/auth";
import {
  getCurrentMonth,
  getCurrentYear,
  isValidMonth,
  isValidYear,
} from "@/app/lib/date";

// 라우트 그룹 정의
const ROUTES = {
  AUTH_REQUIRED: ["/history", "/history/write", "/myaccount", "/settings"],
  SIGN_IN_ONLY: ["/auth/signup", "/auth/signin"],
  MONTH_PARAM_ROUTES: ["/history"],
};

export async function middleware(request: NextRequest) {
  try {
    const token = await validateNextAuth(request);
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    // 1. 인증이 필요한 페이지 접근 제어
    if (ROUTES.AUTH_REQUIRED.some((route) => pathname.startsWith(route))) {
      return token
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // 2. 인증 후 접근 제한이 필요한 페이지 접근 제어
    if (ROUTES.SIGN_IN_ONLY.some((route) => pathname.startsWith(route))) {
      return token
        ? NextResponse.redirect(new URL("/history", request.url))
        : NextResponse.next();
    }

    // 3. 연도/월 파라미터 라우트 처리
    if (
      ROUTES.MONTH_PARAM_ROUTES.some((route) => pathname.startsWith(route)) &&
      pathname !== "/history/write"
    ) {
      const year = searchParams.get("year");
      const month = searchParams.get("month");

      // 연도 파라미터가 유효하지 않은 경우 처리
      if (!isValidYear(year) || !isValidMonth(month)) {
        const currentYear = getCurrentYear();
        const currentMonth = getCurrentMonth();
        const url = new URL(request.url);

        if (!isValidYear(year)) {
          // 연도 파라미터 업데이트
          url.searchParams.set("year", currentYear);
        }

        if (!isValidMonth(month)) {
          // 월 파라미터 업데이트
          url.searchParams.set("month", currentMonth);
        }

        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/history/:path*",
    "/myaccount/:path*",
    "/settings/:path*",
    "/auth/signup",
    "/auth/signin",
  ],
};
