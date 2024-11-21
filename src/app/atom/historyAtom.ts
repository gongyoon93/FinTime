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

export interface HistoryList {
  date: Date;
  dailyIncome: number;
  dailyExpense: number;
  dailyList: History[];
}

export const historyState = atom<{
  monthlyIncome: number;
  monthlyExpense: number;
  list: HistoryList[];
}>({
  key: "historyState",
  default: { monthlyIncome: 0, monthlyExpense: 0, list: [] },
});
