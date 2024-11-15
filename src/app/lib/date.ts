import { startOfMonth, set } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

// 한국 시간대 설정
const timeZone = "Asia/Seoul";

// 현재 연도와 선택한 월의 첫 번째 날짜를 설정하는 함수
export function getStartOfMonthInKST(month?: number) {
  const now = new Date();

  // 현재 연도와 지정한 월, 1일을 설정하여 새로운 날짜 생성
  const date = set(now, { month: month ? month - 1 : undefined, date: 1 });

  // 월의 시작일로 설정하고 한국 시간대로 변환
  const startOfMonthDate = startOfMonth(date);
  const startOfMonthInKST = toZonedTime(startOfMonthDate, timeZone);

  //   console.log(
  //     "한국 표준시 시작 날짜:",
  //     format(startOfMonthInKST, "yyyy-MM-dd")
  //   );

  return startOfMonthInKST;
}
