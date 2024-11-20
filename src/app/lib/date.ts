import { startOfMonth, set } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// 한국 시간대 설정
const timeZone = "Asia/Seoul";

// 현재 연도와 선택한 월의 첫 번째 날짜를 설정하는 함수
export function getStartOfMonthInKST(year?: number, month?: number) {
  const now = new Date();

  // 현재 연도와 지정한 월, 1일을 설정하여 새로운 날짜 생성
  const date = set(now, {
    year: year ?? undefined,
    month: month ? month - 1 : undefined,
    date: 1,
  });

  // 월의 시작일로 설정하고 한국 시간대로 변환
  const startOfMonthDate = startOfMonth(date);
  const startOfMonthInKST = toZonedTime(startOfMonthDate, timeZone);

  //   console.log(
  //     "한국 표준시 시작 날짜:",
  //     format(startOfMonthInKST, "yyyy-MM-dd")
  //   );

  return startOfMonthInKST;
}

export function getCurrentYear(): string {
  return new Date().getFullYear().toString().padStart(2, "0");
}

export function isValidYear(year: string | null): boolean {
  if (!year) return false;
  const yearNum = Number(year);
  return !isNaN(yearNum) && yearNum >= 1900 && yearNum <= 2100;
}

export function getCurrentMonth(): string {
  return (new Date().getMonth() + 1).toString().padStart(2, "0");
}

export function isValidMonth(month: string | null): boolean {
  if (!month) return false;
  const monthNum = Number(month);
  return !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12;
}
