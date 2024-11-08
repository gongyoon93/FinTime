import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
