import { atom } from "recoil";
import { Session } from "next-auth";

export const sessionState = atom<Session | null>({
  key: "sessionState",
  default: null,
});
