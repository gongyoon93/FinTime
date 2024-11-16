import { atom } from "recoil";

export interface History {
  id: number;
  transaction: string;
  amount: number;
  content?: string;
  date: Date;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const historyState = atom<History[] | null>({
  key: "historyState",
  default: [],
});
