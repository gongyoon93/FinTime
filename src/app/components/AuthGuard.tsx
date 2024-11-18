"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Your session has expired. Redirecting to login.");
      signOut(); // 세션 및 쿠키 초기화
      // router.replace("/auth/signin"); // 로그인 페이지로 리다이렉트
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // 세션 확인 중 로딩 상태 표시 > 로딩 이미지로 변경
  }

  return <>{children}</>;
}
