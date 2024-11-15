import { atom } from "recoil";
import { getStartOfMonthInKST } from "../lib/date";

export const dateState = atom<Date>({
  key: "dateState",
  default: getStartOfMonthInKST(),
});
