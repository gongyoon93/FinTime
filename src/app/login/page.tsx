"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/abook");
    }
  }, [session, status, router]);

  const handleLogin = () => {
    signIn("google"); // Google Provider를 통한 로그인
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
