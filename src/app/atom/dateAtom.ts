import { startOfMonth } from "date-fns";
import { atom } from "recoil";

export const dateState = atom<Date>({
  key: "dateState",
  default: startOfMonth(new Date()),
});
