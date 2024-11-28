"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { HistoryList, historyState } from "../atom/historyAtom";
import { useRecoilState } from "recoil";
import { getHistoryByUser } from "../lib/history";
import { Session } from "next-auth";
import { sessionState } from "../atom/sessionAtom";
import { signOut } from "next-auth/react";
import { isValidMonth, isValidYear } from "../lib/date";
import TranSummary from "../components/history/HistorySummary";
import HistoryContent from "../components/history/HistoryContent";
import { Plus } from "lucide-react";

const HistoryContainer = styled.section`
  width: calc(100% - 2rem);
  height: calc(100% - 7rem);
  margin: 1rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const slideUp = keyframes`
0% {
  transform: translateY(100%);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`;

const SlideOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2000;
  animation: ${slideUp} 0.5s ease-in-out forwards;
`;

const CreateHistoryBtn = styled(Plus)`
  bottom: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  border-radius: 4rem;
  position: absolute;
  color: white;
  background-color: #fe6725;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

interface HistoryPageProps {
  initialHistories: {
    monthlyIncome: number;
    monthlyExpense: number;
    list: HistoryList[];
  };
  initialSession: Session | null;
  expired: boolean;
}

export default function HistoryPage({
  initialHistories,
  initialSession,
  expired,
}: HistoryPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [history, setHistory] = useRecoilState(historyState);
  const [session, setSession] = useRecoilState(sessionState);

  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태

  const handleButtonClick = useCallback(() => {
    setIsAnimating(true); // 애니메이션 시작
    console.log("확인");
    setTimeout(() => {
      router.push("/history/write"); // 페이지 이동
    }, 500); // 애니메이션 지속 시간 이후 이동
  }, [router, setIsAnimating]);

  // 현재 URL의 year/month 파라미터 확인
  const validateAndGetYearMonth = useCallback(() => {
    const currentYear = new Date().getFullYear().toString();
    const year = searchParams?.get("year") ?? currentYear;

    const currentMonth = (new Date().getMonth() + 1).toString();
    const month = searchParams?.get("month") ?? currentMonth;

    if (!isValidYear(year) || !isValidMonth(month)) {
      router.replace(
        `/history?year=${isValidYear(year) ? year : currentYear}&month=${
          isValidMonth(month) ? month : currentMonth
        }`
      );
    }

    return {
      year: isValidYear(year) ? year : currentYear,
      month: isValidMonth(month) ? month : month,
    };
  }, [searchParams, router]);

  // next 14 버전에서는 fetch API를 사용하는 경우 캐싱 기능이 사용된다.
  // 필요에 따라 axios를 사용하는게 적절하다.
  const fetchHistory = useCallback(
    async (year: string, month: string) => {
      if (!session?.user.id || !session?.user.accessToken) return;

      try {
        const res = await getHistoryByUser(
          session.user.id,
          session.user.accessToken,
          Number(year),
          Number(month)
        );

        if (res.status === 200) {
          setHistory(res.data);
        } else if (res.status === 401) {
          setSession(null);
          signOut({ redirect: true });
        } else {
          setHistory({ monthlyIncome: 0, monthlyExpense: 0, list: [] });
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory({ monthlyIncome: 0, monthlyExpense: 0, list: [] });
      }
    },
    [session, setHistory, router]
  );

  // 초기 데이터 설정
  useEffect(() => {
    setHistory(initialHistories);
    setSession(initialSession);
  }, [initialHistories, initialSession, setHistory, setSession]);

  // URL 파라미터 변경 감지 및 데이터 fetch
  useEffect(() => {
    const { year, month } = validateAndGetYearMonth();
    fetchHistory(year, month);
  }, [searchParams, validateAndGetYearMonth, fetchHistory]);

  return (
    <>
      {isAnimating && <SlideOverlay />}
      <TranSummary
        monthlyIncome={history.monthlyIncome}
        monthlyExpense={history.monthlyExpense}
      />
      <HistoryContainer>
        <HistoryContent datelist={history.list} />
        <CreateHistoryBtn onClick={handleButtonClick} />
      </HistoryContainer>
    </>
  );
}
