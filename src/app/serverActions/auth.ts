import { signIn } from "next-auth/react";

export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  await signIn("credentials", {
    username: email,
    password: password,
    redirect: true,
    callbackUrl: "/abook",
  });
};
