"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { sessionState } from "./atoms/sessionAtom";

// 인증 상태와 세션 만료 확인을 위한 AuthCheck 컴포넌트
export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setRecoilSession = useSetRecoilState(sessionState);

  // Recoil 상태에 세션 정보 저장
  useEffect(() => {
    setRecoilSession(session || null);
  }, [session, setRecoilSession]);

  // 세션 만료 시 로그아웃 및 리디렉션
  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Session expired. You have been logged out.");
      router.push("/login");
    }
  }, [status, router]);

  return <>{children}</>;
}
