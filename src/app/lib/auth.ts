import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyJwt } from "./jwt";

//next-auth 옵션
export const authOptions: NextAuthOptions = {
  providers: [
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
        if (!credentials?.username || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해 주세요.");
        }

        try {
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

          if (!res.ok) {
            throw new Error(
              "로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요."
            );
          }

          const user = await res.json();
          return user || null;
        } catch (error) {
          console.error("Authorize Error:", error);
          throw new Error("로그인 문제가 발생했습니다.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // console.log("$$$ token: ", token);
      session.user = token as any;
      // console.log("$$$ session: ", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// custom signin 함수
export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  return await signIn("credentials", {
    username: email,
    password: password,
    redirect: true,
    callbackUrl: "/history",
  });
};

// next-auth token 유효성 검사
export async function validateNextAuth(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token;
}

// session token 유효성 검사
export async function validateSession(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || !verifyJwt(token)) {
    return null;
  }
  return token;
}
