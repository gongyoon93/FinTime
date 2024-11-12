import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyJwt } from "@/app/lib/jwt";
import { signIn } from "next-auth/react";

//next-auth 옵션
export const authOptions: NextAuthOptions = {
  providers: [
    // ID, PW 로그인 방식
    // CredentiasProvider의 authorize함수를 통해
    // /api/auth/signin의 endpoint를 호출해 동작.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소를 입력해 주세요.",
        },
        password: { label: "비밀번호", type: "password" },
      },
      //credentials : 로그인 폼에서 입력한 값
      async authorize(credentials) {
        //로그인 로직
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log("$$$user: ", user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("$$$ token: ", token);
      session.user = token as any;
      console.log("$$$ session: ", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// custom signin 함수
export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  await signIn("credentials", {
    username: email,
    password: password,
    redirect: true,
    callbackUrl: "/history",
  });
};

// 사용자 권한 확인
export async function validateAuth(authHeader: string | null) {
  console.log("베리파이1" + authHeader);
  const accessToken = authHeader?.split(" ")[1];
  console.log("베리파이2" + accessToken);
  if (!accessToken || !verifyJwt(accessToken)) {
    throw new Error("No Authorization");
  }
}
